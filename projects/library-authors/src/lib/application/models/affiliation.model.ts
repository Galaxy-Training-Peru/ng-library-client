export interface AffiliationModel {
  readonly affiliationId: string;
  readonly authorId: string;
  readonly institutionName: string;
  readonly startDate: string;
  readonly endDate: string | null;
}
