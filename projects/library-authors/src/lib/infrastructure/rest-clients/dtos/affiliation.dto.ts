// Mirrors the server Authors/Http/Dtos/AffiliationDto.cs
export interface AffiliationDto {
  readonly affiliationId: string;
  readonly authorId: string;
  readonly institutionName: string;
  readonly startDate: string;
  readonly endDate: string | null;
}
