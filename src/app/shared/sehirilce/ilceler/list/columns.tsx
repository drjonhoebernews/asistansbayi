import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import Link from 'next/link';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import {EditodalModalView} from "@/app/shared/sehirilce/ilceler/list/edit-modal";
import {useModal} from "@/app/shared/modal-views/use-modal";
import React from "react";



type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

type StatusType =
    | 'Aktif'
    | 'Pasif'
    ;

const shippingStatuses = {
  true: 'Aktif',
  false: 'Pasif',
};

const EditButton = React.forwardRef((props: { id: string }, ref: any) => {
  const { openModal } = useModal();

  return (
      <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Güncelle'}
          onClick={() => openModal({ view: <EditodalModalView id={props.id} /> })}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
  );
});

export const statusColors = (is_active: StatusType) => {
  if (is_active) {
    return 'success'; // Aktif için yeşil renk döner.
  } else {
    return 'danger'; // Pasif için kırmızı renk döner.
  }
};


export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Tümünü Seç'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="İlçe ID"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'id'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('id'),
    dataIndex: 'id',
    key: 'id',
    width: 100,
    render: (id: string, row: any) => (
      <Link
        href={routes.logistics.shipmentDetails(row.id)}
        className="duration-200 hover:text-gray-900 hover:underline"
      >
        {id}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="ADI" />,
    onHeaderCell: () => onHeaderCellClick('name'),
    dataIndex: 'name',
    key: 'name',
    width: 150,
    // render: ({ first_name, avatar }: { first_name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={first_name} />
    // ),
  },
  {
    title: <HeaderCell title="İL ADI" />,
    onHeaderCell: () => onHeaderCellClick('province_name'),
    dataIndex: 'province_name',
    key: 'province_name',
    width: 150,
    // render: ({ first_name, avatar }: { first_name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={first_name} />
    // ),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="İşlem" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
            size="sm"
            content={() => 'Güncelle'}
            placement="top"
            color="invert"
        >
          <EditButton id={row.id} />
        </Tooltip>
        <DeletePopover
          title={`Sil`}
          description={`Silmek istediğine eminmisin #${row.company_name? row.company_name: row.id} ?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
