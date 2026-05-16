import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-app');

  productService=inject(ProductService);

  ngOnInit(){
  //   this.productService.GetAllProducts();
  //   this.productService.GetProductById(1);
  //   this.productService.GetProductById(2);
  //   this.productService.GetProductByCategory("beauty")
  // .subscribe({
  //   next: (data) => {this.productService.products.set(data);
  //     console.log(this.productService.products());
  //   },
  //   error: (err) => console.error(err)
  // });
  }
  
}
