import { Metadata } from 'next';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateSatis from '@/app/shared/satislar/satis/create';
import { Button } from '@/components/ui/button';
import { PiUploadSimple } from 'react-icons/pi';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Satış Yap',
  breadcrumb: [
    {
      href: routes.satislar.satisList,
      name: 'Satış Listesi',
    },
    {
      name: 'Satış Yap',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Satış Yap',
};

export default function CreateSatisPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Satış Dosyası'} />
      </PageHeader>

      <CreateSatis />
    </>
  );
}
