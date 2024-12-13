import { IProduct } from '@/app/models/products';

export const getSpecifications = (product: IProduct) => [
  { label: 'Color', value: product?.specifications?.color },
  { label: 'Weight', value: product?.specifications?.weight },
  { label: 'Dimensions', value: product?.specifications?.dimensions },
  { label: 'Battery Life', value: product?.specifications?.batteryLife },
  { label: 'Connectivity', value: product?.specifications?.connectivity },
  { label: 'Range', value: product?.specifications?.range },
  { label: 'Compatibility', value: product?.specifications?.compatibility },
  { label: 'DPI', value: product?.specifications?.dpi },
];
