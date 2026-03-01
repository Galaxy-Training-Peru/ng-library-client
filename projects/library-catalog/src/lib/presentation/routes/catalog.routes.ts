import { Routes } from '@angular/router';
import { CatalogShell } from '../shell/catalog-shell';

export const CATALOG_ROUTES: Routes = [
  {
    path: '',
    component: CatalogShell,
    children: [
      { path: '', redirectTo: 'literary-genres', pathMatch: 'full' },
      { path: 'literary-genres', loadComponent: () => import('../pages/literary-genre-list-page/literary-genre-list-page').then(m => m.LiteraryGenreListPage) },
      { path: 'publishers',      loadComponent: () => import('../pages/publisher-list-page/publisher-list-page').then(m => m.PublisherListPage) },
    ],
  },
];
