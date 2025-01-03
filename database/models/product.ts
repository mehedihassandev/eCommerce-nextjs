import { model, models, Schema } from 'mongoose';

const ImageSchema = new Schema({
  absUrl: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: null,
  },
});

const VariationValueSchema = new Schema({
  color: {
    type: String,
    required: false,
    default: null,
  },
  memorySize: {
    type: String,
    required: false,
    default: null,
  },
});

const VariantSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  variationValues: {
    type: [VariationValueSchema],
    required: false,
    default: [],
  },
});

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  reviewerEmail: {
    type: String,
    required: true,
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
    type: String,
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

const PriceSchema = new Schema({
  taxCategory: {
    type: String,
    required: true,
  },
  taxRate: {
    type: String,
    required: true,
  },
  totalAmount: {
    unit: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
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
    details: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    isSellable: {
      type: Boolean,
      required: false,
      default: null,
    },
    isBundle: {
      type: Boolean,
      required: false,
      default: null,
    },
    lifecycleStatus: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    image: {
      type: ImageSchema,
      required: true,
    },
    imageGroups: {
      type: [ImageSchema],
      required: false,
      default: [],
    },
    variants: {
      type: [VariantSchema],
      required: false,
      default: [],
    },
    review: {
      type: [ReviewSchema],
      required: false,
      default: [],
    },
    specifications: {
      type: SpecificationSchema,
      required: true,
    },
    price: {
      type: PriceSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = models.Products || model('Products', ProductSchema);

export default Product;
