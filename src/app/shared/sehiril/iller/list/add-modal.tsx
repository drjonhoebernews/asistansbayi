'use client';

import z from 'zod';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import apiHelper from "@/utils/apiHelper";

// form zod validation schema
const FormFormSchema = z.object({
    name: z.string().min(1, { message: 'İl gerekli' }),
});

// generate form types from zod validation schema
type FormInfoFormTypes = z.infer<typeof FormFormSchema>;

type Props = {
    id?: string | null;
};
export const AddModalModalView: React.FC<Props> = ({ id }) => {
    const { closeModal } = useModal();
    const [reset, setReset] = useState({});
    const [isLoading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<FormInfoFormTypes> = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        try {
            let response;

            response = await apiHelper.post('/sehir/iller', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201){
                toast.success(
                    <Text tag="b" className="font-semibold">
                        Başarıyla Eklendi
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
            setTimeout(() => {
                console.log(' data ->', data);
                setReset({
                    name: '',
                });
            }, 600);
        }
    };


    return (
    <div className="m-auto p-6">
      <Text tag="h3" className="mb-6 text-lg">
        Yeni İl Ekle
      </Text>
      <Form<FormInfoFormTypes>
        validationSchema={FormFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
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
                Hayır
              </Button>
              <Button type="submit" isLoading={isLoading} className="w-auto">
                Ekle
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
            label="İl"
            placeholder="Örnek: Düzce"
            labelClassName="text-sm font-medium text-gray-900"
            {...register('name')}
            error={errors?.name?.message}
            className="flex-grow"
        />
    </div>
  );
}
