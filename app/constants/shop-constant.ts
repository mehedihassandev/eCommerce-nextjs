export const DefaultShopFilterValues = {
  name: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  category: '',
};

export const filterParamsFields = [
  { name: 'name', inputType: 'TextField', label: 'Name' },
  { name: 'brand', inputType: 'TextField', label: 'Brand' },
  { name: 'minPrice', inputType: 'TextField', label: 'Min Price' },
  { name: 'maxPrice', inputType: 'TextField', label: 'Max Price' },
  { name: 'category', inputType: 'Select', label: 'Category' },
];
