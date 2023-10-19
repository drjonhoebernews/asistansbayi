import { Metadata } from 'next';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateShipment from '@/app/shared/logistics/shipment/create';
import { Button } from '@/components/ui/button';
import { PiUploadSimple } from 'react-icons/pi';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Acente Oluştur',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Yönetim',
    },
    {
      href: routes.logistics.shipmentList,
      name: 'Kullanıcı Ağı',
    },
    {
      name: 'Acente Oluştur',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Acente Oluştur',
};

export default function CreateShipmentPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Acente Dosyası'} />
      </PageHeader>

      <CreateShipment />
    </>
  );
}
