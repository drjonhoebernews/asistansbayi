import { Metadata } from 'next';
import PoliceOzellikStats from '@/app/shared/policeoz/ozellikler/shipment-stats';
import PoliceOzellikListTable from "@/app/shared/policeoz/ozellikler/list/table";
import PoliceOzellikPageHeader from "@/app/(hydrogen)/policeoz/ozellikler/page-header";

export const metadata: Metadata = {
  title: 'Özellik Listesi',
};

export default function PoliceOzellikListPage() {
  return (
    <>
      <PoliceOzellikPageHeader />
      <div className="flex flex-col gap-10">
        {/*<PoliceOzellikStats />*/}
        <PoliceOzellikListTable />
      </div>
    </>
  );
}
