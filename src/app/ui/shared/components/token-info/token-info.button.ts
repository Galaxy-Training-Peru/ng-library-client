import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TokenInfoDialog } from './token-info.dialog';

@Component({
  selector: 'app-token-info',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button type="button" mat-icon-button (click)="open()" aria-label="View token info">
      <mat-icon>vpn_key</mat-icon>
    </button>
  `,
})
export class TokenInfoButton {
  private readonly dialog = inject(MatDialog);

  open(): void {
    this.dialog.open(TokenInfoDialog, {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '80vh',
    });
  }
}
