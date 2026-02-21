export interface GetPaperOfAuthorByPaperIdRequest {
  readonly authorId: string;
  readonly paperId: string;
  readonly fields?: string[];
}
