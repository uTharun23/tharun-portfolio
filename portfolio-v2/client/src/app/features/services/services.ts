import { Component, signal, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements AfterViewInit {
  // Signals for active steps and visual decorations
  step1Active = signal<boolean>(false);
  step2Active = signal<boolean>(false);
  step3Active = signal<boolean>(false);
  step4Active = signal<boolean>(false);
  showReadyText = signal<boolean>(false);
  isDesktop = signal<boolean>(true);

  // SVG drawing states
  strokeDashoffset = signal<number>(0);
  private pathLength = 0;

  @ViewChild('servicesSection') servicesSection!: ElementRef<HTMLElement>;
  @ViewChild('dashedPath') dashedPath!: ElementRef<SVGPathElement>;

  ngAfterViewInit() {
    this.checkScreenSize();
    this.initPathLength();
    // Run initial scroll update
    this.onWindowScroll();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkScreenSize();
    this.initPathLength();
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.servicesSection || !this.dashedPath || !this.isDesktop()) return;

    const section = this.servicesSection.nativeElement;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewHeight = window.innerHeight;

    // Trigger starts when the top of services reaches 50% height of screen
    const triggerStart = viewHeight * 0.5;
    const scrolledDistance = triggerStart - rect.top;

    let progress = scrolledDistance / (sectionHeight - triggerStart);
    progress = Math.max(0, Math.min(1, progress));

    // Update SVG path offset
    const offset = this.pathLength - (progress * this.pathLength);
    this.strokeDashoffset.set(offset);

    // Highlight luggage tag cards based on progress milestones
    this.step1Active.set(progress >= 0.15);
    this.step2Active.set(progress >= 0.45);
    this.step3Active.set(progress >= 0.70);
    this.step4Active.set(progress >= 0.90);

    // Show handwritten ready text
    this.showReadyText.set(progress >= 0.95);
  }

  private checkScreenSize() {
    this.isDesktop.set(window.innerWidth > 1024);
  }

  private initPathLength() {
    if (this.dashedPath && this.isDesktop()) {
      try {
        this.pathLength = this.dashedPath.nativeElement.getTotalLength();
        this.strokeDashoffset.set(this.pathLength);
      } catch (e) {
        // Fallback estimate if path length retrieval fails
        this.pathLength = 1500;
        this.strokeDashoffset.set(1500);
      }
    }
  }
}
