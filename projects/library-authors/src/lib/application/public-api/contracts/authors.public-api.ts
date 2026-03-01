import { InjectionToken } from '@angular/core';
import type { AuthorPublicApi } from './author.public-api';
import type { PaperPublicApi } from './paper.public-api';
import type { AwardPublicApi } from './award.public-api';
import type { AffiliationPublicApi } from './affiliation.public-api';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthorsPublicApi
  extends AuthorPublicApi, PaperPublicApi, AwardPublicApi, AffiliationPublicApi {}

export const AUTHORS_PUBLIC_API = new InjectionToken<AuthorsPublicApi>('AuthorsPublicApi');
