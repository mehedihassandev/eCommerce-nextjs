import { IBillingDetailsFormData, IFormField } from '../models/billing-details';

export const formFields: IFormField[] = [
  {
    name: 'country',
    inputType: 'Select',
    placeholder: 'Select Country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'Mexico', value: 'mx' },
    ],
  },
  {
    name: 'first_name',
    inputType: 'TextField',
    placeholder: 'First Name *',
  },
  {
    name: 'last_name',
    inputType: 'TextField',
    placeholder: 'Last Name *',
  },
  {
    name: 'address',
    inputType: 'TextField',
    placeholder: 'Enter Your Address',
  },
  {
    name: 'state',
    inputType: 'Select',
    placeholder: 'Select State',
    options: [
      { label: 'California', value: 'ca' },
      { label: 'New York', value: 'ny' },
      { label: 'Texas', value: 'tx' },
    ],
  },
  {
    name: 'zip',
    inputType: 'TextField',
    placeholder: 'Enter Your Zip',
  },
  {
    name: 'email',
    inputType: 'TextField',
    placeholder: 'Enter Your Email',
  },
  {
    name: 'phone',
    inputType: 'TextField',
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
