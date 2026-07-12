import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlightGlow]',
  standalone: true
})
export class SpotlightGlowDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const card = this.el.nativeElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.renderer.setStyle(card, '--mouse-x', `${x}px`);
    this.renderer.setStyle(card, '--mouse-y', `${y}px`);
  }
}
