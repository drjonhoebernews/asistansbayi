'use client';

import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data';
import { getWidgetColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { exportToCSV } from '@/utils/export-to-csv';
import TableLayout from '../table-layout';

const pageHeader = {
  title: 'Sticky Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Search',
    },
  ],
};

export default function StickyTablePage() {
  function handleExportData() {
    exportToCSV(
      orderData,
      'Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At',
      'order_data'
    );
  }

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      onExport={() => handleExportData()}
    >
      <BasicTableWidget
        title="Sticky Header"
        variant="minimal"
        data={orderData}
        // @ts-ignore
        getColumns={getWidgetColumns}
        enableSearch={false}
        sticky
        scroll={{ x: 1300, y: 760 }}
        pageSize={20}
        className="min-h-[480px] [&_.widget-card-header_h5]:font-medium"
      />
    </TableLayout>
  );
}
