import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header {
logout() {
this.authServcie.logout();
}
  authServcie=inject(Authservice);
  cartService = inject(CartService);
}
