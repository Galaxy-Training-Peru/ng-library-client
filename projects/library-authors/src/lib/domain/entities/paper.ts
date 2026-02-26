import type { Entity } from '@eac-arch/shared-kernel';
import { PaperTitle } from '../value-objects/paper-title';

// Author child entity: academic or literary paper.
// Url is optional.
// Lifetime is managed by the Author aggregate.
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

  // -- Accessors --

  get titleValue(): string { return this._title.value; }
  get publishedOn(): Date { return this._publishedOn; }
  get url(): string | null { return this._url; }
  get publishedYear(): number { return this._publishedOn.getUTCFullYear(); }

  // -- Factory --

  static create(id: string, title: string, publishedOn: Date, url?: string | null): Paper {
    return new Paper(id, PaperTitle.create(title), publishedOn, url?.trim() ?? null);
  }

  // -- Mutations --

  update(title: string, publishedOn: Date, url?: string | null): void {
    this._title = PaperTitle.create(title);
    this._publishedOn = publishedOn;
    this._url = url?.trim() ?? null;
  }
}
