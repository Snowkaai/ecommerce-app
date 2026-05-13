import { Component } from '@angular/core';
import { Productcard } from '../productcard/productcard';

@Component({
  selector: 'app-product-list',
  imports: [Productcard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {}
