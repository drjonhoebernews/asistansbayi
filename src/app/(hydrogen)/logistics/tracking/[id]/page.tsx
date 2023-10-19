import { useMemo } from 'react';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ShippingInfo from '@/app/shared/logistics/tracking/shipping-info';
import TrackingOverview from '@/app/shared/logistics/tracking/tracking-overview';
import TrackingHistory from '@/app/shared/logistics/tracking/tracking-history';

export default function TrackingPage({ params }: any) {
  const pageHeader = useMemo(() => {
    return {
      title: 'Tracking',
      breadcrumb: [
        {
          name: 'Logistics',
        },
        {
          href: routes.logistics.dashboard,
          name: 'Tracking',
        },
        {
          name: params.id,
        },
      ],
    };
  }, [params.id]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <TrackingOverview className="mb-10" />
      <ShippingInfo />
      <TrackingHistory />
    </>
  );
}
