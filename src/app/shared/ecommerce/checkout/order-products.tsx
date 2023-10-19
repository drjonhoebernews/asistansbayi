import Image from 'next/image';
import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';
import { orderProducts } from '@/data/checkout-data';

export default function OrderProducts({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3.5', className)}>
      {orderProducts.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="flex items-center pe-3">
            <div className="relative aspect-[4/4.5] w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={item.product.image}
                alt={item.product.name || 'Product Image'}
                fill
                priority
                sizes="(max-width: 768px) 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ps-3">
              <Text tag="h3" className="mb-1 text-sm font-medium text-gray-700">
                {item.product.name}
              </Text>
              <div className="text-gray-500">
                {item.price} x {item.quantity}
              </div>
            </div>
          </div>
          <div className="font-medium text-gray-700">{item.subtotal}</div>
        </div>
      ))}
    </div>
  );
}
