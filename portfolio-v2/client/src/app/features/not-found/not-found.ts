import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpotlightGlowDirective } from '../../shared/directives/spotlight-glow.directive';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, SpotlightGlowDirective, TiltCardDirective],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {}
