import { Component, inject, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './core/services/api.service';
import { Nav } from './features/nav/nav';
import { Chatbot } from './features/chatbot/chatbot';
import { Footer } from './features/footer/footer';
import { Toast } from './shared/components/toast/toast';

interface ParticleItem {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Nav,
    Chatbot,
    Footer,
    Toast
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  private apiService = inject(ApiService);

  // Preloader state
  isPreloaded = signal<boolean>(false);
  showPreloader = signal<boolean>(true);

  // Mouse spotlight glow positions
  mouseGlowX = signal<number>(0);
  mouseGlowY = signal<number>(0);
  mouseGlowOpacity = signal<number>(0);

  // Canvas particle settings
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;
  private particlesArray: ParticleItem[] = [];
  private mouse = { x: 0, y: 0, radius: 100 };
  private animationFrameId?: number;

  ngOnInit() {
    this.recordPageVisit();
    this.startPreloaderTimer();
  }

  ngAfterViewInit() {
    this.initParticles();
    this.animateGlow();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // Preloader removal
  private startPreloaderTimer() {
    setTimeout(() => {
      this.isPreloaded.set(true);
      setTimeout(() => {
        this.showPreloader.set(false);
      }, 1200); // Wait for transition to complete
    }, 2200);
  }

  // Track visitor counts
  private recordPageVisit() {
    this.apiService.recordVisit().subscribe({
      next: (res) => console.log(`Visitor index logged: #${res.value}`),
      error: (err) => console.error('Failed to register visitor counter:', err)
    });
  }

  // Spotlight mouse track glow
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.mouseGlowOpacity.set(1);
  }

  @HostListener('document:mouseleave')
  onMouseLeave() {
    this.mouseGlowOpacity.set(0);
  }

  private animateGlow() {
    // Lerp smoothing coordinates calculation
    const targetX = this.mouse.x;
    const targetY = this.mouse.y;
    
    const currentX = this.mouseGlowX();
    const currentY = this.mouseGlowY();

    this.mouseGlowX.set(currentX + (targetX - currentX) * 0.08);
    this.mouseGlowY.set(currentY + (targetY - currentY) * 0.08);

    requestAnimationFrame(() => this.animateGlow());
  }

  // --- Particles Background Logic ---

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
    this.createParticles();
  }

  private resizeCanvas() {
    if (this.particleCanvas) {
      const canvas = this.particleCanvas.nativeElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }

  private initParticles() {
    if (!this.particleCanvas) return;
    const canvas = this.particleCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    
    this.resizeCanvas();
    this.createParticles();
    this.animateParticles();
  }

  private createParticles() {
    if (!this.particleCanvas) return;
    const canvas = this.particleCanvas.nativeElement;
    this.particlesArray = [];
    
    const count = Math.min(45, Math.floor((canvas.width * canvas.height) / 32000));
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1;
      this.particlesArray.push({
        x: Math.random() * (canvas.width - size * 4) + size * 2,
        y: Math.random() * (canvas.height - size * 4) + size * 2,
        directionX: (Math.random() * 0.4) - 0.2,
        directionY: (Math.random() * 0.4) - 0.2,
        size: size,
        color: 'rgba(99, 102, 241, 0.16)'
      });
    }
  }

  private animateParticles() {
    if (!this.ctx || !this.particleCanvas) return;
    const canvas = this.particleCanvas.nativeElement;
    
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update individual particle positions
    this.particlesArray.forEach(p => {
      // Bounce boundaries checks
      if (p.x > canvas.width || p.x < 0) p.directionX = -p.directionX;
      if (p.y > canvas.height || p.y < 0) p.directionY = -p.directionY;

      // Mouse displacements
      if (this.mouseGlowOpacity() > 0) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius + p.size) {
          if (this.mouse.x < p.x && p.x < canvas.width - p.size * 10) p.x += 2;
          if (this.mouse.x > p.x && p.x > p.size * 10) p.x -= 2;
          if (this.mouse.y < p.y && p.y < canvas.height - p.size * 10) p.y += 2;
          if (this.mouse.y > p.y && p.y > p.size * 10) p.y -= 2;
        }
      }

      p.x += p.directionX;
      p.y += p.directionY;

      // Draw particle dot
      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
      }
    });

    // Connecting lines rendering
    this.connectParticles();
    
    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }

  private connectParticles() {
    if (!this.ctx) return;
    for (let a = 0; a < this.particlesArray.length; a++) {
      for (let b = a; b < this.particlesArray.length; b++) {
        const dx = this.particlesArray[a].x - this.particlesArray[b].x;
        const dy = this.particlesArray[a].y - this.particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const opacity = 1 - (distance / 110);
          this.ctx.strokeStyle = `rgba(20, 184, 166, ${opacity * 0.08})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
          this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
}
