import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-shop-main-content',
  imports: [ProductList],
  templateUrl: './shop-main-content.html',
})
export class ShopMainContent {
  productService = inject(ProductService);

  Search(e: Event) {
    const t = e.target as HTMLInputElement;
    this.productService.search.set(t.value);
  }

  change(category: string) {
    this.productService.GetProductByCategory(category).subscribe({
      next: (data) => this.productService.products.set(data),
      error: (err) => console.error(err),
    });
  }
}
