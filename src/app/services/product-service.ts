import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../Models/IProduct';
import { baseURL } from '../Models/api';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http= inject(HttpClient);
  products= signal<Product[]>([]);

//   GetAllProducts(){
//   return this.http.get<any[]>(baseURL+'/products').subscribe({
//     next:(data)=>{
//      const mappedData:Product[] = data.map((prod)=>({
//       id:prod.id,
//       title:prod.title,
//       price:prod.price,
//       category:prod.category
//      }));

//      this.products.set(mappedData);
//      console.log(this.products());
//         },
//     error:(e)=>{ console.error(e); }
//   });
// }


 GetAllProducts() {
  return this.http.get<any[]>(baseURL + '/products').pipe(
    map((data) => data.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      category: prod.category
    })))
  ).subscribe({
    next: (data) => {        
      this.products.set(data); 
      console.log('Products received:', data);
    },
    error: (err) => console.error(err)
  });;
}
}
