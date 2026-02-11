import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeToggle } from '@shared/components/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ThemeToggle
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isHandset = input<boolean>(false);
  drawer = input<MatSidenav>();
}
