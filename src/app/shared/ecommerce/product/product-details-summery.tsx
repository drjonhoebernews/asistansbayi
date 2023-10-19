'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { Button } from '@/components/ui/button';
import { PiShoppingCartSimple } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { toast } from 'react-hot-toast';

const sizes = [6, 7, 8, 9, 10, 11];

const colors = [
  { name: 'Breaker Bay', code: '#6AA39C' },
  { name: 'Malibu', code: '#6BDCFF' },
  { name: 'Purple Heart', code: '#5D30DD' },
  { name: 'Alizarin Crimson', code: '#D72222' },
  { name: 'Viola', code: '#C886A9' },
];

// get size
export function GetSize({ sizes }: { sizes: number[] }) {
  return (
    <div className="-m-1 flex flex-wrap items-center @sm:-m-2">
      {sizes.map((size) => (
        <AdvancedRadio
          key={size}
          name="numbers-default"
          value="one"
          className="m-1 flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 font-medium hover:cursor-pointer hover:border-gray-900 peer-checked:border-gray-900 peer-checked:text-gray-900 peer-checked:ring-1 peer-checked:ring-gray-900 @sm:m-2"
        >
          {size}
        </AdvancedRadio>
      ))}
    </div>
  );
}

interface ColorProps {
  name?: string;
  code?: string;
}

// get color
export function GetColor({ colors }: { colors: ColorProps[] }) {
  const [activeColor, setActiveColor] = useState({
    name: colors[0].name,
    code: colors[0].code,
  });

  return (
    <div className="flex items-center gap-3">
      <div className="-m-1 flex flex-wrap items-center">
        {colors.map((color) => (
          <span
            className={cn(
              "relative m-1 h-6 w-6 cursor-pointer rounded-full border-white before:absolute before:start-1/2 before:top-1/2 before:h-[26px] before:w-[26px] before:-translate-y-1/2 before:rounded-full before:content-[''] ltr:before:-translate-x-1/2 rtl:before:translate-x-1/2 dark:border-gray-200",
              activeColor.code === color.code &&
                'border-4 before:border before:border-gray-900'
            )}
            style={{ backgroundColor: color.code }}
            key={color.name}
            onClick={() =>
              setActiveColor({ name: color.name, code: color.code })
            }
          />
        ))}
      </div>
      <div className="font-medium text-gray-500">{activeColor.name}</div>
    </div>
  );
}

// wishlist button component
function WishlistButton({ className }: { className?: string }) {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);

  function addToWishlist() {
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
  }
  return (
    <Button
      variant="outline"
      size="xl"
      onClick={addToWishlist}
      // isLoading={addToWishlistLoader}
      className={cn('h-12 text-sm lg:h-14 lg:text-base', className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 32 32"
        className="me-1 h-6 w-6 lg:h-8 lg:w-8"
      >
        <path
          fill={favorite === true ? '#e00' : 'currentColor'}
          fillOpacity={favorite === true ? 1 : 0}
          d="M26.492 10.7a6.065 6.065 0 0 0-1.383-1.931 6.457 6.457 0 0 0-2.042-1.295A6.686 6.686 0 0 0 20.577 7a6.697 6.697 0 0 0-3.383.91 6.345 6.345 0 0 0-.693.469 6.345 6.345 0 0 0-.693-.47A6.697 6.697 0 0 0 12.425 7c-.863 0-1.7.159-2.49.474a6.442 6.442 0 0 0-2.041 1.294A6.028 6.028 0 0 0 6.51 10.7 5.776 5.776 0 0 0 6 13.078c0 .777.165 1.586.493 2.41a10.65 10.65 0 0 0 1.172 2.123c.797 1.14 1.894 2.33 3.255 3.537 2.256 2 4.49 3.38 4.585 3.437l.576.354a.809.809 0 0 0 .838 0l.576-.354a36.744 36.744 0 0 0 4.585-3.437c1.361-1.206 2.458-2.396 3.255-3.537.503-.721.9-1.435 1.171-2.123.329-.824.494-1.633.494-2.41a5.736 5.736 0 0 0-.508-2.378Z"
        />
        <path
          fill={favorite === true ? '#e00' : 'currentColor'}
          fillOpacity={favorite === true ? 1 : 0}
          stroke={favorite === true ? '#e00' : 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.25 7C8.35 7 6 9.244 6 12.012c0 2.234.919 7.538 9.962 12.9a1.063 1.063 0 0 0 1.076 0C26.08 19.55 27 14.246 27 12.011 27 9.244 24.649 7 21.75 7c-2.9 0-5.25 3.037-5.25 3.037S14.149 7 11.25 7Z"
        />
      </svg>
      Wishlist
    </Button>
  );
}

function AddToCartButton() {
  function handleAddToCart() {
    toast.success(<Text tag="b">Product added to the cart</Text>);
  }
  return (
    <Button
      size="xl"
      onClick={() => handleAddToCart()}
      className="h-12 text-sm dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 lg:h-14 lg:text-base"
    >
      <PiShoppingCartSimple className="me-2 h-5 w-5 lg:h-[22px] lg:w-[22px]" />{' '}
      Add To Cart
    </Button>
  );
}

export default function ProductDetailsSummery() {
  return (
    <>
      <div className="border-b border-gray-200 pb-6 @lg:pb-8">
        <Text tag="h2" className="mb-2.5 font-bold @6xl:text-4xl">
          Nike
        </Text>
        <Text tag="p" className="text-base">
          Men’s Shoes
        </Text>
      </div>
      <div className="pb-8 pt-5">
        <div className="mb-1.5 mt-2 flex items-end font-lexend text-base">
          <div className="-mb-0.5 text-2xl font-semibold text-gray-900 lg:text-3xl">
            $125
          </div>
          <del className="ps-1.5 font-medium text-gray-500">$220</del>
          <div className="ps-1.5 text-red">(25% OFF)</div>
        </div>
        <div className="font-medium text-green-dark">
          Inclusive of all taxes
        </div>

        <div className="mb-3.5 flex items-start justify-between pt-6">
          <Text tag="h6" className="font-inter text-sm font-medium">
            Select Size
          </Text>
          <Button size="sm" variant="text" className="h-auto py-0 underline">
            Size Guide
          </Button>
        </div>
        {sizes?.length ? <GetSize sizes={sizes} /> : null}

        <Text tag="h6" className="mb-3.5 mt-6 font-inter text-sm font-medium">
          Select Color
        </Text>
        {colors?.length ? <GetColor colors={colors} /> : null}

        <div className="grid grid-cols-1 gap-4 pt-7 @md:grid-cols-2 @xl:gap-6">
          <AddToCartButton />
          <WishlistButton />
        </div>
      </div>
    </>
  );
}
