import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LITERARY_GENRE_AGENT } from 'library-integration';
import type { LiteraryGenreDto } from 'library-integration';
import type { AuthorModel } from '../../../application/models';

@Injectable()
export class AuthorEditViewModel {

  private readonly literaryGenreAgent = inject(LITERARY_GENRE_AGENT);

  readonly genres   = signal<readonly LiteraryGenreDto[]>([]);

  readonly form = new FormGroup({
    authorId:        new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    firstName:       new FormControl('',   { nonNullable: true, validators: Validators.required }),
    lastName:        new FormControl('',   { nonNullable: true, validators: Validators.required }),
    fullName:        new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    dateOfBirth:     new FormControl('',   { nonNullable: true, validators: Validators.required }),
    dateOfDeath:     new FormControl<string | null>(null),
    literaryGenreId: new FormControl('',   { nonNullable: true, validators: Validators.required }),
    age:             new FormControl({ value: 0, disabled: true }, { nonNullable: true }),
    isDeceased:      new FormControl(false, { nonNullable: true }),
  });

  constructor() {
    void this.loadGenres();
  }

  init(author: AuthorModel): void {
    this.form.patchValue({
      authorId:        author.authorId,
      firstName:       author.firstName,
      lastName:        author.lastName,
      fullName:        author.fullName,
      dateOfBirth:     author.dateOfBirth,
      dateOfDeath:     author.dateOfDeath ?? null,
      literaryGenreId: author.literaryGenreId,
      age:             author.age,
      isDeceased:      author.isDeceased,
    });
  }

  private async loadGenres(): Promise<void> {
    try {
      const response = await this.literaryGenreAgent.getAllLiteraryGenres({ pageNumber: 1, pageSize: 100 });
      this.genres.set(response.items);
    } catch {
      this.genres.set([]);
    }
  }

  // TODO: implement save(command) when UpdateAuthor use-case is ready
}
