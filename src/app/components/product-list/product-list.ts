import { Component } from '@angular/core';
import { Productcard } from '../productcard/productcard';
import { Product } from '../../Models/IProduct';

@Component({
  selector: 'app-product-list',
  imports: [Productcard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productArr: Product[] = [
    {
      category: 'clothes',
      id: 1,
      images: ['images/tshirt.jpg', 'images/tshirt2.jpg', 'images/tshirt3.jpg'],
      price: 100,
      reviews: [],
      title: 'Generic Tshirt',
    },
    {
      category: 'clothes',
      id: 1,
      images: ['images/tshirt.jpg', 'images/tshirt2.jpg', 'images/tshirt3.jpg'],
      price: 100,
      reviews: [],
      title: 'Generic Tshirt',
    },
    {
      category: 'clothes',
      id: 1,
      images: ['images/tshirt.jpg', 'images/tshirt2.jpg', 'images/tshirt3.jpg'],
      price: 100,
      reviews: [],
      title: 'Generic Tshirt',
    },
  ];
}
