import { InjectionToken } from '@angular/core';
import type { AuthorValidationsApi } from './author.validations-api';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthorsValidationsApi extends AuthorValidationsApi {}

export const AUTHORS_VALIDATIONS_API = new InjectionToken<AuthorsValidationsApi>('AuthorsValidationsApi');
