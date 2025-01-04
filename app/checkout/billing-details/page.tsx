'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { Control, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { BiSolidOffer } from 'react-icons/bi';
import { MdDiscount } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  formFields,
  formValues,
  paymentMethods,
} from '@/app/constants/billing-details';
import { FORM_INPUT_TYPE } from '@/app/constants/from-input-type';
import { IBillingDetailsFormData } from '@/app/models/billing-details';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { Loader } from '@/components/loaders/loader';
import { RhfTextField } from '@/components/rhf-textfield/rhf-textfield';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';

export interface IFormFieldProps {
  field: {
    name: keyof IBillingDetailsFormData;
    inputType: string;
    options?: { label: string; value: string }[];
    placeholder?: string;
  };
  control: Control<IBillingDetailsFormData>;
}

const BillingDetails = () => {
  const navigate = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const [billingDetails, setBillingDetails] =
    useState<IBillingDetailsFormData>(formValues);

  const { resetCart } = useCartStore();

  const schema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    country: Yup.string().required('Country is required'),
    promo_code: Yup.string(),
  });

  const FormField = ({ field, control }: IFormFieldProps) => {
    const { name, inputType, options, placeholder } = field;

    const FormInputField =
      FORM_INPUT_TYPE[inputType as keyof typeof FORM_INPUT_TYPE];

    return (
      <div className="w-full">
        <FormInputField
          control={control}
          name={name as keyof IBillingDetailsFormData}
          options={options || []}
          placeholder={placeholder}
        />
      </div>
    );
  };

  const renderFields = (fieldNames: string[]) => {
    return formFields
      .filter((field) => fieldNames.includes(field.name))
      .map((field, index) => (
        <FormField key={index} field={field} control={control} />
      ));
  };

  const { control, handleSubmit, reset } = useForm<IBillingDetailsFormData>({
    resolver: yupResolver(
      schema,
    ) as unknown as Resolver<IBillingDetailsFormData>,
    defaultValues: formValues,
  });

  const handlePaymentMethod = (method: string) => {
    setBillingDetails((prevState) => ({
      ...prevState,
      paymentMethod: method,
    }));
    setSelectedMethod(method);
  };

  const onSubmit: SubmitHandler<IBillingDetailsFormData> = (data) => {
    setBillingDetails((prevState) => ({
      ...prevState,
      first_name: data.first_name,
      last_name: data.last_name,
      address: data.address,
      state: data.state,
      zip: data.zip,
      email: data.email,
      phone: data.phone,
      country: data.country,
      promo_code: data.promo_code,
    }));

    setIsSubmitted(true);
    setIsLoading(true);
    reset();
    resetCart();
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        navigate.push('/');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, navigate]);

  console.log('billingDetails:', billingDetails);

  return (
    <>
      {isLoading && <Loader variant="order" />}
      <ContentWrapper className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-[4fr_3fr] gap-16">
          {/* Left Section: Billing Details */}
          <div>
            <div className="mb-16">
              <h2 className="text-3xl font-playfair font-bold mb-8">
                Select Payment Method
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {paymentMethods.map((method, index) => (
                  <button
                    key={index}
                    className={cn(
                      'flex flex-col items-center justify-center p-4 h-32 w-full border border-b shadow-md hover:shadow-lg transition-shadow text-center text-base font-playfair font-bold rounded-md',
                      method.disable ? 'bg-slate-100 cursor-not-allowed' : '',
                      selectedMethod === method.name
                        ? 'bg-primary text-white'
                        : '',
                    )}
                    disabled={method.disable}
                    onClick={() => handlePaymentMethod(method.name)}
                  >
                    <div className="text-3xl pb-2">{method.icon}</div>
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-playfair font-bold mb-8">
              Billing Details
            </h2>
            <div className="flex gap-6 w-full mb-8">
              {renderFields(['first_name', 'last_name'])}
            </div>

            <div className="space-y-8 mb-8">
              {renderFields(['address', 'phone', 'email'])}
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
              {renderFields(['country', 'state', 'zip'])}
            </div>
          </div>

          {/* Right Section: Order Summary */}
          <div>
            <div className="border rounded-lg p-8 bg-gray-50 font-noto shadow-md pb-12">
              <h4 className="text-2xl font-semibold font-playfair pb-6">
                Discount and Payment
              </h4>
              <div className="flex justify-between text-base">
                <span className="flex items-center gap-2">
                  <BiSolidOffer className="w-5 h-5" /> Voucher
                </span>
                <span>-$10.00</span>
              </div>
              <div className="flex justify-between pt-2 text-base mb-6">
                <span className="flex items-center gap-2">
                  <MdDiscount className="w-5 h-5" /> Promo Code
                </span>
                <RhfTextField
                  control={control}
                  name="promo_code"
                  className="bg-gray-100"
                  placeholder="Enter Promo Code"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-4 font-playfair">
                Your Order
              </h2>
              <div className="flex justify-between py-2 font-noto text-base">
                <span>Items Total</span>
                <span>$ 50.00</span>
              </div>
              <div className="flex justify-between py-2 font-noto text-base">
                <span>Shipping and Handling</span>
                <span>$ 5.00</span>
              </div>
              <div className="flex justify-between py-2 font-noto text-base">
                <span>Shipping Discount</span>
                <span>-$ 1.00</span>
              </div>
              <div className="flex justify-between border-t pt-3 mt-4 font-noto text-base">
                <span className="font-bold">Order Total</span>
                <span className="font-bold">$ 54.00</span>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  className="w-44 text-white py-2 px-4 rounded-lg"
                  onClick={handleSubmit(onSubmit)}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default BillingDetails;
