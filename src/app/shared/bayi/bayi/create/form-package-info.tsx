import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import Select from '@/components/ui/select';
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Password} from "@/components/ui/password";
import {Switch} from "@/components/ui/switch";

interface FormPackageInfoProps {
  className?: string;
}

const roleOptions = [
  { value: 'bayi', label: 'BAYİ' },
];
export default function FormPackageInfo({ className }: FormPackageInfoProps) {
  const {
    register,
    control,
      setValue,
      formState: { errors },
  } = useFormContext();
    // const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    // console.log('uploadedImage', uploadedImage);

    const [password, setPassword] = useState<string>('');
    const generateRandomPassword = () => {
        let newPassword = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 12; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        setPassword(newPassword);
        setValue("password", newPassword);  // React Hook Form değerini güncelle
    };


    return (
    <FormGroup
      title="Acente Yetki & Güvenlik"
      description="Acente Şifre ve Yetki işlemlerini buradan işleyebilirsiniz."
      className={cn(className)}
    >
        <Controller
            control={control}
            name="password"  // "passowrd" değil, "password" olmalıdır.
            defaultValue={password}
            render={({ field: { onChange, value } }) => (
                <div>
                    <Password
                        label="Şifre"
                        placeholder="Şifre oluşturun veya girin"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            onChange(e.target.value);  // React Hook Form değerini güncelle
                        }}
                        // @ts-ignore
                        error={errors.password?.message}  // "passowrd" değil, "password" olmalıdır.
                    />
                </div>
            )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field: { name, onChange, value } }) => (
              <Select
                  // @ts-ignore
                  options={roleOptions}
                  value={value}
                  onChange={onChange}
                  name={name}
                  label="Yetki"
                  // @ts-ignore
                  error={errors?.role?.message}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected: string) =>
                      roleOptions.find(
                          (option) => option.value === selected
                      )?.label ?? selected
                  }
              />
          )}
      />
      <Button onClick={generateRandomPassword}>Şifre Oluştur</Button>

        <Switch
            label="Aktif Olsun"
            variant="flat"
            labelClassName="font-medium text-sm text-gray-900"
            {...register('is_active')}
        />
    </FormGroup>
  );
}
