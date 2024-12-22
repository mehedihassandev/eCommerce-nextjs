import { model, models, Schema } from 'mongoose';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lifecycleStatus: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    required: false,
    default: null,
  },
});

const SpecificationSchema = new Schema({
  color: {
    type: String,
    required: false,
    default: null,
  },
  weight: {
    type: String,
    required: false,
    default: null,
  },
  dimensions: {
    type: String,
    required: false,
    default: null,
  },
  batteryLife: {
    type: String,
    required: false,
    default: null,
  },
  connectivity: {
    type: String,
    required: false,
    default: null,
  },
  range: {
    type: String,
    required: false,
    default: null,
  },
  compatibility: {
    type: String,
    required: false,
    default: null,
  },
  dpi: {
    type: String,
    required: false,
    default: null,
  },
  modelNumber: {
    type: Number,
    required: false,
    default: null,
  },
  sku: {
    type: String,
    required: false,
    default: null,
  },
  releaseDate: {
    type: String,
    required: false,
    default: null,
  },
  warranty: {
    type: String,
    required: false,
    default: null,
  },
  material: {
    type: String,
    required: false,
    default: null,
  },
  storage: {
    type: String,
    required: false,
    default: null,
  },
});

const AttachmentSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: false,
    default: null,
  },
});

const PriceSchema = new Schema({
  taxCategory: {
    type: String,
    required: true,
  },
  taxRate: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  dutyFreeAmount: {
    unit: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  taxIncludedAmount: {
    unit: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
});

const ProductOfferingPriceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
  isBundle: {
    type: String,
    required: false,
    default: null,
  },
  lifecycleStatus: {
    type: String,
    required: false,
    default: null,
  },
  recurringChargePeriodLength: {
    type: Number,
    required: false,
    default: null,
  },
  priceType: {
    type: Number,
    required: false,
    default: null,
  },
  version: {
    type: Number,
    required: false,
    default: null,
  },
  lastUpdate: {
    type: Date,
    required: false,
    default: null,
  },
  percentage: {
    type: Number,
    required: false,
    default: null,
  },
  price: {
    type: PriceSchema,
    required: true,
  },
  unitOfMeasure: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  validFor: {
    startDateTime: {
      type: Date,
      required: false,
      default: null,
    },
    endDateTime: {
      type: Date,
      required: false,
      default: null,
    },
  },
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    lifecycleStatus: {
      type: String,
      required: true,
    },
    review: {
      rating: {
        type: String,
        required: false,
        default: null,
      },
      numberOfReview: {
        type: String,
        required: false,
        default: null,
      },
    },
    category: {
      type: CategorySchema,
      required: true,
    },
    channel: {
      name: {
        type: String,
        required: false,
        default: null,
      },
    },
    specifications: {
      type: SpecificationSchema,
      required: true,
    },
    attachment: {
      type: AttachmentSchema,
      required: true,
    },
    productOfferingPrice: {
      type: ProductOfferingPriceSchema,
      required: true,
    },
    isSellable: {
      type: Boolean,
      required: false,
    },
    isBundle: {
      type: Boolean,
      default: null,
    },
    validFor: {
      startDateTime: {
        type: Date,
        required: false,
        default: null,
      },
      endDateTime: {
        type: Date,
        required: false,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Product = models.Products || model('Products', ProductSchema);

export default Product;
