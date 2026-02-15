import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidLiteraryGenreException } from '../exceptions/invalid-literary-genre.exception';

// Reference to a literary genre catalog entry.
// Carries both the id and display name.
// Immutable. Equality is by id only.
export class LiteraryGenreRef extends ValueObject {
  readonly id: string;
  readonly name: string;

  private constructor(id: string, name: string) {
    InvalidLiteraryGenreException.validate(id, name);
    super();
    this.id = id.trim();
    this.name = name.trim();
    Object.freeze(this);
  }

  static create(id: string, name: string): LiteraryGenreRef {
    return new LiteraryGenreRef(id, name);
  }

  override toString(): string {
    return this.name;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.id.toLowerCase()];
  }
}
