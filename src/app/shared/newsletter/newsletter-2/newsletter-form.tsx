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

export default function NewsLetterForm() {
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
          <div className="grid grid-cols-1 gap-3">
            <Input
              placeholder="Enter your email"
              inputClassName="w-full text-base"
              size="xl"
              rounded="pill"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              type="submit"
              className="w-full text-base font-medium"
              size="xl"
              rounded="pill"
            >
              Subscribe
            </Button>
          </div>
        )}
      </Form>
    </>
  );
}
