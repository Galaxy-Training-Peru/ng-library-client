export interface GetAwardOfAuthorByAwardIdRequest {
  readonly authorId: string;
  readonly awardId: string;
  readonly fields?: string[];
}
