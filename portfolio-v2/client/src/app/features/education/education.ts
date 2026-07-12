import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { SpotlightGlowDirective } from '../../shared/directives/spotlight-glow.directive';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, SpotlightGlowDirective, TiltCardDirective],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class Education {
  private apiService = inject(ApiService);

  trackDownload() {
    this.apiService.recordDownload().subscribe({
      next: () => console.log('Resume download registered.'),
      error: (err) => console.error('Failed to log resume download:', err)
    });
  }
}
