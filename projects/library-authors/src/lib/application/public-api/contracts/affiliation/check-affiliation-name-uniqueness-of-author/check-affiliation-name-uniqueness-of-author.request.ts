export interface CheckAffiliationNameUniquenessOfAuthorRequest {
  readonly authorId: string;
  readonly institutionName: string;
  readonly excludeAffiliationId?: string;
}
