export interface CheckPublisherNameUniquenessRequest {
  readonly name: string;
  readonly excludePublisherId?: string;
}
