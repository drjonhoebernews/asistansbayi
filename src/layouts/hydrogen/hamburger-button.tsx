'use client';

import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon } from '@/components/ui/action-icon';
import Sidebar from './sidebar';

export default function HamburgerButton() {
  const { openDrawer } = useDrawer();
  return (
    <ActionIcon
      variant="text"
      className="me-3 h-auto w-auto p-0 sm:me-4 xl:hidden"
      onClick={() =>
        openDrawer({
          view: <Sidebar className="static w-full 2xl:w-full" />,
          placement: 'left',
          customSize: '320px',
        })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
        />
      </svg>
    </ActionIcon>
  );
}
