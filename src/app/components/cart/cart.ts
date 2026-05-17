import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { CommonModule } from '@angular/common';
import { StripeService } from '../../services/stripe';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartService = inject(CartService);
  router = inject(Router);
  stripeService = inject(StripeService);

  userId: string | null = null;

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.userId = user.id || user.uid;
    }
  }

  updateQty(itemId: string, quantity: number) {
    if (this.userId) {
      this.cartService.updateQuantity(this.userId, itemId, quantity);
    }
  }

  remove(itemId: string) {
    if (this.userId) {
      this.cartService.removeFromCart(this.userId, itemId);
    }
  }

checkout() {
  const cartForStripe = this.cartService.cartItems().map((item) => ({
    name: item.product?.title,
    price: item.product?.price,
    quantity: item.quantity,
    image: item.product?.images?.[0],
  }));


  this.stripeService.checkout(cartForStripe);
}



  backToShop() {
    this.router.navigate(['/main/shop']);
  }

  
}
