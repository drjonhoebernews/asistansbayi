'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { useState } from 'react';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Text } from '@/components/ui/text';
import { useMedia } from '@/hooks/use-media';
import toast from 'react-hot-toast';

const initialValues = {
  email: '',
};

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('forgot password form', data);
    toast.success(
      <Text>
        Reset link sent to this email:{' '}
        <Text tag="b" className="font-semibold">
          {data.email}
        </Text>
      </Text>
    );
    setReset(initialValues);
  };

  return (
    <>
      <Form<FormValues>
        validationSchema={formSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Reset Password
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.auth.signIn4}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
