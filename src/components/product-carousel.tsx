'use client';

import React from 'react';
import { Text } from '@/components/ui/text';
import { ActionIcon } from '@/components/ui/action-icon';
import { useDirection } from '@/hooks/use-direction';
import ProductModernCard from '@/components/cards/product-modern-card';
import {
  Navigation,
  Swiper,
  SwiperSlide,
} from '@/components/ui/carousel/carousel';
import cn from '@/utils/class-names';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

type ProductCarouselProps = {
  title: string;
  data: { [key: string]: any }[];
  className?: string;
};

export default function ProductCarousel({
  title,
  data,
  className,
}: ProductCarouselProps) {
  const { direction } = useDirection();
  return (
    <div className={cn('pt-12 @5xl:pt-16 @7xl:pt-20', className)}>
      <div className="mb-5 flex items-center justify-between">
        <Text tag="h3" className="font-semibold">
          {title}
        </Text>
        <div className="flex items-start gap-4">
          <ActionIcon
            rounded="full"
            variant="outline"
            className="recently-viewed-prev-item disabled:bg-gray-100 disabled:text-gray-300"
          >
            <PiCaretLeftBold className="h-auto w-5 rtl:rotate-180" />
          </ActionIcon>
          <ActionIcon
            rounded="full"
            variant="outline"
            className="recently-viewed-next-item disabled:bg-gray-100 disabled:text-gray-300"
          >
            <PiCaretRightBold className="h-auto w-5 rtl:rotate-180" />
          </ActionIcon>
        </div>
      </div>
      <Swiper
        key={`recently-viewed-${direction}`}
        dir={direction}
        slidesPerView={1}
        spaceBetween={20}
        modules={[Navigation]}
        navigation={{
          nextEl: '.recently-viewed-next-item',
          prevEl: '.recently-viewed-prev-item',
        }}
        className="recently-viewed !-mx-1 !p-1"
        breakpoints={{
          375: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
          1616: {
            slidesPerView: 5,
            spaceBetween: 28,
          },
        }}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            {/* @ts-ignore */}
            <ProductModernCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
