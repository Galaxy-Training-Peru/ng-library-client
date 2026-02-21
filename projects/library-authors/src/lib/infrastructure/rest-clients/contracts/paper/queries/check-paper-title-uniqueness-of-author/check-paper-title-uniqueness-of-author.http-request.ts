export interface CheckPaperTitleUniquenessOfAuthorHttpRequest {
  readonly authorId: string;
  readonly title: string;
  readonly excludePaperId?: string;
}
