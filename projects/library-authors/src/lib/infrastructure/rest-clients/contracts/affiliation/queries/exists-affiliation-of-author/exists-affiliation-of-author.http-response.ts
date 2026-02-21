export interface ExistsAffiliationOfAuthorHttpResponse {
  readonly data: ExistsAffiliationOfAuthorHttpData;
}

export interface ExistsAffiliationOfAuthorHttpData {
  readonly authorId: string;
  readonly affiliationId: string;
  readonly exists: boolean;
}
