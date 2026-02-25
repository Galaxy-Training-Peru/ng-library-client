import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthorDetailViewModel } from './author-detail.view-model';

@Component({
  selector: 'lib-author-detail-page',
  imports: [
    DatePipe,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [AuthorDetailViewModel],
  templateUrl: './author-detail-page.html',
  styleUrl: './author-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDetailPage {
  protected readonly vm     = inject(AuthorDetailViewModel);
  private   readonly router = inject(Router);
  private   readonly route  = inject(ActivatedRoute);

  protected goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
