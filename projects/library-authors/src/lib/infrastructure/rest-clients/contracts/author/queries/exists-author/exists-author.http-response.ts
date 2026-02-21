export interface ExistsAuthorHttpResponse {
  readonly data: ExistsAuthorHttpData;
}

export interface ExistsAuthorHttpData {
  readonly authorId: string;
  readonly exists: boolean;
}
