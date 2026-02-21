export interface ExistsLiteraryGenreHttpData {
  readonly literaryGenreId: string;
  readonly exists: boolean;
}

export interface ExistsLiteraryGenreHttpResponse {
  readonly data: ExistsLiteraryGenreHttpData;
}
