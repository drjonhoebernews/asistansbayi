import { Metadata } from 'next';
import SatisStats from '@/app/shared/satislar/satis/bayi-stats';
import SatisListTable from '@/app/shared/satislar/satis/list/table';
import SatisPageHeader from "@/app/(hydrogen)/satislar/satis/page-header";

export const metadata: Metadata = {
  title: 'Satış Listesi',
};

export default function SatisListPage() {
  return (
    <>
      <SatisPageHeader />
      <div className="flex flex-col gap-10">
        <SatisStats />
        <SatisListTable />
      </div>
    </>
  );
}
