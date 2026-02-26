import { inject, Injectable } from '@angular/core';
import { type JsonPatchOperation, type PagedList } from '@eac-arch/infrastructure-http';
import type { IAuthorRepository } from '../../../application/contracts';
import type { Author } from '../../../domain/aggregates/author';
import type { AuthorModel } from '../../../application/models';
import { AffiliationsHttpAgent } from '../../http-agents/affiliations-http.agent';
import { AuthorsHttpAgent } from '../../http-agents/authors-http.agent';
import { AwardsHttpAgent } from '../../http-agents/awards-http.agent';
import { PapersHttpAgent } from '../../http-agents/papers-http.agent';
import type { AuthorQueryOptions, CreateAuthorData, UpsertAuthorData } from '../../http-agents/contracts';
import { AuthorMapper } from './author.mapper';
import { HttpRepository } from '@eac-arch/infrastructure-persistence';

// Large page size for loading all child collections of a single author in one request.
const MAX_COLLECTION_PAGE_SIZE = 1000;

@Injectable({ providedIn: 'root' })
export class AuthorRepositoryImpl
  extends HttpRepository<Author, AuthorModel, CreateAuthorData, UpsertAuthorData, AuthorQueryOptions, JsonPatchOperation>
  implements IAuthorRepository {

  private readonly authorsHttpAgent = inject(AuthorsHttpAgent);
  private readonly awardsHttpAgent = inject(AwardsHttpAgent);
  private readonly papersHttpAgent = inject(PapersHttpAgent);
  private readonly affiliationsHttpAgent = inject(AffiliationsHttpAgent);

  // -- Mapping --

  protected override mapToEntity(model: AuthorModel): Author {
    return AuthorMapper.fromModel(model);
  }

  // Overrides the default rehydrate to load all child collections in parallel.
  protected override async rehydrate(authorId: string, model: AuthorModel): Promise<Author> {
    const [awardsPage, papersPage, affiliationsPage] = await Promise.all([
      this.awardsHttpAgent.getAllAwardsOfAuthor(authorId, 1, MAX_COLLECTION_PAGE_SIZE),
      this.papersHttpAgent.getAllPapersOfAuthor(authorId, 1, MAX_COLLECTION_PAGE_SIZE),
      this.affiliationsHttpAgent.getAllAffiliationsOfAuthor(authorId, 1, MAX_COLLECTION_PAGE_SIZE),
    ]);
    return AuthorMapper.rehydrate(model, awardsPage.items, papersPage.items, affiliationsPage.items);
  }

  // -- Agent delegates --

  protected override doGetAll(pageNumber: number, pageSize: number, options?: AuthorQueryOptions): Promise<PagedList<AuthorModel>> {
    return this.authorsHttpAgent.getAllAuthors(pageNumber, pageSize, options);
  }

  protected override doGetById(authorId: string): Promise<AuthorModel | null> {
    return this.authorsHttpAgent.getAuthorById(authorId);
  }

  protected override doExists(authorId: string): Promise<boolean> {
    return this.authorsHttpAgent.existsAuthor(authorId);
  }

  protected override doCreate(data: CreateAuthorData): Promise<AuthorModel> {
    return this.authorsHttpAgent.createAuthor(data);
  }

  protected override doUpsert(authorId: string, data: UpsertAuthorData): Promise<AuthorModel | null> {
    return this.authorsHttpAgent.upsertAuthor(authorId, data);
  }

  protected override doUpdatePartial(authorId: string, operations: JsonPatchOperation[]): Promise<void> {
    return this.authorsHttpAgent.updatePartialAuthor(authorId, operations);
  }

  protected override doDelete(authorId: string): Promise<void> {
    return this.authorsHttpAgent.deleteAuthor(authorId);
  }

  // -- Author-specific --

  existsByFullName(firstName: string, lastName: string, excludeAuthorId?: string): Promise<boolean> {
    return this.authorsHttpAgent.checkAuthorNameUniqueness(firstName, lastName, excludeAuthorId)
      .then(isUnique => !isUnique);
  }
}
