import type {
  GetAllPapersOfAuthorRequest,
  GetAllPapersOfAuthorResponse,
  GetPaperOfAuthorByPaperIdRequest,
  GetPaperOfAuthorByPaperIdResponse,
  ExistsPaperOfAuthorRequest,
  ExistsPaperOfAuthorResponse,
  CheckPaperTitleUniquenessOfAuthorRequest,
  CheckPaperTitleUniquenessOfAuthorResponse,
} from './paper';

export interface PaperPublicApi {
  getAllPapersOfAuthor(request: GetAllPapersOfAuthorRequest): Promise<GetAllPapersOfAuthorResponse>;
  getPaperOfAuthorByPaperId(request: GetPaperOfAuthorByPaperIdRequest): Promise<GetPaperOfAuthorByPaperIdResponse>;
  existsPaperOfAuthor(request: ExistsPaperOfAuthorRequest): Promise<ExistsPaperOfAuthorResponse>;
  checkPaperTitleUniquenessOfAuthor(request: CheckPaperTitleUniquenessOfAuthorRequest): Promise<CheckPaperTitleUniquenessOfAuthorResponse>;
}
