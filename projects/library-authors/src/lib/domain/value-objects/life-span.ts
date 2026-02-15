import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidLifeSpanException } from '../exceptions/invalid-life-span.exception';

// Represents an author's life span (birth and optional death).
// Provides computed age and deceased status.
// Immutable.
export class LifeSpan extends ValueObject {
  readonly dateOfBirth: Date;
  readonly dateOfDeath: Date | null;

  private constructor(dateOfBirth: Date, dateOfDeath?: Date | null) {
    InvalidLifeSpanException.validate(dateOfBirth, dateOfDeath);
    super();
    this.dateOfBirth = dateOfBirth;
    this.dateOfDeath = dateOfDeath ?? null;
    Object.freeze(this);
  }

  static create(dateOfBirth: Date, dateOfDeath?: Date | null): LifeSpan {
    return new LifeSpan(dateOfBirth, dateOfDeath);
  }

  get isDeceased(): boolean {
    return this.dateOfDeath !== null;
  }

  get age(): number {
    const reference = this.dateOfDeath ?? new Date();
    return this.getAgeAt(reference);
  }

  getAgeAt(date: Date): number {
    let years = date.getUTCFullYear() - this.dateOfBirth.getUTCFullYear();
    const monthDiff = date.getUTCMonth() - this.dateOfBirth.getUTCMonth();
    const dayDiff = date.getUTCDate() - this.dateOfBirth.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) years--;
    return years;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.dateOfBirth.getTime(), this.dateOfDeath?.getTime() ?? null];
  }
}
