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
      title="Acente Bilgileri"
      description="Gerekli bilgileri burayı girin"
      className={cn(className)}
    >
      <Input
          type="number"
          label="T.C. NO:"
          maxLength={11}
          placeholder="Türkiye Cumhuriyeti Kimlik Numarası"
          labelClassName="font-medium text-gray-900"
          {...register('identity_number')}
          error={errors.identity_number?.message as string}
      />
      <Input
          type="number"
          label="VKN:"
          maxLength={10}
          placeholder="Vergi Kimlik Numarası"
          labelClassName="font-medium text-gray-900"
          {...register('tax_number')}
          error={errors.tax_number?.message as string}
      />
      <Input
        type="text"
        label="Sahibi Adı"
        placeholder="Örnek: ad"
        labelClassName="font-medium text-gray-900"
        {...register('first_name')}
        error={errors.first_name?.message as string}
      />
      <Input
          type="text"
          label="Sahibi Soyadı"
          placeholder="Örnek: soyad"
          labelClassName="font-medium text-gray-900"
          {...register('last_name')}
          error={errors.last_name?.message as string}
      />
      <Input
          type="text"
          label="Acente Adı"
          placeholder="Örnek: Acente adı"
          className="col-span-full"
          labelClassName="font-medium text-gray-900"
          {...register('company_name')}
          error={errors.company_name?.message as string}
      />
      <Input
        type="email"
        label="E-Posta"
        labelClassName="font-medium text-gray-900"
        placeholder="bayi@domain.com.tr"
        {...register('email')}
        error={errors.email?.message as string}
      />
      <Input
        label="Acente Telefon"
        labelClassName="font-medium text-gray-900"
        placeholder="0 312 111 11 11"
        {...register('phone')}
        error={errors.phone?.message as string}
      />
      <Input
          label="Cep Telefon"
          labelClassName="font-medium text-gray-900"
          placeholder="0 555 5555"
          {...register('cep')}
          error={errors.cep?.message as string}
      />
      <Input
          label="Whatsapp"
          labelClassName="font-medium text-gray-900"
          placeholder="0 555 5555"
          {...register('whatsapp')}
          error={errors.whatsapp?.message as string}
      />
      <Controller
        name="SmsNotify"
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            onChange={onChange}
            label={
              <span className="flex items-center gap-1">
                SMS ile bilgilendir
                <PiEnvelopeSimple className="h-4 w-4" />
              </span>
            }
            size="sm"
            className="-mt-2"
          />
        )}
      />
    </FormGroup>
  );
}
// @ts-ignore
