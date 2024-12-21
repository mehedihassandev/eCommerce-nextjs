'use client';

import { useState } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  formFields,
  formValues,
  paymentMethods,
} from '@/app/constants/billing-details';
import { IBillingDetailsFormData } from '@/app/models/billing-details';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { RhfRadio } from '@/components/rhf-radio/rhf-radio';
import { RhfSelect } from '@/components/rhf-select/rhf-select';
import { RhfTextField } from '@/components/rhf-textfield/rhf-textfield';
import { Button } from '@/components/ui/button';

const formInputFieldType = {
  TextField: RhfTextField,
  Select: RhfSelect,
};

const BillingDetails = () => {
  const [billingDetails, setBillingDetails] =
    useState<IBillingDetailsFormData>(formValues);

  const schema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.string().required('Zip is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    country: Yup.string().required('Country is required'),
    paymentMethod: Yup.string().required('Payment Method is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBillingDetailsFormData>({
    resolver: yupResolver(
      schema,
    ) as unknown as Resolver<IBillingDetailsFormData>,
    defaultValues: formValues,
  });

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
      paymentMethod: data.paymentMethod,
    }));

    reset();
  };

  console.log('billingDetails', billingDetails);
  console.log('errors', errors);

  return (
    <ContentWrapper className="mt-20">
      <div className="grid grid-cols-[6fr_3fr] gap-16">
        {/* Left Section: Billing Details */}
        <div>
          <h2 className="text-4xl font-playfair font-semibold mb-6">
            Billing Details
          </h2>
          <div className="flex gap-6 w-full mb-4">
            {formFields
              .filter(
                (field) =>
                  field.name === 'first_name' || field.name === 'last_name',
              )
              .map((field, index) => {
                const { name, label, inputType, options, placeholder } = field;

                const FormInputField =
                  formInputFieldType[
                    inputType as keyof typeof formInputFieldType
                  ];

                return (
                  <div key={index} className="w-full">
                    <FormInputField
                      control={control}
                      name={name as keyof IBillingDetailsFormData}
                      label={label}
                      options={options || []}
                      placeholder={placeholder}
                      width="100&"
                    />
                  </div>
                );
              })}
          </div>

          <div className="space-y-4">
            {formFields
              .filter(
                (field) =>
                  field.name === 'address' ||
                  field.name === 'phone' ||
                  field.name === 'email',
              )
              .map((field, index) => {
                const { name, label, inputType, options, placeholder } = field;

                const FormInputField =
                  formInputFieldType[
                    inputType as keyof typeof formInputFieldType
                  ];

                return (
                  <FormInputField
                    key={index}
                    control={control}
                    name={name as keyof IBillingDetailsFormData}
                    label={label}
                    options={options || []}
                    placeholder={placeholder}
                  />
                );
              })}
          </div>

          <div className="flex gap-6 w-full mt-6">
            {formFields
              .filter(
                (field) =>
                  field.name === 'country' ||
                  field.name === 'state' ||
                  field.name === 'zip',
              )
              .map((field, index) => {
                const { name, label, inputType, options, placeholder } = field;

                const FormInputField =
                  formInputFieldType[
                    inputType as keyof typeof formInputFieldType
                  ];

                return (
                  <div key={index} className="w-full">
                    <FormInputField
                      key={index}
                      control={control}
                      name={name as keyof IBillingDetailsFormData}
                      label={label}
                      options={options || []}
                      placeholder={placeholder}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div>
          <h2 className="text-4xl font-semibold mb-6 font-playfair">
            Your Order
          </h2>
          <div className="border rounded-lg p-4 bg-gray-50 font-noto">
            <div className="flex justify-between py-2">
              <span>Nice Dress × 1</span>
              <span>$50.00</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping and Handling</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t py-2">
              <span className="font-bold">Order Total</span>
              <span className="font-bold">$50.00</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4 font-playfair">
            Payment Method
          </h2>
          <div className="space-y-2">
            <RhfRadio
              control={control}
              name="paymentMethod"
              options={paymentMethods}
            />
          </div>

          <Button
            className="w-full mt-6 text-white py-2 px-4 rounded-lg"
            onClick={handleSubmit(onSubmit)}
          >
            Place Order
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default BillingDetails;
