import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, GuestbookEntry } from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';

declare var confetti: any;

@Component({
  selector: 'app-guestbook',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './guestbook.html',
  styleUrl: './guestbook.scss'
})
export class Guestbook implements OnInit {
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  guestbookForm!: FormGroup;
  signatures = signal<GuestbookEntry[]>([]);
  visitorCount = signal<number>(0);

  ngOnInit() {
    this.initForm();
    this.loadSignatures();
  }

  private initForm() {
    this.guestbookForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      role: [''],
      message: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  private loadSignatures() {
    this.apiService.getGuestbook().subscribe({
      next: (data) => {
        this.signatures.set(data);
        this.visitorCount.set(data.length);
      },
      error: (err) => {
        console.error('Failed to load guestbook entries:', err);
      }
    });
  }

  onSubmit() {
    if (this.guestbookForm.invalid) {
      this.toastService.show('Please fill in the required fields correctly.', 'error');
      return;
    }

    const { name, role, message } = this.guestbookForm.value;
    const newEntry: GuestbookEntry = {
      name: name.trim(),
      role: role.trim() || 'Visitor',
      message: message.trim()
    };

    this.apiService.submitGuestbookSignature(newEntry).subscribe({
      next: (res) => {
        // Prepend the new signature dynamically
        this.signatures.update(prev => [res.data, ...prev]);
        this.visitorCount.update(count => count + 1);
        this.guestbookForm.reset();
        
        // Show success notification
        this.toastService.show('Thank you for signing the guestbook!', 'success');

        // Confetti celebration trigger
        this.triggerConfetti();
      },
      error: (err) => {
        console.error('Failed to save guestbook signature:', err);
        const errorMsg = err.error?.error || 'Failed to sign the guestbook. Please try again.';
        this.toastService.show(errorMsg, 'error');
      }
    });
  }

  private triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#14b8a6', '#8b5cf6']
      });
    } else {
      // Dynamic fallback load if not globally loaded
      console.log('Confetti signature success!');
    }
  }

  // Format date helper
  formatTime(dateInput?: string | Date): string {
    if (!dateInput) return 'Just now';
    const date = new Date(dateInput);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  }
}
