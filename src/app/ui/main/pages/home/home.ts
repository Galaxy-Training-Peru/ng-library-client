import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeToggle } from '@shared/components/theme-toggle';
import { ConfigViewerButton } from "@shared/components";

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    ThemeToggle,
    ConfigViewerButton
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router = inject(Router);

  accessModule(module: string) {
    this.router.navigate(['/library']);
  }
}
