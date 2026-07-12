import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
  isFading?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private nextId = 0;

  show(message: string, type: 'success' | 'error' = 'success') {
    const id = this.nextId++;
    const newToast: ToastMessage = { id, message, type };
    
    this.toasts.update(prev => [...prev, newToast]);

    // Start fade out before removing
    setTimeout(() => {
      this.toasts.update(prev =>
        prev.map(t => t.id === id ? { ...t, isFading: true } : t)
      );
    }, 3700);

    // Remove toast after 4 seconds
    setTimeout(() => {
      this.toasts.update(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }
}
