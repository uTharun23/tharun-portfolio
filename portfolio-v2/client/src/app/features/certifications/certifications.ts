import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotlightGlowDirective } from '../../shared/directives/spotlight-glow.directive';
import { TiltCardDirective } from '../../shared/directives/tilt-card.directive';

export interface CertificationItem {
  title: string;
  issuer: string;
  description: string;
  imgUrl: string;
  pdfUrl: string;
  verifyUrl?: string;
  iconClass: string; // for fallback badge
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, SpotlightGlowDirective, TiltCardDirective],
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss'
})
export class Certifications {
  certificationsList: CertificationItem[] = [
    {
      title: 'Python Fundamentals',
      issuer: 'Infosys Springboard',
      description: 'Mastered core Python programming concepts, data structures, and computer science methodologies.',
      imgUrl: 'images/certifications/pythonfundamendals.png',
      pdfUrl: 'certifications/pythonfundamendals.pdf',
      verifyUrl: 'https://verify.onwingspan.com',
      iconClass: 'fa-solid fa-award'
    },
    {
      title: 'NPTEL Certification',
      issuer: 'IIT (2025)',
      description: 'Successfully completed NPTEL certification in "Design and Implementation of Human-Computer Interfaces" from IIT.',
      imgUrl: 'images/certifications/NPTEL.png',
      pdfUrl: 'certifications/NPTEL.pdf',
      iconClass: 'fa-solid fa-graduation-cap'
    },
    {
      title: 'Python Full Stack Internship',
      issuer: 'ExcelR (2026)',
      description: 'Successfully completed the ExcelR Certification under the Python Full Stack Internship Program.',
      imgUrl: 'images/certifications/excelr.png',
      pdfUrl: 'images/certifications/excelr.jpg',
      iconClass: 'fa-solid fa-award'
    },
    {
      title: 'AI & Sustainability',
      issuer: 'IBM SkillsBuild',
      description: 'Completed practical traineeship incorporating sustainability design principles into AI software systems.',
      imgUrl: 'images/certifications/Completion Certificate _ SkillsBuild.png',
      pdfUrl: 'certifications/Completion Certificate _ SkillsBuild.pdf',
      iconClass: 'fa-solid fa-briefcase'
    },
    {
      title: 'AI Skills Passport',
      issuer: 'EY & Microsoft',
      description: 'Validated core AI fundamentals and cloud application pathways developed by EY and Microsoft teams.',
      imgUrl: 'images/certifications/microsoft.png',
      pdfUrl: 'certifications/microsoft.pdf',
      iconClass: 'fa-solid fa-passport'
    },
    {
      title: 'HTML/CSS Certification',
      issuer: 'Udemy / Academy',
      description: 'Mastered modern styling and structure standard layouts, semantic elements, and responsive designs.',
      imgUrl: 'images/certifications/htmlcss.png',
      pdfUrl: 'certifications/htmlcss.pdf',
      iconClass: 'fa-solid fa-file-code'
    },
    {
      title: 'DSA Certification',
      issuer: 'Udemy / Academy',
      description: 'Acquired expertise in algorithms, complexity analysis, and object relational data organization structures.',
      imgUrl: 'images/certifications/dsa.png',
      pdfUrl: 'certifications/dsa.pdf',
      iconClass: 'fa-solid fa-network-wired'
    },
    {
      title: 'Generative AI',
      issuer: 'Udemy / Academy',
      description: 'Gained hands-on knowledge in LLMs, prompt engineering concepts, and neural network foundations.',
      imgUrl: 'images/certifications/genai.png',
      pdfUrl: 'certifications/genai.pdf',
      iconClass: 'fa-solid fa-brain'
    }
  ];

  // Track image load error statuses for each certificate
  imageErrors = signal<boolean[]>(new Array(this.certificationsList.length).fill(false));

  onImageError(index: number) {
    this.imageErrors.update(arr => {
      const copy = [...arr];
      copy[index] = true;
      return copy;
    });
  }
}
