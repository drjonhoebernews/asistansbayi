'use client';

import { Button, Input } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

type FormValues = {
  email: string;
};

const initialValues = {
  email: '',
};

const newsLetterFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export default function NewsLetterForm({ className }: { className?: string }) {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setReset(initialValues);
  };
  return (
    <>
      <Form<FormValues>
        validationSchema={newsLetterFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="w-full @[710px]:max-w-[640px]">
            <Input
              placeholder="Enter your email"
              inputClassName="w-full text-base"
              size="xl"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              className="mt-3 w-full text-base font-medium text-white dark:text-gray-100"
              size="xl"
            >
              Subscribe
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
