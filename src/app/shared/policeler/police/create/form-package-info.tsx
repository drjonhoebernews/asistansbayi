import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Password} from "@/components/ui/password";
import {Switch} from "@/components/ui/switch";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import apiHelper from "@/utils/apiHelper";
import Spinner from "@/components/ui/spinner";
import {ActionIcon} from "@/components/ui/action-icon";
import TrashIcon from "@/components/icons/trash";
import {PiPlusBold} from "react-icons/pi";

interface FormPackageInfoProps {
  className?: string;
}

const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});

type PoliceTyType = {
  id: number,
  name: string
};

type SelectOption = {
  id: string;
  name: string;
  value: string;
};

export default function FormPackageInfo({ className }: FormPackageInfoProps) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = useFormContext();
    // const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    // console.log('uploadedImage', uploadedImage);
  const services = watch('services', []);
  const [policeoz, setPoliceoz] = useState<PoliceTyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPoliceoz, setSelectedPoliceoz] = useState<PoliceTyType | null>(null);

  const addFeature = useCallback(() => {
    const updatedServices = [...services];
    updatedServices.push({});
    setValue('services', updatedServices);
  }, [services, setValue]);

  useEffect(() => {
    async function getPolicety() {
      setIsLoading(true);
      try {
        const response = await apiHelper.get('/paketler/servis-turleri');
        const data: PoliceTyType[] = await response.data;
        setPoliceoz(data);
      } catch (error) {
        console.error('Provinces API call failed', error);
      } finally {
        setIsLoading(false);
      }
    }
    getPolicety();
  }, []);
  if (isLoading) {
    return <div className={className}><Spinner size={"xl"} /></div>;
  }

  console.log('gelen serviser', services)
    return (
    <FormGroup
      title="Poliçe Kapsam"
      description="Poliçenin neleri kapsadığını buradan ekleyebilirsiniz."
      className={cn(className)}
    >
      {services.map((service: any, index: number) => (
          <div key={service.id ? service.id : index} className="col-span-full flex gap-4 xl:gap-7">
            <Controller
                control={control}
                name={`services[${index}].id`}
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
            {services.length > 1 && (
                <ActionIcon
                    onClick={() => {
                      const updatedServices = [...services];
                      updatedServices.splice(index, 1);
                      setValue('features', updatedServices);
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
        <PiPlusBold className="me-2 h-4 w-4" /> Kapsam Ekle
      </Button>
    </FormGroup>
  );
}
