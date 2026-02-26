import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidPaperTitleException } from '../exceptions/invalid-paper-title.exception';

// Represents the title of a paper written by an author.
// Max 200 characters. Immutable. Equality is case-insensitive.
export class PaperTitle extends ValueObject {
  readonly value: string;

  private constructor(value: string) {
    InvalidPaperTitleException.validate(value);
    super();
    this.value = value.trim();
    Object.freeze(this);
  }

  static create(value: string): PaperTitle {
    return new PaperTitle(value);
  }

  override toString(): string {
    return this.value;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.value.toLowerCase()];
  }
}
