export interface UpsertAwardOfAuthorHttpRequest {
  readonly authorId: string;
  readonly awardId: string;
  readonly title: string;
  readonly awardedOn: string;
}
