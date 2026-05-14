import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  http = inject(HttpClient);
  url = 'http://localhost:3000/users';

  signup(user: any) {
    return this.http.post(this.url, user);
  }
getUserByEmail(email: string) {
  return this.http.get<any[]>(
    `${this.url}?email=${email}`
  );}
  login(email: string, password: string) {
    return this.http.get<any[]>(
      `${this.url}?email=${email}&password=${password}`
    );
  }
}
