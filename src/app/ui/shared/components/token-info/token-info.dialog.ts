import { Component, computed, inject } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { SecurityService } from '@eac-arch/infrastructure-security';

@Component({
  selector: 'app-token-info-dialog',
  imports: [
    DatePipe,
    JsonPipe,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './token-info.dialog.html',
  styleUrl: './token-info.dialog.scss',
})
export class TokenInfoDialog {
  private readonly security = inject(SecurityService);

  readonly isAuthenticated = this.security.isLoggedIn;
  readonly profile = this.security.profile;
  readonly roles = this.security.rolesSignal;
  readonly scopes = this.security.scopesSignal;
  readonly token = () => this.security.token();

  readonly payload = computed<Record<string, unknown> | null>(() => {
    const t = this.token();
    if (!t) return null;
    const parts = t.split('.');
    if (parts.length < 2) return null;
    try {
      return JSON.parse(atob(this.b64urlToB64(parts[1])));
    } catch {
      return null;
    }
  });

  readonly expDate = computed<Date | null>(() => {
    const exp = this.payload()?.['exp'];
    return typeof exp === 'number' ? new Date(exp * 1000) : null;
  });

  readonly isExpired = computed<boolean>(() => {
    const d = this.expDate();
    return d ? d.getTime() < Date.now() : false;
  });

  logout(): void {
    this.security.logout();
  }

  private b64urlToB64(s: string): string {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    const pad = s.length % 4;
    return pad ? s + '='.repeat(4 - pad) : s;
  }
}
