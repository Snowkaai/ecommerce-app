import { Component, inject, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ProductList } from '../../components/product-list/product-list';
import { Footer } from '../../components/footer/footer';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-shop-layout',
  imports: [Sidebar, ProductList],
  templateUrl: './shop-layout.html',
  styleUrl: './shop-layout.css',
})
export class ShopLayout {

  productService= inject(ProductService);
  search = signal('');


  Search(e:Event){
   const t = e.target as HTMLInputElement;
   this.productService.search.set(t.value);
   console.log(this.productService.filteredProducts());
  }

  change(e:string){
     this.productService.GetProductByCategory(e).subscribe({
      next:(data)=>this.productService.products.set(data),
      error: (err) => console.error(err)

     });
     console.log(this.productService.products());
     console.log(this.productService.filteredProducts());
  }
}
