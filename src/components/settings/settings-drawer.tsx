'use client';

import { useTheme } from 'next-themes';
import {
  PiAlignLeft,
  PiAlignRight,
  PiMoon,
  PiSun,
  PiXBold,
} from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.config';
import { ActionIcon } from '@/components/ui/action-icon';
import { RadioGroup } from '@/components/ui/radio-group';
import { updateThemeColor } from '@/utils/update-theme-color';
import { AdvancedRadio } from '@/components/ui/advanced-radio';
import { presetDark, presetLight, usePresets } from '@/config/color-presets';
import { useEffect } from 'react';
import SimpleBar from '@/components/ui/simplebar';
import { BsLayoutSidebar, BsLayoutSidebarInset } from 'react-icons/bs';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/constants';

function RadioBox({
  value,
  children,
  className,
  ...props
}: React.PropsWithChildren<{ value: string; className?: string }>) {
  return (
    <AdvancedRadio
      value={value}
      color="primary"
      className={cn(
        'flex h-16 items-center justify-center rounded border border-gray-200 px-6 py-1.5 text-sm font-medium capitalize text-gray-500 shadow-sm hover:cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:text-gray-900 peer-checked:ring-[0.6px] peer-checked:ring-primary dark:peer-checked:border-primary dark:peer-checked:ring-primary',
        className
      )}
      inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-primary [&:checked:enabled~span]:border-primary"
      {...props}
    >
      {children}
    </AdvancedRadio>
  );
}

function DrawerBlock({
  title,
  children,
  className,
}: React.PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <div className={cn('mb-10 px-0.5', className)}>
      <Text
        tag="h6"
        className={cn('mb-3 text-sm font-medium tracking-wide text-gray-500')}
      >
        {title}
      </Text>
      {children}
    </div>
  );
}

function ThemeSwitcher({ colorPresetName }: any) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === 'light' && colorPresetName === 'black') {
      updateThemeColor(
        presetLight.lighter,
        presetLight.light,
        presetLight.default,
        presetLight.dark
      );
    }
    if (theme === 'dark' && colorPresetName === 'black') {
      updateThemeColor(
        presetDark.lighter,
        presetDark.light,
        presetDark.default,
        presetDark.dark
      );
    }
  }, [theme, colorPresetName]);

  return (
    <DrawerBlock title="Mode">
      <RadioGroup
        value={theme ?? siteConfig.mode}
        setValue={(selectedTheme: any) => {
          setTheme(selectedTheme);
        }}
        className="grid grid-cols-2 gap-4"
        color="primary"
      >
        <RadioBox value={'light'}>
          <PiSun className="h-[22px] w-[22px]" />
        </RadioBox>
        <RadioBox value={'dark'}>
          <PiMoon className="h-[22px] w-[22px]" />
        </RadioBox>
      </RadioGroup>
    </DrawerBlock>
  );
}

function LayoutSwitcher() {
  const { layout, setLayout } = useLayout();
  return (
    <DrawerBlock title="Layout">
      <RadioGroup
        value={layout}
        setValue={(selectedLayout: any) => setLayout(selectedLayout)}
        className="grid grid-cols-2 gap-4"
        color="primary"
      >
        <RadioBox value={LAYOUT_OPTIONS.HYDROGEN} className="h-20  py-4">
          <BsLayoutSidebar
            aria-label="Hydrogen Layout"
            className="me-1 h-auto w-6"
          />
          Hydrogen
        </RadioBox>
        <RadioBox value={LAYOUT_OPTIONS.HELIUM} className="h-20  py-4">
          <BsLayoutSidebarInset
            aria-label="Helium Layout"
            className="me-1 h-auto w-6"
          />
          Helium
        </RadioBox>
      </RadioGroup>
    </DrawerBlock>
  );
}

function AppDirection({
  direction,
  setDirection,
}: {
  direction: string;
  setDirection: any;
}) {
  return (
    <DrawerBlock title="Direction">
      <RadioGroup
        value={direction ?? 'ltr'}
        // @ts-ignore
        setValue={setDirection}
        className="grid grid-cols-2 gap-4"
        color="primary"
      >
        <RadioBox value={'ltr'} className="h-20  py-4">
          <PiAlignLeft className="me-1 h-auto w-6" />
          LTR
        </RadioBox>
        <RadioBox value={'rtl'} className=" h-20 py-4">
          <PiAlignRight className="me-1 h-auto w-6" />
          RTL
        </RadioBox>
      </RadioGroup>
    </DrawerBlock>
  );
}

function ColorOptions({
  setColorPresets,
  colorPresetName,
  setColorPresetName,
}: any) {
  const COLOR_PRESETS = usePresets();
  return (
    <DrawerBlock title="Colors">
      <div className="grid grid-cols-2 gap-4">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset?.name}
            title={preset?.name}
            onClick={() => {
              setColorPresets(preset?.colors);
              setColorPresetName(preset?.name.toLowerCase());
            }}
            className={cn(
              'grid h-auto place-content-center gap-2 rounded border border-gray-200 py-4 shadow-sm transition duration-300 focus-visible:outline-none',
              colorPresetName?.toLowerCase() === preset?.name?.toLowerCase()
                ? 'ring-2 ring-primary ring-offset-0'
                : 'hover:border-primary'
            )}
          >
            <span
              style={{ backgroundColor: preset.colors.default }}
              className="h-6 w-6 rounded-full"
            />
          </button>
        ))}
      </div>
    </DrawerBlock>
  );
}

export function DrawerHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
      <Text tag="h5" className={cn('font-semibold')}>
        Görsel Ayarlar
      </Text>
      <ActionIcon
        variant="outline"
        onClick={onClose}
        className={cn('border-0 p-0')}
      >
        <PiXBold className="h-5 w-5" />
      </ActionIcon>
    </div>
  );
}

export default function SettingsDrawer({
  direction,
  // setDirection,
  // colorPresets,
  setColorPresets,
  colorPresetName,
  setColorPresetName,
}: any) {
  return (
    <>
      <SimpleBar className="h-[calc(100%-130px)]">
        <div className="px-5 py-6">
          <ThemeSwitcher
            colorPresetName={colorPresetName}
            setColorPresetName={setColorPresetName}
          />
          <LayoutSwitcher />
          {/*<AppDirection direction={direction} setDirection={setDirection} />*/}
          <ColorOptions
            setColorPresets={setColorPresets}
            colorPresetName={colorPresetName}
            setColorPresetName={setColorPresetName}
          />
        </div>
      </SimpleBar>
      {/*<a*/}
      {/*  href="https://themeforest.net/item/isomorphic-react-redux-admin-dashboard/20262330?ref=redqteam"*/}
      {/*  target="_blank"*/}
      {/*  className="grid grid-cols-1 px-6"*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    size="lg"*/}
      {/*    tag="span"*/}
      {/*    color="primary"*/}
      {/*    className="font-lexend text-sm font-medium uppercase dark:bg-gray-50"*/}
      {/*  >*/}
      {/*    Purchase Now*/}
      {/*  </Button>*/}
      {/*</a>*/}
    </>
  );
}
