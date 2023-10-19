import { useEffect } from 'react';
import { updateThemeColor } from '@/utils/update-theme-color';
import { usePresets } from '@/config/color-presets';

interface PresetProps {
  [key: string]: string;
}

export function useColorPreset(colorPresets: PresetProps) {
  const COLOR_PRESETS = usePresets();

  useEffect(() => {
    let colorLighter = COLOR_PRESETS[0].colors.lighter;
    let colorLight = COLOR_PRESETS[0].colors.light;
    let colorDefault = COLOR_PRESETS[0].colors.default;
    let colorDark = COLOR_PRESETS[0].colors.dark;

    if (colorPresets) {
      colorLighter = colorPresets.lighter;
      colorLight = colorPresets.light;
      colorDefault = colorPresets.default;
      colorDark = colorPresets.dark;
    }

    updateThemeColor(colorLighter, colorLight, colorDefault, colorDark);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorPresets]);
}
