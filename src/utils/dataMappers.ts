export type FileProperties = {
    someFileProperty?: File;
};

export type AcenteApiData = {
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
};

export type AcenteMappedData = {
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
} & FileProperties;

export const AcentemapDataToModel = (data: AcenteApiData): AcenteMappedData => {
    return {
        identity_number: data.identity_number,
        tax_number: data.tax_number,
        first_name: data.first_name,
        last_name: data.last_name,
        company_name: data.company_name,
        email: data.email,
        phone: data.phone,
        cep: data.cep,
        whatsapp: data.whatsapp,
        province: data.province,
        district: data.district,
        address: data.address,
        banka: data.banka,
        iban: data.iban,
        role: data.role,
        password: data.password,
        is_active: data.is_active,
    };
}
