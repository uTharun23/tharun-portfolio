import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightGlowDirective } from '../../directives/spotlight-glow.directive';
import { TiltCardDirective } from '../../directives/tilt-card.directive';

export interface ProjectItem {
  id: string;
  title: string;
  iconClass: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  imgUrl: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, SpotlightGlowDirective, TiltCardDirective],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCard {
  @Input({ required: true }) project!: ProjectItem;
  @Output() openDetails = new EventEmitter<string>();

  onOpenDetails() {
    this.openDetails.emit(this.project.id);
  }
}
