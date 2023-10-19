import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import CargoDamaged from '@/components/icons/cargo-damaged';
import MagnifyingGlassIconColor from '@/components/icons/magnifying-glass-color';
import TransactionIcon from '@/components/icons/transactions';
import InvoicePrint from '@/components/icons/invoice-print';
import RefundIcon from '@/components/icons/refund';
import TurtleIcon from '@/components/icons/turtle';
import ShipWithContainer from '@/components/icons/ship-with-container';

export const customer = {
  // avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-${getRandomArrayElement(
  //   avatarIds
  // )}.png`,
  avatar: `https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-5.png`,
  name: 'Irene Powlowski',
  email: 'johnson.olson@yahoo.com',
  phone: '(440) 701-6597',
  address: '49001 Mossie Row Berkshire',
  branch: 'Main-Branch',
};

export const stats = [
  {
    icon: TransactionIcon,
    label: 'Toplam Kazanç',
    value: 2890,
    isCurrency: true,
  },
  { icon: InvoicePrint, label: 'Alacağı', value: 2890, isCurrency: true },
  { icon: RefundIcon, label: 'Geri Ödemesi', value: 310, isCurrency: true },
  { icon: TurtleIcon, label: 'Toplam Satışı', value: 34 },
];
