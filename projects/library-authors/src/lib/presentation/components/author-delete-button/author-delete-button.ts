import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmDeleteDialog } from '@eac-arch/ui-kit';
import { NotificationService } from '@eac-arch/ui-kit';
import { AUTHORS_PUBLIC_API } from '../../../application/public-api';

@Component({
  selector: 'lib-author-delete-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './author-delete-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDeleteButton {
  readonly authorId  = input.required<string>();
  readonly fullName  = input.required<string>();
  readonly iconOnly  = input(false);

  readonly deleted = output<void>();

  protected readonly deleting = signal(false);

  private readonly api           = inject(AUTHORS_PUBLIC_API);
  private readonly dialog        = inject(MatDialog);
  private readonly notifications = inject(NotificationService);

  protected async onClick(): Promise<void> {
    const confirmed = await firstValueFrom(
      this.dialog.open(ConfirmDeleteDialog, {
        data: { message: `Are you sure you want to delete "${this.fullName()}"? This action cannot be undone.` },
        autoFocus: false,
        restoreFocus: true,
      }).afterClosed()
    );
    if (!confirmed) return;

    this.deleting.set(true);
    try {
      await this.api.deleteAuthor({ authorId: this.authorId() });
      this.notifications.showSuccess(`Author "${this.fullName()}" deleted`);
      this.deleted.emit();
    } catch {
      this.notifications.showError(`Could not delete "${this.fullName()}"`);
    } finally {
      this.deleting.set(false);
    }
  }
}
