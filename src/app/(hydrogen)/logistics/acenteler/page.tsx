import { Metadata } from 'next';
import ShipmentStats from '@/app/shared/logistics/shipment/shipment-stats';
import ShipmentListTable from '@/app/shared/logistics/shipment/list/table';
import ShipmentPageHeader from '@/app/(hydrogen)/logistics/acenteler/page-header';

export const metadata: Metadata = {
  title: 'Acente Listesi',
};

export default function LogisticsListPage() {
  return (
    <>
      <ShipmentPageHeader />
      <div className="flex flex-col gap-10">
        <ShipmentStats />
        <ShipmentListTable />
      </div>
    </>
  );
}
