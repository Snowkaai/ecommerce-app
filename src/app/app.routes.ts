import { Routes } from '@angular/router';
import { HomeLayout } from './layouts/home-layout/home-layout';
import { NotFoundLayout } from './layouts/not-found-layout/not-found-layout';
import { Signup } from './components/signup/signup';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { ShopLayout } from './layouts/shop-layout/shop-layout';
import { Login } from './components/login/login';
import { TermsOfUse } from './components/terms-of-use/terms-of-use';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { ContactUs } from './components/contact-us/contact-us';
import { Support } from './components/support/support';
import { Cart } from './components/cart/cart';
import { LandingPageLayout } from './pages/landing-page-layout/landing-page-layout';
import { Productdetails } from './components/productdetails/productdetails';
import { authguardGuard } from './guards/authguard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: HomeLayout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: LandingPageLayout,
      },
      {
        path: 'shop',
        component: ShopLayout,
      },
      {
        path: 'shop/:id',
        component: Productdetails,
      },
      {
        path: 'cart',
        canActivate:[authguardGuard],
        component: Cart,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: '',
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
