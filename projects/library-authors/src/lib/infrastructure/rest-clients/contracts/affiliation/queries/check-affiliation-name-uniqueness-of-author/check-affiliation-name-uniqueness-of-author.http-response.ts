export interface CheckAffiliationNameUniquenessOfAuthorHttpResponse {
  readonly data: CheckAffiliationNameUniquenessOfAuthorHttpData;
}

export interface CheckAffiliationNameUniquenessOfAuthorHttpData {
  readonly institutionName: string;
  readonly isUnique: boolean;
}
