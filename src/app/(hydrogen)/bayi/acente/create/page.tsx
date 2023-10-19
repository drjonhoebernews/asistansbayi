import { Metadata } from 'next';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateBayi from '@/app/shared/bayi/bayi/create';
import { Button } from '@/components/ui/button';
import { PiUploadSimple } from 'react-icons/pi';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Bayi Oluştur',
  breadcrumb: [
    {
      href: routes.bayi.dashboard,
      name: 'Yönetim',
    },
    {
      href: routes.bayi.bayiList,
      name: 'Bayi Listesi',
    },
    {
      name: 'Bayi Oluştur',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Bayi Oluştur',
};

export default function CreateBayiPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Bayi Dosyası'} />
      </PageHeader>

      <CreateBayi />
    </>
  );
}
