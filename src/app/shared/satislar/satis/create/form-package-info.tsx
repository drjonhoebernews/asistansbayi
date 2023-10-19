import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import Select from '@/components/ui/select';
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Password} from "@/components/ui/password";
import {Switch} from "@/components/ui/switch";

interface FormPackageInfoProps {
  className?: string;
}

const roleOptions = [
  { value: 'bayi', label: 'BAYİ' },
];
export default function FormPackageInfo({ className }: FormPackageInfoProps) {
  const {
    register,
    control,
      setValue,
      formState: { errors },
  } = useFormContext();

return (
    <FormGroup
      title="Kredi Kartı Ödeme"
      description="Kart ile ödeme Alanı Kart bilgilerinizi giriniz."
      className={cn(className)}
    >

        <Switch
            label="Aktif Olsun"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
            {...register('is_active')}
        />
    </FormGroup>
  );
}
