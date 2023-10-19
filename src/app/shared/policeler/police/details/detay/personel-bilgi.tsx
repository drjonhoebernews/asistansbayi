import Image from 'next/image';
import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';
import SimpleBar from '@/components/ui/simplebar';
import { Badge } from '@/components/ui/badge';
import Spinner from "@/components/ui/spinner";

interface SidebarProps {
  data?: any;
  loading?: any;
  className?: string;
}

export default function PersonelBilgi({ className, data, loading }: SidebarProps) {
  if (loading) {
    return <>
      <Spinner size={"xl"}/>
    </>;
  }
  return (
    <article className={cn('lg:px-0 lg:pb-0', className)}>
      <div className="grid items-end gap-4 @xl:grid-cols-[80px_1fr] @2xl:grid-cols-[128px_1fr] md:gap-6">
        <figure className="relative -mt-8 h-20 w-20 border-4 border-white drop-shadow @2xl:-mt-12 @2xl:h-32 @2xl:w-32 @4xl:-mt-12 @7xl:-mt-14">
          <span className="absolute bottom-1.5 right-1.5 z-10 h-3 w-3 border-2 border-white bg-[#11A849] @2xl:bottom-2.5 @2xl:right-2.5 @3xl:h-4 @3xl:w-4 @4xl:bottom-2 @4xl:right-2" />
          <Image
            src={data?.banner}
            alt={data.name}
            fill
            priority
            className="bg-gray-100"
          />
        </figure>
        <div className="grid grid-cols-1 gap-1 md:gap-1">
          <article>
            <div className="flex items-center gap-2.5">
              <Text tag="h3" className="text-lg xl:text-xl">
                {data.name}
              </Text>
              <Badge size="xl" className="gap-2.5" rounded={"none"} color={"success"}>
                Fiyat: {data.price}
              </Badge>
              <Badge size="xl" className="gap-2.5" rounded={"none"} color={"success"}>
                Komisyon: %{data.percentage}
              </Badge>
              <Badge size="xl" className="gap-2.5" rounded={"none"} color={"success"}>
                Yaş Sınırı: %{data.age_limit}
              </Badge>
            </div>
            <p>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </p>
          </article>
        </div>
      </div>

      <SimpleBar>
        <div className="mt-8 grid min-w-[1100px] grid-cols-1 gap-5 rounded-lg border border-gray-200 p-8 md:mt-12">
          <div dangerouslySetInnerHTML={{ __html: data?.contract_content }} />
        </div>
      </SimpleBar>
    </article>
  );
}
