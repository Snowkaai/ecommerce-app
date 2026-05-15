import { Component, inject, numberAttribute, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Models/IProduct';
import { QueueAction } from 'rxjs/internal/scheduler/QueueAction';
import { ProductService } from '../../services/product-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-layout',
  imports: [NgClass],
  templateUrl: './product-layout.html',
  styleUrl: './product-layout.css',
})
export class ProductLayout {
  destinationId: Number | null = null;

  productService= inject(ProductService);
  
  product = signal<Product | null>(null);

  Quantity = signal<number>(1);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.destinationId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.GetProductById(Number(this.destinationId)).subscribe({
        next: (data) => {  
          this.product.set(data);      
          console.log(this.product);
        },
        error: (err) => console.error(err)
      });
  }

  addQuantity() {
    this.Quantity.update((num) => num + 1);
  }

  reduceQuantity() {
    this.Quantity.update((num) => {
      if (num > 0) {
        return num - 1;
      } else return num;
    });
  }
}
