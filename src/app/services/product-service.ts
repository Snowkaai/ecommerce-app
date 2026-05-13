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
  product! : Product;

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
      category: prod.category,
      images:prod.images
    })))
  ).subscribe({
    next: (data) => {        
      this.products.set(data); 
      console.log(this.products());
    },
    error: (err) => console.error(err)
  });
}


GetProductById(id:number){
 return this.http.get<any>(baseURL + `/products/${id}`).pipe(
    map((data) => ({
      id: data.id,
      title: data.title,
      price: data.price,
      category: data.category,
      images:data.images
    })))
    .subscribe({
    next: (data) => {  
      this.product=data;      
      console.log(data);
    },
    error: (err) => console.error(err)
  });
}
}
