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
      description: 'Developed an AI-powered resume analysis and job matching system using Python and Flask to analyze resumes, calculate match scores, and provide career suggestions.',
      tags: ['Python', 'Flask', 'AI', 'Resume Analyzer', 'Job Matching'],
      demoUrl: 'https://ai-resume-intelligence-system-alpha.vercel.app/',
      githubUrl: 'https://github.com/uTharun23/Ai-resume-intelligence-system',
      imgUrl: 'images/projects/resume_intel.png'
    },
    {
      id: 'agrihelp-ai',
      title: 'AgriHelp-AI',
      iconClass: 'fa-solid fa-wheat-awn',
      description: 'Developed an AI-powered agricultural portal leveraging machine learning models to detect crop diseases from leaf scans, offer dynamic treatments, and guide soil parameters.',
      tags: ['AI', 'Python', 'Machine Learning', 'Agriculture Tech'],
      demoUrl: 'https://agri-help-ai.vercel.app/',
      githubUrl: 'https://github.com/uTharun23/AgriHelp-AI',
      imgUrl: 'images/projects/agrihelp_ai.png'
    },
    {
      id: 'brightness-control',
      title: 'Brightness Control Using Hand Gestures',
      iconClass: 'fa-solid fa-hand',
      description: 'Developed a real-time computer vision system that lets users control their screen brightness with hand gestures, leveraging image processing frameworks.',
      tags: ['Python', 'OpenCV', 'Computer Vision'],
      demoUrl: 'https://brightness-control-with-hand-gestur.vercel.app/',
      githubUrl: 'https://github.com/uTharun23/Brightness-control-with-hand-gestures',
      imgUrl: 'images/projects/brightness_control.png'
    },
    {
      id: 'terrasight',
      title: 'TerraSight AI – Plant Monitoring System',
      iconClass: 'fa-solid fa-seedling',
      description: 'Built an AI-based agriculture monitoring system using image analysis algorithms for early detection of health issues in crops and automated plant health tracking.',
      tags: ['AI', 'Image Processing', 'Python'],
      demoUrl: 'https://terra-sight-ai-3zns.vercel.app/',
      githubUrl: 'https://github.com/uTharun23/terra-sight-ai',
      imgUrl: 'images/projects/terrasight.png'
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
      category: 'AI & Full-Stack Development',
      description: 'An advanced, intelligent applicant tracking and analysis suite designed to bridge the gap between candidate qualifications and technical recruiters\' needs. Powered by a Flask backend and Python parsing engines, it scans files, maps competencies, and returns rich visual insights.',
      features: [
        'Advanced PDF/DOCX parsing and semantic layout mapping',
        'NLP-driven competency matching scores for standard tech listings',
        'Visual feedback dashboard showing key missing concepts/skills',
        'Automated suggestions for professional portfolio updates'
      ],
      architecture: `
        <div class="arch-diagram">
          <div class="arch-node client">Candidate Resume / PDF</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i> Uploader</div>
          <div class="arch-node server">Flask Core Engine (Python)</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrows-left-right"></i> NLP Matching</div>
          <div class="arch-node ai">AI Competency Mapper & score</div>
        </div>
      `
    },
    'terrasight': {
      title: 'TerraSight AI – Plant Monitoring',
      category: 'Computer Vision & Agriculture',
      description: 'An AI-powered agricultural health assistant designed for greenhouses and automated smart farms. Utilizing computer vision modules in Python, it analyzes crop leaf imagery to recognize early pathogens, measure hydration levels, and report overall stress indexes.',
      features: [
        'Real-time visual capture analysis for stress indicators',
        'Pre-trained computer vision classifications for leaf spotting, rot, and bugs',
        'Detailed dashboard graphing hydration curves and health cycles',
        'Automated recommendations for localized climate/soil adjustment'
      ],
      architecture: `
        <div class="arch-diagram">
          <div class="arch-node client">Smart Camera System</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i> Image Stream</div>
          <div class="arch-node server">OpenCV / NumPy Processing</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrows-left-right"></i> Pattern Analysis</div>
          <div class="arch-node ai">TerraSight AI Leaf Classifier</div>
        </div>
      `
    },
    'brightness-control': {
      title: 'Hand Gesture Brightness Controller',
      category: 'Computer Vision & Human-Computer Interface',
      description: 'A futuristic desktop automation tool that utilizes standard laptop webcams to dynamically modify system parameters. By identifying hand gesture landmarks, the system adjusts screen brightness seamlessly, reducing hardware button reliance.',
      features: [
        'Lightweight hand landmark detector running at 30+ FPS',
        'Seamless overlay system communicating with OS brightness controls',
        'Calibrated distance mapping to map relative finger-pinch percentages',
        'Custom desktop notifications confirming gesture activation states'
      ],
      architecture: `
        <div class="arch-diagram">
          <div class="arch-node client">Integrated Laptop Webcam</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrow-down"></i> Frame Capture</div>
          <div class="arch-node server">OpenCV & MediaPipe Landmarker</div>
          <div class="arch-arrow"><i class="fa-solid fa-arrows-left-right"></i> Distance Mapping</div>
          <div class="arch-node ai">OS Brightness Control API</div>
        </div>
      `
    },
    'agrihelp-ai': {
      title: 'AgriHelp-AI',
      category: 'Artificial Intelligence & Precision Farming',
      description: 'An AI-powered agricultural helper system built to assist farmers in real-time. It analyzes leaf images to identify pathogens, runs soil test suitability models, and integrates intelligent recommendation loops to provide precise treatment paths.',
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
