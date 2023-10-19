'use client';

import { z } from 'zod';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// form zod validation schema
const FormSchema = z.object({
  name: z
    .string({
      required_error: 'Folder name is required',
    })
    .min(3, { message: 'Folder name must be at least 3 letters' }),
});

// generate form types from zod validation schema
type FormTypes = z.infer<typeof FormSchema>;

// main category form component for create and update category
export default function CreateFolder({ onClose }: { onClose: () => void }) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('data', data);
      setReset({
        name: '',
      });
      onClose();
    }, 600);
  };

  return (
    <Form<FormTypes>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={FormSchema}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <Input
              label="Folder Name"
              placeholder="Folder name"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full @xl:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto"
            >
              Create Folder
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
