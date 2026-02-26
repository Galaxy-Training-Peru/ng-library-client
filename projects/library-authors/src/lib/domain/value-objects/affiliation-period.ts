import { ValueObject } from '@eac-arch/shared-kernel';
import { InvalidAffiliationPeriodException } from '../exceptions/invalid-affiliation-period.exception';

// Represents the period an author was affiliated with an institution.
// EndDate is null when the affiliation is still active.
// Immutable.
export class AffiliationPeriod extends ValueObject {
  readonly startDate: Date;
  readonly endDate: Date | null;

  private constructor(startDate: Date, endDate?: Date | null) {
    InvalidAffiliationPeriodException.validate(startDate, endDate);
    super();
    this.startDate = startDate;
    this.endDate = endDate ?? null;
    Object.freeze(this);
  }

  static create(startDate: Date, endDate?: Date | null): AffiliationPeriod {
    return new AffiliationPeriod(startDate, endDate);
  }

  // Returns true when the affiliation has no end date or the end date is in the future.
  get isActive(): boolean {
    return this.endDate === null || this.endDate > new Date();
  }

  // Returns true when the given date falls within this period.
  contains(date: Date): boolean {
    if (this.endDate === null) return date >= this.startDate;
    return date >= this.startDate && date <= this.endDate;
  }

  override toString(): string {
    if (this.endDate === null) return `${this.startDate.toISOString().slice(0, 10)} → Present`;
    return `${this.startDate.toISOString().slice(0, 10)} → ${this.endDate.toISOString().slice(0, 10)}`;
  }

  protected getEqualityComponents(): unknown[] {
    return [this.startDate.getTime(), this.endDate?.getTime() ?? null];
  }
}
