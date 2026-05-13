import { Routes } from '@angular/router';
import { Notfound } from './components/notfound/notfound';
import { Header } from './components/header/header';
import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '', //Empty path will redirect to main
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: Header,
    children: [
      {
        path: '', //Empty path will redirect to home
        redirectTo: 'Home',
        pathMatch: 'full',
      },
      {
        path: 'Home',
        component: Home,
      },
      {
        path: '**',
        component: Notfound,
      },
    ],
  },
  {
    path: '**',
    component: Notfound,
  },
];
