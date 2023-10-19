import dayjs from 'dayjs';
import 'dayjs/locale/tr'; // Türkçe dil desteği için

export function formatDate(
    inputDate?: Date | string,
    format: string = 'DD MMM, YYYY'
): string {
  if (!inputDate) return '';

  dayjs.locale('tr'); // Türkçe dil ayarını aktif hale getiriyoruz
  return dayjs(inputDate).format(format);
}
