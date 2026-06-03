import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { appuser } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  http = inject(HttpClient);
  url = 'https://localhost:7186/api/User';
  currentUser = signal<appuser | null>(null);

  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    const user = localStorage.getItem('user');

    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }
  //-----------------------------------------------------------------

  signup(user: appuser) {
    var obj = {
      id: user.id,
      userName: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    };
    // return this.http.post(this.url, user);
    console.log(obj);
    return this.http.post(this.url, obj);
  }

  //-----------------------------------------------------------------
  // getUserByEmail(email: string) {
  //   return this.http.get<any[]>(`${this.url}?email=${email}`);
  // }
  login(_email: string, _password: string) {
    return this.http.post<any>(`https://localhost:7186/api/User/login`, {
      email: _email,
      password: _password,
    });
  }

  setUser(user: appuser) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'fake-token');
    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.currentUser.set(null);
  }
}
