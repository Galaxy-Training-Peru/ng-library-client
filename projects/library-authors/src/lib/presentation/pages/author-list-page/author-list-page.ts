import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, type Sort } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule, type PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import type { SortField } from '@eac-arch/shared-kernel';
import { AuthorListViewModel } from './author-list.view-model';

@Component({
  selector: 'lib-author-list-page',
  imports: [
    DatePipe,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  providers: [AuthorListViewModel],
  templateUrl: './author-list-page.html',
  styleUrl: './author-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListPage {
  protected readonly vm = inject(AuthorListViewModel);
  protected readonly displayedColumns: string[] = [
    'authorId', 'fullName', 'dateOfBirth', 'dateOfDeath', 'age', 'literaryGenre', 'isDeceased', 'actions',
  ];

  protected onSearchInput(value: string): void {
    this.vm.searchText.set(value);
    this.vm.currentPage.set(0);
  }

  protected onSearchClear(input: HTMLInputElement): void {
    input.value = '';
    input.focus();
    this.vm.searchText.set('');
    this.vm.currentPage.set(0);
  }

  protected onPageChange(event: PageEvent): void {
    this.vm.currentPage.set(event.pageIndex);
    this.vm.pageSize.set(event.pageSize);
  }

  protected onSortChange(event: Sort): void {
    const sorts: SortField[] = (!event.active || event.direction === '')
      ? []
      : [{ field: event.active, direction: event.direction }];
    this.vm.sortFields.set(sorts);
    this.vm.currentPage.set(0);
  }

  protected onLiteraryGenreChange(genreId: string | null): void {
    this.vm.selectedLiteraryGenreId.set(genreId ?? undefined);
    this.vm.currentPage.set(0);
  }
}
