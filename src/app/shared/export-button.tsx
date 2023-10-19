'use client';

import { PiArrowLineUpBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import cn from '@/utils/class-names';

type ExportButtonProps = {
  onClick: () => void;
  className?: string;
};

export default function ExportButton({
  onClick,
  className,
}: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn('w-full @lg:w-auto', className)}
    >
      <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
      Export
    </Button>
  );
}
