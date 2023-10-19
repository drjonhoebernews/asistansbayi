'use client';

import {useEffect, useState} from "react";
import apiHelper from "@/utils/apiHelper";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
import {getRandomArrayElement} from "@/utils/get-random-array-element";
import PersonelBilgi from "@/app/shared/policeler/police/details/detay/personel-bilgi";
import GenelBilgi from "@/app/shared/policeler/police/details/detay/genel-bilgi";
import AltBayiler from "@/app/shared/policeler/police/details/detay/alt_baiyler";
import Faturalar from "@/app/shared/policeler/police/details/detay/faturalar";
import PoliceTurleriListesi from "@/app/shared/policeler/police/details/detay/police-turleri-listesi";

interface IndexProps {
    id?: string;
}

type CustomPolice = {
    name: string;
    price: string;
    percentage: string | number;
    age_limit: number;
    features: Array<{ id: number }>;
    services: Array<{ id: number }>;
    features_ids?: string[];
    services_ids?: string[];
    contract_content: string;
    banner: any;
}

export default function PoliceDetails({
id,
}: IndexProps) {
    const coverPhoto = getRandomArrayElement([
        '1648583076906-60338fa01f07',
        '1655962342982-57cae2d061cf',
    ]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [policeData, setPoliceData] = useState<CustomPolice| null>(null);

    useEffect(() => {
        async function getPoliceData() {
            if (id) {
                setLoading(true);
                try {
                    const response = await apiHelper.get(`/paketler/police/${id}`);
                    if (response.data) {
                        setPoliceData(response.data);
                    }
                } catch (error) {
                    toast.error('Veri çekilirken bir hata oluştu.');
                } finally {
                    setLoading(false);
                }
            }
        }
        getPoliceData();
    }, [id]);
    console.log('gelen id değeri',id)
    console.log('gelen datalar', policeData)
    if (isLoading) {
        return <>
            <Spinner size={"xl"}/>
        </>;
    }
    return (
        <>
            <figure className="relative -mx-6 flex h-[350px] items-end justify-end bg-gray-50  bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] @5xl:h-[400px] 3xl:-mx-8 3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]">
                <Image
                    alt="Poliçe Banner"
                    src={policeData?.banner}
                    // placeholder="blur"
                    quality={100}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                />
            </figure>
            <PersonelBilgi data={policeData} loading={isLoading} />
            <GenelBilgi data={policeData} loading={isLoading} />
            <PoliceTurleriListesi data={policeData} loading={isLoading}/>
        </>
    )
};
