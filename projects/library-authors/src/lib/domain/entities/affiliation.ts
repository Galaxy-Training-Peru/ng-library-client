import type { Entity } from '@eac-arch/shared-kernel';
import { AffiliationName } from '../value-objects/affiliation-name';
import { AffiliationPeriod } from '../value-objects/affiliation-period';

// Author child entity: institution or organization affiliation.
// Lifetime is managed by the Author aggregate.
export class Affiliation implements Entity<string> {
  readonly id: string;

  private _name: AffiliationName;
  private _period: AffiliationPeriod;

  private constructor(id: string, name: AffiliationName, period: AffiliationPeriod) {
    this.id = id;
    this._name = name;
    this._period = period;
  }

  // -- Accessors --

  get nameValue(): string { return this._name.value; }
  get startDate(): Date { return this._period.startDate; }
  get endDate(): Date | null { return this._period.endDate; }
  get isActive(): boolean { return this._period.isActive; }

  // -- Factory --

  static create(
    id: string,
    name: string,
    startDate: Date,
    endDate?: Date | null,
  ): Affiliation {
    return new Affiliation(
      id,
      AffiliationName.create(name),
      AffiliationPeriod.create(startDate, endDate),
    );
  }

  // -- Mutations --

  update(name: string, startDate: Date, endDate?: Date | null): void {
    this._name = AffiliationName.create(name);
    this._period = AffiliationPeriod.create(startDate, endDate);
  }

  // -- Queries --

  contains(date: Date): boolean {
    return this._period.contains(date);
  }
}
