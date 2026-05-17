//   "id": "YHpE09KPAm8",
//   "name": "Ahmed",
//   "email": "a@gmail.com",
// "phone":
//   "password": "123456",
//   "cart": CartItem[]
//   "Wishlist" : int[] ==>products
//   "Orders" : DoneOrder[] => {cartitem[] , total , date}

import { CartItem } from './ICartItem';

export interface appuser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  photo?: string;
  provider?: 'local' | 'google';
  cart: CartItem[];
  wishlist: number[];
  // Order:
}
