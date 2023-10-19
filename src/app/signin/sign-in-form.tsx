'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Password } from '@/components/ui/password';
import * as z from 'zod';
import { useState } from 'react';
import { PiArrowRightBold } from 'react-icons/pi';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Eksik bilgi !' }),
  password: z.string().min(1, { message: 'Şifreniz gerekli!' }),
  remember: z.boolean(),
});

type Login = z.infer<typeof loginSchema>;

const initialValues: Login = {
  email: '',
  password: '',
  remember: true,
};
interface APIError {
    status: string;
    code: string;
    detail: string;
    error: string;
}

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [signInError, setSignInError] = useState(null);
  const [reset, setReset] = useState({});
  const router = useRouter();  // useRouter hook'unu tanımlayın

    const onSubmit: SubmitHandler<Login> = async (data) => {
        try {
            const result: any = await signIn('credentials', {
                ...data,
                redirect: false, // Otomatik yönlendirmeyi devre dışı bırak
            });
            // console.log(data)
            // console.log(result)
            if (result.ok) {
                console.log("Başarıyla oturum açıldı");
                toast.success('Giriş Başarılı!')
                router.push('/bayi');  // Kullanıcıyı istediğiniz sayfaya yönlendirin
            } else {
                const errorData: APIError = result;
                toast.error(errorData.error || 'Bir hata meydana geldi!');
            }
        } catch (error) {
            toast.error('Bir hata meydana geldi!');
        }
    };


    return (
    <>
      <Toaster />
      <Form<Login>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="E-Posta"
              placeholder="E-Posta giriniz"
              color="info"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Şifre"
              placeholder="Şifrenizi giriniz"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              color="info"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('remember')}
                label="Beni Hatırla?"
                color="info"
                variant="flat"
                className="[&>label>span]:font-medium"
              />
              {/*<Link*/}
              {/*  href={routes.auth.forgotPassword1}*/}
              {/*  className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"*/}
              {/*>*/}
              {/*  Şifremi unuttum?*/}
              {/*</Link>*/}
            </div>
            <Button className="w-full" type="submit" size="lg" color="info">
              <span>Giriş</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
