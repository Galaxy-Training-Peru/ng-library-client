import { Routes } from '@angular/router';
import { Layout } from '../shell/layout/layout';
import { Home } from '../pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'library',component: Layout }
];
