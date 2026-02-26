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
import type { AuthorModel } from '../../../application/models';

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
  providers: [AuthorEditViewModel],
  templateUrl: './author-edit-page.html',
  styleUrl:    './author-edit-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorEditPage implements OnInit {
  protected readonly author = input<AuthorModel | null>();

  protected readonly vm     = inject(AuthorEditViewModel);
  private   readonly router = inject(Router);
  private   readonly route  = inject(ActivatedRoute);

  ngOnInit(): void {
    const author = this.author();
    if (author) this.vm.init(author);
  }

  protected goBack(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  protected save(): void {
    if (this.vm.form.invalid) return;
    // TODO: call vm.save() when UpdateAuthor use-case is ready
  }
}

