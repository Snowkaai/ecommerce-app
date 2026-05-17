import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  http = inject(HttpClient);
  url = 'http://localhost:3000/users';
  currentUser = signal<any | null>(null);

  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    const user = localStorage.getItem('user');

    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  signup(user: any) {
    return this.http.post(this.url, user);
  }
  getUserByEmail(email: string) {
    return this.http.get<any[]>(`${this.url}?email=${email}`);
  }
  login(email: string, password: string) {
    return this.http.get<any[]>(`${this.url}?email=${email}&password=${password}`);
  }
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

    this.currentUser.set(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.currentUser.set(null);
  }
}
