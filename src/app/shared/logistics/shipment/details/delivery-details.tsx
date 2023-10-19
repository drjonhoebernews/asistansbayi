'use client';

import Image from 'next/image';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { Text } from '@/components/ui/text';
import { formatDate } from '@/utils/format-date';
import { Avatar } from '@/components/ui/avatar';
import signature from '@public/client-signature.svg';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import cn from '@/utils/class-names';
import Spinner from "@/components/ui/spinner";

interface DeliveryDetailsProps {
  className?: string;
  data: any;
  loading: any;
}

const datas = [
  {
    id: 1,
    date: new Date('2023-08-23T10:18:34.191Z'),
    deliveredBy: {
      name: 'Estelle Hansen MD',
      avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.png`,
    },
    receivedBy: {
      name: 'Sherry Kulas DVM',
      avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
        avatarIds
      )}.png`,
    },
    receiversSignature: 'Shelia Schmeler PhD',
  },
];

export const getColumns = () => [
  // {
  //   title: <span className="ms-6 block whitespace-nowrap">Date</span>,
  //   dataIndex: 'date',
  //   key: 'date',
  //   width: 200,
  //   render: (date: Date) => (
  //     <span className="ms-6 block">
  //       <Text className="mb-1 text-gray-700">
  //         {formatDate(date, 'MMMM D, YYYY')}
  //       </Text>
  //       <Text className="text-[13px] text-gray-500">
  //         {formatDate(date, 'h:mm A')}
  //       </Text>
  //     </span>
  //   ),
  // },
  {
    title: <span className="block whitespace-nowrap">ID</span>,
    dataIndex: 'id',
    key: 'id',
    width: 300,
    render: ({ id }: { id: string; }) => (
      <div className="flex items-center">
        {/*<Avatar name={name} src={avatar} size="sm" />*/}
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
          <Text tag="h6" className="mb-0.5 !text-sm font-medium">
            {id}
          </Text>
        </div>
      </div>
    ),
  },
  // {
  //   title: <span className="block whitespace-nowrap">Received By</span>,
  //   dataIndex: 'receivedBy',
  //   key: 'receivedBy',
  //   width: 300,
  //   render: ({ name, avatar }: { name: string; avatar: string }) => (
  //     <div className="flex items-center">
  //       <Avatar name={name} src={avatar} size="sm" />
  //       <div className="ml-3 rtl:ml-0 rtl:mr-3">
  //         <Text tag="h6" className="mb-0.5 !text-sm font-medium">
  //           {name}
  //         </Text>
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   title: <span className="block whitespace-nowrap">Received By</span>,
  //   dataIndex: 'receivedBy',
  //   key: 'receivedBy',
  //   width: 300,
  //   render: ({ name, avatar }: { name: string; avatar: string }) => (
  //       <div className="flex items-center">
  //         <Avatar name={name} src={avatar} size="sm" />
  //         <div className="ml-3 rtl:ml-0 rtl:mr-3">
  //           <Text tag="h6" className="mb-0.5 !text-sm font-medium">
  //             {name}
  //           </Text>
  //         </div>
  //       </div>
  //   ),
  // },
  // {
  //   title: (
  //     <span className="block whitespace-nowrap">Receiver&apos;s Signature</span>
  //   ),
  //   dataIndex: 'receiversSignature',
  //   key: 'receiversSignature',
  //   width: 300,
  //   render: (receiversSignature: string) => (
  //     <Image src={signature} alt="clients signature" />
  //   ),
  // },
];

export default function DeliveryDetails({ data, loading }: DeliveryDetailsProps) {
    console.log('datadan gelen veri: ',data)
    if (loading || !data) {
        return <>
            <Spinner size={"xl"}/>
        </>;
    }
  return (
    <div>

    </div>
  );
}
