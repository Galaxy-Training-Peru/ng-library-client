export interface ValidateLifeSpanResponse {
  errors: { dateOfBirth: string[]; dateOfDeath: string[] } | null;
}
