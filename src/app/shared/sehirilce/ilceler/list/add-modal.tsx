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
import SelectBox from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";


// form zod validation schema
const FormFormSchema = z.object({
    name: z.string().min(1, { message: 'İlçe gerekli' }),
    province: z.string({ required_error: 'İl gerekli' }),
});

type DataType = {
    id: number,
    name: string,
    province_name: string,
    province: number,
};

// generate form types from zod validation schema
type FormInfoFormTypes = z.infer<typeof FormFormSchema>;

type Props = {
    id?: string | null;
};
export const AddModalModalView: React.FC<Props> = ({ id }) => {
    const { closeModal } = useModal();
    const [data, setData] = useState<DataType[]>([]);
    const [reset, setReset] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await apiHelper.get('/sehir/iller');
                const data: DataType[] = await response.data;
                setData(data);
            } catch (error) {
                console.error('Provinces API call failed', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const onSubmit: SubmitHandler<FormInfoFormTypes> = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('province', data.province);
        try {
            let response;

            response = await apiHelper.post('/sehir/ilceler', formData, {
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
                    brand: '',
                });
            }, 600);
        }
    };

    if (isLoading){
        return (
            <>
                <Spinner size={"xl"}/>
            </>
        )
    }

    const selectOptions = data
        .filter((value, index, self) => self.findIndex(m => m.name === value.name) === index)
        .map(dataItem => {
            return {
                value: dataItem.id ? dataItem.id.toString() : '',
                name: dataItem.name
            };
        });
    return (
    <div className="m-auto p-6">
      <Text tag="h3" className="mb-6 text-lg">
        Yeni İlçe Ekle
      </Text>
      <Form<FormInfoFormTypes>
        validationSchema={FormFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <MemberForm control={control} register={register} errors={errors} data={selectOptions}/>
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


export function MemberForm({ register, control, errors, data }: any) {
    return (
    <div className="flex flex-col gap-4 text-gray-700">
        <Controller
            control={control}
            name="province"
            render={({ field: { value, onChange } }) => (
                <SelectBox
                    label="İller"
                    labelClassName="text-sm font-medium text-gray-900"
                    placeholder={data[0]?.name}
                    options={data}
                    onChange={onChange}
                    value={value || ''}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected) =>
                        data?.find((t: { value: string; name: string }) => t.value === selected)?.name ?? ''
                    }
                    error={errors?.province?.message as string}
                />
            )}
        />
        <Input
            type="text"
            label="İlçe"
            placeholder="Örnek: TOG"
            labelClassName="text-sm font-medium text-gray-900"
            {...register('name')}
            error={errors?.name?.message}
            className="flex-grow"
        />
    </div>
  );
}
