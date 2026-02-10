import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeToggle } from '@shared/components/theme-toggle';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    ThemeToggle
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
