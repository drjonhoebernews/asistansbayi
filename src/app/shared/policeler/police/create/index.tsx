'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import FormFooter from '@/components/form-footer';
import FormSenderInfo from '@/app/shared/policeler/police/create/form-sender-info';
import FormPackageInfo from '@/app/shared/policeler/police/create/form-package-info';
import FormShippingInfo from '@/app/shared/policeler/police/create/form-shipping-info';
import FormRecipientInfo from '@/app/shared/policeler/police/create/form-recipient-info';
import FormPaymentMethodInfo from '@/app/shared/policeler/police/create/form-payment-method-info';
import FormNav, {
  FormParts,
} from '@/app/shared/policeler/police/create/form-nav';
import {
  policeFormSchema,
  defaultValues,
  policeFormTypes,
} from '@/app/shared/policeler/police/create/form-utils';
import cn from '@/utils/class-names';
import apiHelper from "@/utils/apiHelper";
import Spinner from "@/components/ui/spinner";
import {mockProviders} from "next-auth/client/__tests__/helpers/mocks";
import type = mockProviders.github.type;

const MAP_STEP_TO_COMPONENT = {
  [FormParts.PoliceBilgileri]: FormSenderInfo,
  [FormParts.PoliceSozlesme]: FormRecipientInfo,
  [FormParts.PoliceOzellikleri]: FormPaymentMethodInfo,
  [FormParts.PoliceKapsami]: FormPackageInfo,
  [FormParts.PoliceBanner]: FormShippingInfo,
};

interface IndexProps {
  id?: string;
  shipment?: policeFormTypes;
  className?: string;
}

export default function CreatePolice({
  id,
  shipment,
  className,
}: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<policeFormTypes | null>(null);

  const methods = useForm({
    defaultValues: defaultValues(data || shipment),
    resolver: zodResolver(policeFormSchema),
  });

  useEffect(() => {
    async function fetchShipmentData() {
      if (id) {
        setLoading(true);
        try {
          const response = await apiHelper.get(`/paketler/policeler/${id}`);
          if (response.data) {
            setData(response.data);
            const defaultVals = defaultValues(response.data);
            Object.keys(defaultVals).forEach((key) => {
              const typedKey = key as keyof policeFormTypes;
              methods.setValue(typedKey, defaultVals[typedKey]);
            });
          }
        } catch (error) {
          toast.error('Veri çekilirken bir hata oluştu.');
        } finally {
          setLoading(false); // Veri çekildikten sonra yükleme durumunu kapat
        }
      }
    }

    fetchShipmentData();
  }, [id]);

  const onSubmit: SubmitHandler<policeFormTypes> = async (data) => {
    setLoading(true);
    const formData = new FormData();


    if (data.features && Array.isArray(data.features)) {
      data.features_ids = data.features.map(f => f.id.toString());
      console.log(data.features_ids)
    }

    if (data.services && Array.isArray(data.services)) {
      data.services_ids = data.services.map(s => s.id.toString());
      console.log(data.services_ids)
    }

    console.log(data.banner)
    if (data.banner instanceof File) {
      formData.append('banner', data.banner);
    } else {
      console.log("Banner bir dosya değil");
    }

    Object.keys(data).forEach((key) => {
      const currentKey = key as keyof policeFormTypes;
      const value = data[currentKey] as any;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (typeof v === 'string' || v instanceof Blob) {
            formData.append(currentKey, v);
          }
        });
      } else if (!(value instanceof File)) {
        if (typeof value === 'string' || value instanceof Blob) {
          formData.append(currentKey, value);
        }
      }
    });
    try {
      let response;

      if (id) {
        response = await apiHelper.put(`/paketler/policeler/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await apiHelper.post('/paketler/policeler', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(id ? 'Acente başarıyla güncellendi!' : 'Acente başarıyla oluşturuldu!');
      } else {
        toast.error('Bir hata oluştu. Lütfen tekrar deneyiniz.');
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
    }
    setLoading(false);
  };
  if (isLoading) {
    return <>
      <Spinner size={"xl"}/>
    </>;
  }
  return (
    <div className="@container">
      <FormNav />
      <FormProvider {...methods}>
        <form
          className={cn('mt-6', className)}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={FormParts[key as keyof typeof FormParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>
          <FormFooter
            isLoading={isLoading}
            submitBtnText={id ? 'Güncelle' : 'Oluştur'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
