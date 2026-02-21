export interface CheckLiteraryGenreNameUniquenessHttpData {
  readonly name: string;
  readonly isUnique: boolean;
}

export interface CheckLiteraryGenreNameUniquenessHttpResponse {
  readonly data: CheckLiteraryGenreNameUniquenessHttpData;
}
