import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogle {

  private auth = inject(Auth);

  //user observable (reactive)
  user$ = user(this.auth);

  // Login with Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Logout
  logout() {
    return signOut(this.auth);
  }

  // get current user snapshot
  getCurrentUser() {
    return this.auth.currentUser;
  }
}