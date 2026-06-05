import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { Product } from '../../Models/IProduct';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification-service';
import { Notfound } from '../../pages/notfound/notfound';
import { WishlistService } from '../../services/wishlist-service';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.html',
})
export class Productdetails {

wishlistService=inject(WishlistService);
user=inject(Authservice)

addToWishlist(productId: number) {
  const currentUser = this.user.currentUser();
  if (!currentUser) return;
    if (this.isInWishlist(productId)) {
    this.wishlistService.RemoveFromWishlist(Number(productId), currentUser);
  } else {
    this.wishlistService.AddToWishlist(Number(productId), currentUser);
  }
}

isInWishlist(productId: number) {
  return this.user.currentUser()?.wishlist.includes(Number(productId));
}


  notify = inject(NotificationService);
  productService = inject(ProductService);
  cartService = inject(CartService);

  product = signal<Product | null>(null);
  Quantity = signal<number>(1);

  router = inject(Router);
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.GetProductById(id).subscribe({
      next: (data) => {
        this.product.set(data);
      },
      error: (err) => console.error(err),
    });
  }

  addQuantity() {
    this.Quantity.update((num) => num + 1);
  }

  reduceQuantity() {
    this.Quantity.update((num) => {
      if (num > 1) {
        return num - 1;
      }
      return num;
    });
  }

  addToCart(event: MouseEvent) {
    event.stopPropagation();
    const currentProduct = this.product();
    if (!currentProduct) return;

    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const userId = JSON.parse(userData).id;

    for (let i = 0; i < this.Quantity(); i++) {
      this.cartService.addToCart(userId, currentProduct);
    }
    this.notify.success('Item Added to Cart', 2000);
  }
}
