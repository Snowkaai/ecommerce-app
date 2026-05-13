import { Routes } from '@angular/router';
import { Header } from './components/header/header';
import { HomeLayout } from './layouts/home-layout/home-layout';
import { NotFoundLayout } from './layouts/not-found-layout/not-found-layout';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { ShopLayout } from './layouts/shop-layout/shop-layout';
import { Carousel } from './components/carousel/carousel';

export const routes: Routes = [
  {
    path: '', //Empty path will redirect to main
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: HomeLayout,
    children: [
      {
        path: '', //Empty path will redirect to home
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: Carousel,
      },
      {
        path: 'shop',
        component: ShopLayout,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '', //Empty path will redirect to home
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'signup',
        component: Signup,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundLayout,
  },
];
