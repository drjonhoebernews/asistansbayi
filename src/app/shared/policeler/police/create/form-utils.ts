import { z } from 'zod';

export const featureSchema = z.object({
  id: z.number(),
});

export const serviceSchema = z.object({
  id: z.number(),
});

export const policeFormSchema = z.object({
  name: z.string(),
  price: z.string(),
  percentage: z.union([z.string(), z.number()]),  // percentage can be string or number
  age_limit: z.number(),
  features: z.array(featureSchema),  // Eski tanımlama
  services: z.array(serviceSchema),  // Eski tanımlama
  features_ids: z.array(z.string()).optional(),  // Yeni tanımlama
  services_ids: z.array(z.string()).optional(),  // Yeni tanımlama
  contract_content: z.string(),
  is_active: z.boolean().optional().default(true), // default value is set to true here
  banner: z.any(),
});

// generate form types from zod validation schema
export type policeFormTypes = z.infer<typeof policeFormSchema>;

export function defaultValues(shipment?: policeFormTypes) {
  return {
    name: shipment?.name ?? '',
    price: shipment?.price ?? '',
    percentage: shipment?.percentage ?? '',
    age_limit: shipment?.age_limit ?? 0,
    features: shipment?.features ?? [],
    services: shipment?.services ?? [],
    contract_content: shipment?.contract_content ?? '',
    is_active: shipment?.is_active ?? true,
    banner: shipment?.banner ?? null,
    features_ids: shipment?.features_ids ?? [], // Yeni eklenen kısım
    services_ids: shipment?.services_ids ?? [], // Yeni eklenen kısım
  };
}
