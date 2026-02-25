import { Routes } from '@angular/router';
import { AuthorsShell } from '../shell/authors-shell';
import { AuthorListPage } from '../pages/author-list-page/author-list-page';
import { AuthorDetailPage } from '../pages/author-detail-page/author-detail-page';

export const AUTHORS_ROUTES: Routes = [
  {
    path: '',
    component: AuthorsShell,
    children: [
      { path: '', component: AuthorListPage },
      { path: ':authorId', component: AuthorDetailPage },
    ]
  }
];
