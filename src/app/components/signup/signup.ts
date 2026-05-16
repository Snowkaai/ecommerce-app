import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthGoogle } from '../../services/auth-google';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './signup.html',
})
export class Signup {
  authService = inject(Authservice);
  router = inject(Router);
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  // notification = inject(NotificationService);
  get f() {
    return this.signupForm.controls;
  }
  private authGoogle = inject(AuthGoogle);

  async login() {
    try {
      await this.authGoogle.loginAndSaveUser(this.authService);
      localStorage.setItem('status', this.authService.isLoggedIn().toString());

      this.router.navigate(['/']);
    } catch (err) {
      console.log(err);
    }
  }
  onSignup() {
    if (this.signupForm.invalid) return;

    const data = this.signupForm.value;

    if (data.password !== data.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    console.log('Signup Data:', this.signupForm);
    const email = data.email ?? '';

    const user = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
    };
    this.authService.getUserByEmail(email).subscribe((res) => {
      if (res.length > 0) {
        //alert("Email already exists");
        // this.notification.show('Email already exists', 'warning');
        return;
      }
      this.authService.signup(user).subscribe(() => {
        //alert("User created successfully");
        // this.notification.show('User created successfully', 'success');

        this.router.navigate(['/auth/login']);
      });
    });

    // API call here
  }
}
