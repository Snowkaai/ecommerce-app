import { Injectable } from '@angular/core';
//import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  checkout(cart: any[]) {
    return fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart })
    })
    .then(res => res.json())
    .then(data => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
      }
    });
  }
}