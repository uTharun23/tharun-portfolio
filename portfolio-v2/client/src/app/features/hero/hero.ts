import { Component, signal, inject, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';
import { SpotlightGlowDirective } from '../../shared/directives/spotlight-glow.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TiltCardDirective, SpotlightGlowDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements AfterViewInit, OnDestroy {
  private apiService = inject(ApiService);

  // Video variables
  isVideoPlaying = signal<boolean>(true);
  videoButtonText = signal<string>('Pause Reel');
  isMuted = signal<boolean>(true);

  // Typist / Text Rotator variables
  rotateStrings = [
    'Python Full Stack Developer',
    'AI Solution Builder',
    'Flask Application Developer',
    'Computer Vision Specialist',
    'Problem Solver & Innovator'
  ];
  currentTypedText = signal<string>('');
  private rotateIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimeout: any;

  // Counter variables
  projectCount = signal<number>(0);

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('counterSection') counterSection!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.startTextRotation();
    this.startCounterObserver();

    // Programmatically play video on load to ensure compatibility
    if (this.heroVideo) {
      const video = this.heroVideo.nativeElement;
      video.muted = true;
      video.play().then(() => {
        this.isVideoPlaying.set(true);
        this.videoButtonText.set('Pause Reel');
      }).catch(err => {
        console.log('Autoplay blocked by browser. Video will start on user interaction:', err);
        this.isVideoPlaying.set(false);
        this.videoButtonText.set('Play Reel');
      });
    }
  }

  ngOnDestroy() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  // Typewriter effect
  private startTextRotation() {
    const fullText = this.rotateStrings[this.rotateIndex];

    if (this.isDeleting) {
      this.currentTypedText.set(fullText.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.currentTypedText.set(fullText.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let delta = 150 - Math.random() * 100;
    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.charIndex === fullText.length) {
      delta = 2000; // Period to display full string
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.rotateIndex = (this.rotateIndex + 1) % this.rotateStrings.length;
      delta = 500; // Pause before typing next
    }

    this.typingTimeout = setTimeout(() => this.startTextRotation(), delta);
  }

  // Count up animation
  private startCounterObserver() {
    if (!this.counterSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCount(5);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(this.counterSection.nativeElement);
  }

  private animateCount(target: number) {
    let current = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 30);
    const interval = setInterval(() => {
      current++;
      this.projectCount.set(current);
      if (current >= target) {
        clearInterval(interval);
      }
    }, stepTime);
  }

  // Video play controller
  toggleVideo() {
    const video = this.heroVideo.nativeElement;
    if (video.paused) {
      video.play();
      this.isVideoPlaying.set(true);
      this.videoButtonText.set('Pause Reel');
    } else {
      video.pause();
      this.isVideoPlaying.set(false);
      this.videoButtonText.set('Play Reel');
    }
  }

  // Audio volume controller
  toggleMute() {
    if (this.heroVideo) {
      const video = this.heroVideo.nativeElement;
      video.muted = !video.muted;
      this.isMuted.set(video.muted);
    }
  }

  // Track download clicks
  onDownloadResume() {
    this.apiService.recordDownload().subscribe({
      next: () => console.log('Resume download analytics captured.'),
      error: (err) => console.error('Failed to log resume download:', err)
    });
  }
}
