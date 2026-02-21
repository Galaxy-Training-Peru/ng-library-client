// Mirrors the server Authors/Http/Dtos/PaperDto.cs
export interface PaperDto {
  readonly paperId: string;
  readonly authorId: string;
  readonly title: string;
  readonly publishedOn: string;
  readonly url: string | null;
}
