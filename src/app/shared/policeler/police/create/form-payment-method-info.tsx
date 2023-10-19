import {Controller, useFieldArray, useFormContext} from 'react-hook-form';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {useCallback, useEffect, useState} from "react";
import {ActionIcon} from "@/components/ui/action-icon";
import TrashIcon from "@/components/icons/trash";
import {Button} from "@/components/ui/button";
import {PiPlusBold} from "react-icons/pi";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import apiHelper from "@/utils/apiHelper";
import Spinner from "@/components/ui/spinner";

interface FormPaymentMethodInfoProps {
  className?: string;
}


const Select = dynamic(() => import('@/components/ui/select'), {
    ssr: false,
    loading: () => <SelectLoader />,
});

type PoliceOzType = {
    id: number,
    name: string
};

type SelectOption = {
    id: string;
    name: string;
    value: string;
};


export default function FormPaymentMethodInfo({
  className,
}: FormPaymentMethodInfoProps) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = useFormContext();
    const features = watch('features', []);
    const [policeoz, setPoliceoz] = useState<PoliceOzType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPoliceoz, setSelectedPoliceoz] = useState<PoliceOzType | null>(null);

    const addFeature = useCallback(() => {
        const updatedFeatures = [...features];
        updatedFeatures.push({});
        setValue('features', updatedFeatures);
    }, [features, setValue]);

    useEffect(() => {
        async function getPoliceoz() {
            setIsLoading(true);
            try {
                const response = await apiHelper.get('/paketler/police-ozellikleri');
                const data: PoliceOzType[] = await response.data;
                setPoliceoz(data);
            } catch (error) {
                console.error('Provinces API call failed', error);
            } finally {
                setIsLoading(false);
            }
        }
        getPoliceoz();
    }, []);
    if (isLoading) {
          return <div className={className}><Spinner size={"xl"} /></div>;
        }
    return (
    <FormGroup
      title="Poliçe Özellikleri"
      description="Poliçe özelliklerini ekleyerek belirleyin"
      className={cn(className)}
    >
        {features.map((feature: any, index: number) => (
            <div key={feature.id ? feature.id : index} className="col-span-full flex gap-4 xl:gap-7">
                <Controller
                    control={control}
                    name={`features[${index}].id`}
                    render={({ field: { onChange, value } }) => {
                        const selectedFeatureName = policeoz.find(p => p.id === Number(value))?.name || '';

                        return (
                            <Select
                                label="Özellik"
                                className="w-full @2xl:w-auto @2xl:flex-grow"
                                value={selectedFeatureName} // Burada seçilen özelliğin adını gösteriyoruz
                                onChange={(selectedOption: SelectOption) => {
                                    const selectedPolice = policeoz.find(p => p.name === selectedOption.name);
                                    if (selectedPolice) {
                                        setSelectedPoliceoz(selectedPolice);
                                        onChange(selectedPolice.id); // Sadece ID değerini gönderiyoruz.
                                    }
                                }}
                                options={policeoz.map(p => ({ id: p.id.toString(), name: p.name, value: p.id.toString() }))}
                            />
                        );
                    }}
                />
                {features.length > 1 && (
                    <ActionIcon
                        onClick={() => {
                            const updatedFeatures = [...features];
                            updatedFeatures.splice(index, 1);
                            setValue('features', updatedFeatures);
                        }}
                        variant="flat"
                        className="mt-7 shrink-0"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </ActionIcon>
                )}
            </div>
        ))}
        <Button
            onClick={addFeature}
            variant="outline"
            className="col-span-full ml-auto w-auto"
        >
            <PiPlusBold className="me-2 h-4 w-4" /> Özellik Ekle
        </Button>
    </FormGroup>
  );
}
