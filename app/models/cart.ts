import { IProduct } from './products';

export interface IAmount {
  value: number;
  unit: string;
}

export interface ICartItem {
  id: number;
  action: string;
  quantity: number;
  item: IProduct;
}
