import { z } from 'zod';

// main product form component for create and update
// export const productCustomFields = [{ label: '', value: '' }];
// export const productVariantFields = [{ name: '', value: '' }];
// export const locationShippingFields = [{ name: '', shippingCharge: '' }];

// form zod validation schema


export const satisFormSchema = z.object({
  // price: z.string(), //+
  // commission: z.string(), //+
  identity_number: z.string().min(10), //+
  first_name: z.string(), //+
  last_name: z.string(), //+
  plaka: z.string(), //+
  // start_date: z.date(),
  // end_date: z.date(),
  // is_active: z.boolean(),
  policy: z.any(), //+
  policy_services: z.any(), //+
  // seller: z.number(),
  province: z.number(), //+
  district: z.number(), //+
  brand: z.number(), //+
  model: z.number() //+
});


// generate form types from zod validation schema
export type SatisFormTypes = z.infer<typeof satisFormSchema>;

export function defaultValues(shipment?:SatisFormTypes) {
  return {
    // price: shipment?.price ?? '',
    // commission: shipment?.commission ?? '',
    identity_number: shipment?.identity_number ?? '',
    first_name: shipment?.first_name ?? '',
    last_name: shipment?.last_name ?? '',
    plaka: shipment?.plaka ?? '',
    // start_date: shipment?.start_date ?? new Date(),
    // end_date: shipment?.end_date ?? new Date(),
    // is_active: shipment?.is_active ?? true,
    policy: shipment?.policy ?? 0,
    policy_services: shipment?.policy_services ?? 0,
    // seller: shipment?.seller ?? 0,
    province: shipment?.province ?? 0,
    district: shipment?.district ?? 0,
    brand: shipment?.brand ?? 0,
    model: shipment?.model ?? 0,
  };
}
