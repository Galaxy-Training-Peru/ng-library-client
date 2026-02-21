export interface GetAwardOfAuthorByAwardIdHttpRequest {
  readonly authorId: string;
  readonly awardId: string;
  readonly fields?: string;
}
