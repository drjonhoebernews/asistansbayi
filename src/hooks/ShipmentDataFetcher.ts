import { useEffect, useState } from 'react';
import apiHelper from "@/utils/apiHelper";

type ShipmentData = {
    acenteTC: string;
    acenteVKN: string;
    acenteFName: string;
    acenteLName: string;
    acenteName: string;
    acenteEmail: string;
    acentePhone: string;
    acentePhoneCep: string;
    acenteWhatsapp: string;
    acenteSMSNotify: boolean | undefined;
    acenteProvinces: any;
    acenteDistricts: any;
    acenteAddress: string;
    acenteBanka: number;
    acenteIban: any;
    acenteRole: string;
    acentePassword: string;
};

interface ShipmentDataFetcherProps {
    id: string;
    children: (data: {
        shipmentData: ShipmentData | null;
        loading: boolean;
        error: string | null;
    }) => JSX.Element;
}

export default function ShipmentDataFetcher({ id, children }: ShipmentDataFetcherProps) /* use client */ {
    const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchShipmentData() {
            try {
                const response = await apiHelper.get(`/islem/${id}`);
                if (response.data) {
                    setShipmentData(response.data);
                }
            } catch (err) {
                setError('API\'den veri çekerken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        }
        fetchShipmentData();
    }, [id]);

    return children({ shipmentData, loading, error });
}
