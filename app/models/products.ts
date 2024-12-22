export interface IAmount {
  value: number;
  unit: string;
}

export interface IReview {
  rating?: string | null;
  numberOfReview?: string | null;
}

export interface IChannel {
  name?: string | null;
}

export interface IAttachment {
  imageUrl: string;
  videoUrl?: string | null;
}

export interface ICategory {
  name: string;
  description: string;
  lifecycleStatus: string;
  parentId?: string | null;
}

export interface ISpecifications {
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

export interface IPrice {
  taxCategory: string;
  taxRate: string;
  unit: string;
  value: number;
  dutyFreeAmount: IAmount;
  taxIncludedAmount: IAmount;
}

export interface IProductOfferingPrice {
  name: string;
  description?: string | null;
  isBundle?: string | null;
  lifecycleStatus?: string | null;
  recurringChargePeriodLength?: number | null;
  priceType?: number | null;
  version?: number | null;
  lastUpdate?: Date | null;
  percentage?: number | null;
  price: IPrice;
  unitOfMeasure: {
    amount: number;
    unit: string;
  };
  validFor?: {
    startDateTime?: Date | null;
    endDateTime?: Date | null;
  };
}

export interface IProduct {
  _id?: number;
  name: string;
  description: string;
  brand: string;
  details: string;
  version: string;
  lifecycleStatus: string;
  review?: IReview;
  category: ICategory;
  channel?: IChannel;
  specifications: ISpecifications;
  attachment: IAttachment;
  productOfferingPrice: IProductOfferingPrice;
  isSellable?: boolean;
  isBundle?: boolean | null;
  validFor?: {
    startDateTime?: Date | null;
    endDateTime?: Date | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
