import { Metadata } from 'next';
import PoliceTurlerStats from '@/app/shared/policetur/turler/shipment-stats';
import PoliceTurlerListTable from "@/app/shared/policetur/turler/list/table";
import PoliceTurlerPageHeader from "@/app/(hydrogen)/policetur/turler/page-header";

export const metadata: Metadata = {
  title: 'Tür Listesi',
};

export default function PoliceTurlerListPage() {
  return (
    <>
      <PoliceTurlerPageHeader />
      <div className="flex flex-col gap-10">
        {/*<PoliceOzellikStats />*/}
        <PoliceTurlerListTable />
      </div>
    </>
  );
}
