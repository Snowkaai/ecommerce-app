import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../../Models/IOrder';

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

  http = inject(HttpClient);

  
 ngOnInit(): void {
  const cartSnapshot = JSON.parse(localStorage.getItem('Cart') || '[]');
  const totalSnapshot = parseFloat(localStorage.getItem('Total') || '0');

  this.http.get<any>(`http://localhost:3000/users/${this.userId}`).subscribe({
    next: (user) => {
      const newOrder: Order = {
        id: uuidv4(),
        items: cartSnapshot,
        total: totalSnapshot,
        orderDate: new Date()
      };

      const oldOrders = user.orders || [];
      const newOrders = [...oldOrders, newOrder];

      this.http.patch(`http://localhost:3000/users/${this.userId}`, {
        orders: newOrders,
        cart: []
      }).subscribe({
        next: () => {
          localStorage.removeItem('Cart');  
          localStorage.removeItem('Total');
          this.cartService.clearCart(this.userId);
        }
      });
    }
  });
}

}