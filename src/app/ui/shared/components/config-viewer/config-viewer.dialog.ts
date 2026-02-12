import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigService } from '@eac-arch/infrastructure-config';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-config-viewer-dialog',
  imports: [
    JsonPipe,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './config-viewer.dialog.html',
  styleUrl: './config-viewer.dialog.scss',
})
export class ConfigViewerDialog {
  private readonly configService = inject(ConfigService);

  readonly env = environment;
  readonly config = this.configService.config;

  get flatEntries(): { key: string; value: unknown }[] {
    const cfg = this.config();
    if (!cfg) return [];
    return Object.entries(cfg).map(([key, value]) => ({ key, value }));
  }

  isObject(value: unknown): boolean {
    return value !== null && typeof value === 'object';
  }
}
