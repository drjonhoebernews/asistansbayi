import { Metadata } from 'next';
import { PiPrinterBold, PiDownloadSimpleBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';
import AcenteDetails from "@/app/shared/logistics/shipment/details";


const pageHeader = {
  title: 'Acente Detayları',
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
      name: 'Acente Detayları',
    },
  ],
};

export const metadata: Metadata = {
  title: 'Acente Detayları',
};

export default function LogisticsListPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-6 flex items-center gap-4 @2xl:mt-0">
          <Button className="w-full gap-2 @lg:w-auto" variant="outline">
            <PiPrinterBold className="h-4 w-4" />
            Yazdır
          </Button>
          <Button className="w-full gap-2 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="h-4 w-4" />
            İndir
          </Button>
        </div>
      </PageHeader>

      <div className="mt-2 flex flex-col gap-y-6 @container sm:gap-y-10">
        <AcenteDetails id={params.id}/>
      </div>
    </>
  );
}
