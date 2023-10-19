import dayjs from 'dayjs';
import AvgDeliveryTime from '@/app/shared/bayi/dashboard/avg-delivery-time';
import ComplaintRate from '@/app/shared/bayi/dashboard/complaint-rate';
import ComplaintReason from '@/app/shared/bayi/dashboard/complaint-reason';
import { DeliveryStatus } from '@/app/shared/bayi/dashboard/delivery-status';
import DispatchPlanning from '@/app/shared/bayi/dashboard/dispatch-planning';
import FleetStatus from '@/app/shared/bayi/dashboard/fleet-status';
import LoadingWorkflow from '@/app/shared/bayi/dashboard/loading-workflow';
import OpenSalesOrder from '@/app/shared/bayi/dashboard/open-sales-order';
import ProfitChart from '@/app/shared/bayi/dashboard/profit';
import StatCards from '@/app/shared/bayi/dashboard/stat-cards';
import TopCustomer from '@/app/shared/bayi/dashboard/top-customer';
import TopShipmentCountries from '@/app/shared/bayi/dashboard/top-shipment-countries';
import ShipmentTableWidget from '@/app/shared/bayi/dashboard/shipment-table';

const thisMonth = dayjs(new Date()).format('MMMM YYYY');

export default function SigortaDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-12 gap-6 3xl:gap-8">
        <StatCards className="col-span-full" />

        {/*<OpenSalesOrder className="col-span-full @3xl:col-span-6 @[1429px]:col-span-4" />*/}
        {/*<DispatchPlanning className="col-span-full @3xl:col-span-6 @[1429px]:col-span-4" />*/}
        {/*<LoadingWorkflow className="col-span-full @3xl:col-span-6 @[1429px]:col-span-4" />*/}

        {/*<FleetStatus className="col-span-full @3xl:col-span-6 @[1429px]:col-span-4" />*/}
        <ProfitChart className="col-span-full @3xl:col-span-full @[1429px]:col-span-8" />

        {/*<ShipmentTableWidget*/}
        {/*  title="Pending Shipments"*/}
        {/*  description={`Summary of pending shipments of ${thisMonth}`}*/}
        {/*  className="col-span-full"*/}
        {/*/>*/}

        {/*<DeliveryStatus className="col-span-full" />*/}

        <AvgDeliveryTime className="col-span-full @3xl:col-span-6 @7xl:col-span-4" />
        <ComplaintRate className="col-span-full @3xl:col-span-6 @7xl:col-span-4" />
        <ComplaintReason className="col-span-full @3xl:col-span-6 @7xl:col-span-4" />

        {/*<TopShipmentCountries className="col-span-full @3xl:col-span-6 @7xl:col-span-4" />*/}
        {/*<TopCustomer className="col-span-full @3xl:col-span-full @5xl:col-span-full @7xl:col-span-8" />*/}

        {/*<ShipmentTableWidget*/}
        {/*  title="Recent Shipments"*/}
        {/*  description={`Summary of recent shipments of ${thisMonth}`}*/}
        {/*  className="col-span-full"*/}
        {/*/>*/}
      </div>
    </div>
  );
}
