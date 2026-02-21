export interface PublisherModel {
  readonly publisherId: string;
  readonly name: string;
  readonly country: string | null;
  readonly foundedYear: number | null;
  readonly website: string | null;
}
