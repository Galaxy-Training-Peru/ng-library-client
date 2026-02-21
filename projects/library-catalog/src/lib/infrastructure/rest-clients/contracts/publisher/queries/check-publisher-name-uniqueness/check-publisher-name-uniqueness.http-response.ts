export interface CheckPublisherNameUniquenessHttpData {
  readonly name: string;
  readonly isUnique: boolean;
}

export interface CheckPublisherNameUniquenessHttpResponse {
  readonly data: CheckPublisherNameUniquenessHttpData;
}
