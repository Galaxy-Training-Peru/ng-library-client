export interface AffiliationQueryOptions {
  sort?: string;
  search?: string;
  institutionName?: string;
  activeOn?: string;
  fields?: string;
}

export interface AddAffiliationData {
  affiliationId?: string;
  institutionName: string;
  startDate: string;
  endDate?: string;
}

export interface UpsertAffiliationData {
  institutionName: string;
  startDate: string;
  endDate?: string;
}
