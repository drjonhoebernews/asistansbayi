import { Metadata } from 'next';
import IlcePageStats from '@/app/shared/marka/marka/shipment-stats';
import IlcePageHeader from "@/app/(hydrogen)/sehirilce/ilceler/page-header";
import IlceListTable from "@/app/shared/sehirilce/ilceler/list/table";

export const metadata: Metadata = {
  title: 'İlçe Listesi',
};

export default function IlceListPage() {
  return (
    <>
      <IlcePageHeader />
      <div className="flex flex-col gap-10">
        {/*<MarkaStats />*/}
        <IlceListTable />
      </div>
    </>
  );
}
