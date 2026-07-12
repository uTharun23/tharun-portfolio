const contactService = require('../services/contactService');
const guestbookService = require('../services/guestbookService');
const analyticsService = require('../services/analyticsService');
const dbFallback = require('../utils/dbFallback');

// 1. Health check
const healthCheck = async (req, res, next) => {
  try {
    const dbConnected = dbFallback.isDbConnected();
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date(),
      database: dbConnected ? 'connected' : 'fallback_local'
    });
  } catch (error) {
    next(error);
  }
};

// 2. Submit Contact Form
const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const savedContact = await contactService.sendContactMessage({ name, email, message });
    res.status(201).json({
      message: 'Contact form message processed successfully',
      data: savedContact
    });
  } catch (error) {
    next(error);
  }
};

// 3. Get Guestbook entries
const getGuestbook = async (req, res, next) => {
  try {
    const entries = await guestbookService.fetchSignatures();
    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
};

// 4. Submit Guestbook entry
const submitSignature = async (req, res, next) => {
  try {
    const { name, role, message } = req.body;
    const entry = await guestbookService.addSignature({ name, role, message });
    res.status(201).json({
      message: 'Guestbook signed successfully',
      data: entry
    });
  } catch (error) {
    next(error);
  }
};

// 5. Get Analytics Summary
const getAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.fetchAnalyticsSummary();
    res.status(200).json(analytics);
  } catch (error) {
    next(error);
  }
};

// 6. Record Page Visit
const recordVisit = async (req, res, next) => {
  try {
    const updated = await analyticsService.incrementVisitorCount();
    res.status(200).json({
      message: 'Visit logged successfully',
      value: updated.value
    });
  } catch (error) {
    next(error);
  }
};

// 7. Record Resume Download
const recordDownload = async (req, res, next) => {
  try {
    const updated = await analyticsService.incrementResumeDownloadCount();
    res.status(200).json({
      message: 'Download logged successfully',
      value: updated.value
    });
  } catch (error) {
    next(error);
  }
};

// 8. Get profile metadata (mock representation for API alignment)
const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      name: "Tharun Ummadala",
      title: "Full-Stack AI Engineer",
      bio: "Pursuing B.Tech in IT. Developing intelligent web applications and computer vision modules.",
      email: "tharunummadala@gmail.com",
      github: "https://github.com/uTharun23",
      linkedin: "https://linkedin.com/in/tharun-ummadala-b54b083a3",
      location: "Vijayawada, Andhra Pradesh, India"
    });
  } catch (error) {
    next(error);
  }
};

// 9. Get projects metadata (mock representation for API alignment)
const getProjects = async (req, res, next) => {
  try {
    res.status(200).json([
      {
        id: 'tharun-portfolio',
        title: 'Full-Stack Developer Portfolio',
        iconClass: 'fa-solid fa-laptop-code',
        description: 'Built a responsive portfolio site using Angular 18 frontend and a serverless Node.js/Express API on Vercel.',
        tags: ['Angular 18', 'Node.js', 'Express', 'MongoDB', 'Serverless'],
        demoUrl: 'https://tharunummadala-portfolio.vercel.app/',
        githubUrl: 'https://github.com/uTharun23/tharun-portfolio'
      },
      {
        id: 'resume-intel',
        title: 'AI Resume Intelligence System',
        iconClass: 'fa-solid fa-file-invoice',
        description: 'Developed a web platform using Python and Flask to automate resume analysis and job description matching.',
        tags: ['Python', 'Flask', 'NLP', 'Resume Parser'],
        demoUrl: 'https://ai-resume-intelligence-system-alpha.vercel.app/',
        githubUrl: 'https://github.com/uTharun23/Ai-resume-intelligence-system'
      },
      {
        id: 'agrihelp-ai',
        title: 'AgriHelp-AI: Crop Disease & Soil Suitability Portal',
        iconClass: 'fa-solid fa-wheat-awn',
        description: 'Developed an ML-powered portal using Python to classify crop leaf diseases from uploaded scans.',
        tags: ['Python', 'Machine Learning', 'Image Processing', 'Agriculture'],
        demoUrl: 'https://agri-help-ai.vercel.app/',
        githubUrl: 'https://github.com/uTharun23/AgriHelp-AI'
      },
      {
        id: 'brightness-control',
        title: 'Brightness Control Using Hand Gestures',
        iconClass: 'fa-solid fa-hand',
        description: 'Developed a real-time computer vision system that lets users control their screen brightness with hand gestures, leveraging image processing frameworks.',
        tags: ['Python', 'OpenCV', 'Computer Vision'],
        demoUrl: 'https://brightness-control-with-hand-gestur.vercel.app/',
        githubUrl: 'https://github.com/uTharun23/Brightness-control-with-hand-gestures'
      },
      {
        id: 'terrasight',
        title: 'TerraSight AI: Plant Monitoring System',
        iconClass: 'fa-solid fa-seedling',
        description: 'Built an AI-based agriculture monitoring system using image analysis algorithms for early detection of health issues in crops and automated plant health tracking.',
        tags: ['AI', 'Image Processing', 'Python', 'OpenCV'],
        demoUrl: 'https://terra-sight-ai-3zns.vercel.app/',
        githubUrl: 'https://github.com/uTharun23/terra-sight-ai'
      }
    ]);
  } catch (error) {
    next(error);
  }
};

// 10. Get skills metadata (mock representation for API alignment)
const getSkills = async (req, res, next) => {
  try {
    res.status(200).json([
      {
        category: 'Languages & Core',
        type: 'core',
        iconClass: 'fa-solid fa-code',
        items: ['Python', 'JavaScript', 'HTML', 'CSS', 'C (Basics)']
      },
      {
        category: 'Frameworks & Libraries',
        type: 'libs',
        iconClass: 'fa-solid fa-layer-group',
        items: ['Flask', 'React.js', 'OpenCV']
      },
      {
        category: 'Database & Tools',
        type: 'tools',
        iconClass: 'fa-solid fa-database',
        items: ['MySQL', 'Git & GitHub', 'VS Code']
      }
    ]);
  } catch (error) {
    next(error);
  }
};

// 11. Get certificates metadata (mock representation for API alignment)
const getCertificates = async (req, res, next) => {
  try {
    res.status(200).json([
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
    ]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  healthCheck,
  submitContact,
  getGuestbook,
  submitSignature,
  getAnalytics,
  recordVisit,
  recordDownload,
  getProfile,
  getProjects,
  getSkills,
  getCertificates
};
