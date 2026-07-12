import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightGlowDirective } from '../../shared/directives/spotlight-glow.directive';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SpotlightGlowDirective, TiltCardDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  // Signal to store current active filter tag
  selectedFilter = signal<string>('all');

  setFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
