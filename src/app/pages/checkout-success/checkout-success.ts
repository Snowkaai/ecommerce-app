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
  userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').id : null;
  cartService = inject(CartService);
  ngOnInit(): void {
    this.cartService.clearCart(this.userId);
  }
}
