import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Skills } from '../skills/skills';
import { Projects } from '../projects/projects';
import { Experience } from '../experience/experience';
import { Education } from '../education/education';
import { Certifications } from '../certifications/certifications';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Hero,
    About,
    Skills,
    Projects,
    Experience,
    Education,
    Certifications,
    Contact
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {}
