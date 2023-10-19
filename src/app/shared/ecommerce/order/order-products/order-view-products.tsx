'use client';

import Image from 'next/image';
import Table, { HeaderCell } from '@/components/ui/table';
import { Text } from '@/components/ui/text';

const data = [
  {
    id: 1,
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/1.webp',
    title: 'Casio Watch',
    productPrice: '$175.00',
    price: '$175.00',
    quantity: 1,
  },
  {
    id: 2,
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/2.webp',
    title: 'Beats Headphone',
    productPrice: '$55.00',
    price: '$55.00',
    quantity: 1,
  },
  {
    id: 3,
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/3.webp',
    title: 'Marc Jacob’s Decadent',
    productPrice: '$80.00',
    price: '$160.00',
    quantity: 2,
  },
  {
    id: 4,
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/4.webp',
    title: 'Black Shoes',
    productPrice: '$24.00',
    price: '$24.00',
    quantity: 1,
  },
  {
    id: 5,
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/products/modern/6.webp',
    title: 'Beats Headphone',
    productPrice: '$345.99',
    price: '$345.99',
    quantity: 1,
  },
];

const columns = [
  {
    title: <HeaderCell title="Product" />,
    dataIndex: 'product',
    key: 'product',
    width: 250,
    render: (_: any, row: any) => (
      <div className="flex items-center">
        <div className="relative aspect-square w-12 overflow-hidden rounded-lg">
          <Image
            alt={row.title}
            src={row.thumbnail}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
        <div className="ms-4">
          <Text tag="h6" className="!text-sm font-medium">
            {row.title}
          </Text>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Product Price" />,
    dataIndex: 'productPrice',
    key: 'productPrice',
    width: 200,
  },
  {
    title: <HeaderCell title="Quantity" align="center" />,
    dataIndex: 'quantity',
    key: 'quantity',
    width: 150,
    render: (quantity: number) => (
      <Text className="text-center text-sm font-semibold">{quantity}</Text>
    ),
  },

  {
    title: <HeaderCell title="Price" align="right" />,
    dataIndex: 'price',
    key: 'price',
    width: 200,
    render: (price: string) => (
      <Text className="text-end text-sm">{price}</Text>
    ),
  },
];

export default function OrderViewProducts() {
  return (
    <Table
      data={data}
      columns={columns}
      className="text-sm"
      variant="minimal"
      rowKey={(record) => record.id}
      scroll={{ x: 800 }}
    />
  );
}
