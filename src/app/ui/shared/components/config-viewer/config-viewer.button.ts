import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ConfigViewerDialog } from './config-viewer.dialog';

@Component({
  selector: 'app-config-viewer',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button type="button" mat-icon-button (click)="open()" aria-label="View configuration">
      <mat-icon>settings</mat-icon>
    </button>
  `,
})
export class ConfigViewerButton {
  private readonly dialog = inject(MatDialog);

  open(): void {
    this.dialog.open(ConfigViewerDialog, {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '80vh',
    });
  }
}
