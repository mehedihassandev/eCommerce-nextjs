export interface IBillingDetailsFormData {
  first_name: string;
  last_name: string;
  address: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  country: string;
  promo_code: string;
}

export interface IFormField {
  name: keyof IBillingDetailsFormData;
  inputType: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
}
