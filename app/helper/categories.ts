import { ICategory } from '../models/products';

export const getCategoriesOption = (categories: ICategory[]) => {
  return categories?.map((category: ICategory) => ({
    label: category.name,
    value: category.name,
  }));
};
