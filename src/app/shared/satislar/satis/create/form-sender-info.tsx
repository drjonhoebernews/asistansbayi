import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Checkbox } from '@/components/ui/checkbox';
import { PiEnvelopeSimple } from 'react-icons/pi';

interface FormSenderInfoProps {
  className?: string;
}
// @ts-ignore
export default function FormSenderInfo({ className }: FormSenderInfoProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="Kişi Bilgileri"
      description="Gerekli bilgileri burayı girin"
      className={cn(className)}
    >
      <Input
          type="number"
          label="T.C /VKN NO:"
          maxLength={11}
          className="col-span-full"
          placeholder="Türkiye Cumhuriyeti Kimlik Numarası veya VKN"
          labelClassName="font-medium text-gray-900"
          {...register('identity_number')}
          error={errors.identity_number?.message as string}
      />
      <Input
        type="text"
        label="Adı"
        placeholder="Örnek: ad"
        labelClassName="font-medium text-gray-900"
        {...register('first_name')}
        error={errors.first_name?.message as string}
      />
      <Input
          type="text"
          label="Soyadı"
          placeholder="Örnek: soyad"
          labelClassName="font-medium text-gray-900"
          {...register('last_name')}
          error={errors.last_name?.message as string}
      />
    </FormGroup>
  );
}
// @ts-ignore
