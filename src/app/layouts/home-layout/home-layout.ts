import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-home-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css',
})
export class HomeLayout implements OnInit {

  cartService = inject(CartService);
  productService = inject(ProductService);

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const userId = JSON.parse(userData).id;
    this.productService.GetAllProducts().subscribe({
      next: (products) => {
        this.cartService.loadCart(userId, products);
      },
    });
  }
}