export interface PaperQueryOptions {
  sort?: string;
  search?: string;
  title?: string;
  publishedYear?: number;
  fields?: string;
}

export interface AddPaperData {
  paperId?: string;
  title: string;
  publishedOn: string;
  url?: string;
}

export interface UpsertPaperData {
  title: string;
  publishedOn: string;
  url?: string;
}
