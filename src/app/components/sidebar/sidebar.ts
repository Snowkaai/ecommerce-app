import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
})
export class Sidebar {
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
