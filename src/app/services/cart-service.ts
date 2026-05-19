import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../Models/ICartItem';
import { Product } from '../Models/IProduct';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/users';

  cartItems = signal<CartItem[]>([]);

  getItemCount():number{
    let total = 0;
    for (let item of this.cartItems()) {
      total += item.quantity;
    }
    return total;
  } 

  getSubtotal(): number {
    let sum = 0;
    for (let item of this.cartItems()) {
      if (item.product && item.product.price) {
        sum += item.product.price * item.quantity;
      }
    }
   return Math.round(sum * 100) / 100;
  }

  shipping: number = 10;

  getTotal(): number {
    return Math.round((this.getSubtotal() + this.shipping) * 100) / 100;
  }

loadCart(userId: string, products: Product[]) {
  this.http.get<any>(`${this.baseUrl}/${userId}`).subscribe((user) => {

    let loadedCart: CartItem[] = [];
    for (let item of user.cart || []) {
      let product = products.find((p) => p.id == item.productId);
      loadedCart.push({...item,product: product});
    }
    this.cartItems.set(loadedCart);
  });
}
addToCart(userId: string, product: Product) {
  let found = false;
  let updatedCart = this.cartItems().map((item) => {
    if (item.productId == String(product.id)) {
      found = true;
      return {...item,quantity: item.quantity + 1};
    }
    return item;
  });
  if (!found) {
    let newItem: CartItem = {
      id: uuidv4(),
      productId: String(product.id),
      quantity: 1,
      product: product
    };
    updatedCart.push(newItem);
  }

  this.cartItems.set(updatedCart);
  this.saveCart(userId);
}

updateQuantity(userId: string, itemId: string, newQuantity: number) {
  if (newQuantity < 1) {
    this.removeFromCart(userId, itemId);
    return;
  }
  let updatedCart = this.cartItems().map((item) => {
    if (item.id == itemId) {
      item.quantity = newQuantity;
    }
    return item;
  });

  this.cartItems.set(updatedCart);
  this.saveCart(userId);
}

removeFromCart(userId: string, itemId: string) {
  let updatedCart = this.cartItems().filter((item) => {
    return item.id != itemId;
  });
  this.cartItems.set(updatedCart);
  this.saveCart(userId);
}

clearCart(userId: string) {
  this.cartItems.set([]);
  this.saveCart(userId);
}

saveCart(userId: string) {
  let cart = this.cartItems().map((item) => {
    return {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product
    };
  });

  this.http.patch(`${this.baseUrl}/${userId}`, {
    cart: cart
  }).subscribe();
}
}