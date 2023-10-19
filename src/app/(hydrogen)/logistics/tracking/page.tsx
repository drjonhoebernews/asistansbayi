import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Tracking',
  breadcrumb: [
    {
      name: 'Home',
    },
    {
      href: routes.eCommerce.dashboard,
      name: 'E-Commerce',
    },
    {
      name: 'Tracking',
    },
  ],
};

export default function TrackingPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  );
}
