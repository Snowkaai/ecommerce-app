import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { AuthGoogle } from '../../services/auth-google';
import { appuser } from '../../Models/User';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  authService = inject(Authservice);
  authGoogle = inject(AuthGoogle);
  router = inject(Router);
  notify = inject(NotificationService);

  user = {
    email: '',
    password: '',
  };

  onLogin(form: any) {
    if (form.invalid) return;
    this.authService.getUserByEmail(this.user.email).subscribe((res) => {
      if (res.length === 0) {
        this.notify.error('Invalid Email/Password');
        return;
      }
      const user: appuser = res[0];

      if (user.password !== this.user.password) {
        this.notify.error('Invalid Email/Password');
        return;
      }

      this.authService.setUser(user);

      this.router.navigate(['/']);
      this.notify.success('Logged In Successfully', 3000);
    });
  }

  async login() {
    try {
      await this.authGoogle.loginAndSaveUser(this.authService);

      this.router.navigate(['/']);
      this.notify.success('Logged In Successfully', 3000);
    } catch (err) {
      console.log(err);
    }
  }

  goToSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
