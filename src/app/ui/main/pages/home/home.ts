import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
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

  accessModule(module: string): void {
    this.router.navigate(['/library']);
  }
}
