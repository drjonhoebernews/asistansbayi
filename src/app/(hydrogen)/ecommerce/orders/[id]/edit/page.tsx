import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import Link from 'next/link';
import CreateOrder from '@/app/shared/ecommerce/order/create-order';

// TODO: Need added Order date default value

const pageHeader = {
  title: 'Edit Order',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      href: routes.eCommerce.orders,
      name: 'Orders',
    },
    {
      name: 'Edit',
    },
  ],
};

const orderData = {
  firstName: 'Smith',
  lastName: 'Row',
  phoneNumber: '880',
  companyName: 'RedQ',
  city: 'Dhaka',
  country: 'Bangladesh',
  state: 'Mirpur',
  addressOne: 'Rode no #10',
  addressTwo: '',
  zip: '1216',
  isSameShippingAddress: 'SameShippingAddress',
  shippingAddressOne: 'Rode no #10',
  shippingAddressTwo: '',
  shippingCity: 'Dhaka',
  shippingCountry: 'Bangladesh',
  shippingState: 'Mirpur',
  shippingZip: '2016',
  paymentMethod: 'PayPal',
  shippingMethod: 'USPS',
};

export default function EditOrderPage({ params }: any) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.eCommerce.orders}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button tag="span" className="w-full @lg:w-auto" variant="outline">
            Cancel
          </Button>
        </Link>
      </PageHeader>
      <CreateOrder id={params.id} order={orderData} />
    </>
  );
}
