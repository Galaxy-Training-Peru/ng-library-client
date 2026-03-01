import type { Entity } from '@eac-arch/shared-kernel';
import type { AwardTitle } from '../value-objects/award-title';

export class Award implements Entity<string> {
  readonly id: string;

  private _title: AwardTitle;
  private _awardedOn: Date;

  private constructor(id: string, title: AwardTitle, awardedOn: Date) {
    this.id = id;
    this._title = title;
    this._awardedOn = awardedOn;
  }

  get awardId(): string { return this.id; }
  get titleVo(): AwardTitle { return this._title; }
  get title(): string { return this._title.value; }
  get awardedOn(): Date { return this._awardedOn; }
  get awardedYear(): number { return this._awardedOn.getUTCFullYear(); }

  static create(id: string, title: AwardTitle, awardedOn: Date): Award {
    return new Award(id, title, awardedOn);
  }

  update(title: AwardTitle, awardedOn: Date): void {
    this._title = title;
    this._awardedOn = awardedOn;
  }
}
