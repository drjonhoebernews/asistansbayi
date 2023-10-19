import { Metadata } from 'next';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateShipment from '@/app/shared/logistics/shipment/create';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Acente Güncelle',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Yönetim',
    },
    {
      href: routes.logistics.shipmentList,
      name: 'Acente',
    },
    {
      name: 'Acente Güncelle',
    },
  ],
};


export const metadata: Metadata = {
  title: 'Acente Güncelle',
};

export default function EditShipmentsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Import File'} />
      </PageHeader>

      <CreateShipment id={params.id} />
    </>
  );
}
