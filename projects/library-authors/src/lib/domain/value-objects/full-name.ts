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
