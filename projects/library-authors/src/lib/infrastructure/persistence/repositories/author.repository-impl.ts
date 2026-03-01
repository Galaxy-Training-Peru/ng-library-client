import { inject, Injectable } from '@angular/core';
import { type PagedList, toJsonPatchOperations } from '@eac-arch/infrastructure-http';
import type { IAuthorRepository, AuthorChanges } from '../../../application/contracts';
import type { Author } from '../../../domain/aggregates/author';
import type { AuthorDto } from '../../rest-clients/dtos';
import { buildReplacePatches } from '@eac-arch/shared-kernel';
import { AffiliationsHttpAgent } from '../../http-agents/affiliations-http.agent';
import { AuthorsHttpAgent } from '../../http-agents/authors-http.agent';
import { AwardsHttpAgent } from '../../http-agents/awards-http.agent';
import { PapersHttpAgent } from '../../http-agents/papers-http.agent';
import type { AuthorQueryOptions } from '../../http-agents/contracts';
import { AuthorDtoMapper } from '../../mappings';
import { HttpRepository } from '@eac-arch/infrastructure-persistence';

// Large page size for loading all child collections of a single author in one request.
const MAX_COLLECTION_PAGE_SIZE = 1000;

@Injectable({ providedIn: 'root' })
export class AuthorRepositoryImpl
  extends HttpRepository<Author, AuthorDto, Author, Author, AuthorQueryOptions, AuthorChanges>
  implements IAuthorRepository {

  private readonly authorsHttpAgent = inject(AuthorsHttpAgent);
  private readonly awardsHttpAgent = inject(AwardsHttpAgent);
  private readonly papersHttpAgent = inject(PapersHttpAgent);
  private readonly affiliationsHttpAgent = inject(AffiliationsHttpAgent);

  // -- Mapping --

  protected override extractId(dto: AuthorDto): string {
    return dto.authorId;
  }

  protected override mapToEntity(dto: AuthorDto): Author {
    return AuthorDtoMapper.fromDto(dto);
  }

  protected override async rehydrate(authorId: string, dto: AuthorDto): Promise<Author> {
    const [awardsPage, papersPage, affiliationsPage] = await Promise.all([
      this.awardsHttpAgent.getAllAwardsOfAuthor(authorId, 1, MAX_COLLECTION_PAGE_SIZE),
      this.papersHttpAgent.getAllPapersOfAuthor(authorId, 1, MAX_COLLECTION_PAGE_SIZE),
      this.affiliationsHttpAgent.getAllAffiliationsOfAuthor(authorId, 1, MAX_COLLECTION_PAGE_SIZE),
    ]);
    return AuthorDtoMapper.rehydrate(dto, awardsPage.items, papersPage.items, affiliationsPage.items);
  }

  // -- Agent delegates --

  protected override doGetAll(pageNumber: number, pageSize: number, options?: AuthorQueryOptions): Promise<PagedList<AuthorDto>> {
    return this.authorsHttpAgent.getAllAuthors(pageNumber, pageSize, options);
  }

  protected override doGetById(authorId: string): Promise<AuthorDto | null> {
    return this.authorsHttpAgent.getAuthorById(authorId);
  }

  protected override doExists(authorId: string): Promise<boolean> {
    return this.authorsHttpAgent.existsAuthor(authorId);
  }

  protected override doCreate(author: Author): Promise<AuthorDto> {
    return this.authorsHttpAgent.createAuthor({
      authorId:        author.authorId || undefined,
      firstName:       author.firstName,
      lastName:        author.lastName,
      dateOfBirth:     author.dateOfBirth.toISOString(),
      dateOfDeath:     author.dateOfDeath?.toISOString(),
      literaryGenreId: author.literaryGenreId,
    });
  }

  protected override doUpsert(authorId: string, author: Author): Promise<AuthorDto | null> {
    return this.authorsHttpAgent.upsertAuthor(authorId, {
      firstName:       author.firstName,
      lastName:        author.lastName,
      dateOfBirth:     author.dateOfBirth.toISOString(),
      dateOfDeath:     author.dateOfDeath?.toISOString(),
      literaryGenreId: author.literaryGenreId,
    });
  }

  protected override doUpdatePartial(authorId: string, changes: AuthorChanges): Promise<void> {
    return this.authorsHttpAgent.updatePartialAuthor(authorId, toJsonPatchOperations(buildReplacePatches<AuthorChanges>(changes)));
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
