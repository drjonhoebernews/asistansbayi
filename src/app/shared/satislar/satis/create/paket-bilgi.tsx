import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import {useEffect, useState} from "react";
import apiHelper from "@/utils/apiHelper";
import Spinner from "@/components/ui/spinner";
import SelectBox from "@/components/ui/select";

interface FormRecipientInfoProps {
    className?: string;
}
type FeatureType = {
    id: number;
    name?: string; // name özelliğini opsiyonel olarak ekleyin
};

type CustomPolice = {
    id: number;
    name: string;
    price: string;
    percentage: string | number;
    age_limit: number;
    features: FeatureType[];
    services: Array<{ id: number }>;
    features_ids?: string[];
    services_ids?: string[];
    contract_content: string;
    banner: any;
}

type CustomPoliceType = {
    id: number;
    name: string;
}


export default function PaketBilgileri({

  className,
}: FormRecipientInfoProps) {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext();

    // İl ve ilçe bilgilerini tutacak state'ler
    const [policy, setPolicy] = useState<CustomPolice[]>([]);
    const [selectedPolicy, setSelectedPolicy] = useState<CustomPolice | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [policytype, setPolicyType] = useState<CustomPoliceType[]>([]);


    useEffect(() => {
        async function getPolicy() {
            setIsLoading(true);
            try {
                const response = await apiHelper.get('/paketler/policeler');
                const data: CustomPolice[] = await response.data;
                setPolicy(data);
            } catch (error) {
                console.error('Provinces API call failed', error);
            } finally {
                setIsLoading(false);
            }
        }

        getPolicy();
    }, []);

    useEffect(() => {
        async function getPoliciyType() {
            setIsLoading(true);
            try {
                const response = await apiHelper.get('/paketler/servis-turleri');
                const data: CustomPolice[] = await response.data;
                setPolicyType(data);
            } catch (error) {
                console.error('Provinces API call failed', error);
            } finally {
                setIsLoading(false);
            }
        }

        getPoliciyType();
    }, []);

    const transformedPolicy = policy.map(p => ({
        value: p.id.toString(),
        name: p.name
    }));
    const transformedPolicyType = policytype.map(p => ({
        value: p.id.toString(),
        name: p.name
    }));

    console.log(policy)
    if (isLoading) {
        return <div className={className}><Spinner size={"xl"} /></div>; // LoadingSpinner'ı kendi spinner komponentinizle değiştirin
    }
    return (
        <FormGroup
            title="Paket Bilgileri"
            description="Alacağınız Paket Bilgileri"
            className={cn(className)}
        >
            <Controller
                control={control}
                name="policy"
                render={({ field: { value, onChange } }) => (
                    <SelectBox
                        label="Paket"
                        labelClassName="text-sm font-medium text-gray-900"
                        options={transformedPolicy} // transformedPolicy'yi kullanıyoruz
                        onChange={(value) => {
                            const selected = policy.find(p => p.id === Number(value));
                            setSelectedPolicy(selected || null);
                            onChange(value);
                            if (selected) {
                                setValue("price", selected.price);
                                setValue("commission", selected.percentage);
                                // Diğer değerleri burada da ekleyebilirsiniz
                            }
                        }}
                        value={value || ''}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) => transformedPolicy.find(t => t.value === selected)?.name ?? ''}
                        error={errors?.policy?.message as string}
                    />
                )}
            />
            <Controller
                control={control}
                name="policy_services"
                render={({ field: { value, onChange } }) => (
                    <SelectBox
                        label="Kullanım Türü"
                        labelClassName="text-sm font-medium text-gray-900"
                        options={transformedPolicyType} // transformedPolicyType'ı kullanıyoruz
                        onChange={onChange}
                        value={value || ''}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                            transformedPolicyType.find(t => t.value === selected)?.name ?? ''
                        }
                        error={errors?.policy_services?.message as string}
                    />
                )}
            />

            <style jsx>{`
              .policy-card {
                padding: 20px;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                background-color: #f9f9f9;
              }
              .policy-card h3 {
                margin-bottom: 10px;
                color: #333;
              }
              .policy-detail {
                margin-bottom: 10px;
                font-size: 14px;
                color: #666;
              }
              .features-list {
                list-style-type: circle;
                padding-left: 20px;
              }
            `}</style>

            {selectedPolicy && (
                <div className="policy-card mt-4">
                    <h4 className="text-xl font-bold">{selectedPolicy.name}</h4>
                    <div className="policy-detail">
                        <strong>Fiyat:</strong> {selectedPolicy.price} TL
                    </div>
                    <div className="policy-detail">
                        <strong>Yaş Limiti:</strong> {selectedPolicy.age_limit}
                    </div>
                    <div className="policy-detail">
                        <strong>Komisyonu:</strong> {selectedPolicy.percentage}
                    </div>
                    {selectedPolicy.features && selectedPolicy.features.length > 0 && (
                        <div>
                            <strong>Özellikler:</strong>
                            <ul className="features-list">
                                {selectedPolicy.features.map((feature, index) => (
                                    <li key={index}>{feature?.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </FormGroup>
    );
};
