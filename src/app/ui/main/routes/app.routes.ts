import { Routes } from '@angular/router';
import { authGuard } from '@eac-arch/infrastructure-security';
import { Layout } from '../shell/layout/layout';
import { Home } from '../pages/home/home';
import { PageNotFound } from '@shared/pages/page-not-found';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'library',
    component: Layout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'authors', pathMatch: 'full' },
      { path: 'authors', loadChildren: () => import('library-authors').then(m => m.AUTHORS_ROUTES) }
    ]
  },
  // OAuth callback: OidcCallback exchanges the authorization code for tokens
  // and navigates to the original target route encoded in the state param.
  {
    path: 'security/auth/callback',
    loadComponent: () => import('@eac-arch/infrastructure-security').then(m => m.OidcCallback),
  },
  { path: '**', component: PageNotFound }
];
