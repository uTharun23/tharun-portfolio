import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightGlowDirective } from '../../shared/directives/spotlight-glow.directive';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SpotlightGlowDirective, TiltCardDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience {}
