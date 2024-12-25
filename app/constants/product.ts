import { IProduct } from '@/app/models/products';

export const getSpecifications = (product: IProduct) => [
  { label: 'Color', value: product?.specifications?.color || 'N/A' },
  { label: 'Weight', value: product?.specifications?.weight || 'N/A' },
  { label: 'Dimensions', value: product?.specifications?.dimensions || 'N/A' },
  {
    label: 'Battery Life',
    value: product?.specifications?.batteryLife || 'N/A',
  },
  {
    label: 'Connectivity',
    value: product?.specifications?.connectivity || 'N/A',
  },
  { label: 'Range', value: product?.specifications?.range || 'N/A' },
  {
    label: 'Compatibility',
    value: product?.specifications?.compatibility || 'N/A',
  },
  { label: 'DPI', value: product?.specifications?.dpi || 'N/A' },
  {
    label: 'Model Number',
    value: product?.specifications?.modelNumber || 'N/A',
  },
  { label: 'SKU', value: product?.specifications?.sku || 'N/A' },
  {
    label: 'Release Date',
    value: product?.specifications?.releaseDate || 'N/A',
  },
  { label: 'Warranty', value: product?.specifications?.warranty || 'N/A' },
  { label: 'Material', value: product?.specifications?.material || 'N/A' },
  { label: 'Storage', value: product?.specifications?.storage || 'N/A' },
];
