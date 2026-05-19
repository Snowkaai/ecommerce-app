import { Product } from './IProduct';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}
