import { InjectionToken } from '@angular/core';
import type { IHttpRepository } from '@eac-arch/shared-kernel';
import type { Author } from '../../../domain/aggregates/author';
import type { AuthorQueryOptions } from '../../../infrastructure/http-agents/contracts';
import type { AuthorChanges } from './author-changes';

export interface IAuthorRepository
  extends IHttpRepository<Author, Author, Author, AuthorQueryOptions, AuthorChanges> {
  existsByFullName(firstName: string, lastName: string, excludeAuthorId?: string): Promise<boolean>;
}

export const AUTHOR_REPOSITORY = new InjectionToken<IAuthorRepository>('IAuthorRepository');
