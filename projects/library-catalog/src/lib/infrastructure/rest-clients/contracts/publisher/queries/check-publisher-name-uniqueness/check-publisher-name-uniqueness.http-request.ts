export interface CheckPublisherNameUniquenessHttpRequest {
  readonly name: string;
  readonly excludePublisherId?: string;
}
