import { InjectionToken } from '@angular/core';
import type { IHttpRepository } from '@eac-arch/shared-kernel';
import type { JsonPatchOperation } from '@eac-arch/infrastructure-http';
import type { Author } from '../../../domain/aggregates/author';
import type { AuthorQueryOptions, CreateAuthorData, UpsertAuthorData } from '../../../infrastructure/http-agents/contracts';

// Author-specific repository contract.
// Inherits all standard HTTP CRUD operations from HttpRepository.
// Only declares what is unique to the Author aggregate.
export interface IAuthorRepository
  extends IHttpRepository<Author, CreateAuthorData, UpsertAuthorData, AuthorQueryOptions, JsonPatchOperation> {
  existsByFullName(firstName: string, lastName: string, excludeAuthorId?: string): Promise<boolean>;
}

export const AUTHOR_REPOSITORY = new InjectionToken<IAuthorRepository>('IAuthorRepository');
