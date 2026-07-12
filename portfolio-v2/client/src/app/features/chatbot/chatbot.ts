import { Component, signal, inject, ViewChild, ElementRef, AfterViewChecked, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss'
})
export class Chatbot implements AfterViewChecked {
  chatbotService = inject(ChatbotService);

  isOpen = signal<boolean>(false);
  userInput = signal<string>('');
  quickReplies = ['Technical Skills', 'Key Projects', 'Contact Info'];

  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    // Scroll to bottom automatically whenever a new message is added
    effect(() => {
      this.chatbotService.messages();
      this.scrollToBottom();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen.update(prev => !prev);
  }

  closeChat() {
    this.isOpen.set(false);
  }

  onSubmit() {
    const text = this.userInput().trim();
    if (!text) return;

    this.chatbotService.sendMessage(text);
    this.userInput.set('');
  }

  selectQuickReply(reply: string) {
    this.chatbotService.sendMessage(reply);
  }

  private scrollToBottom(): void {
    try {
      if (this.chatMessagesContainer) {
        const el = this.chatMessagesContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    } catch (err) {
      // Ignore scroll errors
    }
  }
}
