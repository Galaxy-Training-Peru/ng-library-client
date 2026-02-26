export interface UpsertAffiliationOfAuthorHttpRequest {
  readonly authorId: string;
  readonly affiliationId: string;
  readonly institutionName: string;
  readonly startDate: string;
  readonly endDate?: string;
}
