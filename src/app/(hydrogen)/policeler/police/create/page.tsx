import { Metadata } from 'next';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreatePolice from '@/app/shared/policeler/police/create';
import { Button } from '@/components/ui/button';
import { PiUploadSimple } from 'react-icons/pi';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Poliçe Oluştur',
  breadcrumb: [
    {
      href: routes.police.policeList,
      name: 'Poliçe Listesi',
    },
    {
      name: 'Poliçe Oluştur',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Poliçe Oluştur',
};

export default function CreatePolicePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Police Dosyası'} />
      </PageHeader>

      <CreatePolice />
    </>
  );
}
