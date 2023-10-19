'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import FormFooter from '@/components/form-footer';
import FormSenderInfo from '@/app/shared/bayi/bayi/create/form-sender-info';
import FormPackageInfo from '@/app/shared/bayi/bayi/create/form-package-info';
import FormShippingInfo from '@/app/shared/bayi/bayi/create/form-shipping-info';
import FormRecipientInfo from '@/app/shared/bayi/bayi/create/form-recipient-info';
import FormPaymentMethodInfo from '@/app/shared/bayi/bayi/create/form-payment-method-info';
import FormNav, {
  FormParts,
} from '@/app/shared/bayi/bayi/create/form-nav';
import {
  acenteFormSchema,
  defaultValues,
  ShipmentFormTypes,
} from '@/app/shared/bayi/bayi/create/form-utils';
import cn from '@/utils/class-names';
import apiHelper from "@/utils/apiHelper";
import {AcentemapDataToModel, AcenteMappedData, AcenteApiData} from "@/utils/dataMappers";
import Spinner from "@/components/ui/spinner";

const MAP_STEP_TO_COMPONENT = {
  [FormParts.AcenteBilgileri]: FormSenderInfo,
  [FormParts.AcenteAdres]: FormRecipientInfo,
  [FormParts.AcenteCalismaSekli]: FormPaymentMethodInfo,
  [FormParts.AcenteYetkiGuvenlik]: FormPackageInfo,
  [FormParts.AcenteEvraklari]: FormShippingInfo,
};

interface IndexProps {
  id?: string;
  shipment?: ShipmentFormTypes;
  className?: string;
}

export default function CreateBayi({
  id,
  shipment,
  className,
}: IndexProps) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<ShipmentFormTypes | null>(null);

  const methods = useForm({
    defaultValues: defaultValues(data || shipment),
    resolver: zodResolver(acenteFormSchema),
  });

  useEffect(() => {
    async function fetchShipmentData() {
      if (id) {
        setLoading(true); // Veri çekmeye başladığında yükleme durumunu etkinleştir
        try {
          const response = await apiHelper.get(`/kullanici/islem/${id}`);
          if (response.data) {
            setData(response.data);
            const defaultVals = defaultValues(response.data);
            Object.keys(defaultVals).forEach((key) => {
              const typedKey = key as keyof ShipmentFormTypes;
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

  const onSubmit: SubmitHandler<ShipmentFormTypes> = async (data) => {
    setLoading(true);
    const formData = new FormData();

    const mappedData = AcentemapDataToModel(data as AcenteApiData); // Eğer ShipmentFormTypes, AcenteApiData türüne uygunsa bu dönüşümü yapabilirsiniz.

    Object.keys(mappedData).forEach((key) => {
      const mappedKey = key as keyof AcenteMappedData;
      const value = mappedData[mappedKey] as any;

      if (value instanceof File) {
        formData.append(mappedKey, value, value.name);
      } else {
        formData.append(mappedKey, value);
      }
    });
    console.log('Genel log:',data)
    try {
      let response;

      if (id) {
        // Eğer bir id değeri varsa güncelleme isteği gönder
        response = await apiHelper.put(`/kullanici/islem/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Eğer id değeri yoksa yeni bir kayıt oluştur
        response = await apiHelper.post('/kullanici/ekle', formData, {
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
