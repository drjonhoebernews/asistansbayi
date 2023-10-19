import { Text } from '@/components/ui/text';
import Image from 'next/image';
import cn from '@/utils/class-names';
import OrderViewProducts from './order-products/order-view-products';
import { PiCheckBold } from 'react-icons/pi';

const orderStatus = [
  { id: 1, label: 'Order Pending' },
  { id: 2, label: 'Order Processing' },
  { id: 3, label: 'Order At Local Facility' },
  { id: 4, label: 'Order Out For Delivery' },
  { id: 5, label: 'Order Completed' },
];

const transitions = [
  {
    id: 1,
    paymentMethod: {
      name: 'MasterCard',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/master.png',
    },
    price: '$1575.00',
  },
  {
    id: 2,
    paymentMethod: {
      name: 'PayPal',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/paypal.png',
    },
    price: '$75.00',
  },
  {
    id: 2,
    paymentMethod: {
      name: 'Stripe',
      image:
        'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/payment/stripe.png',
    },
    price: '$375.00',
  },
];

const currentOrderStatus = 3;

function WidgetCard({
  title,
  className,
  children,
  childrenWrapperClass,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
  childrenWrapperClass?: string;
}) {
  return (
    <div className={className}>
      <Text
        tag="h3"
        className="mb-3.5 text-base font-semibold @5xl:mb-5 4xl:text-lg"
      >
        {title}
      </Text>
      <div
        className={cn(
          'rounded-lg border border-gray-200 px-5 @sm:px-7 @5xl:rounded-xl',
          childrenWrapperClass
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function OrderView() {
  return (
    <>
      <div className="flex flex-wrap justify-center border-b border-t border-gray-300 py-4 font-medium text-gray-700 @5xl:justify-start">
        <span className="my-2 border-r border-gray-200 px-5 py-0.5 first:ps-0 last:border-r-0">
          October 22, 2022 at 10:30 pm
        </span>
        <span className="my-2 border-r border-gray-200 px-5 py-0.5 first:ps-0 last:border-r-0">
          7 Items
        </span>
        <span className="my-2 border-r border-gray-200 px-5 py-0.5 first:ps-0 last:border-r-0">
          Total $1234.00
        </span>
        <span className="my-2 ms-5 rounded-3xl border-r border-gray-200 bg-green-lighter px-2.5 py-1 text-xs text-green-dark first:ps-0 last:border-r-0">
          Paid
        </span>
      </div>
      <div className="items-start pt-10 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <div className="space-y-7 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          <div className="">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">
              Notes About Order
            </span>
            <div className="min-h-[120px] rounded-xl border border-gray-200 px-5 pt-3 text-sm leading-[1.85]">
              Hi James, I just noticed you’ve been with redq.io for 2 years.
              Thank you for trusting in us. I hope we keep meeting your
              expectations. We’ve recently restocked our tees, sending one
              along. Hope you like it
            </div>
          </div>
          <div className="pb-5">
            <OrderViewProducts />
            <div className="border-t border-gray-200 pt-7 @5xl:mt-3">
              <div className="ms-auto max-w-lg space-y-6">
                <div className="flex justify-between font-medium">
                  Subtotal <span>$5,569.98</span>
                </div>
                <div className="flex justify-between font-medium">
                  Store Credit <span>$20.00</span>
                </div>
                <div className="flex justify-between font-medium">
                  Subtotal <span>$25.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-5 text-base font-semibold">
                  Total <span>$5,882.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <Text
              tag="h3"
              className="mb-3.5  text-base font-semibold @5xl:mb-5 @7xl:text-lg"
            >
              Transactions
            </Text>

            <div className="space-y-4">
              {transitions.map((item) => (
                <div
                  key={item.paymentMethod.name}
                  className="flex items-center justify-between rounded-lg border border-gray-100 px-5 py-5 font-medium shadow-sm transition-shadow hover:shadow-md @5xl:px-7"
                >
                  <div className="flex w-1/3 items-center">
                    <div className="shrink-0">
                      <Image
                        src={item.paymentMethod.image}
                        alt={item.paymentMethod.name}
                        height={60}
                        width={60}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col ps-4">
                      <Text tag="span" className="font-lexend text-gray-700">
                        Payment
                      </Text>
                      <span className="pt-1 text-[13px] font-normal text-gray-500">
                        Via {item.paymentMethod.name}
                      </span>
                    </div>
                  </div>

                  <div className="w-1/3 text-end">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <div className="mb-3.5 @5xl:mb-5">
              <Text tag="h3" className="text-base font-semibold @7xl:text-lg">
                Balance
              </Text>
            </div>
            <div className="space-y-6 rounded-xl border border-gray-200 px-5 py-6 @5xl:space-y-7 @5xl:p-7">
              <div className="flex justify-between font-medium">
                Total Order <span>$5275.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Total Return <span>$350.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Paid By Customer <span>$3000.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Refunded <span>$350.00</span>
              </div>
              <div className="flex justify-between font-medium">
                Balance <span>$4975.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-7 pt-8 @container @5xl:col-span-4 @5xl:space-y-10 @5xl:pt-0 @6xl:col-span-3">
          <WidgetCard
            title="Order Status"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="ms-2 w-full space-y-7 border-s-2 border-gray-100">
              {orderStatus.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "relative ps-6 text-sm font-medium before:absolute before:-start-[9px] before:top-px before:h-5 before:w-5 before:-translate-x-px before:rounded-full before:bg-gray-100 before:content-[''] after:absolute after:-start-px after:top-5  after:h-10 after:w-0.5  after:content-[''] last:after:hidden",
                    currentOrderStatus > item.id
                      ? 'before:bg-primary after:bg-primary'
                      : 'after:hidden',
                    currentOrderStatus === item.id && 'before:bg-primary'
                  )}
                >
                  {currentOrderStatus >= item.id ? (
                    <span className="absolute -start-1.5 top-1 text-white">
                      <PiCheckBold className="h-auto w-3" />
                    </span>
                  ) : null}

                  {item.label}
                </div>
              ))}
            </div>
          </WidgetCard>

          <WidgetCard
            title="Customer Details"
            childrenWrapperClass="py-5 @5xl:py-8 flex"
          >
            <div className="relative aspect-square h-16 w-16 shrink-0 @5xl:h-20 @5xl:w-20">
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
              <Text
                tag="h3"
                className="mb-2.5 text-base font-semibold @7xl:text-lg"
              >
                Leslie Alexander
              </Text>
              <Text tag="p" className="mb-2 break-all last:mb-0">
                nevaeh.simmons@example.com
              </Text>
              <Text tag="p" className="mb-2 last:mb-0">
                (316) 555-0116
              </Text>
            </div>
          </WidgetCard>

          <WidgetCard
            title="Shipping Address"
            childrenWrapperClass="@5xl:py-6 py-5"
          >
            <Text
              tag="h3"
              className="mb-2.5 text-base font-semibold @7xl:text-lg"
            >
              Leslie Alexander
            </Text>
            <Text tag="p" className="mb-2 leading-loose last:mb-0">
              1780 Angus Road, New York, New York, 10022, US
            </Text>
          </WidgetCard>
          <WidgetCard
            title="Billing Address"
            childrenWrapperClass="@5xl:py-6 py-5"
          >
            <Text
              tag="h3"
              className="mb-2.5 text-base font-semibold @7xl:text-lg"
            >
              Leslie Alexander
            </Text>
            <Text tag="p" className="mb-2 leading-loose last:mb-0">
              1780 Angus Road, New York, New York, 10022, US
            </Text>
          </WidgetCard>
        </div>
      </div>
    </>
  );
}
