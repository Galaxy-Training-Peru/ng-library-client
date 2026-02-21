export interface CheckAwardTitleUniquenessOfAuthorRequest {
  readonly authorId: string;
  readonly title: string;
  readonly excludeAwardId?: string;
}
