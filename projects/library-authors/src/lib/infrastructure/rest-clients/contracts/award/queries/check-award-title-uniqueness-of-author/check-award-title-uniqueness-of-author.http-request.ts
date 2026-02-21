export interface CheckAwardTitleUniquenessOfAuthorHttpRequest {
  readonly authorId: string;
  readonly title: string;
  readonly excludeAwardId?: string;
}
