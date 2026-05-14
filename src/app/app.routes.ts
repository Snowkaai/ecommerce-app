import { Routes } from '@angular/router';
import { Header } from './components/header/header';
import { HomeLayout } from './layouts/home-layout/home-layout';
import { NotFoundLayout } from './layouts/not-found-layout/not-found-layout';
import { Signup } from './components/signup/signup';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { ShopLayout } from './layouts/shop-layout/shop-layout';
import { Carousel } from './components/carousel/carousel';
import { ProductLayout } from './layouts/product-layout/product-layout';
import { Login } from './components/login/login';
import { TermsOfUse } from './components/terms-of-use/terms-of-use';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { ContactUs } from './components/contact-us/contact-us';
import { Support } from './components/support/support';

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
      {
        path: 'shop/:id',
        component: ProductLayout,
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
    path: 'termsofuse',
    component: TermsOfUse,
  },
  {
    path: 'privacypolicy',
    component: PrivacyPolicy,
  },
  {
    path: 'contactus',
    component: ContactUs,
  },
  {
    path: 'support',
    component: Support,
  },
  {
    path: '**',
    component: NotFoundLayout,
  },
];
