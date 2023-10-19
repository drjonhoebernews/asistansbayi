'use client';

import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';

interface FormFooterProps {
  className?: string;
  draftBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function FormFooter({
  isLoading,
  draftBtnText = 'Taslak Kaydet',
  submitBtnText = 'Submit',
  className,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10',
        className,
        negMargin
      )}
    >
      <Button type="submit" variant="outline" className="w-full @xl:w-auto">
        {draftBtnText}
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
      >
        {submitBtnText}
      </Button>
    </div>
  );
}
