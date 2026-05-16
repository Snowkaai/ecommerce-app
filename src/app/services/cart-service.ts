import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../Models/IProduct';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/users';

  cartItems = signal<CartItem[]>([]);

  itemCount = computed(() => {
    let total = 0;
    for (let item of this.cartItems()) {
      total += item.quantity;
    }
    return total;
  });

  subtotal = computed(() => {
    let sum = 0;
    for (let item of this.cartItems()) {
      if (item.product && item.product.price) {
        sum += item.product.price * item.quantity;
      }
    }
    return sum;
  });

  shipping = computed(() => {
    return this.subtotal() > 0 ? 10 : 0;
  });

  total = computed(() => {
    return this.subtotal() + this.shipping();
  });

  loadCart(userId: string, products: Product[]) {
    this.http.get<any>(`${this.baseUrl}/${userId}`).subscribe({
      next: (user) => {
        const cartWithProducts: CartItem[] = [];

        for (let item of user.cart || []) {
          const matchedProduct = products.find((p) => {
            return String(p.id) === String(item.productId);
          });

          cartWithProducts.push({
            ...item,
            product: matchedProduct,
          });
        }

        this.cartItems.set(cartWithProducts);
      },
    });
  }

  addToCart(userId: string, product: Product) {
    const existingItem = this.cartItems().find((item) => {
      return String(item.productId) === String(product.id);
    });

    if (existingItem) {
      const updatedItems = this.cartItems().map((item) => {
        if (String(item.productId) === String(product.id)) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      this.cartItems.set(updatedItems);

    } else {
      const newCartItem: CartItem = {
        id: uuidv4(),
        productId: String(product.id),
        quantity: 1,
        product: product,
      };

      const updatedItems = [...this.cartItems(), newCartItem];
      this.cartItems.set(updatedItems);
    }

    this.saveCart(userId);
  }

  updateQuantity(userId: string, itemId: string, newQuantity: number) {
    if (newQuantity < 1) {
      this.removeFromCart(userId, itemId);
      return;
    }

    const updatedItems = this.cartItems().map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    this.cartItems.set(updatedItems);
    this.saveCart(userId);
  }

  removeFromCart(userId: string, itemId: string) {
    const filteredItems = this.cartItems().filter((item) => item.id !== itemId);
    this.cartItems.set(filteredItems);
    this.saveCart(userId);
  }

  clearCart(userId: string) {
    this.cartItems.set([]);
    this.saveCart(userId);
  }

  saveCart(userId: string) {
    const cartToSave = this.cartItems().map((item) => {
      return {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    this.http.patch(`${this.baseUrl}/${userId}`, { cart: cartToSave }).subscribe({
      error: (err) => {
        console.error('could not save cart', err);
      },
    });
  }
}