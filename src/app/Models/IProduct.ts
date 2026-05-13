export interface Product{
    id : number,
    title:string,
    price:number,
    category:string,
    images:string[]
    reviews:Review[]
}

export interface Review{
    rating:number,
    comment:string,
    date:string
} 