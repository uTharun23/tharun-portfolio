import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appTiltCard]',
  standalone: true
})
export class TiltCardDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const card = this.el.nativeElement;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    // Calculate cursor position relative to the card center
    const mouseX = e.clientX - cardRect.left - cardWidth / 2;
    const mouseY = e.clientY - cardRect.top - cardHeight / 2;
    
    // Calculate rotation angles (limit to small premium tilt: 6 degrees max)
    const rotateX = -(mouseY / (cardHeight / 2)) * 6;
    const rotateY = (mouseX / (cardWidth / 2)) * 6;
    
    // Apply translation and rotations
    this.renderer.setStyle(
      card, 
      'transform', 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const card = this.el.nativeElement;
    this.renderer.setStyle(
      card, 
      'transform', 
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
  }
}
