'use client';

import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import InvoiceDetails from '@/app/shared/invoice/invoice-details';
import PageHeader from '@/app/shared/page-header';
import { PiDownloadSimpleBold, PiPrinterBold } from 'react-icons/pi';

const pageHeader = {
  title: 'Invoice Details',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Details',
    },
  ],
};

export default function InvoiceDetailsPage({ params }: any) {
  function handlePrint() {
    console.log('write print logic');
  }
  console.log('Invoice Details Page ID', params.id);
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            onClick={() => handlePrint()}
            variant="outline"
            className="w-full @lg:w-auto"
          >
            <PiPrinterBold className="me-1.5 h-[17px] w-[17px]" />
            Print
          </Button>
          <Button className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>

      <InvoiceDetails />
    </>
  );
}
