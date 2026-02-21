export interface ExistsPaperOfAuthorHttpResponse {
  readonly data: ExistsPaperOfAuthorHttpData;
}

export interface ExistsPaperOfAuthorHttpData {
  readonly authorId: string;
  readonly paperId: string;
  readonly exists: boolean;
}
