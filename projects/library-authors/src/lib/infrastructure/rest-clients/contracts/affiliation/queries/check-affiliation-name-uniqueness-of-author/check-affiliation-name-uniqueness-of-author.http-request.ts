export interface CheckAffiliationNameUniquenessOfAuthorHttpRequest {
  readonly authorId: string;
  readonly institutionName: string;
  readonly excludeAffiliationId?: string;
}
