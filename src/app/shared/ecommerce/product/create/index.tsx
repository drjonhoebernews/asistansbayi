'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';
import FormNav, {
  formParts,
} from '@/app/shared/ecommerce/product/create/form-nav';
import ProductSummary from '@/app/shared/ecommerce/product/create/product-summary';
import {
  defaultValues,
  productFormSchema,
  CreateProductInput,
} from '@/app/shared/ecommerce/product/create/form-utils';
import ProductMedia from '@/app/shared/ecommerce/product/create/product-media';
import PricingInventory from '@/app/shared/ecommerce/product/create/pricing-inventory';
import ProductIdentifiers from '@/app/shared/ecommerce/product/create/product-identifiers';
import ShippingInfo from '@/app/shared/ecommerce/product/create/shipping-info';
import ProductSeo from '@/app/shared/ecommerce/product/create/product-seo';
import DeliveryEvent from '@/app/shared/ecommerce/product/create/delivery-event';
import ProductVariants from '@/app/shared/ecommerce/product/create/product-variants';
import ProductTaxonomies from '@/app/shared/ecommerce/product/create/product-tags';
import FormFooter from '@/components/form-footer';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
  [formParts.media]: ProductMedia,
  [formParts.pricingInventory]: PricingInventory,
  [formParts.productIdentifiers]: ProductIdentifiers,
  [formParts.shipping]: ShippingInfo,
  [formParts.seo]: ProductSeo,
  [formParts.deliveryEvent]: DeliveryEvent,
  [formParts.variantOptions]: ProductVariants,
  [formParts.tagsAndCategory]: ProductTaxonomies,
};

interface IndexProps {
  id?: string;
  product?: CreateProductInput;
  className?: string;
}

export default function CreateProduct({ id, product, className }: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateProductInput>({
    defaultValues: defaultValues(product),
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit: SubmitHandler<CreateProductInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('product_data', data);
      toast.success(
        <Text tag="b">Product successfully {id ? 'updated' : 'created'}</Text>
      );
      methods.reset();
    }, 600);
  };

  return (
    <div className="@container">
      <FormNav />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('[&_label.block>span]:font-medium', className)}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
