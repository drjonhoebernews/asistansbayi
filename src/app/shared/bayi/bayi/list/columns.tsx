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
import {BsFillTelephoneFill, BsWhatsapp} from "react-icons/bs";



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
          title={'Select All'}
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
        title="Bayi ID"
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
    onHeaderCell: () => onHeaderCellClick('first_name'),
    dataIndex: 'first_name',
    key: 'first_name',
    width: 150,
    // render: ({ first_name, avatar }: { first_name: string; avatar: string }) => (
    //   <AvatarCard src={avatar} name={first_name} />
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
    title: (
      <HeaderCell
        title="Şirket"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'company_name'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('company_name'),
    dataIndex: 'company_name',
    key: 'company_name',
    width: 300,
    render: (company_name: string) => company_name,
  },
  {
    title: (
      <HeaderCell
        title="Telefon"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'phone'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('phone'),
    dataIndex: 'phone',
    key: 'phone',
    width: 250,
    render: (phone: string) => phone,
  },
  {
    title: (
        <HeaderCell
            title="Tarih"
            sortable
            ascending={
                sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
            }
        />
    ),
    onHeaderCell: () => onHeaderCellClick('created_at'),
    dataIndex: 'created_at',
    key: 'created_at',
    width: 250,
    render: (value: Date) => <DateCell date={value} />,
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
    render: (is_active: StatusType) => {
      return (
        <div className="flex items-center gap-1.5">
          <Badge renderAsDot color={statusColors(is_active)} />
          {is_active}
        </div>
        // <Button
        //   size="sm"
        //   tag="span"
        //   variant="outline"
        //   className="w-full font-medium"
        //   color={statusColors(status)}
        // >
        //   {status}
        // </Button>
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
        <Tooltip
          size="sm"
          content={() => 'Güncelle'}
          placement="top"
          color="invert"
        >
          <Link href={routes.bayi.editBayi(row.id)}>
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
          <Link href={routes.bayi.BayiDetails(row.id)}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Göster'}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
            size="sm"
            content={() => 'Ara'}
            placement="top"
            color="invert"
        >
          <a href={`tel:${row.phone}`}>
            <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Ara'}
            >
              <BsFillTelephoneFill className="h-4 w-4" />
            </ActionIcon>
          </a>
        </Tooltip>
        <Tooltip
            size="sm"
            content={() => 'Whatsapp'}
            placement="top"
            color="invert"
        >
          <a href={`https://wa.me/+9${row.whatsapp ? row.whatsapp : row.cep}?text=Merhaba,%20Size%20Asistans360'tan%20ulaşıyorum`} target={'_blank'}>
            <ActionIcon
                size="sm"
                variant="outline"
                aria-label={'Whatsapp'}
            >
              <BsWhatsapp className="h-4 w-4" />
            </ActionIcon>
          </a>
        </Tooltip>
        {/*<DeletePopover*/}
        {/*  title={`Sil`}*/}
        {/*  description={`Silmek istediğine eminmisin #${row.company_name? row.company_name: row.id} ?`}*/}
        {/*  onDelete={() => onDeleteItem(row.id)}*/}
        {/*/>*/}
      </div>
    ),
  },
];
