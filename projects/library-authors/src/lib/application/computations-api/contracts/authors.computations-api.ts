import { InjectionToken } from '@angular/core';
import type { AuthorComputationsApi } from './author.computations-api';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthorsComputationsApi extends AuthorComputationsApi {}

export const AUTHORS_COMPUTATIONS_API = new InjectionToken<AuthorsComputationsApi>('AuthorsComputationsApi');
