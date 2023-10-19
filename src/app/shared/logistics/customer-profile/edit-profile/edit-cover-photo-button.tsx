'use client';

import { z } from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PiUpload, PiX } from 'react-icons/pi';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Text } from '@/components/ui/text';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Upload from '@/components/ui/upload';
import { ActionIcon } from '@/components/ui/action-icon';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function EditCoverPhotoButton() {
  const { openModal } = useModal();
  return (
    <Button
      rounded="pill"
      className="mb-5 me-8 gap-2"
      size="sm"
      onClick={() =>
        openModal({
          view: <EditCoverPhotoForm />,
          customSize: '850px',
        })
      }
    >
      <PiUpload className="h-3 w-3" />
      Upload Cover Photo
    </Button>
  );
}

const initialValues = {
  coverPhoto: '',
};

const coverPhotoFormSchema = z.object({
  coverPhoto: z.string(),
});

type FormType = z.infer<typeof coverPhotoFormSchema>;

function EditCoverPhotoForm() {
  const [reset, setReset] = useState({});
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    // set timeout ony required to display loading state of the create product button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('editProfile', data);
      setReset(initialValues);
      toast.success('Cover photo updated successfully');
    }, 600);
  };

  return (
    <div className="w-[1100px] max-w-full rounded-md p-6">
      <div className="flex items-center justify-between">
        <Text tag="h3">Update Cover Photo</Text>
        <ActionIcon variant="text" onClick={() => closeModal()}>
          <PiX className="h-5 w-5" />
        </ActionIcon>
      </div>

      <Form<FormType>
        onSubmit={onSubmit}
        resetValues={reset}
        validationSchema={coverPhotoFormSchema}
        useFormProps={{
          defaultValues: initialValues,
        }}
        className="mt-7 grid gap-4 md:grid-cols-2 md:gap-7"
      >
        {({ control, watch }) => {
          // const coverPhoto = watch('coverPhoto');
          // console.log('coverPhoto', coverPhoto);
          return (
            <>
              <Controller
                name="coverPhoto"
                control={control}
                render={({ field }) => (
                  <Upload
                    accept="img"
                    wrapperClassName="col-span-full"
                    placeholderText={
                      <>
                        <div className="@5xl::ps-10 pt-2 text-center @2xl:ps-5 @2xl:text-left">
                          <h5 className="mb-2 text-sm font-bold text-gray-900 @2xl:text-base @3xl:mb-3 @3xl:text-lg">
                            Drag n Drop or select an image
                          </h5>
                          <p className="text-sm leading-relaxed text-gray-900">
                            Cover photo size should be 1620x300 pixels
                          </p>
                        </div>
                      </>
                    }
                    {...field}
                  />
                )}
              />
              {/* <div className="col-span-full">
                <img src={coverPhoto} alt="name" />
              </div> */}
              <div className="col-span-full mt-2 flex items-center justify-end">
                <Button type="submit" className="" isLoading={isLoading}>
                  Update
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
}
