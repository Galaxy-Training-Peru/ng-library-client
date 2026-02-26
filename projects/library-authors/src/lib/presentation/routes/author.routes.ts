import { Routes } from '@angular/router';
import { AuthorsShell } from '../shell/authors-shell';
import { AuthorListPage } from '../pages/author-list-page/author-list-page';
import { AuthorDetailPage } from '../pages/author-detail-page/author-detail-page';
import { AuthorEditPage } from '../pages/author-edit-page/author-edit-page';
import { authorDetailResolver } from './resolvers/author-detail.resolver';
import { authorEditResolver } from './resolvers/author-edit.resolver';

export const AUTHORS_ROUTES: Routes = [
  {
    path: '',
    component: AuthorsShell,
    children: [
      { path: '',               component: AuthorListPage   },
      { path: ':authorId',      component: AuthorDetailPage, resolve: { authorDetail: authorDetailResolver } },
      { path: ':authorId/edit', component: AuthorEditPage,   resolve: { author: authorEditResolver }        },
    ]
  }
];
