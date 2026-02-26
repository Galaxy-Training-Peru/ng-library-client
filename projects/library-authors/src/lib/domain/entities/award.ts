import type { Entity } from '@eac-arch/shared-kernel';
import { AwardTitle } from '../value-objects/award-title';

// Author child entity: academic or literary award received.
// Lifetime is managed by the Author aggregate.
export class Award implements Entity<string> {
  readonly id: string;

  private _title: AwardTitle;
  private _awardedOn: Date;

  private constructor(id: string, title: AwardTitle, awardedOn: Date) {
    this.id = id;
    this._title = title;
    this._awardedOn = awardedOn;
  }

  // -- Accessors --

  get titleValue(): string { return this._title.value; }
  get awardedOn(): Date { return this._awardedOn; }
  get awardedYear(): number { return this._awardedOn.getUTCFullYear(); }

  // -- Factory --

  static create(id: string, title: string, awardedOn: Date): Award {
    return new Award(id, AwardTitle.create(title), awardedOn);
  }

  // -- Mutations --

  update(title: string, awardedOn: Date): void {
    this._title = AwardTitle.create(title);
    this._awardedOn = awardedOn;
  }
}
