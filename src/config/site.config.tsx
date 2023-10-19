import logoImg from '@public/logo.svg';
import logoIconImg from '@public/logo-short.svg';
import { LAYOUT_OPTIONS } from './constants';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Asistans360',
  description: 'Asistans360 Otomasyon',
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};
