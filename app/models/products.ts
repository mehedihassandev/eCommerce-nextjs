export interface IProductSpecification {
  color?: string | null;
  weight?: string | null;
  dimensions?: string | null;
  batteryLife?: string | null;
  connectivity?: string | null;
  range?: string | null;
  compatibility?: string | null;
  dpi?: string | null;
}

export interface IProduct {
  id?: number;
  name?: string;
  offerPrice?: number;
  price?: number;
  image?: string;
  category?: string;
  description?: string;
  brand?: string;
  details?: string;
  rating?: number;
  numberOfReviews?: number;
  specifications?: IProductSpecification;
}
