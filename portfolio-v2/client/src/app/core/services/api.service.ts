import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HealthStatus {
  status: string;
  timestamp: string;
  database: string;
}

export interface GuestbookEntry {
  _id?: string;
  name: string;
  role: string;
  message: string;
  createdAt?: string | Date;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface AnalyticsSummary {
  visitorCount: number;
  resumeDownloadCount: number;
  contactCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(`${this.apiUrl}/health`);
  }

  submitContact(contact: ContactMessage): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, contact);
  }

  getGuestbook(): Observable<GuestbookEntry[]> {
    return this.http.get<GuestbookEntry[]>(`${this.apiUrl}/guestbook`);
  }

  submitGuestbookSignature(entry: GuestbookEntry): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guestbook`, entry);
  }

  getAnalytics(): Observable<AnalyticsSummary> {
    return this.http.get<AnalyticsSummary>(`${this.apiUrl}/analytics`);
  }

  recordVisit(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/analytics/visit`, {});
  }

  recordDownload(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/analytics/download`, {});
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/skills`);
  }

  getCertificates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/certificates`);
  }
}
