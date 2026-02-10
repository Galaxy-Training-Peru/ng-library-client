import { effect, inject, Injectable, signal, DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  theme = signal<'default' | 'orange' | 'purple'>('default');
  isDark = signal(false);

  constructor() {
    effect(() => {
      const body = this.document.body;
      body.className = `${this.theme()}-theme${this.isDark() ? ' dark-theme' : ''}`;
    });
  }

  setTheme(theme: 'default' | 'orange' | 'purple') {
    this.theme.set(theme);
  }

  toggleDark() {
    this.isDark.update(v => !v);
  }
}
