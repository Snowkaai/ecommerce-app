import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-checkout-success',
  imports: [RouterLink],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.css',
})
export class CheckoutSuccess {
  userId = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}').id
    : null;
  cartService = inject(CartService);
  ngOnInit(): void {
    // Inject User Service
    // Add to user Orders current Cart + date in new object ==> order
    // new order => {cartservice.cart ....}
    this.cartService.clearCart(this.userId);
  }
}
