'use client';

import { routes } from '@/config/routes';
import { invoiceData } from '@/data/invoice-data';
import { exportToCSV } from '@/utils/export-to-csv';
import InvoiceTable from '@/app/shared/invoice/invoice-list/table';
import TableLayout from '../table-layout';

const pageHeader = {
  title: 'Enhanced Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Enhanced',
    },
  ],
};

export default function EnhancedTablePage() {
  function handleExportData() {
    exportToCSV(
      invoiceData,
      'ID,Name,Username,Avatar,Email,Due Date,Amount,Status,Created At',
      'invoice_data'
    );
  }
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      onExport={() => handleExportData()}
    >
      <InvoiceTable data={invoiceData} />
    </TableLayout>
  );
}
