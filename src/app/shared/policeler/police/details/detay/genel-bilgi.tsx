'use client';

import Image from 'next/image';
import cn from '@/utils/class-names';
import { HeaderCell } from '@/components/ui/table';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import Spinner from "@/components/ui/spinner";

interface PersonalInfoProps {
  data?: any;
  loading?: any;
  className?: string;
}

const data1 = [
  {
    id: 1,
    country: {
      name: 'Germany',
      code: 'de',
    },
    address: '37831 Hodkiewicz Track, Minnesota 27750',
    phone: '(169) 492-2884',
    company: 'Schiller - Wisozk',
    source: 'Email',
    grade: 1,
  },
];

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
    title: <HeaderCell title="Kapsam ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 50,
    render: (id: string) => <p>{id}</p>,
  },
  {
    title: <HeaderCell title="Kapsam Adı" />,
    dataIndex: 'name',
    key: 'name',
    width: 500,
    render: (name: string) => <p>{name}</p>,
  }
];

export default function GenelBilgi({className, data, loading}: PersonalInfoProps) {
  const datas = data.services;

  if (loading) {
    return <>
      <Spinner size={"xl"}/>
    </>;
  }
  return (
    <BasicTableWidget
      title="Kapsamları"
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
