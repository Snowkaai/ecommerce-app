import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Product, Review } from '../Models/IProduct';
import { baseURL } from '../Models/api';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http= inject(HttpClient);
  products= signal<Product[]>([]);
  //product! : Product;
  
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
      description:prod.description,
      price: prod.price,
      category: prod.category,
      images:prod.images,
      reviews:prod.reviews.map(
        (r:Review)=>({
          rating:r.rating,
          comment:r.comment,
          date:r.date
        })
      )
    })))
  )
}


GetProductById(id:number){
 return this.http.get<any>(baseURL + `/products/${id}`).pipe(
    map((data) => ({
      id: data.id,
      title: data.title,
      description:data.description,
      price: data.price,
      category: data.category,
      images:data.images,
      reviews:data.reviews.map(
        (r:Review)=>({
          rating:r.rating,
          comment:r.comment,
          date:r.date
        })
      )
    })))
}

GetProductByCategory(category:string){
   return this.http.get<any[]>(baseURL + `/products?category=${category}`).pipe(
    map((data) => data.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description:prod.description,
      price: prod.price,
      category: prod.category,
      images:prod.images,
      reviews:prod.reviews?.map(
        (r:Review)=>({
          rating:r.rating,
          comment:r.comment,
          date:r.date
        })
      )
    })))
  )
}


}
