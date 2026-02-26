export type { PaperDto } from '../../dtos';
export type {
  GetAllPapersOfAuthorHttpRequest,
  GetAllPapersOfAuthorHttpResponse,
  GetPaperOfAuthorByPaperIdHttpRequest,
  GetPaperOfAuthorByPaperIdHttpResponse,
  ExistsPaperOfAuthorHttpRequest,
  ExistsPaperOfAuthorHttpResponse,
  ExistsPaperOfAuthorHttpData,
  CheckPaperTitleUniquenessOfAuthorHttpRequest,
  CheckPaperTitleUniquenessOfAuthorHttpResponse,
  CheckPaperTitleUniquenessOfAuthorHttpData,
} from './queries';
export type {
  AddPaperToAuthorHttpRequest,
  AddPaperToAuthorHttpResponse,
  UpsertPaperOfAuthorHttpRequest,
  UpsertPaperOfAuthorHttpResponse,
  UpdatePartialPaperOfAuthorHttpRequest,
  RemovePaperFromAuthorHttpRequest,
} from './commands';
