'use client';

import Image from 'next/image';
import { Text } from '@/components/ui/text';
import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { PiCheckCircleFill, PiQuestionFill } from 'react-icons/pi';
import { shippingMethodData, shippingSpeedData } from '@/data/checkout-data';

export default function ShippingMethod({ register, checkShippingSpeed }: any) {
  return (
    <div className="mt-10 @5xl:mt-12">
      <Text tag="h4" className="mb-3.5 font-semibold @2xl:mb-5">
        Shipping Method
      </Text>
      <div className="rounded-lg border border-gray-200">
        <div className="p-4 @xs:p-6 @2xl:flex @2xl:items-start @2xl:justify-between @2xl:gap-6">
          <div className="block @5xl:pe-8">
            <Text tag="h4" className="mb-2.5 text-base font-medium">
              Standard Shipping
            </Text>
            <Text tag="p">
              Estimated delivery in 3-5 business days after order is shipped.
            </Text>
          </div>
          <div className="-m-1 mt-2 flex shrink-0 @xs:mt-4 @md:gap-3 @2xl:mt-0 [&_label]:m-1">
            {shippingMethodData.map((item) => (
              <AdvancedRadio
                key={item.id}
                value={item.value}
                {...register('shippingMethod')}
                className="flex h-full shrink-0 items-center overflow-hidden rounded border border-gray-200/80 hover:cursor-pointer hover:border-gray-600 peer-checked:border-gray-900 peer-checked:ring-[0.5px] peer-checked:ring-gray-900"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  height={45}
                  width={60}
                />
              </AdvancedRadio>
            ))}
          </div>
        </div>

        {checkShippingSpeed && (
          <div className="w-full flex-grow border-t border-gray-200 p-4  @xs:p-6 ">
            <Text className="flex items-center gap-1">
              Select your shipping speed
              <PiQuestionFill className="w-4" />
            </Text>
            <div className="grid grid-cols-1 gap-3 pt-4 @xl:grid-cols-2 @xl:gap-4">
              {shippingSpeedData.map((item) => (
                <AdvancedRadio
                  key={item.id}
                  value={item.speed}
                  defaultChecked={item.checked}
                  {...register('shippingSpeed')}
                  className="relative h-full rounded-lg border border-gray-200 p-4 px-5 hover:cursor-pointer hover:border-gray-600 peer-checked:border-gray-900"
                  inputClassName="[&:checked~span>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-gray-1000 [&:checked~span]:!border-gray-1000"
                >
                  <span className="block">
                    <Text
                      tag="h6"
                      className="mb-1 block font-lexend text-sm font-medium"
                    >
                      {item.title}
                    </Text>
                    <Text
                      tag="span"
                      className="block pe-8 font-normal leading-[1.85]"
                    >
                      {item.description}
                    </Text>
                  </span>
                  <PiCheckCircleFill className="icon absolute right-4 top-4 hidden h-6 w-6 text-gray-1000 @2xl:right-6 @2xl:top-6 rtl:left-4 rtl:right-auto @xs:rtl:left-6" />
                </AdvancedRadio>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
