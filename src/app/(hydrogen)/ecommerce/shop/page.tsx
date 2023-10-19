'use client';

import dynamic from 'next/dynamic';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { PiSliders } from 'react-icons/pi';
import ProductFeed from '@/app/shared/ecommerce/shop/product-feed';
const ShopFilters = dynamic(
  () => import('@/app/shared/ecommerce/shop/shop-filters'),
  {
    ssr: false,
  }
);

const pageHeader = {
  title: 'Shop',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      name: 'Shop',
    },
  ],
};

export default function ShopPage() {
  const { openDrawer } = useDrawer();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button
          className="mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          onClick={() =>
            openDrawer({
              view: <ShopFilters />,
              placement: 'right',
            })
          }
        >
          <PiSliders className="me-1 h-4 w-4 rotate-90" />
          Filters
        </Button>
      </PageHeader>

      <ProductFeed />
    </>
  );
}
