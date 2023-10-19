import { z } from 'zod';

// main product form component for create and update
// export const productCustomFields = [{ label: '', value: '' }];
// export const productVariantFields = [{ name: '', value: '' }];
// export const locationShippingFields = [{ name: '', shippingCharge: '' }];

// form zod validation schema


export const acenteFormSchema = z.object({
  identity_number: z.string().length(11, { message: 'Lütfen geçerli bir 11 haneli T.C kimlik numarası giriniz.' }),
  tax_number: z.string().length(10, { message: 'Lütfen geçerli bir 10 haneli VKN giriniz.' }),
  first_name: z.string(),
  last_name: z.string(),
  company_name: z.string(),
  email: z.string().email({ message: 'Lütfen geçerli bir e-posta adresi giriniz.' }),
  phone: z.string().length(11, { message: 'Lütfen geçerli bir 11 haneli Telefon numarası giriniz.' }),
  cep: z.string().length(11, { message: 'Lütfen geçerli bir 11 haneli Cep numarası giriniz.' }),
  whatsapp: z.string().length(11, { message: 'Lütfen geçerli bir 11 haneli Whatsapp numarası giriniz.' }),
  SmsNotify: z.boolean().optional(),
  province: z.any(),
  district: z.any(),
  address: z.string(),
  banka: z.any(),
  iban: z.any(),
  role: z.string(),
  password: z.string(),
  is_active: z.boolean().optional(),
});


// generate form types from zod validation schema
export type ShipmentFormTypes = z.infer<typeof acenteFormSchema>;

export function defaultValues(shipment?:ShipmentFormTypes) {
  return {
    identity_number: shipment?.identity_number ?? '',
    tax_number: shipment?.tax_number ?? '',
    first_name: shipment?.first_name ?? '',
    last_name: shipment?.last_name ?? '',
    company_name: shipment?.company_name ?? '',
    email: shipment?.email ?? '',
    phone: shipment?.phone ?? '',
    cep: shipment?.cep ?? '',
    whatsapp: shipment?.whatsapp ?? '',
    SmsNotify: shipment?.SmsNotify ?? false,
    province: shipment?.province ?? '',
    district: shipment?.district ?? '',
    address: shipment?.address ?? '',
    banka: shipment?.banka ?? '',
    iban: shipment?.iban ?? '',
    role: shipment?.role ?? '',
    password: shipment?.password ?? '',
    is_active: shipment?.is_active ?? true,
  };
}
