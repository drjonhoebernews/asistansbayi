import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Checkbox } from '@/components/ui/checkbox';
import { PiEnvelopeSimple } from 'react-icons/pi';
import Select from "@/components/ui/select";
import {countries} from "@/app/shared/logistics/shipment/create/select-options";
import NoSSR from "@/components/no-ssr";
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import apiHelper from "@/utils/apiHelper";
import Spinner from "@/components/ui/spinner";

interface FormRecipientInfoProps {
  className?: string;
}


type ProvinceType = {
  id: number,
  name: string
};

type DistrictType = {
  id: number,
  name: string;
  provinceId: number;
};


export default function FormRecipientInfo({

  className,
}: FormRecipientInfoProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // İl ve ilçe bilgilerini tutacak state'ler
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProvinces() {
      setIsLoading(true);
      try {
        const response = await apiHelper.get('/sehir/iller');
        const data: ProvinceType[] = await response.data;
        setProvinces(data);
      } catch (error) {
        console.error('Provinces API call failed', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProvinces();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (selectedProvince) {
        setIsLoading(true);
        try {
          const response = await apiHelper.get(`/sehir/ilceler?provinceId=${selectedProvince.id}`);
          const data: DistrictType[] = await response.data;
          setDistricts(data);
        } catch (error) {
          console.error('Districts API call failed', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setDistricts([]);
      }
    }

    fetchDistricts();
  }, [selectedProvince]);

  if (isLoading) {
    return <div className={className}><Spinner size={"xl"} /></div>; // LoadingSpinner'ı kendi spinner komponentinizle değiştirin
  }
  return (
    <FormGroup
      title="Acente Adres Bilgileri"
      description="Acenteye ait adres bilgileri"
      className={cn(className)}
    >
      <NoSSR>
        <Controller
            control={control}
            name="province"
            render={({ field: { value, onChange } })  => {
              useEffect(() => {
                if (value) {
                  const province = provinces.find(p => p.id === Number(value));
                  setSelectedProvince(province || null);
                }
              }, [value]);

              return (
                  <Select
                      label="İl"
                      labelClassName="text-gray-900"
                      dropdownClassName="p-2 gap-1 grid"
                      value={value}
                      onChange={(selectedValue) => {
                        const province = provinces.find(p => p.id === Number(selectedValue));
                        setSelectedProvince(province || null);
                        onChange(Number(selectedValue)); // make sure this is a number
                        setValue('district', ''); // 'acenteDistricts' ilçe adıysa
                      }}
                      options={provinces.map(p => ({ value: p.id, name: p.name }))}
                      getOptionValue={(option) => Number(option.value)}
                      displayValue={(selected) =>
                          provinces?.find((c) => c.id === selected)?.name ?? ''
                      }
                      error={errors?.province?.message as string}
                  />
              )}}
        />
      </NoSSR>
      <NoSSR>
        <Controller
            control={control}
            name="district"
            render={({ field: { value, onChange } }) => {
              return (
                  <Select
                      label="İlçe"
                      labelClassName="text-gray-900"
                      dropdownClassName="p-2 gap-1 grid"
                      value={value}
                      onChange={onChange}
                      options={districts.map(d => ({ value: d.id, name: d.name }))}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                          districts?.find((c) => c.id === selected)?.name ?? ''
                      }
                      disabled={!selectedProvince}
                      error={errors?.district?.message as string}
                  />
            )}}
        />
      </NoSSR>
      <Textarea
          {...register('address')}
          label="Açık Adres"
          className="col-span-full"
          labelClassName="font-medium text-gray-900"
          placeholder="Acentenin açık adresini yazın..."
          error={errors.address?.message as string}
      />
    </FormGroup>
  );
};
