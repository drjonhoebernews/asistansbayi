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
import {Textarea} from "@/components/ui/textarea";
import {Switch} from "@/components/ui/switch";

// form zod validation schema
const FormFormSchema = z.object({
    name: z.string().min(1, { message: 'Özellik gerekli' }),
    description: z.string().min(1, { message: 'Özellik açıklaması gerekli' }),
    is_active: z.any(),
    is_included: z.any(),
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
            const response = await apiHelper.get(`/paketler/police-ozelligi/${id}`);
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
        formData.append('description', data.description);
        formData.append('is_active', data.is_active);
        formData.append('is_included', data.is_included);
        try {
            let response;

            if (id) {
                response = await apiHelper.put(`/paketler/police-ozelligi/${id}`, formData, {
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
    return (
    <div className="m-auto p-6">
      <Text tag="h3" className="mb-6 text-lg">
          Güncelle
      </Text>
      <Form<FormInfoFormTypes>
        validationSchema={FormFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        defaultValues={initialData || undefined}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <MemberForm control={control} register={register} errors={errors} />
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


export function MemberForm({ register, control, errors }: any) {
  return (
    <div className="flex flex-col gap-4 text-gray-700">
        <Input
            type="text"
            label="Özellik"
            placeholder="Örnek: 2 DEFA ARIZA ( EN YAKIN TAMIRHANE )"
            labelClassName="text-sm font-medium text-gray-900"
            {...register('name')}
            error={errors?.name?.message}
            className="flex-grow"
        />
        <Textarea
            type="text"
            label="Açıklama"
            placeholder="Örnek: 2 DEFA ARIZA ( EN YAKIN TAMIRHANE ) vb ek olarak açıklamalar"
            labelClassName="text-sm font-medium text-gray-900"
            {...register('description')}
            error={errors?.description?.message}
            className="flex-grow"
        />
        <div className="flex flex-col gap-4 xs:flex-row xs:items-center">
            <Switch
                label="Aktif Olsun"
                variant="flat"
                labelClassName="font-medium text-sm text-gray-900"
                {...register('is_active')}
            />
            <Switch
                label="Dahil Olsun"
                variant="flat"
                labelClassName="font-medium text-sm text-gray-900"
                {...register('is_included')}
            />
        </div>
    </div>
  );
}
