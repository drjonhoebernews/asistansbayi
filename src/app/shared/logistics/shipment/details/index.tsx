'use client';

import {useEffect, useState} from "react";
import apiHelper from "@/utils/apiHelper";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
import {getRandomArrayElement} from "@/utils/get-random-array-element";
import PersonelBilgi from "@/app/shared/logistics/shipment/details/detay/personel-bilgi";
import GenelBilgi from "@/app/shared/logistics/shipment/details/detay/genel-bilgi";
import AltBayiler from "@/app/shared/logistics/shipment/details/detay/alt_baiyler";
import Faturalar from "@/app/shared/logistics/shipment/details/detay/faturalar";
interface IndexProps {
    id?: string;
}

type CustomAcente = {
    id: number;
    identity_number: string;
    tax_number: string;
    first_name: string;
    last_name: string;
    company_name: string;
    email: string;
    phone: string;
    cep: string;
    whatsapp: string;
    province: any;
    district: any;
    address: string;
    banka: number;
    iban: any,
    role: string,
    password: string,
    is_active: any,
}

export default function AcenteDetails({
id,
}: IndexProps) {
    const coverPhoto = getRandomArrayElement([
        '1648583076906-60338fa01f07',
        '1655962342982-57cae2d061cf',
    ]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [acenteData, setAcenteData] = useState<CustomAcente| null>(null);

    useEffect(() => {
        async function getAcenteData() {
            if (id) {
                setLoading(true);
                try {
                    const response = await apiHelper.get(`/kullanici/islem/${id}`);
                    if (response.data) {
                        setAcenteData(response.data);
                    }
                } catch (error) {
                    toast.error('Veri çekilirken bir hata oluştu.');
                } finally {
                    setLoading(false);
                }
            }
        }
        getAcenteData();
    }, [id]);
    console.log('gelen id değeri',id)
    console.log('gelen datalar', acenteData)
    if (isLoading) {
        return <>
            <Spinner size={"xl"}/>
        </>;
    }
    return (
        <>
            <figure className="relative -mx-6 flex h-[150px] items-end justify-end bg-gray-50  bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] @5xl:h-[200px] 3xl:-mx-8 3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]">
                <Image
                    alt="Mountains"
                    src={`https://images.unsplash.com/photo-${coverPhoto}?auto=format&fit=crop&w=1920&q=80`}
                    // placeholder="blur"
                    quality={100}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                />
            </figure>
            <PersonelBilgi data={acenteData} loading={isLoading} />
            <GenelBilgi data={[acenteData]} loading={isLoading} />
            {acenteData && acenteData?.role === "bayi" ? <AltBayiler /> : ''}
            <Faturalar />
        </>
    )
};
