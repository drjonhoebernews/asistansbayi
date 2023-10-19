import { Metadata } from 'next';
import PoliceStats from '@/app/shared/policeler/police/bayi-stats';
import PoliceListTable from '@/app/shared/policeler/police/list/table';
import PolicePageHeader from '@/app/(hydrogen)/policeler/police/page-header';

export const metadata: Metadata = {
  title: 'Poliçe Listesi',
};

export default function PoliceListPage() {
  return (
    <>
      <PolicePageHeader />
      <div className="flex flex-col gap-10">
        <PoliceStats />
        <PoliceListTable />
      </div>
    </>
  );
}
