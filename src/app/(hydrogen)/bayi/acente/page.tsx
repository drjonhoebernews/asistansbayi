import { Metadata } from 'next';
import BayiStats from '@/app/shared/bayi/bayi/bayi-stats';
import BayiListTable from '@/app/shared/bayi/bayi/list/table';
import BayiPageHeader from '@/app/(hydrogen)/bayi/acente/page-header';

export const metadata: Metadata = {
  title: 'Bayi Listesi',
};

export default function LogisticsListPage() {
  return (
    <>
      <BayiPageHeader />
      <div className="flex flex-col gap-10">
        <BayiStats />
        <BayiListTable />
      </div>
    </>
  );
}
