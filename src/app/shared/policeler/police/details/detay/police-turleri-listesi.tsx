'use client';

import Image from 'next/image';
import cn from '@/utils/class-names';
import { HeaderCell } from '@/components/ui/table';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import Spinner from "@/components/ui/spinner";
import {Badge} from "@/components/ui/badge";
interface PersonalInfoProps {
  data?: any;
  loading?: any;
  className?: string;
}

export const statusColors = (is_active: any) => {
  if (is_active === true || is_active >= 1) {
    return 'success'; // Aktif için yeşil renk döner.
  } else {
    return 'danger'; // Pasif için kırmızı renk döner.
  }
};

export const getColumns = () => [
  // {
  //   title: <HeaderCell title="İl" className="ms-6" />,
  //   dataIndex: 'province',
  //   key: 'province',
  //   width: 100,
  //   render: ({ name, code }: { name: string; code: string }) => (
  //     <div className="ms-6 flex items-center gap-2">
  //       <figure className="relative h-10 w-10">
  //         <Image
  //           fill
  //           quality={100}
  //           alt={`${name} Flag icon`}
  //           className="object-contain"
  //           src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
  //         />
  //       </figure>
  //
  //       <span className="whitespace-nowrap">{name}</span>
  //     </div>
  //   ),
  // },
  {
    title: <HeaderCell title="ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (id: string) => <p>{id}</p>,
  },
  {
    title: <HeaderCell title="Özellik Adı" />,
    dataIndex: 'name',
    key: 'name',
    width: 500,
    render: (name: string) => <p>{name}</p>,
  },
  {
    title: <HeaderCell title="Açıklaması" />,
    dataIndex: 'description',
    key: 'description',
    width: 500,
    render: (description: string) => <p>{description}</p>,
  },
  {
    title: <HeaderCell title="Durumu" />,
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
    title: <HeaderCell title="Kapsamı" />,
    dataIndex: 'is_included',
    key: 'is_included',
    width: 50,
    render: (is_included: number) => {
      return (
          <div className="flex items-center gap-1.5">
            <Badge renderAsDot color={statusColors(is_included)} />
            {is_included? 'Dahil' : 'Hariç'}
          </div>
      );
    },
  }
];

export default function PoliceTurleriListesi({className, data, loading}: PersonalInfoProps) {
  const datas = data.features;

  if (loading) {
    return <>
      <Spinner size={"xl"}/>
    </>;
  }
  return (
    <BasicTableWidget
      title="Özellikleri"
      className={cn(
        'mt-14 pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0',
        className
      )}
      data={datas}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />
  );
}
