export interface ValidateFullNameResponse {
  errors: { firstName: string[]; lastName: string[] } | null;
}
