import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signals for theme states
  themeMode = signal<'light' | 'dark'>('dark');
  accentTheme = signal<string>('cinematic-red');

  constructor() {
    // Load initial values from localStorage
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark';
    if (savedMode === 'light' || savedMode === 'dark') {
      this.themeMode.set(savedMode);
    }

    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      this.accentTheme.set(savedTheme);
    }

    // Reactively update DOM attributes whenever signals change
    effect(() => {
      const mode = this.themeMode();
      document.documentElement.setAttribute('data-theme-mode', mode);
      localStorage.setItem('theme-mode', mode);
    });

    effect(() => {
      const theme = this.accentTheme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('selected-theme', theme);
    });
  }

  setThemeMode(mode: 'light' | 'dark') {
    this.themeMode.set(mode);
  }

  toggleThemeMode() {
    this.themeMode.set(this.themeMode() === 'dark' ? 'light' : 'dark');
  }

  setAccentTheme(theme: string) {
    this.accentTheme.set(theme);
  }
}
