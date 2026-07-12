import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  isTyping?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  messages = signal<ChatMessage[]>([
    { text: "Hi there! I am Tharun's AI assistant. Ask me anything about my projects, skills, or studies!", sender: 'bot' }
  ]);
  isTyping = signal<boolean>(false);

  private qaPairs: { [key: string]: string } = {
    hello: "Hi there! I'm Tharun's AI. How can I assist you with his portfolio today?",
    projects: "Tharun has built three main projects: 1. Full-Stack Developer Portfolio, 2. AI Resume Intelligence System, and 3. AgriHelp-AI: Crop Disease & Soil Suitability Portal. Ask me about any of these!",
    skills: "Tharun is proficient in Angular 18, TypeScript, Node.js, Express, MongoDB, Python, Flask, MySQL, Git/GitHub, Vercel, and AI-assisted development tools.",
    resume: "You can download Tharun's resume from the actions in the Hero section or the dedicated Resume section. It details his qualifications, B.Tech grades, and course credentials.",
    contact: "You can reach out to Tharun via email at tharunummadala@gmail.com, or check out his social links: GitHub (@uTharun23) and LinkedIn (Tharun Ummadala).",
    "tell me about portfolio": "This portfolio website is a full-stack Angular 18 application backed by a serverless Node.js/Express API. It features real-time visitor analytics, a guestbook with auto-recovery, and this interactive AI chatbot! Hosted on Vercel.",
    "tell me about resume": "The AI Resume Intelligence System is built in Python & Flask. It parses PDF/DOCX resumes, maps skills to job listings, computes percentage match scores, and recommends enhancements. Super practical!",
    "tell me about plant": "TerraSight AI was a computer vision project designed for crop pathogen checks. I consolidated it to focus on my main 3 projects, but the source code is still fully available on my GitHub!",
    "tell me about gesture": "The hand gesture brightness controller was an OpenCV/MediaPipe desktop automation utility. I consolidated it to focus on my main 3 projects, but you can find it on my GitHub!",
    "tell me about agrihelp": "AgriHelp-AI is an ML-powered agricultural portal classifying crop leaf diseases and pathogen strains from uploaded scans, and supplying precise treatment guides and soil guidelines.",
    default: "I'm a lightweight assistant. Feel free to ask about 'skills', 'projects', 'resume', or 'contact'! I'll do my best to help you."
  };

  sendMessage(text: string) {
    if (!text.trim()) return;

    // Add user message
    this.messages.update(prev => [...prev, { text, sender: 'user' }]);

    // Trigger typing simulation
    this.isTyping.set(true);

    const response = this.getAIResponse(text);

    setTimeout(() => {
      this.isTyping.set(false);
      this.messages.update(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 900);
  }

  private getAIResponse(userMsg: string): string {
    const cleaned = userMsg.toLowerCase().trim();
    if (cleaned.includes('skill') || cleaned.includes('lang') || cleaned.includes('techno')) return this.qaPairs['skills'];
    if (cleaned.includes('project') || cleaned.includes('work')) return this.qaPairs['projects'];
    if (cleaned.includes('resume') || cleaned.includes('cv') || cleaned.includes('pdf')) return this.qaPairs['resume'];
    if (cleaned.includes('contact') || cleaned.includes('mail') || cleaned.includes('hire') || cleaned.includes('social')) return this.qaPairs['contact'];
    if (cleaned.includes('portfolio') || cleaned.includes('this site') || cleaned.includes('website') || cleaned.includes('this app')) return this.qaPairs['tell me about portfolio'];
    if (cleaned.includes('resume intel') || cleaned.includes('resume analysis') || cleaned.includes('intelligence')) return this.qaPairs['tell me about resume'];
    if (cleaned.includes('terra') || cleaned.includes('plant') || cleaned.includes('crop')) return this.qaPairs['tell me about plant'];
    if (cleaned.includes('gesture') || cleaned.includes('brightness') || cleaned.includes('hand')) return this.qaPairs['tell me about gesture'];
    if (cleaned.includes('agri') || cleaned.includes('agriculture') || cleaned.includes('disease') || cleaned.includes('leaf')) return this.qaPairs['tell me about agrihelp'];
    if (cleaned.includes('hi') || cleaned.includes('hello') || cleaned.includes('hey')) return this.qaPairs['hello'];
    return this.qaPairs['default'];
  }
}
