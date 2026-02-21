// Mirrors the server Library.Service.Catalog/Application/Models/PublisherModel.cs
export interface PublisherDto {
  readonly publisherId: string;
  readonly name: string;
  readonly country: string | null;
  readonly foundedYear: number | null;
  readonly website: string | null;
}
