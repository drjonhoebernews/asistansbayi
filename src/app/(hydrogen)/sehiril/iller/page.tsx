import { Metadata } from 'next';
import IlStats from '@/app/shared/sehiril/iller/shipment-stats';
import IlListTable from "@/app/shared/sehiril/iller/list/table";
import IlPageHeader from "@/app/(hydrogen)/sehiril/iller/page-header";

export const metadata: Metadata = {
  title: 'İL Listesi',
};

export default function IlListPage() {
  return (
    <>
      <IlPageHeader />
      <div className="flex flex-col gap-10">
        {/*<MarkaStats />*/}
        <IlListTable />
      </div>
    </>
  );
}
