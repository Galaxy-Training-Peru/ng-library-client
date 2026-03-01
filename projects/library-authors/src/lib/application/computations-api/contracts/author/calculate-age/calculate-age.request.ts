export interface CalculateAgeRequest {
  readonly dateOfBirth: Date;
  readonly dateOfDeath?: Date | null;
}
