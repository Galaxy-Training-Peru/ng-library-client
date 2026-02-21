export interface ExistsAwardOfAuthorHttpResponse {
  readonly data: ExistsAwardOfAuthorHttpData;
}

export interface ExistsAwardOfAuthorHttpData {
  readonly authorId: string;
  readonly awardId: string;
  readonly exists: boolean;
}
