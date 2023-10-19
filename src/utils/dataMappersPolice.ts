export type FileProperties = {
    banner?: File;
};

export type Feature = {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    is_included: boolean;
};

export type Service = {
    id: number;
    name: string;
};

export type PoliceApiData = {
    id: number;
    name: string;
    price: string;
    percentage: string | number;
    age_limit: number;
    features: Feature[];
    services: Service[];
    contract_content: string;
    is_active: boolean;
    banner?: File | string | null;
};

export type PoliceMappedData = PoliceApiData & FileProperties;

export const PolicemapDataToModel = (data: PoliceApiData, file?: File): PoliceMappedData => {
    return {
        ...data,
        banner: file,
    };
}
