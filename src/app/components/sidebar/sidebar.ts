import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { WishlistService } from '../../services/wishlist-service';
import { Authservice } from '../../services/authservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  wishlistService = inject(WishlistService);
  user = inject(Authservice);

  getWishlist() {
    const currentUser = this.user.currentUser();
    if (currentUser) {
      this.wishlistService.GetWishlist(currentUser);
    }
  }

  productserv = inject(ProductService);

  getShopVerseChoices() {
    this.productserv.ShopVerseChoice.set(true);
    this.productserv.GetShopVerseChoice().subscribe({
      next: (data) => this.productserv.products.set(data),
    });
  }
  AllItems() {
    this.productserv.ShopVerseChoice.set(false);
    this.productserv.GetAllProducts().subscribe({
      next: (data) => this.productserv.products.set(data),
    });
  }

  ngOnInit() {
    this.AllItems();
  }
}
