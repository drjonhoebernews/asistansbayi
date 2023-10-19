import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {Switch} from "@/components/ui/switch";

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
      title="Poliçe Bilgileri"
      description="Gerekli bilgileri burayı girin"
      className={cn(className)}
    >
      <Input
          type="text"
          label="Poliçe Adı"
          placeholder="Örnek: Yol Yardım"
          className="col-span-full"
          labelClassName="font-medium text-gray-900"
          {...register('name')}
          error={errors.name?.message as string}
      />
      <Input
          label="Fiyatı"
          placeholder="10"
          {...register('price')}
          error={errors.price?.message as string}
          prefix={'₺'}
          type="number"
      />
      <Input
          label="Komisyon"
          placeholder="15"
          {...register('percentage')}
          error={errors.percentage?.message as string}
          prefix={'%'}
          type="number"
      />
        <Switch
            label="SMS ile Bayi Bilgilendir"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
            {...register('smsbayi')}
        />
        <Switch
            label="Mail ile Bayi Bilgilendir"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
            {...register('mailbayi')}
        />
    </FormGroup>
  );
}
