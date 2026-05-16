import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Models/IProduct';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-layout',
  imports: [],
  templateUrl: './product-layout.html',
  styleUrl: './product-layout.css',
})
export class ProductLayout {

  productService = inject(ProductService);
  cartService = inject(CartService);

  product = signal<Product | null>(null);
  Quantity = signal<number>(1);

  constructor(private route: ActivatedRoute) { }

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
    if (!userData) return;

    const userId = JSON.parse(userData).id;

    for (let i = 0; i < this.Quantity(); i++) {
      this.cartService.addToCart(userId, currentProduct);
    }
  }
}