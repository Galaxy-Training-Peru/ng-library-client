import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AUTHORS_PUBLIC_API } from '../../../application/public-api';
import type { AuthorModel, AwardModel, PaperModel, AffiliationModel } from '../../../application/models';

@Injectable()
export class AuthorDetailViewModel {
  private readonly publicApi  = inject(AUTHORS_PUBLIC_API);
  private readonly route      = inject(ActivatedRoute);

  readonly author       = signal<AuthorModel | null>(null);
  readonly awards       = signal<readonly AwardModel[]>([]);
  readonly papers       = signal<readonly PaperModel[]>([]);
  readonly affiliations = signal<readonly AffiliationModel[]>([]);
  readonly isLoading    = signal(false);
  readonly notFound     = signal(false);

  constructor() {
    const authorId = this.route.snapshot.paramMap.get('authorId');
    if (authorId) {
      this.load(authorId);
    }
  }

  private async load(authorId: string): Promise<void> {
    this.isLoading.set(true);
    this.notFound.set(false);
    try {
      const [author, awardsPage, papersPage, affiliationsPage] = await Promise.all([
        this.publicApi.getAuthorById({ authorId }),
        this.publicApi.getAllAwardsOfAuthor({ authorId, pageNumber: 1, pageSize: 100 }),
        this.publicApi.getAllPapersOfAuthor({ authorId, pageNumber: 1, pageSize: 100 }),
        this.publicApi.getAllAffiliationsOfAuthor({ authorId, pageNumber: 1, pageSize: 100 }),
      ]);

      this.author.set(author);
      this.awards.set(awardsPage.items);
      this.papers.set(papersPage.items);
      this.affiliations.set(affiliationsPage.items);
    } catch {
      this.notFound.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }
}
