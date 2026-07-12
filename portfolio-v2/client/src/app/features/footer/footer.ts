import { Component, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit {
  showBackToTop = signal<boolean>(false);
  
  // Progress Ring dimensions
  private readonly radius = 20;
  readonly circumference = 2 * Math.PI * this.radius; // ~125.66
  strokeDashoffset = signal<number>(this.circumference);

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercent = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
    
    // Set circle offset progress
    const offset = this.circumference - (scrolledPercent / 100) * this.circumference;
    this.strokeDashoffset.set(offset);
    
    // Set visibility threshold
    this.showBackToTop.set(scrollPos > 300);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
