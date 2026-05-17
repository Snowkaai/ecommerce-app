import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '../../Models/IProduct';
import { interval, of, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-productcard',
  imports: [],
  templateUrl: './productcard.html',
  styleUrl: './productcard.css',
})
export class Productcard {
  @Input() product!: Product;

  currentIndex = signal(0);
  isFading = signal(false);

  router = inject(Router);
  // inject cart service to call addToCart
  cartService = inject(CartService);

  private hoverSubject = new Subject<boolean>();

  constructor() {
    this.hoverSubject
      .pipe(switchMap((isHovering) => (isHovering ? interval(2000) : of(null))))
      .subscribe((val) => {
        if (val !== null) {
          this.changeImageWithFade();
        } else {
          this.currentIndex.set(0);
        }
      });
  }

  private changeImageWithFade() {
    this.isFading.set(true);
    setTimeout(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.product.images.length);
      this.isFading.set(false);
    }, 300);
  }

  onMouseEnter() {
    this.hoverSubject.next(true);
  }

  onMouseLeave() {
    this.hoverSubject.next(false);
  }

  goToProduct() {
    this.router.navigate(['/main', 'shop', this.product.id]);
  }

  addToCart(event: MouseEvent) {
    event.stopPropagation();
    console.log('addToCart clicked');

    const userData = localStorage.getItem('user');
    console.log('userData:', userData);
    if (!userData){
      this.router.navigate(['/auth/login']);
      return;
    }

    const userId = JSON.parse(userData).id;
    console.log('userId:', userId);

    this.cartService.addToCart(userId, this.product);
    console.log('cart items after add:', this.cartService.cartItems());
  }
}