'use client';

import { useState } from 'react';
import { routes } from '@/config/routes';
import { productsData } from '@/data/products-data';
import { getColumns } from '@/app/shared/ecommerce/product/product-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { exportToCSV } from '@/utils/export-to-csv';
import TableLayout from '../table-layout';

const pageHeader = {
  title: 'Pagination Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Pagination',
    },
  ],
};

export default function PaginationTablePage() {
  const [pageSize, setPageSize] = useState(10);
  function handleExportData() {
    exportToCSV(
      productsData,
      'ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating',
      'product_data'
    );
  }

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      onExport={() => handleExportData()}
    >
      <BasicTableWidget
        title="Pagination Table"
        noGutter
        variant="modern"
        data={productsData}
        // @ts-ignore
        getColumns={getColumns}
        enableSearch={false}
        enablePagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        className="min-h-[480px] [&_.widget-card-header_h5]:font-medium"
      />
    </TableLayout>
  );
}
