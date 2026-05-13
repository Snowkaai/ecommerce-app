import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ProductList } from '../../components/product-list/product-list';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-shop-layout',
  imports: [Sidebar, ProductList],
  templateUrl: './shop-layout.html',
  styleUrl: './shop-layout.css',
})
export class ShopLayout {}
