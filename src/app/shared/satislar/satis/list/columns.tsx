import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import DateCell from '@/components/ui/date-cell';
import { Tooltip } from '@/components/ui/tooltip';
import Link from 'next/link';
import { ActionIcon } from '@/components/ui/action-icon';
import { routes } from '@/config/routes';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';



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
        title="Satış ID"
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
    title: <HeaderCell title="Poliçe NO" />,
    onHeaderCell: () => onHeaderCellClick('policy_number'),
    dataIndex: 'policy_number',
    key: 'policy_number',
    width: 150,
    // render: ({ first_name, avatar }: { first_name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={first_name} />
    // ),
  },
  {
    title: <HeaderCell title="Adı" />,
    onHeaderCell: () => onHeaderCellClick('first_name'),
    dataIndex: 'first_name',
    key: 'first_name',
    width: 150,
    // render: ({ name, avatar }: { name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={name} />
    // ),
  },
  {
    title: <HeaderCell title="Soyadı" />,
    onHeaderCell: () => onHeaderCellClick('last_name'),
    dataIndex: 'last_name',
    key: 'last_name',
    width: 150,
    // render: ({ name, avatar }: { name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={name} />
    // ),
  },
  {
    title: <HeaderCell title="Fiyat" />,
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    // render: ({ name, avatar }: { name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={name} />
    // ),
  },
  {
    title: <HeaderCell title="Pirim" />,
    onHeaderCell: () => onHeaderCellClick('commission'),
    dataIndex: 'commission',
    key: 'commission',
    width: 150,
    // render: ({ name, avatar }: { name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={name} />
    // ),
  },
  {
    title: <HeaderCell title="Plaka" />,
    onHeaderCell: () => onHeaderCellClick('plaka'),
    dataIndex: 'plaka',
    key: 'plaka',
    width: 150,
    // render: ({ name, avatar }: { name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={name} />
    // ),
  },
  {
    title: <HeaderCell title="Poliçe" />,
    onHeaderCell: () => onHeaderCellClick('policy'),
    dataIndex: 'policy',
    key: 'policy',
    width: 150,
    render: (policy: any) => (
        <div>{policy?.name}</div>
    ),
  },
  {
    title: <HeaderCell title="Marka" />,
    onHeaderCell: () => onHeaderCellClick('brand'),
    dataIndex: 'brand',
    key: 'brand',
    width: 150,
    render: (marka: any) => (
        <div>{marka?.name}</div>
    ),
  },
  {
    title: <HeaderCell title="Model" />,
    onHeaderCell: () => onHeaderCellClick('model'),
    dataIndex: 'model',
    key: 'model',
    width: 150,
    render: (model: any) => (
        <div>{model?.name}</div>
    ),
  },
  {
    title: (
        <HeaderCell
            title="Başlangıç"
            sortable
            ascending={
                sortConfig?.direction === 'asc' && sortConfig?.key === 'start_date'
            }
        />
    ),
    onHeaderCell: () => onHeaderCellClick('start_date'),
    dataIndex: 'start_date',
    key: 'start_date',
    width: 120,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
        <HeaderCell
            title="Bitiş"
            sortable
            ascending={
                sortConfig?.direction === 'asc' && sortConfig?.key === 'end_date'
            }
        />
    ),
    onHeaderCell: () => onHeaderCellClick('end_date'),
    dataIndex: 'end_date',
    key: 'end_date',
    width: 120,
    render: (value: Date) => <DateCell date={value} />,
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
          <Link href={routes.satislar.editSatis(row.id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Güncelle'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'Göster'}
          placement="top"
          color="invert"
        >
          <Link href={routes.satislar.satisDetails(row.id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Göster'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Sil`}
          description={`Silmek istediğine eminmisin #${row.policy_number? row.policy_number: row.id} ?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
