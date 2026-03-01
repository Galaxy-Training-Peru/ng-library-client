import type { Entity } from '@eac-arch/shared-kernel';
import type { AffiliationName } from '../value-objects/affiliation-name';
import type { AffiliationPeriod } from '../value-objects/affiliation-period';

export class Affiliation implements Entity<string> {
  readonly id: string;

  private _name: AffiliationName;
  private _period: AffiliationPeriod;

  private constructor(id: string, name: AffiliationName, period: AffiliationPeriod) {
    this.id = id;
    this._name = name;
    this._period = period;
  }

  get affiliationId(): string { return this.id; }
  get nameVo(): AffiliationName { return this._name; }
  get period(): AffiliationPeriod { return this._period; }
  get institutionName(): string { return this._name.value; }
  get startDate(): Date { return this._period.startDate; }
  get endDate(): Date | null { return this._period.endDate; }
  get isActive(): boolean { return this._period.isActive; }

  static create(id: string, name: AffiliationName, period: AffiliationPeriod): Affiliation {
    return new Affiliation(id, name, period);
  }

  update(name: AffiliationName, period: AffiliationPeriod): void {
    this._name = name;
    this._period = period;
  }

  contains(date: Date): boolean {
    return this._period.contains(date);
  }
}
