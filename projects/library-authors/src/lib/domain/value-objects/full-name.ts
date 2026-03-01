import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidFullNameException } from '../exceptions/invalid-full-name.exception';

// Represents an author's full name.
// Immutable. Equality is case-insensitive.
export class FullName extends ValueObject {
  readonly firstName: string;
  readonly lastName: string;

  private constructor(firstName: string, lastName: string) {
    InvalidFullNameException.validate(firstName, lastName);
    super();
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    Object.freeze(this);
  }

  static create(firstName: string, lastName: string): FullName {
    return new FullName(firstName, lastName);
  }

  static validate(firstName: string, lastName: string): { firstName: string[]; lastName: string[] } | null {
    const errors = InvalidFullNameException.collect(firstName, lastName);
    if (!errors.length) return null;
    return {
      firstName: errors.filter(e => e.field === 'firstName').map(e => e.message),
      lastName:  errors.filter(e => e.field === 'lastName').map(e => e.message),
    };
  }

  static computeFullName(firstName: string, lastName: string): string | null {
    if (InvalidFullNameException.collect(firstName, lastName).length) return null;
    return new FullName(firstName, lastName).fullName;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  override toString(): string {
    return this.fullName;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.firstName.toLowerCase(), this.lastName.toLowerCase()];
  }
}
