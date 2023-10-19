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
    title: <HeaderCell title="İl" />,
    dataIndex: 'province_name',
    key: 'province_name',
    width: 100,
    render: (province_name: string) => <p>{province_name}</p>,
  },
  {
    title: <HeaderCell title="İlÇE" />,
    dataIndex: 'district_name',
    key: 'district_name',
    width: 100,
    render: (district_name: string) => <p>{district_name}</p>,
  },
  {
    title: <HeaderCell title="Adres" />,
    dataIndex: 'address',
    key: 'address',
    width: 300,
    render: (address: string) => <p>{address}</p>,
  },
  {
    title: <HeaderCell title="Telefon" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (phone: string) => <p>{phone}</p>,
  },
  {
    title: <HeaderCell title="Cep Telefon" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (phone: string) => <p>{phone}</p>,
  },
  {
    title: <HeaderCell title="Şirket Adı" />,
    dataIndex: 'company_name',
    key: 'company_name',
    width: 350,
    render: (company_name: string) => <p>{company_name}</p>,
  }
];

export default function PersonalInformation({className, data, loading}: PersonalInfoProps) {

  if (loading) {
    return <>
      <Spinner size={"xl"}/>
    </>;
  }
  console.log('personel datası',data)
  return (
    <BasicTableWidget
      title="Genel Bilgileri"
      className={cn(
        'mt-14 pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0',
        className
      )}
      data={data}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />
  );
}
