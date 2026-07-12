import { Component, Input, Output, EventEmitter, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProjectDetailData {
  title: string;
  category: string;
  description: string;
  features: string[];
  architecture: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  @Input() isOpen = false;
  @Input() project: ProjectDetailData | null = null;
  @Output() close = new EventEmitter<void>();

  // Prevent background scrolling when modal is open
  constructor() {
    effect(() => {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  closeModal() {
    this.close.emit();
  }

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    if (this.isOpen) {
      this.closeModal();
    }
  }
}
