import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { SecurityService } from '@eac-arch/infrastructure-security';
import { ThemeToggle } from '@shared/components/theme-toggle';
import { ConfigViewerButton, TokenInfoButton } from '@shared/components';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatChipsModule,
    MatDividerModule,
    ThemeToggle,
    ConfigViewerButton,
    TokenInfoButton,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly security = inject(SecurityService);
  private readonly router = inject(Router);

  // -- signal() --
  protected readonly counter = signal(0);

  // -- computed() --
  protected readonly price = signal(10);
  protected readonly qty = signal(0);
  protected readonly total = computed(() => {
    if (this.qty() === 0) return 0;
    return this.price() * this.qty();
  });

  // -- linkedSignal() --
  protected readonly resetFlag = signal(false);
  protected readonly score = linkedSignal<number>(() => {
    if (this.resetFlag()) return 0;
    return 10;
  });

  // -- effect() --
  protected readonly effectCounter = signal(0);
  protected readonly effectLog = signal<string[]>([]);

  constructor() {
    effect(() => {
      const value = this.effectCounter();
      this.effectLog.update(log => [...log, `Counter changed to: ${value}`]);
    });
  }

  accessModule(module: string): void {
    this.router.navigate(['/library']);
  }

  // -- signal actions --
  counterSet(value: number): void {
    this.counter.set(value);
  }

  counterIncrement(): void {
    this.counter.update(c => c + 1);
  }

  counterDecrement(): void {
    this.counter.update(c => c - 1);
  }

  counterReset(): void {
    this.counter.set(0);
  }

  // -- computed actions --
  setPrice(value: number): void {
    this.price.set(value);
  }

  incrementQty(): void {
    this.qty.update(q => q + 1);
  }

  decrementQty(): void {
    this.qty.update(q => Math.max(0, q - 1));
  }

  resetComputed(): void {
    this.price.set(10);
    this.qty.set(0);
  }

  // -- linkedSignal actions --
  toggleReset(): void {
    this.resetFlag.update(v => !v);
  }

  setScore(value: number): void {
    this.score.set(value);
  }

  incrementScore(): void {
    this.score.update(s => s + 10);
  }

  // -- effect actions --
  incrementEffectCounter(): void {
    this.effectCounter.update(c => c + 1);
  }

  resetEffectCounter(): void {
    this.effectCounter.set(0);
  }

  clearEffectLog(): void {
    this.effectLog.set([]);
  }
}
