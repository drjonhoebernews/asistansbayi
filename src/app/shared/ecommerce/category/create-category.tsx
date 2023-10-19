'use client';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import cn from '@/utils/class-names';
import TrashIcon from '@/components/icons/trash';
import { ActionIcon } from '@/components/ui/action-icon';
import Image from 'next/image';
import Upload from '@/components/ui/upload';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('@/components/ui/select'), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[168px]" />,
});

// Parent category option
const parentCategoryOption = [
  {
    value: 'fruits',
    name: 'Fruits',
  },
  {
    value: 'grocery',
    name: 'Grocery',
  },
  {
    value: 'meat',
    name: 'Meat',
  },
  {
    value: 'cat food',
    name: 'Cat Food',
  },
];

// Type option
const typeOption = [
  {
    value: 'fresh vegetables',
    name: 'Fresh Vegetables',
  },
  {
    value: 'diet foods',
    name: 'Diet Foods',
  },
  {
    value: 'green vegetables',
    name: 'Green Vegetables',
  },
];

// form zod validation schema
const categoryFormSchema = z.object({
  name: z.string().min(1, { message: 'Category name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  type: z.string().optional(),
  parentCategory: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

// generate form types from zod validation schema
type CategoryFormTypes = z.infer<typeof categoryFormSchema>;

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Text tag="h6" className="font-semibold">
            {title}
          </Text>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// image files uploader component
export const FileInput = ({
  className,
  label,
  onChange,
}: {
  className?: string;
  label?: React.ReactNode;
  onChange: any;
}) => {
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [images, setImages] = React.useState<Array<File>>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1].type.includes('image')) return file[1];
      })
      .filter((file) => file !== undefined);
    setImages((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleImageDelete = (index: number) => {
    const updatedFiles = images.filter((_, i) => i !== index);
    setImages(updatedFiles);
    (imageRef.current as HTMLInputElement).value = '';
  };

  return (
    <div className={className}>
      <Upload
        label={label}
        ref={imageRef}
        accept="img"
        onChange={(e) => {
          onChange(e);
          handleImageUpload(e);
        }}
      />

      {images.length > 0 && (
        <>
          {images?.map((file: File, index: number) => (
            <div
              className="mt-7 flex w-full items-center gap-5"
              key={file.name}
            >
              <div className="relative aspect-square w-16 overflow-hidden rounded-xl border border-gray-300 @md:w-20">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw"
                />
              </div>
              <div>{file.name}</div>
              <ActionIcon
                onClick={() => handleImageDelete(index)}
                variant="flat"
              >
                <TrashIcon className="h-5 w-5 cursor-pointer transition duration-75" />
              </ActionIcon>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

// main category form component for create and update category
export default function CreateCategory({
  id,
  category,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  category?: CategoryFormTypes;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CategoryFormTypes> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createCategory data ->', data);
      setReset({
        name: '',
        slug: '',
        type: '',
        parentCategory: '',
        description: '',
        image: '',
      });
    }, 600);
  };

  return (
    <Form<CategoryFormTypes>
      validationSchema={categoryFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: {
          ...category,
        },
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                'grid grid-cols-1 ',
                isModalView
                  ? 'grid grid-cols-1 gap-8 divide-y divide-dashed  divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                  : 'gap-5'
              )}
            >
              <HorizontalFormBlockWrapper
                title={'Add new category:'}
                description={'Edit your category information from here'}
                isModalView={isModalView}
              >
                <Input
                  label="Category Name"
                  placeholder="category name"
                  {...register('name')}
                  error={errors.name?.message}
                />
                <Input
                  label="Slug"
                  placeholder="slug"
                  {...register('slug')}
                  error={errors.slug?.message}
                />
                <Controller
                  name="parentCategory"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={parentCategoryOption}
                      value={value}
                      onChange={onChange}
                      label="Parent Category"
                      error={errors?.parentCategory?.message}
                      getOptionValue={(option) => option.name}
                    />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={typeOption}
                      value={value}
                      onChange={onChange}
                      label="Display Type"
                      error={errors?.type?.message}
                      getOptionValue={(option) => option.name}
                    />
                  )}
                />

                <div className="col-span-2">
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <QuillEditor
                        value={value}
                        onChange={onChange}
                        label="Description"
                        className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                        labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                      />
                    )}
                  />
                </div>
              </HorizontalFormBlockWrapper>
              <HorizontalFormBlockWrapper
                title="Upload new thumbnail image"
                description="Upload your product image gallery here"
                isModalView={isModalView}
              >
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { onChange, ...rest } }) => (
                    <FileInput
                      {...rest}
                      className="col-span-2"
                      label="Images"
                      onChange={onChange}
                    />
                  )}
                />
              </HorizontalFormBlockWrapper>
            </div>
          </div>

          <div
            className={cn(
              'sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            <Button variant="outline" className="w-full @xl:w-auto">
              Save as Draft
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              {id ? 'Update' : 'Create'} Category
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
