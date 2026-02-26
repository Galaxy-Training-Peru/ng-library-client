import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidAwardTitleException } from '../exceptions/invalid-award-title.exception';

// Represents the title of an award received by an author.
// Max 200 characters. Immutable. Equality is case-insensitive.
export class AwardTitle extends ValueObject {
  readonly value: string;

  private constructor(value: string) {
    InvalidAwardTitleException.validate(value);
    super();
    this.value = value.trim();
    Object.freeze(this);
  }

  static create(value: string): AwardTitle {
    return new AwardTitle(value);
  }

  override toString(): string {
    return this.value;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.value.toLowerCase()];
  }
}
