import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { LiteraryGenreDto } from 'library-integration';
import { AUTHORS_PUBLIC_API } from '../../../application/public-api';
import { AUTHORS_COMPUTATIONS_API } from '../../../application/computations-api';
import type { UpsertAuthorRequest, UpsertAuthorResponse } from '../../../application/public-api/contracts/author';
import type { AuthorEditResolvedData } from '../../routes/resolvers/author-edit.resolver';
import { fullNameValidator, lifeSpanValidator, uniqueAuthorNameValidator, FieldGroupErrorMatcher } from '../../validators';

@Injectable()
export class AuthorEditViewModel {

  private readonly api          = inject(AUTHORS_PUBLIC_API);
  private readonly computations = inject(AUTHORS_COMPUTATIONS_API);

  readonly genres = signal<readonly LiteraryGenreDto[]>([]);

  private initialSnapshot = '';

  private readonly authorId    = new FormControl({ value: '', disabled: true }, { nonNullable: true });
  private readonly firstName   = new FormControl('', { nonNullable: true, validators: Validators.required });
  private readonly lastName    = new FormControl('', { nonNullable: true, validators: Validators.required });
  private readonly dateOfBirth = new FormControl<Date | null>(null, Validators.required);
  private readonly dateOfDeath = new FormControl<Date | null>(null);

  private readonly fullName = new FormControl({ value: '', disabled: true }, { nonNullable: true });

  readonly nameGroup = new FormGroup(
    {
      firstName: this.firstName,
      lastName:  this.lastName,
    },
    {
      asyncValidators: [
        fullNameValidator(this.firstName, this.lastName),
        uniqueAuthorNameValidator(this.firstName, this.lastName, this.authorId),
      ],
      updateOn: 'blur',
    },
  );

  readonly lifeSpanGroup = new FormGroup(
    {
      dateOfBirth: this.dateOfBirth,
      dateOfDeath: this.dateOfDeath,
      age:         new FormControl({ value: 0, disabled: true }, { nonNullable: true }),
      isDeceased:  new FormControl(false, { nonNullable: true }),
    },
    {
      validators: [lifeSpanValidator(this.dateOfBirth, this.dateOfDeath)],
      updateOn: 'blur',
    },
  );

  readonly form = new FormGroup({
    authorId:        this.authorId,
    name:            this.nameGroup,
    lifeSpan:        this.lifeSpanGroup,
    fullName:        this.fullName,
    literaryGenreId: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  readonly fullNameNotUniqueMatcher: ErrorStateMatcher = {
    isErrorState: (_ctrl: FormControl | null, form: FormGroupDirective | NgForm | null): boolean => {
      const submitted = !!form?.submitted;
      return (this.nameGroup.touched || submitted) && this.nameGroup.hasError('fullNameNotUnique');
    },
  };
  readonly lifeSpanDateOfBirthMatcher    = new FieldGroupErrorMatcher('lifeSpanInvalid', 'dateOfBirth');
  readonly lifeSpanDateOfDeathMatcher    = new FieldGroupErrorMatcher('lifeSpanInvalid', 'dateOfDeath');

  constructor() {
    this.firstName.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.syncFullName());
    this.lastName.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.syncFullName());
    this.dateOfBirth.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.syncLifeSpanDerived());
    this.dateOfDeath.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.syncLifeSpanDerived());
  }

  private async syncFullName(): Promise<void> {
    const result = await this.computations.buildFullName({ firstName: this.firstName.value, lastName: this.lastName.value });
    this.fullName.setValue(result.fullName ?? '', { emitEvent: false });
  }

  private async syncLifeSpanDerived(): Promise<void> {
    const { dateOfBirth, dateOfDeath, isDeceased, age } = this.lifeSpanGroup.controls;
    const dob = dateOfBirth.value;
    const dod = dateOfDeath.value;

    if (dob) {
      const [deceased, ageResult] = await Promise.all([
        this.computations.isDeceased({ dateOfBirth: dob, dateOfDeath: dod }),
        this.computations.calculateAge({ dateOfBirth: dob, dateOfDeath: dod }),
      ]);
      isDeceased.setValue(deceased.isDeceased ?? false, { emitEvent: false });
      age.setValue(ageResult.age ?? 0, { emitEvent: false });
    } else {
      isDeceased.setValue(false, { emitEvent: false });
      age.setValue(0, { emitEvent: false });
    }
  }

  private snapshot(): string {
    const { firstName, lastName } = this.nameGroup.getRawValue();
    const { dateOfBirth, dateOfDeath } = this.lifeSpanGroup.getRawValue();
    const literaryGenreId = this.form.controls['literaryGenreId'].value;
    return JSON.stringify({
      firstName,
      lastName,
      dateOfBirth: dateOfBirth?.toISOString() ?? null,
      dateOfDeath: dateOfDeath?.toISOString() ?? null,
      literaryGenreId,
    });
  }

  hasChanges(): boolean {
    return this.snapshot() !== this.initialSnapshot;
  }

  async init({ author, genres }: AuthorEditResolvedData): Promise<void> {
    if (!author) return;
    this.genres.set(genres);
    this.form.patchValue({
      authorId: author.authorId,
      fullName:  author.fullName,
      name: {
        firstName: author.firstName,
        lastName:  author.lastName,
      },
      lifeSpan: {
        dateOfBirth: new Date(author.dateOfBirth),
        dateOfDeath: author.dateOfDeath ? new Date(author.dateOfDeath) : null,
        age:         author.age,
        isDeceased:  author.isDeceased,
      },
      literaryGenreId: author.literaryGenreId,
    }, { emitEvent: false });
    this.initialSnapshot = this.snapshot();
  }

  async save(): Promise<UpsertAuthorResponse> {
    const toDateStr = (d: Date | null) => d ? d.toISOString().substring(0, 10) : null;
    const { firstName, lastName } = this.nameGroup.getRawValue();
    const { dateOfBirth, dateOfDeath, isDeceased } = this.lifeSpanGroup.getRawValue();

    const request: UpsertAuthorRequest = {
      authorId:        this.authorId.value,
      firstName,
      lastName,
      dateOfBirth:     toDateStr(dateOfBirth)!,
      dateOfDeath:     isDeceased ? toDateStr(dateOfDeath) : null,
      literaryGenreId: this.form.controls['literaryGenreId'].value,
    };

    const response = await this.api.upsertAuthor(request);
    this.initialSnapshot = this.snapshot();
    return response;
  }
}
