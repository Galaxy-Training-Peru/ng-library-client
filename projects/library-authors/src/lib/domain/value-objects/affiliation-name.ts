import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidAffiliationNameException } from '../exceptions/invalid-affiliation-name.exception';

// Represents the name of an institution or organization an author was affiliated with.
// Immutable. Equality is case-insensitive.
export class AffiliationName extends ValueObject {
  readonly value: string;

  private constructor(value: string) {
    InvalidAffiliationNameException.validate(value);
    super();
    this.value = value.trim();
    Object.freeze(this);
  }

  static create(value: string): AffiliationName {
    return new AffiliationName(value);
  }

  override toString(): string {
    return this.value;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.value.toLowerCase()];
  }
}
