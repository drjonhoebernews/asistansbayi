'use client';

import { Text } from '@/components/ui/text';
import { DatePicker } from '@/components/ui/datepicker';
import { Button } from '@/components/ui/button';
import { PhoneNumber } from '@/components/ui/phone-input';
import * as z from 'zod';
import { SubmitHandler, Controller } from 'react-hook-form';
import Select from '@/components/ui/select';
import { Form } from '@/components/ui/form';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Radio } from '@/components/ui/radio';
import { ActionIcon } from '@/components/ui/action-icon';
import Image from 'next/image';
import PencilIcon from '@/components/icons/pencil';
import OrderProducts from './order-products/order-products';

// Payment method option
const paymentOption = [
  {
    value: 'paypal',
    name: 'PayPal',
  },
  {
    value: 'skrill',
    name: 'Skrill',
  },
  {
    value: 'visa',
    name: 'Visa',
  },
  {
    value: 'mastercard',
    name: 'Mastercard',
  },
];

// shipping option
const shippingOption = [
  {
    value: 'ups',
    name: 'UPS',
  },
  {
    value: 'usps',
    name: 'USPS',
  },
  {
    value: 'fedex',
    name: 'FedEx',
  },
];

// form zod validation schema
const orderFormSchema = z.object({
  firstName: z.string().min(1, { message: 'This field is required' }),
  lastName: z.string().min(1, { message: 'This field is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Invalid phone number' })
    .optional(),
  companyName: z.string().min(1, { message: 'Company is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  addressOne: z.string().min(1, { message: 'Address one is required' }),
  addressTwo: z.string().optional(),
  zip: z.string().min(1, { message: 'ZIP is required' }),
  isSameShippingAddress: z.string().optional(),
  shippingAddressOne: z.string().optional(),
  shippingAddressTwo: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingCountry: z.string().optional(),
  shippingState: z.string().optional(),
  shippingZip: z.string().optional(),
  orderDate: z.date().min(new Date('1900-01-01')).optional(),
  paymentMethod: z.string().min(1, { message: 'Payment method is required' }),
  shippingMethod: z.string().min(1, { message: 'Shipping method is required' }),
});

// generate form types from zod validation schema
type OrderFormTypes = z.infer<typeof orderFormSchema>;

// main order form component for create and update order
export default function CreateOrder({
  id,
  order,
}: {
  id?: string;
  order?: OrderFormTypes;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<OrderFormTypes> = (data) => {
    // set timeout ony required to display loading state of the create order button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createOrder data ->', data);
      setReset({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        companyName: '',
        city: '',
        country: '',
        state: '',
        addressOne: '',
        addressTwo: '',
        zip: '',
        isSameShippingAddress: '',
        shippingAddressOne: '',
        shippingAddressTwo: '',
        shippingCity: '',
        shippingCountry: '',
        shippingState: '',
        shippingZip: '',
        orderDate: '',
        paymentMethod: '',
        shippingMethod: '',
      });
    }, 600);
  };

  return (
    <Form<OrderFormTypes>
      validationSchema={orderFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...order,
          isSameShippingAddress: 'SameShippingAddress',
        },
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, watch, formState: { errors } }) => {
        const checkIsSameShippingAddress = watch('isSameShippingAddress');
        return (
          <>
            <div className="items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
              <div className="flex-grow @5xl:col-span-8 @5xl:pb-10 @6xl:col-span-7">
                <div className="mb-9 overflow-hidden rounded-xl border border-gray-300">
                  <OrderProducts />
                  <div className="flex justify-between border-t border-gray-300 px-7 py-4 text-base font-semibold @5xl:mt-2 @5xl:py-5">
                    Total Cost: <span>$413.96</span>
                  </div>
                </div>
                <div className="">
                  <Text tag="h6" className="mb-6 font-semibold">
                    Billing Information
                  </Text>
                  <div className="grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5 @5xl:pb-10">
                    <Input
                      label="First Name"
                      placeholder="first name"
                      {...register('firstName')}
                      error={errors.firstName?.message}
                    />
                    <Input
                      label="Last Name"
                      placeholder="last name"
                      {...register('lastName')}
                      error={errors.lastName?.message}
                    />
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <PhoneNumber
                          label="Phone Number"
                          country="us"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    <Input
                      label="Company Name"
                      placeholder="company name"
                      {...register('companyName')}
                      error={errors.companyName?.message}
                    />
                    <Input
                      label="Address Line 1"
                      placeholder="address line 1"
                      {...register('addressOne')}
                      error={errors.addressOne?.message}
                    />
                    <Input
                      label="Address Line 2"
                      placeholder="address line 2"
                      {...register('addressTwo')}
                      error={errors.addressTwo?.message}
                    />
                    <Input
                      label="City"
                      placeholder="city"
                      {...register('city')}
                      error={errors.city?.message}
                    />
                    <Input
                      label="Country"
                      placeholder="country"
                      {...register('country')}
                      error={errors.country?.message}
                    />
                    <Input
                      label="Zip/Postcode"
                      placeholder="zip/postcode"
                      {...register('zip')}
                      error={errors.zip?.message}
                    />
                    <Input
                      label="State"
                      placeholder="state"
                      {...register('state')}
                      error={errors.state?.message}
                    />
                    <div className="col-span-2 flex flex-col space-y-5 pt-1">
                      <Radio
                        label="Shipping Address is the same as Billing Address"
                        value="SameShippingAddress"
                        {...register('isSameShippingAddress')}
                        inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
                      />
                      <Radio
                        label="Different Shipping Address"
                        value="DifferentShippingAddress"
                        {...register('isSameShippingAddress')}
                        inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
                      />
                    </div>
                  </div>

                  {checkIsSameShippingAddress ===
                    'DifferentShippingAddress' && (
                    <>
                      <Text
                        tag="h6"
                        className="mb-6 pt-9 font-semibold @5xl:pt-0"
                      >
                        Shipping Information
                      </Text>
                      <div className="grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5">
                        <Input
                          label="Address Line 1"
                          placeholder="address line 1"
                          {...register('shippingAddressOne')}
                          error={errors.shippingAddressOne?.message}
                        />
                        <Input
                          label="Address Line 2"
                          placeholder="address line 2"
                          {...register('shippingAddressTwo')}
                          error={errors.shippingAddressTwo?.message}
                        />
                        <Input
                          label="City"
                          placeholder="city"
                          {...register('shippingCity')}
                          error={errors.shippingCity?.message}
                        />
                        <Input
                          label="Country"
                          placeholder="country"
                          {...register('shippingCountry')}
                          error={errors.shippingCountry?.message}
                        />
                        <Input
                          label="Zip/Postcode"
                          placeholder="zip/postcode"
                          {...register('shippingZip')}
                          error={errors.shippingZip?.message}
                        />
                        <Input
                          label="State"
                          placeholder="state"
                          {...register('shippingState')}
                          error={errors.shippingState?.message}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="pb-7 pt-10 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3">
                <div className="rounded-xl border border-gray-300 p-5 @sm:p-6 @md:p-7">
                  <div className="relative border-b border-gray-300 pb-7">
                    <Text tag="h6" className="mb-6">
                      Customer Info
                    </Text>
                    <ActionIcon
                      className="absolute -top-1.5 end-0 z-10 text-gray-600 dark:text-gray-800"
                      rounded="full"
                      variant="flat"
                      size="sm"
                    >
                      <PencilIcon className="h-3.5 w-3.5" />
                    </ActionIcon>
                    <div className="flex">
                      <div className="relative aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-full @5xl:h-20 @5xl:w-20">
                        <Image
                          fill
                          src={
                            'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatar.png'
                          }
                          alt="avatar"
                          sizes="(max-width: 768px) 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="ps-4 @5xl:ps-6">
                        <Text tag="h6" className="mb-2.5 font-semibold">
                          Leslie Alexander
                        </Text>
                        <Text tag="p" className="mb-2 break-all last:mb-0">
                          nevaeh.simmons@example.com
                        </Text>
                        <Text tag="p" className="mb-2 last:mb-0">
                          (316) 555-0116
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-7 border-b border-gray-300 py-7">
                    <Text tag="h6">Order Details</Text>
                    <ActionIcon
                      className="absolute end-0 top-5 z-10 text-gray-600 dark:text-gray-800"
                      rounded="full"
                      variant="flat"
                      size="sm"
                    >
                      <PencilIcon className="h-3.5 w-3.5" />
                    </ActionIcon>
                    <Text
                      tag="p"
                      className="mt-3 flex flex-col font-semibold text-gray-700"
                    >
                      <span className="mb-2 font-normal">Order ID</span>{' '}
                      COMP1502
                    </Text>
                  </div>
                  <div className="space-y-4 @lg:space-y-5 @2xl:space-y-6">
                    <Controller
                      name="paymentMethod"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={paymentOption}
                          value={value}
                          onChange={onChange}
                          label="Payment Method"
                          error={errors?.paymentMethod?.message}
                          getOptionValue={(option) => option.name}
                        />
                      )}
                    />
                    <Controller
                      name="shippingMethod"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={shippingOption}
                          value={value}
                          onChange={onChange}
                          label="Shipping Method"
                          error={errors?.shippingMethod?.message}
                          getOptionValue={(option) => option.name}
                        />
                      )}
                    />
                    <Controller
                      name="orderDate"
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <DatePicker
                          inputProps={{ label: 'Order date' }}
                          placeholderText="Select Date"
                          dateFormat="dd/MM/yyyy"
                          onChange={onChange}
                          onBlur={onBlur}
                          wrapperClassName="w-full"
                          //@ts-ignore
                          selected={value}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 z-40 -mx-10 -mb-7 flex items-center justify-end gap-3 bg-gray-0/10 px-10 py-5 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col">
              <Button variant="outline" className="w-full @xl:w-auto">
                Save as Draft
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                {id ? 'Update' : 'Create'} Order
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
