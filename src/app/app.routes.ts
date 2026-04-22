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
  {
    path: 'playground',
    loadComponent: () => import('./pages/playground/playground').then((m) => m.Playground),
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats').then((m) => m.Stats),
  },
  {
    path: 'changelog',
    loadComponent: () => import('./pages/changelog/changelog').then((m) => m.Changelog),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
