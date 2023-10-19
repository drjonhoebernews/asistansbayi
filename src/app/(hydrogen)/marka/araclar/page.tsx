import { Metadata } from 'next';
import MarkaStats from '@/app/shared/marka/marka/shipment-stats';
import MarkaListTable from "@/app/shared/marka/marka/list/table";
import MarkaPageHeader from "@/app/(hydrogen)/marka/araclar/page-header";

export const metadata: Metadata = {
  title: 'Marka Listesi',
};

export default function MarkaListPage() {
  return (
    <>
      <MarkaPageHeader />
      <div className="flex flex-col gap-10">
        {/*<MarkaStats />*/}
        <MarkaListTable />
      </div>
    </>
  );
}
