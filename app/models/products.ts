export interface IAmount {
  value: number;
  unit: string;
}

export interface IReview {
  _id: string;
  rating?: number;
  comment?: string;
  date?: Date;
  reviewerName?: string;
  reviewerEmail?: string;
}

export interface ICategory {
  _id: string;
  name?: string;
  lifecycleStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISpecifications {
  _id?: string;
  color?: string | null;
  weight?: string | null;
  dimensions?: string | null;
  batteryLife?: string | null;
  connectivity?: string | null;
  range?: string | null;
  compatibility?: string | null;
  dpi?: string | null;
  modelNumber?: number | null;
  sku?: string | null;
  releaseDate?: string | null;
  warranty?: string | null;
  material?: string | null;
  storage?: string | null;
}

interface IPrice {
  _id: string;
  taxCategory?: string;
  taxRate?: string;
  unit?: string;
  totalAmount?: number;
  dutyFreeAmount?: IAmount;
  taxIncludedAmount?: IAmount;
}

interface IImage {
  _id?: string;
  absUrl?: string;
  alt?: string;
  title?: string | null;
}

interface IVariantValues {
  color?: string | null;
  memorySize?: string | null;
}

interface IVariants {
  productId: string;
  variationValues?: IVariantValues[];
}

export interface IProduct {
  _id?: string;
  name?: string;
  description?: string;
  brand?: string;
  version?: string;
  isSellable?: boolean;
  isBundle?: boolean | null;
  lifecycleStatus?: string;
  categories?: ICategory[];
  image?: IImage;
  imageGroups?: IImage[];
  variants?: IVariants[];
  review?: IReview[];
  specifications?: ISpecifications;
  price?: IPrice;
  createdAt?: Date;
  updatedAt?: Date;
}
