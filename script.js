document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. Interactive HTML5 Canvas Particle Background (Sleek & Lightweight)
     ========================================================================== */
  const canvas = document.getElementById("canvas-particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 100 };

    // Track mouse position on window
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Resize handler
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", () => {
      setCanvasSize();
      initParticles();
    });

    // Particle Object
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      // Draw single particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      // Update position and check mouse interactions
      update() {
        // Bounce off canvas boundaries
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Particle displacement on mouse hover
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= 2;
            }
          }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Populate particles array
    const initParticles = () => {
      particlesArray = [];
      // Keep count sparse for visual elegance and performance (max 45)
      const numberOfParticles = Math.min(45, Math.floor((canvas.width * canvas.height) / 32000));
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1; // 1px to 3px
        let x = Math.random() * (canvas.width - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (canvas.height - size * 2 - size * 2) + size * 2;
        let directionX = (Math.random() * 0.4) - 0.2; // slow drift
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = "rgba(99, 102, 241, 0.16)"; // soft indigo particle glow

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    // Draw lines connecting nearby particles
    const connectParticles = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            opacityValue = 1 - (distance / 110);
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacityValue * 0.08})`; // soft teal line
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();
  }

  /* ==========================================================================
     2. Lightweight 3D Card Tilt Effect (Interactive & Pure JS)
     ========================================================================== */
  const tiltCards = document.querySelectorAll(".tilt-card");
  
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Calculate cursor position relative to the card center
      const mouseX = e.clientX - cardRect.left - cardWidth / 2;
      const mouseY = e.clientY - cardRect.top - cardHeight / 2;
      
      // Calculate rotation angles (limit to small premium tilt: 6 degrees max)
      const rotateX = -(mouseY / (cardHeight / 2)) * 6;
      const rotateY = (mouseX / (cardWidth / 2)) * 6;
      
      // Apply translation and rotations
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Reset card position on mouse leave
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });

  /* ==========================================================================
     3. Active Scrolling Header Spy & Mobile Responsive Menu Drawer
     ========================================================================== */
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    document.addEventListener("click", (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    const drawerLinks = document.querySelectorAll(".drawer-link-item");
    drawerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // Intersection Observer for scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // Scroll active header links spy
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-link-item");

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let currentSection = "";
      const scrollPos = window.scrollY + 120;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href").substring(1);
        if (href === currentSection) {
          link.classList.add("active");
        }
      });
    });
  }

  /* ==========================================================================
     4. Interactive Form Submissions & Dynamic Toast Alerts
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const toastContainer = document.getElementById("toast-container");

  const showToast = (message, type = "success") => {
    if (!toastContainer) return;
    
    // Create toast container element
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    // Icon selection
    const iconClass = type === "success" 
      ? "fa-solid fa-circle-check" 
      : "fa-solid fa-circle-exclamation";
      
    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 4 seconds with fade transition
    setTimeout(() => {
      toast.classList.add("fade-out");
      toast.addEventListener("animationend", () => {
        toast.remove();
      });
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector(".btn-submit");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoader = submitBtn.querySelector(".btn-loader");
      
      // Simulate loading state
      btnText.classList.add("hidden");
      btnLoader.classList.remove("hidden");
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // Success callback Simulation
        showToast("Message sent successfully! Tharun will respond shortly.", "success");
        contactForm.reset();
        
        // Reset button states
        btnText.classList.remove("hidden");
        btnLoader.classList.add("hidden");
        submitBtn.disabled = false;
      }, 1200);
    });
  }

  // Premium Scroll Progress Indicator Bar
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    const scrollBar = document.getElementById("scroll-bar");
    if (scrollBar) {
      scrollBar.style.width = scrolled + "%";
    }
  });

  /* ==========================================================================
     5. Advanced Theme Customizer Accent Switcher
     ========================================================================== */
  const activeTheme = localStorage.getItem("selected-theme") || "neon-emerald";
  document.documentElement.setAttribute("data-theme", activeTheme);
  
  // Set active class in navbar dropdown
  const themeOptions = document.querySelectorAll(".theme-option");
  const updateThemeStates = (themeName) => {
    themeOptions.forEach(opt => {
      if (opt.getAttribute("data-theme-value") === themeName) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });
  };
  updateThemeStates(activeTheme);

  const setTheme = (themeName) => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("selected-theme", themeName);
    updateThemeStates(themeName);
  };

  // Attach navbar option clicks
  themeOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      setTheme(opt.getAttribute("data-theme-value"));
    });
  });

  // Attach mobile option clicks
  const mobileThemeOpts = document.querySelectorAll(".mobile-theme-opt");
  mobileThemeOpts.forEach(opt => {
    opt.addEventListener("click", () => {
      setTheme(opt.getAttribute("data-theme-value"));
    });
  });

  /* ==========================================================================
     6. Dynamic Skills Categories Filter
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCategories = document.querySelectorAll(".skill-category");

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remove active states
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        skillCategories.forEach(cat => {
          const catGroup = cat.getAttribute("data-category");
          if (filter === "all" || catGroup === filter) {
            cat.classList.remove("hidden");
          } else {
            cat.classList.add("hidden");
          }
        });
      });
    });
  }

  /* ==========================================================================
     7. Interactive Projects Walkthrough Details Modal
     ========================================================================== */
  const projectModal = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBody = document.getElementById("modal-project-details");
  const openModalBtns = document.querySelectorAll(".open-project-modal");

  const projectData = {
    "resume-intel": {
      title: "AI Resume Intelligence System",
      category: "AI & Full-Stack Development",
      description: "An advanced, intelligent applicant tracking and analysis suite designed to bridge the gap between candidate qualifications and technical recruiters' needs. Powered by a Flask backend and Python parsing engines, it scans files, maps competencies, and returns rich visual insights.",
      features: [
        "Advanced PDF/DOCX parsing and semantic layout mapping",
        "NLP-driven competency matching scores for standard tech listings",
        "Visual feedback dashboard showing key missing concepts/skills",
        "Automated suggestions for professional portfolio updates"
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
    "terrasight": {
      title: "TerraSight AI – Plant Monitoring",
      category: "Computer Vision & Agriculture",
      description: "An AI-powered agricultural health assistant designed for greenhouses and automated smart farms. Utilizing computer vision modules in Python, it analyzes crop leaf imagery to recognize early pathogens, measure hydration levels, and report overall stress indexes.",
      features: [
        "Real-time visual capture analysis for stress indicators",
        "Pre-trained computer vision classifications for leaf spotting, rot, and bugs",
        "Detailed dashboard graphing hydration curves and health cycles",
        "Automated recommendations for localized climate/soil adjustment"
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
    "brightness-control": {
      title: "Hand Gesture Brightness Controller",
      category: "Computer Vision & Human-Computer Interface",
      description: "A futuristic desktop automation tool that utilizes standard laptop webcams to dynamically modify system parameters. By identifying hand gesture landmarks, the system adjusts screen brightness seamlessly, reducing hardware button reliance.",
      features: [
        "Lightweight hand landmark detector running at 30+ FPS",
        "Seamless overlay system communicating with OS brightness controls",
        "Calibrated distance mapping to map relative finger-pinch percentages",
        "Custom desktop notifications confirming gesture activation states"
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
    "agrihelp-ai": {
      title: "AgriHelp-AI",
      category: "Artificial Intelligence & Precision Farming",
      description: "An AI-powered agricultural helper system built to assist farmers in real-time. It analyzes leaf images to identify pathogens, runs soil test suitability models, and integrates intelligent recommendation loops to provide precise treatment paths.",
      features: [
        "Pathogen identifier using machine learning algorithms on crop images",
        "Soil parameters analyzer with specialized suggestions",
        "Dynamic fertilizer and treatment recommendation engine",
        "Interactive portal to assist with query responses"
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

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    let featuresHTML = "";
    data.features.forEach(f => {
      featuresHTML += `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`;
    });

    modalBody.innerHTML = `
      <h2 class="modal-project-title">${data.title}</h2>
      <span class="modal-project-cat">${data.category}</span>
      <div class="modal-project-grid">
        <div class="modal-project-desc">
          <h4>Project Overview</h4>
          <p>${data.description}</p>
          <div class="modal-project-features">
            <h4>Key Features</h4>
            <ul class="feature-list">
              ${featuresHTML}
            </ul>
          </div>
        </div>
        <div class="modal-project-details-right">
          <div class="modal-project-architecture">
            <h4>System Architecture</h4>
            ${data.architecture}
          </div>
        </div>
      </div>
    `;

    projectModal.classList.add("open");
    document.body.style.overflow = "hidden"; // Disable scroll
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.getAttribute("data-project"));
    });
  });

  const closeProjectModal = () => {
    projectModal.classList.remove("open");
    document.body.style.overflow = ""; // Enable scroll
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  // Close modal when clicking backdrop
  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("open")) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     8. Persisted Digital Guestbook System
     ========================================================================== */
  const guestbookForm = document.getElementById("guestbook-form");
  const guestbookWall = document.getElementById("guestbook-messages");
  const visitorCountBadge = document.getElementById("visitor-count");

  // Starter comments if guestbook is fresh
  const defaultSignatures = [
    { name: "Dr. K. Srinivasa Rao", role: "Professor at ALIET", msg: "Tharun is a dedicated and highly curious student. His integration of AI concepts within full-stack development is promising.", time: "1 day ago" },
    { name: "Sarah Jenkins", role: "HR Tech Recruiter", msg: "Stumbled upon your portfolio while looking for entry-level developers. The UI design is incredibly polished and premium. Your resume optimizer project sounds very practical!", time: "3 days ago" },
    { name: "Rohit Kumar", role: "B.Tech Classmate", msg: "Awesome portfolio bro! The hand gesture brightness control project works smoothly. Looking forward to our next project together.", time: "5 days ago" }
  ];

  const getGuestbookSignatures = () => {
    const data = localStorage.getItem("guestbook-entries");
    return data ? JSON.parse(data) : defaultSignatures;
  };

  const saveGuestbookSignature = (entry) => {
    const current = getGuestbookSignatures();
    current.unshift(entry);
    localStorage.setItem("guestbook-entries", JSON.stringify(current));
  };

  const renderGuestbook = () => {
    if (!guestbookWall) return;
    const entries = getGuestbookSignatures();
    visitorCountBadge.textContent = `${entries.length} Signature${entries.length !== 1 ? 's' : ''}`;
    
    guestbookWall.innerHTML = "";
    entries.forEach(e => {
      const card = document.createElement("div");
      card.className = "guestbook-msg-card";
      card.innerHTML = `
        <div class="guestbook-msg-header">
          <div>
            <span class="guestbook-msg-author">${escapeHTML(e.name)}</span>
            ${e.role ? `<span class="guestbook-msg-role">${escapeHTML(e.role)}</span>` : ""}
          </div>
          <span class="guestbook-msg-time">${e.time}</span>
        </div>
        <p class="guestbook-msg-body">${escapeHTML(e.msg)}</p>
      `;
      guestbookWall.appendChild(card);
    });
  };

  const escapeHTML = (str) => {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  };

  if (guestbookForm) {
    guestbookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("gb-name");
      const roleInput = document.getElementById("gb-role");
      const msgInput = document.getElementById("gb-message");

      const entry = {
        name: nameInput.value.trim(),
        role: roleInput.value.trim() || "Visitor",
        msg: msgInput.value.trim(),
        time: "Just now"
      };

      saveGuestbookSignature(entry);
      renderGuestbook();
      guestbookForm.reset();

      // Trigger Confetti Effect
      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#6366f1', '#14b8a6', '#8b5cf6']
        });
      }
      showToast("Thank you for signing the guestbook!", "success");
    });
  }

  renderGuestbook();

  /* ==========================================================================
     9. Interactive AI Assistant Chatbot Panel Logic
     ========================================================================== */
  const chatbotWidget = document.getElementById("chatbot-widget");
  const chatbotTrigger = document.getElementById("chatbot-trigger");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
  const chatbotInputArea = document.getElementById("chatbot-input-area");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const quickRepliesContainer = document.getElementById("chatbot-quick-replies");

  const qaPairs = {
    hello: "Hii there! I'm Tharun's AI. How can I assist you with his portfolio today?",
    projects: "Tharun has built four main projects: 1. AI Resume Intelligence System, 2. TerraSight AI (Plant Monitoring System), 3. Brightness Control Using Hand Gestures, and 4. AgriHelp-AI. Ask me about any of these!",
    skills: "Tharun is proficient in Python, JavaScript, HTML, CSS, C (Basics), Flask, React.js, OpenCV, MySQL, and Git/GitHub. He is a quick learner who loves tackling AI integrations!",
    resume: "You can download Tharun's resume from the actions in the Hero section or the dedicated Resume section. It details his qualifications, B.Tech grades, and course credentials.",
    contact: "You can reach out to Tharun via email at tharunummadala@gmail.com, or check out his social links: GitHub (@uTharun23) and LinkedIn (Tharun Ummadala).",
    "tell me about resume": "The AI Resume Intelligence System is built in Python & Flask. It parses PDF/DOCX resumes, maps skills to job listings, computes percentage match scores, and recommends enhancements. Super practical!",
    "tell me about plant": "TerraSight AI is a computer vision application that processes image streams of crops. It helps detect plant leaves pathogens and stress indices using custom Python image algorithms.",
    "tell me about gesture": "This OpenCV project captures live camera feeds to identify hand gestures. It allows users to control screen brightness without buttons by computing hand landmark coordinate distances.",
    "tell me about agrihelp": "AgriHelp-AI is an AI-powered agricultural portal leveraging machine learning models to detect crop diseases from leaf scans, offer dynamic treatments, and guide soil parameters. Highly useful for smart farming!",
    default: "I'm a lightweight assistant. Feel free to ask about 'skills', 'projects', 'resume', or 'contact'! I'll do my best to help you."
  };

  const getAIResponse = (userMsg) => {
    const cleaned = userMsg.toLowerCase().trim();
    if (cleaned.includes("skill") || cleaned.includes("lang") || cleaned.includes("techno")) return qaPairs.skills;
    if (cleaned.includes("project") || cleaned.includes("work")) return qaPairs.projects;
    if (cleaned.includes("resume") || cleaned.includes("cv") || cleaned.includes("pdf")) return qaPairs.resume;
    if (cleaned.includes("contact") || cleaned.includes("mail") || cleaned.includes("hire") || cleaned.includes("social")) return qaPairs.contact;
    if (cleaned.includes("resume intel") || cleaned.includes("resume analysis") || cleaned.includes("intelligence")) return qaPairs["tell me about resume"];
    if (cleaned.includes("terra") || cleaned.includes("plant") || cleaned.includes("crop")) return qaPairs["tell me about plant"];
    if (cleaned.includes("gesture") || cleaned.includes("brightness") || cleaned.includes("hand")) return qaPairs["tell me about gesture"];
    if (cleaned.includes("agri") || cleaned.includes("agriculture") || cleaned.includes("disease") || cleaned.includes("leaf")) return qaPairs["tell me about agrihelp"];
    if (cleaned.includes("hi") || cleaned.includes("hello") || cleaned.includes("hey")) return qaPairs.hello;
    return qaPairs.default;
  };

  const addChatBubble = (text, sender) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender === "user" ? "user-msg" : "bot-msg"}`;
    bubble.textContent = text;
    chatbotMessages.appendChild(bubble);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  const simulateBotTyping = (text) => {
    // Show a loading indicator bubble
    const typingBubble = document.createElement("div");
    typingBubble.className = "chat-bubble bot-msg typing";
    typingBubble.innerHTML = `<i class="fa-solid fa-ellipsis fa-bounce"></i>`;
    chatbotMessages.appendChild(typingBubble);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      addChatBubble(text, "bot");
    }, 900);
  };

  const handleUserMessage = (text) => {
    if (!text.trim()) return;
    addChatBubble(text, "user");
    const reply = getAIResponse(text);
    simulateBotTyping(reply);
  };

  // Toggle widget visibility
  if (chatbotTrigger && chatbotWindow) {
    chatbotTrigger.addEventListener("click", () => {
      chatbotWindow.classList.toggle("open");
    });
  }

  if (chatbotCloseBtn && chatbotWindow) {
    chatbotCloseBtn.addEventListener("click", () => {
      chatbotWindow.classList.remove("open");
    });
  }

  // Quick replies
  const quickQuestions = ["Technical Skills", "Key Projects", "Contact Info"];
  const populateQuickReplies = () => {
    if (!quickRepliesContainer) return;
    quickRepliesContainer.innerHTML = "";
    quickQuestions.forEach(q => {
      const pill = document.createElement("button");
      pill.className = "qr-pill";
      pill.textContent = q;
      pill.addEventListener("click", () => {
        handleUserMessage(q);
      });
      quickRepliesContainer.appendChild(pill);
    });
  };

  populateQuickReplies();

  if (chatbotInputArea) {
    chatbotInputArea.addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = chatbotInput.value;
      chatbotInput.value = "";
      handleUserMessage(txt);
    });
  }

  /* ==========================================================================
     10. Dynamic Header shrink scroll class
     ========================================================================== */
  const headerNav = document.querySelector(".glass-nav");
  if (headerNav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        headerNav.classList.add("scrolled");
      } else {
        headerNav.classList.remove("scrolled");
      }
    });
  }

  /* ==========================================================================
     11. Typewriter / Text Rotator for Hero Subtitle
     ========================================================================== */
  class TxtRotate {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    }
    tick() {
      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      let that = this;
      let delta = 150 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    }
  }

  const rotateElements = document.querySelectorAll('.txt-rotate');
  rotateElements.forEach(el => {
    const toRotate = el.getAttribute('data-rotate');
    const period = el.getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(el, JSON.parse(toRotate), period);
    }
  });

  /* ==========================================================================
     12. Vercel-Style Spotlight Mouse Hover Effect for Glass Cards
     ========================================================================== */
  const spotlightCards = document.querySelectorAll(".glass-card");
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  /* ==========================================================================
     13. Back to Top progress-ring circle scroll logic
     ========================================================================== */
  const backToTopBtn = document.getElementById("back-to-top");
  const progressCircle = document.querySelector(".progress-ring__circle");
  
  if (backToTopBtn && progressCircle) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
    
    const setProgress = (percent) => {
      const offset = circumference - (percent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    };
    
    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPercent = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
      
      setProgress(scrolledPercent);
      
      if (scrollPos > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });
    
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ==========================================================================
     14. Interactive Mouse Spotlight Tracker
     ========================================================================== */
  const mouseGlow = document.getElementById("mouse-glow");
  if (mouseGlow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseGlow.style.opacity = "1";
    });

    window.addEventListener("mouseleave", () => {
      mouseGlow.style.opacity = "0";
    });

    const updateGlowPosition = () => {
      // Lerp smoothing (linear interpolation)
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      mouseGlow.style.left = `${glowX}px`;
      mouseGlow.style.top = `${glowY}px`;
      requestAnimationFrame(updateGlowPosition);
    };
    updateGlowPosition();
  }

  /* ==========================================================================
     15. Scroll-Triggered Numeric Count-Up Stats Animation
     ========================================================================== */
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    const countUp = (el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      let current = 0;
      const duration = 1500; // 1.5s total animation duration
      const stepTime = Math.max(Math.floor(duration / (target / (target / 100))), 10); // optimized intervals
      
      const timer = setInterval(() => {
        current += Math.ceil(target / 80) || 1;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = current;
        }
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countUp(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }
});