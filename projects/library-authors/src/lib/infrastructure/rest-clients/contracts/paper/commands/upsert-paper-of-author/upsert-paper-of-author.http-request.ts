export interface UpsertPaperOfAuthorHttpRequest {
  readonly authorId: string;
  readonly paperId: string;
  readonly title: string;
  readonly publishedOn: string;
  readonly url?: string;
}
