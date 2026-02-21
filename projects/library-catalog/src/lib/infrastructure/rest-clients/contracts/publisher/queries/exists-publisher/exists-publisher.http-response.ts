export interface ExistsPublisherHttpData {
  readonly publisherId: string;
  readonly exists: boolean;
}

export interface ExistsPublisherHttpResponse {
  readonly data: ExistsPublisherHttpData;
}
