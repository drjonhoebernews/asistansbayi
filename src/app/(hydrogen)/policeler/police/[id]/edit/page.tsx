import { Metadata } from 'next';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreatePolice from '@/app/shared/policeler/police/create';
import ImportButton from '@/app/shared/import-button';

const pageHeader = {
  title: 'Poliçe Güncelle',
  breadcrumb: [
    {
      href: routes.police.policeList,
      name: 'Poliçe',
    },
    {
      name: 'Poliçe Güncelle',
    },
  ],
};


export const metadata: Metadata = {
  title: 'Poliçe Güncelle',
};

export default function EditPolicePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title={'Dosya Yükle'} />
      </PageHeader>

      <CreatePolice id={params.id} />
    </>
  );
}
