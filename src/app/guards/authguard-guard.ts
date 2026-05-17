import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

export const authguardGuard: CanActivateFn = (route, state) => {
  const authServcie = inject(Authservice);
  const router = inject(Router);
  if(authServcie.currentUser()){
    return true;
  }
  else{
    router.navigate(['/auth/login']);
    return false;
  }
  
};
