export interface GetPaperOfAuthorByPaperIdHttpRequest {
  readonly authorId: string;
  readonly paperId: string;
  readonly fields?: string;
}
