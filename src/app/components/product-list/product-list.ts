import { Component, inject } from '@angular/core';
import { Productcard } from '../productcard/productcard';
import { Product } from '../../Models/IProduct';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-list',
  imports: [Productcard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  productService = inject(ProductService);


  ngOnInit(){
    this.productService.GetAllProducts().subscribe({
        next: (data) => {        
          this.productService.products.set(data); 
          console.log(this.productService.products());
        },
        error: (err) => console.error(err)
      });;
  }
  // productArr: Product[] = [
  //   {
  //     category: 'clothes',
  //     id: 1,
  //     description:"ebsdjf",
  //     images: ['images/tshirt.jpg', 'images/tshirt2.jpg', 'images/tshirt3.jpg'],
  //     price: 100,
  //     reviews: [],
  //     title: 'Generic Tshirt',
  //   },
  //   {
  //     category: 'clothes',
  //     id: 1,
  //     description:"ebsdjf",
  //     images: ['images/tshirt.jpg', 'images/tshirt2.jpg', 'images/tshirt3.jpg'],
  //     price: 100,
  //     reviews: [],
  //     title: 'Generic Tshirt',
  //   },
  //   {
  //     category: 'clothes',
  //     id: 1,
  //     description:"ebsdjf",
  //     images: ['images/tshirt.jpg', 'images/tshirt2.jpg', 'images/tshirt3.jpg'],
  //     price: 100,
  //     reviews: [],
  //     title: 'Generic Tshirt',
  //   },
  // ];
}
