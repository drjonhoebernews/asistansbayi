import { Metadata } from 'next';
import ModelStats from '@/app/shared/model/model/shipment-stats';
import ModelListTable from "@/app/shared/model/model/list/table";
import MarkaPageHeader from "@/app/(hydrogen)/model/araclar/page-header";

export const metadata: Metadata = {
  title: 'Model Listesi',
};

export default function ModelListPage() {
  return (
    <>
      <MarkaPageHeader />
      <div className="flex flex-col gap-10">
        {/*<MarkaStats />*/}
        <ModelListTable />
      </div>
    </>
  );
}
