'use client';

import dynamic from 'next/dynamic';
import cn from '@/utils/class-names';
import { useDirection } from '@/hooks/use-direction';
import CogSolidIcon from '@/components/icons/cog-solid';
import { ActionIcon } from '@/components/ui/action-icon';
import { DrawerHeader } from '@/components/settings/settings-drawer';
import { usePresets } from '@/config/color-presets';
import { useColorPreset } from '@/hooks/use-theme-color';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
const SettingsDrawer = dynamic(
  () => import('@/components/settings/settings-drawer'),
  {
    ssr: false,
  }
);

export default function SettingsButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { direction, setDirection } = useDirection();
  const [colorPresetName, setColorPresetName] = useLocalStorage(
    'isomorphic-preset-name',
    COLOR_PRESETS[0].name
  );
  const [colorPresets, setColorPresets] = useLocalStorage<{
    [key: string]: string;
  }>('isomorphic-preset', COLOR_PRESETS[0].colors);

  useColorPreset(colorPresets ?? COLOR_PRESETS[0].colors);

  function handleOpenDrawer() {
    openDrawer({
      view: (
        <>
          <DrawerHeader onClose={closeDrawer} />
          <SettingsDrawer
            direction={direction}
            setDirection={setDirection}
            colorPresetName={colorPresetName}
            setColorPresetName={setColorPresetName}
            colorPresets={colorPresets}
            setColorPresets={setColorPresets}
          />
        </>
      ),
      placement: 'right',
      customSize: '420px',
    });
  }

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn(
        'relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9',
        className
      )}
      onClick={handleOpenDrawer}
    >
      {children ? (
        children
      ) : (
        <CogSolidIcon
          strokeWidth={1.8}
          className="h-[22px] w-auto animate-spin-slow"
        />
      )}
    </ActionIcon>
  );
}
