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
import {useEffect, useState} from "react";
import apiHelper from "@/utils/apiHelper";

interface FormPaymentMethodInfoProps {
  className?: string;
}

type MarkaType = {
    id: number,
    name: string
};

type ModelType = {
    id: number,
    name: string;
    brand: number;
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
    const [marka, setMarka] = useState<MarkaType[]>([]);
    const [model, setModel] = useState<ModelType[]>([]);
    const [selectedMarka, setSelectedMarka] = useState<MarkaType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getMarka() {
            setIsLoading(true);
            try {
                const response = await apiHelper.get('/araclar/markalar');
                const data: MarkaType[] = await response.data;
                setMarka(data);
            } catch (error) {
                console.error('Provinces API call failed', error);
            } finally {
                setIsLoading(false);
            }
        }

        getMarka();
    }, []);

    useEffect(() => {
        async function getModel() {
            if (selectedMarka) {
                setIsLoading(true);
                try {
                    const response = await apiHelper.get(`/araclar/modeller?brandID=${selectedMarka.id}`);
                    const data: ModelType[] = await response.data;
                    setModel(data);
                } catch (error) {
                    console.error('Districts API call failed', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setModel([]);
            }
        }

        getModel();
    }, [selectedMarka]);

    if (isLoading) {
        return <div className={className}><Spinner size={"xl"} /></div>; // LoadingSpinner'ı kendi spinner komponentinizle değiştirin
    }
    return (
    <FormGroup
      title="Plaka ve Araç Bilgileri"
      description="Plaka ve araç bilgilerinizi yazın!"
      className={cn(className)}
    >
        <NoSSR>
            <Controller
                control={control}
                name="brand"
                render={({ field: { value, onChange } })  => {
                    useEffect(() => {
                        if (value) {
                            const mark = marka.find(p => p.id === Number(value));
                            setSelectedMarka(mark || null);
                        }
                    }, [value]);

                    return (
                        <Select
                            label="Marka"
                            labelClassName="text-gray-900"
                            dropdownClassName="p-2 gap-1 grid"
                            value={value}
                            onChange={(selectedValue) => {
                                const mark = marka.find(p => p.id === Number(selectedValue));
                                setSelectedMarka(mark || null);
                                onChange(Number(selectedValue)); // make sure this is a number
                                setValue('model', ''); // 'acenteDistricts' ilçe adıysa
                            }}
                            options={marka.map(p => ({ value: p.id, name: p.name }))}
                            getOptionValue={(option) => Number(option.value)}
                            displayValue={(selected) =>
                                marka?.find((c) => c.id === selected)?.name ?? ''
                            }
                            error={errors?.brand?.message as string}
                        />
                    )}}
            />
        </NoSSR>
        <NoSSR>
            <Controller
                control={control}
                name="model"
                render={({ field: { value, onChange } }) => {
                    return (
                        <Select
                            label="Model"
                            labelClassName="text-gray-900"
                            dropdownClassName="p-2 gap-1 grid"
                            value={value}
                            onChange={onChange}
                            options={model.map(d => ({ value: d.id, name: d.name }))}
                            getOptionValue={(option) => option.value}
                            displayValue={(selected) =>
                                model?.find((c) => c.id === selected)?.name ?? ''
                            }
                            disabled={!selectedMarka}
                            error={errors?.model?.message as string}
                        />
                    )}}
            />
        </NoSSR>
      <NoSSR>
          <Input
              type="text"
              label="Plaka bilgileri"
              maxLength={11}
              className="col-span-full"
              placeholder="06AA666"
              labelClassName="font-medium text-gray-900"
              {...register('plaka')}
              error={errors.plaka?.message as string}
          />
      </NoSSR>
    </FormGroup>
  );
}
