'use client';

import { useMedia } from '@/hooks/use-media';
import MessageList from '@/app/shared/support/inbox/message-list';
import MessageDetails from '@/app/shared/support/inbox/message-details';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PiArrowLeft } from 'react-icons/pi';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isWide = useMedia('(min-width: 1024px)', false);

  return (
    <>
      <div className="mt-5 items-start @container lg:mt-9 lg:grid lg:grid-cols-[330px_1fr] lg:gap-7 2xl:grid-cols-[400px_1fr]">
        <div className="col-span-full">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <PiArrowLeft />
            Back
          </Button>
        </div>

        {isWide && <MessageList />}
        <MessageDetails />
      </div>
    </>
  );
}
