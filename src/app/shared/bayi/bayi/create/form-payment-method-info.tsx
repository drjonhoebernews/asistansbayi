import { Controller, useFormContext } from 'react-hook-form';
import cn from '@/utils/class-names';
import NoSSR from '@/components/no-ssr';
import Select from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import {
  banklist,
} from '@/app/shared/logistics/shipment/create/select-options';
import Spinner from "@/components/ui/spinner";
import {useState} from "react";

interface FormPaymentMethodInfoProps {
  className?: string;
}

type BankOption = {
    value: string | number;
    name: string;
};


export default function FormPaymentMethodInfo({
  className,
}: FormPaymentMethodInfoProps) {
  const {
    register,
    control,
    formState: { errors },
      setValue,
  } = useFormContext();

    const handleIBANChange = (event: any) => {
    const value = event.target.value.replace(/\s/g, ""); // Boşlukları kaldır
    const formattedValue: string = "TR" + value.substring(2).replace(/(.{4})/g, "$1 ").trim(); // Her 4 karakterde bir boşluk ekleyin
    event.target.value = formattedValue;
  };

    return (
    <FormGroup
      title="Acente Çalışma Şartları ve Ödemeler"
      description="Acente ile ilgili çalışma şartlarını ve Ödeme bilgilerini belirleyin"
      className={cn(className)}
    >
      <NoSSR>
          <Controller
              name="banka"
              control={control}
              render={({ field: { value, onChange, ref } }) => {
                  if (value === null) {
                      return <div><Spinner size={"xl"}/></div>;
                  }
                  const displayBankName = (selected:any) => {
                      const foundBank = banklist?.find((c) => `${c.value}` === `${selected}`);
                      return foundBank ? foundBank.name : '';
                  };

                  return (
                      <Select
                          label="Banka"
                          labelClassName="text-gray-900"
                          dropdownClassName="p-2 gap-1 grid"
                          value={value}
                          onChange={onChange}
                          options={banklist}
                          getOptionValue={(option) => option.value}
                          displayValue={displayBankName}
                          error={errors?.banka?.message as string}
                      />
                  );
              }}
          />

        <Input
            label="IBAN"
            placeholder="TR"
            labelClassName="font-medium text-gray-900"
            {...register('iban')}
            onChange={handleIBANChange}
            error={errors.iban?.message as string}
        />
      </NoSSR>
    </FormGroup>
  );
}
