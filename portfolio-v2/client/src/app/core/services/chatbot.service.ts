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
    projects: "Tharun has built four main projects: 1. AI Resume Intelligence System, 2. TerraSight AI (Plant Monitoring System), 3. Brightness Control Using Hand Gestures, and 4. AgriHelp-AI. Ask me about any of these!",
    skills: "Tharun is proficient in Python, JavaScript, SQL, C (Basics), Flask, RESTful APIs, MySQL, Git/GitHub, and AI-assisted development tools like Prompt Engineering.",
    resume: "You can download Tharun's resume from the actions in the Hero section or the dedicated Resume section. It details his qualifications, B.Tech grades, and course credentials.",
    contact: "You can reach out to Tharun via email at tharunummadala@gmail.com, or check out his social links: GitHub (@uTharun23) and LinkedIn (Tharun Ummadala).",
    "tell me about resume": "The AI Resume Intelligence System is built in Python & Flask. It parses PDF/DOCX resumes, maps skills to job listings, computes percentage match scores, and recommends enhancements. Super practical!",
    "tell me about plant": "TerraSight AI is a computer vision application that processes image streams of crops. It helps detect plant leaves pathogens and stress indices using custom Python image algorithms.",
    "tell me about gesture": "This OpenCV project captures live camera feeds to identify hand gestures. It allows users to control screen brightness without buttons by computing hand landmark coordinate distances.",
    "tell me about agrihelp": "AgriHelp-AI is an AI-powered agricultural portal leveraging machine learning models to detect crop diseases from leaf scans, offer dynamic treatments, and guide soil parameters. Highly useful for smart farming!",
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
    if (cleaned.includes('resume intel') || cleaned.includes('resume analysis') || cleaned.includes('intelligence')) return this.qaPairs['tell me about resume'];
    if (cleaned.includes('terra') || cleaned.includes('plant') || cleaned.includes('crop')) return this.qaPairs['tell me about plant'];
    if (cleaned.includes('gesture') || cleaned.includes('brightness') || cleaned.includes('hand')) return this.qaPairs['tell me about gesture'];
    if (cleaned.includes('agri') || cleaned.includes('agriculture') || cleaned.includes('disease') || cleaned.includes('leaf')) return this.qaPairs['tell me about agrihelp'];
    if (cleaned.includes('hi') || cleaned.includes('hello') || cleaned.includes('hey')) return this.qaPairs['hello'];
    return this.qaPairs['default'];
  }
}
