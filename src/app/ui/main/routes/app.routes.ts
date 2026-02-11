import { Routes } from '@angular/router';
import { Layout } from '../shell/layout/layout';
import { Home } from '../pages/home/home';
import { PageNotFound } from '@shared/pages/page-not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'library',component: Layout },
  { path: '**', component: PageNotFound }
];
