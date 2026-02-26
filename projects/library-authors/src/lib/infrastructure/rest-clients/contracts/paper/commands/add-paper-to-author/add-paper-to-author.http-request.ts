import type { PaperDto } from '../../../../dtos/paper.dto';

export interface AddPaperToAuthorHttpRequest {
  readonly authorId: string;
  readonly paperId?: string;
  readonly title: string;
  readonly publishedOn: string;
  readonly url?: string;
}

// Server returns 201 with { data: PaperDto }. Client unwraps and returns the DTO directly.
export type AddPaperToAuthorHttpResponse = PaperDto;
