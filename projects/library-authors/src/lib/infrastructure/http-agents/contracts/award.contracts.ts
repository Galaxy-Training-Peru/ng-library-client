export interface AwardQueryOptions {
  sort?: string;
  search?: string;
  title?: string;
  awardedYear?: number;
  fields?: string;
}

export interface AddAwardData {
  title: string;
  awardedOn: string;
}

export interface UpsertAwardData {
  title: string;
  awardedOn: string;
}
