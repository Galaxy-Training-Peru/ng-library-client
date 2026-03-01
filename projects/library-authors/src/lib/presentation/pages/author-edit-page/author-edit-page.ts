import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthorEditViewModel } from './author-edit.view-model';
import type { AuthorEditResolvedData } from '../../routes/resolvers/author-edit.resolver';
import type { UnsavedChanges } from '@eac-arch/ui-kit';
import { NotificationService } from '@eac-arch/ui-kit';

@Component({
  selector: 'lib-author-edit-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [
    AuthorEditViewModel,
  ],
  templateUrl: './author-edit-page.html',
  styleUrl:    './author-edit-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorEditPage implements OnInit, UnsavedChanges {
  protected readonly authorEdit = input<AuthorEditResolvedData>();

  protected readonly vm           = inject(AuthorEditViewModel);
  private   readonly router        = inject(Router);
  private   readonly route         = inject(ActivatedRoute);
  private   readonly notifications = inject(NotificationService);

  async ngOnInit(): Promise<void> {
    const data = this.authorEdit();
    if (data) await this.vm.init(data);
  }

  hasUnsavedChanges(): boolean {
    return this.vm.hasChanges();
  }

  protected goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  protected async save(): Promise<void> {
    if (this.vm.form.invalid) return;
    const wasNew = this.vm.isNew();
    try {
      const { authorId } = await this.vm.save();
      this.notifications.showSuccess(wasNew ? 'Author created successfully' : 'Author saved successfully');
      if (wasNew) {
        await this.router.navigate(['..', authorId], { relativeTo: this.route, replaceUrl: true });
      } else {
        this.goBack();
      }
    } catch {
      this.notifications.showError('Could not save the author');
    }
  }
}

