import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import type { AuthorDetailResolvedData } from '../../routes/resolvers/author-detail.resolver';
import { AuthorDeleteButton } from '../../components/author-delete-button/author-delete-button';

@Component({
  selector: 'lib-author-detail-page',
  imports: [
    DatePipe,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    AuthorDeleteButton,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './author-detail-page.html',
  styleUrl: './author-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDetailPage {
  protected readonly authorDetail = input<AuthorDetailResolvedData>();

  private readonly router = inject(Router);
  private readonly route  = inject(ActivatedRoute);

  protected goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  protected goEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
