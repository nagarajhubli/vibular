import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
  {
    path: 'prompts',
    loadComponent: () => import('./pages/prompts/prompts').then((m) => m.Prompts),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/components/components').then((m) => m.ComponentsPage),
  },
  { path: '**', redirectTo: 'home' },
];
