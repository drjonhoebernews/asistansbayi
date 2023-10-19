import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CartTemplate from '@/app/shared/ecommerce/cart';

const pageHeader = {
  title: 'Cart',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      name: 'Cart',
    },
  ],
};

export default function CartPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CartTemplate />
    </>
  );
}
