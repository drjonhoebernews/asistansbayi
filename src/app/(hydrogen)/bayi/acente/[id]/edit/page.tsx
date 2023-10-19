import { Metadata } from 'next';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateShipment from '@/app/shared/bayi/bayi/create';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Bayi Güncelle',
  breadcrumb: [
    {
      href: routes.bayi.dashboard,
      name: 'Yönetim',
    },
    {
      href: routes.bayi.bayiList,
      name: 'Bayi',
    },
    {
      name: 'Bayi Güncelle',
    },
  ],
};


export const metadata: Metadata = {
  title: 'Bayi Güncelle',
};

export default function EditShipmentsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Dosya Yükle'} />
      </PageHeader>

      <CreateShipment id={params.id} />
    </>
  );
}
