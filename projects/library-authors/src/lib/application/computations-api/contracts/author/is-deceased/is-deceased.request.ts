export interface IsDeceasedRequest {
  readonly dateOfBirth: Date;
  readonly dateOfDeath: Date | null;
}
