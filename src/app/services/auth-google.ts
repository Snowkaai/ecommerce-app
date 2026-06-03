import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Authservice } from './authservice';
import { appuser } from '../Models/User';

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
  async loginAndSaveUser(authService: Authservice) {
    const res = await this.loginWithGoogle();

    const firebaseUser = res.user;

    const token = await firebaseUser.getIdToken();

    const email = firebaseUser.email ?? '';

    const newUser: appuser = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName ?? 'Google User',
      email: firebaseUser.email!,
      photo: firebaseUser.photoURL!,
      phone: firebaseUser.phoneNumber!,
      wishlist: [],
      cart: [],
      orders: [],
      provider: 'google',
    };

    console.log('Inside AuthGoogleService');
    console.log(user);

    authService
      .signup(newUser)

      .subscribe(() => {
        authService.setUser(newUser);

        localStorage.setItem('token', token);
      });
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
