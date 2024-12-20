import { Schema, model, models } from 'mongoose';

const ProductSpecificationSchema = new Schema(
  {
    color: { type: 'string', default: null },
    weight: { type: 'string', default: null },
    dimensions: { type: 'string', default: null },
    batteryLife: { type: 'string', default: null },
    connectivity: { type: 'string', default: null },
    range: { type: 'string', default: null },
    compatibility: { type: 'string', default: null },
    dpi: { type: 'string', default: null },
  },
  {
    timestamps: true,
  },
);

const ProductSchema = new Schema(
  {
    name: { type: 'string', required: true },
    offerPrice: { type: 'number', required: true },
    price: { type: 'number', required: true },
    image: { type: 'string', required: true },
    category: { type: 'string', required: true },
    description: { type: 'string', required: true },
    brand: { type: 'string', required: true },
    details: { type: 'string', required: true },
    rating: { type: 'number', required: true },
    numberOfReviews: { type: 'number', required: true },
    specifications: { type: ProductSpecificationSchema, required: true },
  },
  {
    timestamps: true,
  },
);

const Product = models.Products || model('Products', ProductSchema);

export default Product;
