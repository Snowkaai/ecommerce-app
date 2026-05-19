import { CartItem } from './ICartItem';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  orderDate: Date;
}
