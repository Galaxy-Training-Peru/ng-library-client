import { Component, inject, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { SecurityService } from '@eac-arch/infrastructure-security';
import { ThemeToggle } from '@shared/components/theme-toggle';
import { ConfigViewerButton, TokenInfoButton } from '@shared/components';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ThemeToggle,
    ConfigViewerButton,
    TokenInfoButton,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly security = inject(SecurityService);
  isHandset = input<boolean>(false);
  drawer = input<MatSidenav>();
}
