import { Component, signal, inject, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ToastService } from '../../core/services/toast.service';
import { environment } from '../../../environments/environment';

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

    const accessKey = environment.web3FormsKey;
    const isPlaceholderKey = !accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY';

    if (isPlaceholderKey) {
      // Fallback local mode: save to database only
      console.warn('WARN: Web3Forms access key is not configured. Saving to local database instead.');
      this.apiService.submitContact({
        name: name.trim(),
        email: email.trim(),
        message: message.trim()
      }).subscribe({
        next: () => {
          this.isSending.set(false);
          this.toastService.show('Message saved successfully in DB! (Web3Forms Key not configured)', 'success');
          this.contactForm.reset({
            name: '',
            email: '',
            message: '',
            permission: false
          });
        },
        error: (err) => {
          this.isSending.set(false);
          this.toastService.show('Failed to save message to database.', 'error');
        }
      });
      return;
    }

    // Web3Forms submission payload
    const web3Payload = {
      access_key: accessKey,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      subject: `New Recruiter Message from ${name.trim()}`,
      from_name: 'Tharun Ummadala Portfolio'
    };

    this.apiService.submitContactWeb3Forms(web3Payload).subscribe({
      next: (response) => {
        if (response.success) {
          // Successfully sent via Web3Forms! Now save to DB in background for analytics/logs
          this.apiService.submitContact({
            name: name.trim(),
            email: email.trim(),
            message: message.trim()
          }).subscribe({
            next: () => console.log('Message logged in database.'),
            error: (dbErr) => console.error('Failed to log message in database:', dbErr)
          });

          this.isSending.set(false);
          this.toastService.show('Message sent successfully! Tharun will respond shortly.', 'success');
          this.contactForm.reset({
            name: '',
            email: '',
            message: '',
            permission: false
          });
        } else {
          this.isSending.set(false);
          this.toastService.show(response.message || 'Failed to send message via Web3Forms.', 'error');
        }
      },
      error: (err) => {
        console.error('Web3Forms submission failed:', err);
        this.isSending.set(false);
        this.toastService.show('Failed to send message. Please check your network or Web3Forms Key.', 'error');
      }
    });
  }
}
