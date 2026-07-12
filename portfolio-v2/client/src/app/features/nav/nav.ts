import { Component, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss'
})
export class Nav {
  themeService = inject(ThemeService);
  
  isDropdownOpen = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);
  scrollWidth = signal<string>('0%');

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if scrolled past 50px for header shrink
    this.isScrolled.set(window.scrollY > 50);

    // Update scroll progress bar width
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    this.scrollWidth.set(scrolled + '%');
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update(prev => !prev);
  }

  @HostListener('document:click', [])
  onDocumentClick() {
    this.isDropdownOpen.set(false);
  }

  toggleMenu() {
    this.isMenuOpen.update(prev => !prev);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  selectTheme(themeName: string) {
    this.themeService.setAccentTheme(themeName);
    this.isDropdownOpen.set(false);
  }

  toggleMode() {
    this.themeService.toggleThemeMode();
  }

  setThemeMode(mode: 'light' | 'dark') {
    this.themeService.setThemeMode(mode);
  }
}
