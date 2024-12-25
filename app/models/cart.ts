import { IPrice, IProduct } from './products';

export interface IAmount {
  value: number;
  unit: string;
}

export interface IItemPrice {
  description?: string;
  name?: string;
  priceType?: string;
  recurringChargePeriod?: number | string;
  unitOfMeasure?: string;
  price?: IPrice;
  cart_item_price?: number;
  cart_item_total_price?: number;
}

export interface ICartItem {
  id: number;
  action: string;
  quantity: number;
  item: IProduct;
}
