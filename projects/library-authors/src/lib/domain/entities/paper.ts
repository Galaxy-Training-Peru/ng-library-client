import type { Entity } from '@eac-arch/shared-kernel';
import type { PaperTitle } from '../value-objects/paper-title';

export class Paper implements Entity<string> {
  readonly id: string;

  private _title: PaperTitle;
  private _publishedOn: Date;
  private _url: string | null;

  private constructor(id: string, title: PaperTitle, publishedOn: Date, url: string | null) {
    this.id = id;
    this._title = title;
    this._publishedOn = publishedOn;
    this._url = url;
  }

  get paperId(): string { return this.id; }
  get titleVo(): PaperTitle { return this._title; }
  get title(): string { return this._title.value; }
  get publishedOn(): Date { return this._publishedOn; }
  get url(): string | null { return this._url; }
  get publishedYear(): number { return this._publishedOn.getUTCFullYear(); }

  static create(id: string, title: PaperTitle, publishedOn: Date, url?: string | null): Paper {
    return new Paper(id, title, publishedOn, url?.trim() ?? null);
  }

  update(title: PaperTitle, publishedOn: Date, url?: string | null): void {
    this._title = title;
    this._publishedOn = publishedOn;
    this._url = url?.trim() ?? null;
  }
}
