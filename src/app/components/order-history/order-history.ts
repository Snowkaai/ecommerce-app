import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Order } from '../../Models/IOrder';
import { appuser } from '../../Models/User';

@Component({
  selector: 'app-order-history',
  imports: [DatePipe],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory implements OnInit {
  http = inject(HttpClient);
  userId = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}').id
    : null;

  orders = signal<Order[]>([]);
  
  ngOnInit(): void {
    this.http.get<appuser>(`http://localhost:3000/users/${this.userId}`).subscribe({
      next: (user) => {
        this.orders.set(user.orders || []);
        console.log('Fetched orders:', this.orders());
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }
}