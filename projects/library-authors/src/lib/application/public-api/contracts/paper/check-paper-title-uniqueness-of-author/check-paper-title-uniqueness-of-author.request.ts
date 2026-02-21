export interface CheckPaperTitleUniquenessOfAuthorRequest {
  readonly authorId: string;
  readonly title: string;
  readonly excludePaperId?: string;
}
