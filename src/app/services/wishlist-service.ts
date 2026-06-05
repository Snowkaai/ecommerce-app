import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { WishlistItems } from '../Models/wishlist';
import { baseURL } from '../Models/api';
import { Authservice } from './authservice';
import { Product } from '../Models/IProduct';
import { ProductService } from './product-service';
import { appuser } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
http = inject(HttpClient);
user = inject(Authservice);
productService= inject(ProductService);
WishlistItems=signal<number[]|null>([]);


GetWishlist(currentUser: appuser) {
  const products: Product[] = [];

  this.WishlistItems.set(currentUser.wishlist);

  for (let item of currentUser.wishlist) {
    this.productService.GetProductById(item).subscribe({
      next: (prod) => {
        products.push(prod);
        if (products.length === currentUser.wishlist.length) {
          this.productService.products.set(products);
        }
        console.log(this.productService.filteredProducts());
      },
      error: (err) => console.error(err),
    });
  }
}

AddToWishlist(productId: number, currentUser: appuser) {
  productId=Number(productId);
  const updatedWishlist = [...currentUser.wishlist, productId];

  this.http.patch<appuser>(`${baseURL}/users/${currentUser.id}`, { wishlist: updatedWishlist }).subscribe({
    next: (user) => {
      const updatedUser = { ...currentUser, wishlist: updatedWishlist };
      this.user.currentUser.set(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser)); 
      console.log(user.wishlist);
    },
    error: (err) => console.error(err),
  });
}

RemoveFromWishlist(productId: number, currentUser: appuser) {
  const updatedWishlist = currentUser.wishlist.filter((id) => id !== productId);

  this.http.patch<appuser>(baseURL + `/users/${currentUser.id}`, { wishlist: updatedWishlist }).subscribe({
      next: (user) => {
      const updatedUser = { ...currentUser, wishlist: updatedWishlist };
      this.user.currentUser.set(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser)); 
      console.log(user.wishlist);
    },
    error: (err) => console.error(err),
  });
}
}
