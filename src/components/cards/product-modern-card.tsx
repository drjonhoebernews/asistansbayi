import Link from 'next/link';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { routes } from '@/config/routes';
import { Text } from '@/components/ui/text';
import WishlistButton from '@/components/wishlist-button';
import ColorSwatch from '@/utils/color-swatch';
import cn from '@/utils/class-names';
import { generateSlug } from '@/utils/generate-slug';

type Product = {
  slug?: string;
  title: string;
  description?: string;
  price: string | number;
  sale_price?: string | number;
  thumbnail: string | StaticImport;
  colors?: string[];
};

interface ProductProps {
  product: Product;
  className?: string;
}

export default function ProductModernCard({
  product,
  className,
}: ProductProps) {
  const {
    title,
    thumbnail,
    slug,
    description,
    price,
    sale_price,
    colors = [],
  } = product;

  return (
    <div className={cn(className)}>
      <div className="relative">
        <div className="relative mx-auto aspect-[4/5.06] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            alt={title}
            src={thumbnail}
            fill
            priority
            quality={90}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw"
            blurDataURL={`/_next/image?url=${thumbnail}&w=10&q=1`}
            className="h-full w-full object-cover"
          />
        </div>
        <WishlistButton className="absolute end-3 top-3" />
      </div>

      <div className="pt-3">
        <Link
          href={routes.eCommerce.productDetails(
            String(slug ?? generateSlug(title))
          )}
        >
          <Text
            tag="h6"
            className="mb-1 truncate font-semibold transition-colors hover:text-primary"
          >
            {title}
          </Text>
        </Link>

        <Text tag="p" className="truncate">
          {description}
        </Text>
        <div className="mt-2 flex items-center font-semibold text-gray-900">
          {price}
          <del className="ps-1.5 text-[13px] font-normal text-gray-500">
            {sale_price}
          </del>
        </div>

        {colors?.length ? <ColorSwatch colors={colors} /> : null}
      </div>
    </div>
  );
}
