import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCard, ProjectItem } from '../../shared/components/project-card/project-card';
import { Modal, ProjectDetailData } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCard, Modal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  // Project listing array
  projectsList: ProjectItem[] = [
    {
      id: 'tharun-portfolio',
      title: 'Full-Stack Developer Portfolio',
      iconClass: 'fa-solid fa-laptop-code',
      description: 'Built a responsive portfolio site using Angular 18 frontend and a serverless Node.js/Express API on Vercel.',
      tags: ['Angular 18', 'Node.js', 'Express', 'MongoDB', 'Serverless'],
      demoUrl: 'https://tharunummadala-portfolio.vercel.app/',
      githubUrl: 'https://github.com/uTharun23/tharun-portfolio',
      imgUrl: 'images/projects/portfolio.png'
    },
    {
      id: 'resume-intel',
      title: 'AI Resume Intelligence System',
      iconClass: 'fa-solid fa-file-invoice',
      description: 'Developed a web platform using Python and Flask to automate resume analysis and job description matching.',
      tags: ['Python', 'Flask', 'NLP', 'Resume Parser'],
      demoUrl: 'https://ai-resume-intelligence-system-alpha.vercel.app/',
      githubUrl: 'https://github.com/uTharun23/Ai-resume-intelligence-system',
      imgUrl: 'images/projects/resume_intel.png'
    },
    {
      id: 'agrihelp-ai',
      title: 'AgriHelp-AI: Crop Disease & Soil Suitability Portal',
      iconClass: 'fa-solid fa-wheat-awn',
      description: 'Developed an ML-powered portal using Python to classify crop leaf diseases from uploaded scans.',
      tags: ['Python', 'Machine Learning', 'Image Processing', 'Agriculture'],
      demoUrl: 'https://agri-help-ai.vercel.app/',
      githubUrl: 'https://github.com/uTharun23/AgriHelp-AI',
      imgUrl: 'images/projects/agrihelp_ai.png'
    }
  ];

  // Modal open and selection states
  isModalOpen = signal<boolean>(false);
  selectedProject = signal<ProjectDetailData | null>(null);

  // Raw project descriptions mapping
  private projectDetailsMap: { [key: string]: ProjectDetailData } = {
    'tharun-portfolio': {
      title: 'Full-Stack Developer Portfolio',
      category: 'Web & Serverless Development',
      description: 'A responsive developer portfolio web application built with Angular 18 and a serverless Express API. It features real-time visitor analytics, a guestbook with auto-recovery, and an AI Chatbot for automated recruiter conversation routing.',
      features: [
        'Modern reactive frontend using Angular 18 Signals and standalone components',
        'Serverless Node.js/Express API wrapper deployed on Vercel CDNs',
        'Automated guestbook signatures with MongoDB storage and local JSON fallback',
        'Interactive AI Chatbot assistant with simulated typing delays'
      ],
      architecture: `
        <div class="arch-diagram">
          <div class="arch-node client">Angular 18 Frontend</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i> REST API</div>
          <div class="arch-node server">Express Serverless Core</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrows-left-right"></i> Database</div>
          <div class="arch-node ai">MongoDB / JSON Fallback</div>
        </div>
      `
    },
    'resume-intel': {
      title: 'AI Resume Intelligence System',
      category: 'AI & Backend Development',
      description: 'An advanced applicant tracking and analysis suite designed to analyze candidate resumes against job descriptions. Powered by a Flask backend and Python parsing engines, it scans files, maps competencies, and returns matching scores.',
      features: [
        'Advanced semantic parsing for PDF and DOCX files',
        'NLP-driven competency matching scores for tech stack listings',
        'Visual feedback dashboard showing key missing concepts/skills',
        'Automated recommendations for professional update categories'
      ],
      architecture: `
        <div class="arch-diagram">
          <div class="arch-node client">Candidate Resume / PDF</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i> Uploader</div>
          <div class="arch-node server">Flask Core Engine (Python)</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrows-left-right"></i> NLP Matching</div>
          <div class="arch-node ai">AI Competency Mapper & Score</div>
        </div>
      `
    },
    'agrihelp-ai': {
      title: 'AgriHelp-AI: Crop Disease & Soil Suitability Portal',
      category: 'Machine Learning & Precision Farming',
      description: 'An ML-powered agricultural helper system built to assist farmers in real-time. It analyzes leaf images to identify pathogens, runs soil test suitability models, and integrates intelligent recommendation loops to provide precise treatment paths.',
      features: [
        'Pathogen identifier using machine learning algorithms on crop images',
        'Soil parameters analyzer with specialized suggestions',
        'Dynamic fertilizer and treatment recommendation engine',
        'Interactive portal to assist with query responses'
      ],
      architecture: `
        <div class="arch-diagram">
          <div class="arch-node client">Farmer Dashboard / Leaf Scan</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i> Image Upload</div>
          <div class="arch-node server">AgriHelp ML Engine (Python)</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrows-left-right"></i> Model Inference</div>
          <div class="arch-node ai">Soil & Pathogen Classification</div>
        </div>
      `
    }
  };

  openProjectDetails(projectId: string) {
    const data = this.projectDetailsMap[projectId];
    if (data) {
      this.selectedProject.set(data);
      this.isModalOpen.set(true);
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
