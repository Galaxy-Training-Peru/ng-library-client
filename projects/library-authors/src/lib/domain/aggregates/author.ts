import { BaseAggregateRoot } from '@eac-arch/shared-kernel';
import { FullName } from '../value-objects/full-name';
import { LifeSpan } from '../value-objects/life-span';
import { LiteraryGenreRef } from '../value-objects/literary-genre-ref';

// Author aggregate root.
// Encapsulates identity, name, life span and literary genre.
// All mutations go through explicit methods that enforce invariants.
export class Author extends BaseAggregateRoot<string> {
  readonly id: string;

  private _name: FullName;
  private _lifeSpan: LifeSpan;
  private _genre: LiteraryGenreRef;

  private constructor(
    id: string,
    name: FullName,
    lifeSpan: LifeSpan,
    genre: LiteraryGenreRef,
  ) {
    super();
    this.id = id;
    this._name = name;
    this._lifeSpan = lifeSpan;
    this._genre = genre;
  }

  // -- Accessors --

  get authorId(): string { return this.id; }
  get name(): FullName { return this._name; }
  get lifeSpan(): LifeSpan { return this._lifeSpan; }
  get genre(): LiteraryGenreRef { return this._genre; }

  // -- Factory --

  static create(
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    literaryGenreId: string,
    literaryGenreName: string,
    dateOfDeath?: Date | null,
  ): Author {
    return new Author(
      id,
      FullName.create(firstName, lastName),
      LifeSpan.create(dateOfBirth, dateOfDeath),
      LiteraryGenreRef.create(literaryGenreId, literaryGenreName),
    );
  }

  // -- Mutations --

  updateProfile(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    literaryGenreId: string,
    literaryGenreName: string,
    dateOfDeath?: Date | null,
  ): void {
    this._name = FullName.create(firstName, lastName);
    this._lifeSpan = LifeSpan.create(dateOfBirth, dateOfDeath);
    this._genre = LiteraryGenreRef.create(literaryGenreId, literaryGenreName);
  }

  updateName(firstName: string, lastName: string): void {
    this._name = FullName.create(firstName, lastName);
  }

  updateLifeSpan(dateOfBirth: Date, dateOfDeath?: Date | null): void {
    this._lifeSpan = LifeSpan.create(dateOfBirth, dateOfDeath);
  }

  changeGenre(id: string, name: string): void {
    this._genre = LiteraryGenreRef.create(id, name);
  }

  // -- Queries --

  canBeDeleted(): boolean {
    return true;
  }
}
