import { IBillingDetailsFormData, IFormField } from '../models/billing-details';

export const formFields: IFormField[] = [
  {
    name: 'country',
    inputType: 'Select',
    label: 'Country *',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'Mexico', value: 'mx' },
    ],
  },
  {
    name: 'first_name',
    inputType: 'TextField',
    label: 'First Name *',
    placeholder: 'John',
  },
  {
    name: 'last_name',
    inputType: 'TextField',
    label: 'Last Name *',
    placeholder: 'Doe',
  },
  {
    name: 'address',
    inputType: 'TextField',
    label: 'Address',
    placeholder: 'Enter Your Address',
  },
  {
    name: 'state',
    inputType: 'Select',
    label: 'State *',
    options: [
      { label: 'California', value: 'ca' },
      { label: 'New York', value: 'ny' },
      { label: 'Texas', value: 'tx' },
    ],
  },
  {
    name: 'zip',
    inputType: 'TextField',
    label: 'Zip *',
    placeholder: 'Enter Your Zip',
  },
  {
    name: 'email',
    inputType: 'TextField',
    label: 'Email *',
    placeholder: 'Enter Your Email',
  },
  {
    name: 'phone',
    inputType: 'TextField',
    label: 'Phone',
    placeholder: 'Enter Your Phone Number',
  },
];

export const paymentMethods = [
  { name: 'Credit/Debit Card', icon: '💳', disable: false },
  { name: 'bKash', icon: '🦅', disable: false },
  { name: 'Nagad', icon: '📱', disable: false },
  { name: 'Installment', icon: '📅', disable: true },
  { name: 'DBBL Nexus Card', icon: '🏦', disable: true },
  { name: 'Rocket', icon: '🚀', disable: true },
  { name: 'Cash On Delivery', icon: '💵', disable: false },
];

export const formValues: IBillingDetailsFormData = {
  first_name: '',
  last_name: '',
  address: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  country: '',
  promo_code: '',
};
