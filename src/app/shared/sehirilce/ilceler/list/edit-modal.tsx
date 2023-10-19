'use client';

import z from 'zod';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import {useEffect, useState} from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import apiHelper from "@/utils/apiHelper";
import Spinner from "@/components/ui/spinner";
import SelectBox from "@/components/ui/select";
import {NoSSR} from "next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr";

// form zod validation schema
const FormFormSchema = z.object({
    name: z.string().min(1, { message: 'İlçe gerekli' }),
    province: z.any(),
});

// generate form types from zod validation schema
type FormInfoFormTypes = z.infer<typeof FormFormSchema>;

type Props = {
    id?: string | null;
};
export const EditodalModalView: React.FC<Props> = ({ id }) => {
    const { closeModal } = useModal();
    const [reset, setReset] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<FormInfoFormTypes | null>(null);
    const [isFetching, setIsFetching] = useState(true);  // Yeni durum değişkeni
    const [markaData, setMarkaData] = useState<FormInfoFormTypes | null>(null);

    useEffect(() => {
        if (id) {
            fetchInitialData();
        } else {
            setIsFetching(false);
        }
    }, [id]);

    const fetchInitialData = async () => {
        setIsFetching(true);
        try {
            const response = await apiHelper.get(`/sehir/ilce/${id}`);
            setInitialData(response.data); // API yanıt yapınıza göre ayarlamanız gerekebilir
            setIsFetching(false);  // Veri başarıyla geldiğinde yükleniyor durumunu false yap
        } catch (error) {
            console.error("Başlangıç verisi çekerken hata", error);
            toast.error('Başlangıç verisi çekilemedi.');
            setIsFetching(false);  // Veri başarıyla geldiğinde yükleniyor durumunu false yap
        }
    };

    const onSubmit: SubmitHandler<FormInfoFormTypes> = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('province', data.province);
        try {
            let response;

            if (id) {
                response = await apiHelper.put(`/sehir/ilce/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success(
                    <Text tag="b" className="font-semibold">
                        Başarıyla Güncellendi
                    </Text>
                );
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                Object.entries(error.response.data).forEach(([key, errorArray]) => {
                    (errorArray as string[]).forEach((errorMessage: string) => {
                        toast.error(`${key}: ${errorMessage}`);
                    });
                });
            } else {
                toast.error('API ile iletişim kurulurken bir hata oluştu.');
            }
        } finally {
            setLoading(false);
        }
    };
    if (isFetching){
        return(
            <Spinner size={"xl"}/>
        )
    }
    console.log('initial data değer: ',initialData)

    return (
    <div className="m-auto p-6">
      <Text tag="h3" className="mb-6 text-lg">
          Güncelle
      </Text>
      <Form<FormInfoFormTypes>
        validationSchema={FormFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        // @ts-ignore
        defaultValues={initialData}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <MemberForm control={control} register={register} errors={errors} markalar={markaData} initialBrand={initialData}/>
            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto"
                variant="outline"
                onClick={() => closeModal()}
              >
                Kapat
              </Button>
              <Button type="submit" isLoading={isLoading} className="w-auto">
                Güncelle
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}


type Data = {
    id: number;
    name: string;
};
export function MemberForm({ register, control, errors, markalar = [], initialBrand = {}  }: any) {
    const [brands, setBrands] = useState<Data[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchMarkaData();
    }, []);
    const fetchMarkaData = async () => {
        setIsFetching(true);
        try {
            const response = await apiHelper.get(`/sehir/iller`);
            setBrands(response.data);
            setIsFetching(false);
        } catch (error) {
            console.error("Başlangıç verisi çekerken hata", error);
            toast.error('Başlangıç verisi çekilemedi.');
            setIsFetching(false);
        }
    };
    return (
      <div className="flex flex-col gap-4 text-gray-700">
          <NoSSR>
              <Controller
                  control={control}
                  name="province"
                  render={({ field: { value, onChange } }) => {
                      const [selectedBrand, setSelectedBrand] = useState<Data | null>(null);
                      useEffect(() => {
                          if (value) {
                              const brand = brands.find(b => b.id === Number(value));
                              setSelectedBrand(brand || null);
                          }
                      }, [value]);
                      return (
                          <SelectBox
                              label="İl"
                              options={brands.map(b => ({ value: b.id.toString(), name: b.name }))}
                              value={value}
                              onChange={(selectedValue: string) => {
                                  const brand = brands.find(b => b.id === Number(selectedValue));
                                  setSelectedBrand(brand || null);
                                  onChange(selectedValue);
                              }}
                              getOptionValue={(option) => Number(option.value)}
                              displayValue={(selected) =>
                                  brands.find((r) => r.id === selected)?.name || ''
                              }
                              error={errors?.province?.message as string}
                          />
                      );
                  }}
              />
          </NoSSR>
          <Input
              type="text"
              {...register('name')}
              defaultValue={initialBrand?.name}
              label="İlçe"
              placeholder="Örnek: Şavşat"
              labelClassName="text-sm font-medium text-gray-900"
              error={errors?.name?.message}
              className="flex-grow"
          />
      </div>
  );
}
