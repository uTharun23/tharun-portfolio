import { Component, signal, inject, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  contactForm!: FormGroup;
  isSending = signal<boolean>(false);
  
  // Parallax title offset signal
  parallaxY = signal<string>('translateY(-40px) scaleY(1.5)');

  @ViewChild('contactSection') contactSection!: ElementRef<HTMLElement>;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      permission: [false, [Validators.requiredTrue]]
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.contactSection) return;

    const section = this.contactSection.nativeElement;
    const rect = section.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    // Shift text if contact section is visible in viewport
    if (rect.top < viewHeight && rect.bottom > 0) {
      const scrollRange = viewHeight + rect.height;
      const scrolledDistance = viewHeight - rect.top;
      const progress = scrolledDistance / scrollRange;
      
      const yOffset = (progress * 80) - 40; // translate y from -40px to +40px
      this.parallaxY.set(`translateY(${yOffset}px) scaleY(1.5)`);
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.toastService.show('Please complete all form fields correctly.', 'error');
      return;
    }

    this.isSending.set(true);
    const { name, email, message } = this.contactForm.value;

    this.apiService.submitContact({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    }).subscribe({
      next: () => {
        this.isSending.set(false);
        this.toastService.show('Message sent successfully! Tharun will respond shortly.', 'success');
        this.contactForm.reset({
          name: '',
          email: '',
          message: '',
          permission: false
        });
      },
      error: (err) => {
        console.error('Failed to submit contact message:', err);
        this.isSending.set(false);
        const errorMsg = err.error?.error || 'Failed to send message. Please try again.';
        this.toastService.show(errorMsg, 'error');
      }
    });
  }
}
