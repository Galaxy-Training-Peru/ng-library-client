import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidLiteraryGenreException } from '../exceptions/invalid-literary-genre.exception';

// Carries the id and display name of a literary genre catalog entry.
// Immutable. Equality is by id only.
export class LiteraryGenre extends ValueObject {
  readonly id: string;
  readonly name: string;

  private constructor(id: string, name: string) {
    InvalidLiteraryGenreException.validate(id, name);
    super();
    this.id = id.trim();
    this.name = name.trim();
    Object.freeze(this);
  }

  static create(id: string, name: string): LiteraryGenre {
    return new LiteraryGenre(id, name);
  }

  override toString(): string {
    return this.name;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.id.toLowerCase()];
  }
}
