import Link from 'next/link';
import { routes } from '@/config/routes';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import OrderProducts from './order-products';

type OrderSummeryProps = {
  subtotal: number | string;
  tax?: number | string;
  shipping?: number | string;
  total: number | string;
};

export default function OrderSummery({
  tax,
  subtotal,
  shipping,
  total,
}: OrderSummeryProps) {
  return (
    <div className="sticky top-24 mt-8 @5xl:col-span-4 @5xl:mt-0 @6xl:col-span-3 2xl:top-28">
      <Text tag="h4" className="mb-3 font-semibold">
        Your Order
      </Text>
      <div className="rounded-lg border border-gray-200 p-4 @xs:p-6 @5xl:rounded-none @5xl:border-none @5xl:px-0">
        <div className="flex justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 pb-4 @xs:pb-6">
          Ordered items
          <Link href={routes.eCommerce.cart}>
            <Button
              tag="span"
              variant="text"
              className="h-auto w-auto p-0 text-primary underline hover:text-gray-1000"
            >
              Edit Cart
            </Button>
          </Link>
        </div>
        <div className="pt-4 @xl:pt-6">
          <OrderProducts className="mb-5 border-b border-gray-200 pb-5" />
          <div className="mb-4 flex items-center justify-between last:mb-0">
            Subtotal
            <Text tag="span" className="font-medium text-gray-900">
              {subtotal}
            </Text>
          </div>
          {tax ? (
            <div className="mb-4 flex items-center justify-between last:mb-0">
              Tax
              <Text tag="span" className="font-medium text-gray-900">
                {tax}
              </Text>
            </div>
          ) : null}
          {shipping ? (
            <div className="mb-4 flex items-center justify-between last:mb-0">
              Shipping
              <Text tag="span" className="font-medium text-gray-900">
                {shipping}
              </Text>
            </div>
          ) : null}
          <div className="flex items-center justify-between border-t border-gray-200 py-4 text-base font-bold text-gray-1000">
            Total
            <Text>{total}</Text>
          </div>
          <Button
            type="submit"
            className="mt-3 w-full text-base @md:h-12 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
