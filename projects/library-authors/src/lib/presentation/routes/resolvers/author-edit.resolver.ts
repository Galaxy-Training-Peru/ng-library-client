import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AUTHORS_PUBLIC_API } from '../../../application/public-api';
import type { AuthorModel } from '../../../application/models';

export const authorEditResolver: ResolveFn<AuthorModel | null> = async (route) => {
  const api      = inject(AUTHORS_PUBLIC_API);
  const authorId = route.paramMap.get('authorId')!;

  try {
    return await api.getAuthorById({ authorId });
  } catch {
    return null;
  }
};
