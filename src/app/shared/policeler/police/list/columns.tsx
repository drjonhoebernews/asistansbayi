import { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DateCell from '@/components/ui/date-cell';
import AvatarCard from '@/components/ui/avatar-card';
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


export const statusColors = (is_active: any) => {
  if (is_active === true || is_active >= 1) {
    return 'success'; // Aktif için yeşil renk döner.
  } else {
    return 'danger'; // Pasif için kırmızı renk döner.
  }
};

interface Feature {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  is_included: boolean;
}

interface Service {
  id: number;
  name: string;
}

export type PoliceType = {
  id: string;
  name: string;
  banner: string;
  age_limit: number;
  price: string;
  percentage: number;
  status: string;
  features: Feature[];
  services: Service[];
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
        title="Police ID"
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
    width: 250,
    render: (_: string, row: PoliceType) => (
        <AvatarCard
            src={row.banner}
            name={row.name}
            description={row.name}
            avatarProps={{
              name: row.name,
              size: 'lg',
              className: 'rounded-lg',
            }}
        />
    ),
  },
  {
    title: (
        <HeaderCell
            title="Fiyat"
            sortable
            ascending={
                sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
            }
        />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
        <Text className="font-medium text-gray-700">{value} TL</Text>
    ),
  },
  {
    title: <HeaderCell title="Yaş Sınırı" />,
    onHeaderCell: () => onHeaderCellClick('age_limit'),
    dataIndex: 'age_limit',
    key: 'age_limit',
    width: 100,
    render: (age_limit: any) => {
      return (
          <div className="flex items-center gap-1.5">
            <Badge renderAsDot color={statusColors(age_limit)} />
            {age_limit === 0 ? 'Yok' : age_limit}
          </div>
      );
    },
  },
  {
    title: <HeaderCell title="Komisyom %" />,
    onHeaderCell: () => onHeaderCellClick('percentage'),
    dataIndex: 'percentage',
    key: 'percentage',
    width: 100,
    render: (percentage: any) => {
      return (
          <div className="flex items-center gap-1.5">
            <Badge renderAsDot color={statusColors(percentage)} />
            {percentage}
          </div>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title="Durum"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'is_active'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('is_active'),
    dataIndex: 'is_active',
    key: 'is_active',
    width: 50,
    render: (is_active: number) => {
      return (
        <div className="flex items-center gap-1.5">
          <Badge renderAsDot color={statusColors(is_active)} />
          {is_active? 'Aktif' : 'Pasif'}
        </div>
      );
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="İşlem" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {/*<Tooltip*/}
        {/*  size="sm"*/}
        {/*  content={() => 'Güncelle'}*/}
        {/*  placement="top"*/}
        {/*  color="invert"*/}
        {/*>*/}
        {/*  <Link href={routes.police.editPolice(row.id)}>*/}
        {/*    <ActionIcon*/}
        {/*      size="sm"*/}
        {/*      variant="outline"*/}
        {/*      aria-label={'Güncelle'}*/}
        {/*    >*/}
        {/*      <PencilIcon className="h-4 w-4" />*/}
        {/*    </ActionIcon>*/}
        {/*  </Link>*/}
        {/*</Tooltip>*/}
        {/*<Tooltip*/}
        {/*  size="sm"*/}
        {/*  content={() => 'Göster'}*/}
        {/*  placement="top"*/}
        {/*  color="invert"*/}
        {/*>*/}
        {/*  <Link href={routes.police.policeDetails(row.id)}>*/}
        {/*    <ActionIcon*/}
        {/*      size="sm"*/}
        {/*      variant="outline"*/}
        {/*      aria-label={'Göster'}*/}
        {/*    >*/}
        {/*      <EyeIcon className="h-4 w-4" />*/}
        {/*    </ActionIcon>*/}
        {/*  </Link>*/}
        {/*</Tooltip>*/}
        {/*<DeletePopover*/}
        {/*  title={`Sil`}*/}
        {/*  description={`Silmek istediğine eminmisin #${row.name? row.name: row.id} ?`}*/}
        {/*  onDelete={() => onDeleteItem(row.id)}*/}
        {/*/>*/}
      </div>
    ),
  },
];
