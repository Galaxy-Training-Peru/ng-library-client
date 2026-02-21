export interface PaperModel {
  readonly paperId: string;
  readonly authorId: string;
  readonly title: string;
  readonly publishedOn: string;
  readonly url: string | null;
}
