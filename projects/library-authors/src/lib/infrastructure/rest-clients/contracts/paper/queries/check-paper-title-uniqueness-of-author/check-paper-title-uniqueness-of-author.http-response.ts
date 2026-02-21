export interface CheckPaperTitleUniquenessOfAuthorHttpResponse {
  readonly data: CheckPaperTitleUniquenessOfAuthorHttpData;
}

export interface CheckPaperTitleUniquenessOfAuthorHttpData {
  readonly title: string;
  readonly isUnique: boolean;
}
