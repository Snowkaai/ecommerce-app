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

    authService
      .getUserByEmail(email)

      .subscribe((users) => {
        // new user
        if (users.length === 0) {
          const newUser: appuser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName ?? 'Google User',
            email: firebaseUser.email!,
            photo: firebaseUser.photoURL!,
            phone: firebaseUser.phoneNumber!,
            wishlist: [],
            cart: [],
            provider: 'google',
          };

          authService
            .signup(newUser)

            .subscribe(() => {
              authService.setUser(newUser);

              localStorage.setItem('token', token);
            });
        }

        // existing user
        else {
          authService.setUser(users[0]);

          localStorage.setItem('token', token);
        }
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
