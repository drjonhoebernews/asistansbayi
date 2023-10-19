'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import { exportToCSV } from '@/utils/export-to-csv';
import { shipmentData } from '@/data/shipment-data';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';
import { PiPlusBold } from 'react-icons/pi';
import toast from "react-hot-toast";
import {useModal} from "@/app/shared/modal-views/use-modal";
import {AddModalModalView} from "@/app/shared/model/model/list/add-modal";

const pageHeader = {
  title: 'Tüm Modeller',
  breadcrumb: [
    {
      href: routes.araclarModel.araclarModelList,
      name: 'Modeller',
    },
    {
      name: 'Model',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function ModelPageHeader({ className }: HeaderProps) {
  const { openModal } = useModal();
  function handleExportData() {
    toast.error('Şuan da bu özellik devre dışıdır')
    // exportToCSV(
    //   shipmentData,
    //   'id,first_name,last_name,company_name,created_at,role,phone,is_active',
    //   'acente_data'
    // );
  }

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
        <ExportButton onClick={() => handleExportData()} />
        <Button
            type="button"
            className="dark:bg-gray-100 dark:text-white"
            onClick={() =>
                openModal({
                  view: <AddModalModalView />,
                })
            }
        >
          <PiPlusBold className="me-1.5 h-4 w-4" />
          Model Oluştur
        </Button>
      </div>
    </PageHeader>
  );
}
