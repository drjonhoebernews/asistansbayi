'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { Radio } from '@/components/ui/radio';
import TrashIcon from '@/components/icons/trash';
import Upload from '@/components/ui/upload';

interface ProductMediaProps {
  className?: string;
}

export default function ProductMedia({ className }: ProductMediaProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Upload new product images"
      description="Upload your product image gallery here"
      className={cn(className)}
    >
      <MultipleFiles className="col-span-2" label="Images" />
    </FormGroup>
  );
}

export const MultipleFiles = ({
  className,
  label,
}: {
  className?: string;
  label?: React.ReactNode;
}) => {
  const multiRef = useRef<HTMLInputElement>(null);
  const [multiImages, setMultiImages] = useState<Array<File>>([]);

  const handleMultiImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1].type.includes('image')) return file[1];
      })
      .filter((file) => file !== undefined);
    setMultiImages((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleMultiImageDelete = (index: number) => {
    const updatedFiles = multiImages.filter((_, i) => i !== index);
    setMultiImages(updatedFiles);
    (multiRef.current as HTMLInputElement).value = '';
  };

  return (
    <div className={className}>
      <Upload
        label={label}
        ref={multiRef}
        accept="img"
        multiple
        onChange={handleMultiImageUpload}
      />
      <p className="pt-3 text-sm text-gray-500">
        Upload your product featured image here. Image size should not be more
        than <strong className="font-medium text-gray-900">2 MB</strong>
      </p>

      {multiImages.length > 0 && (
        <div className="-mb-3 overflow-x-scroll @xl:mb-0 @xl:overflow-x-hidden">
          <div className="min-w-[600px] pb-5 @xl:pb-0">
            <div className="mt-7 flex items-center rounded-md border border-gray-300 @2xl:mt-10">
              <div className="w-[20%] px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                Image
              </div>
              <div className="w-[55%] px-4 py-3.5 text-sm font-semibold text-gray-700 @2xl:py-5">
                Description
              </div>
              <div className="w-28 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                Thumbnail
              </div>
              <div className="w-20 shrink-0 px-4 py-3.5 text-center text-sm font-semibold text-gray-700 @2xl:py-5">
                Delete
              </div>
            </div>
            <div className="mt-7 flex flex-row flex-wrap gap-5">
              {multiImages?.map((file: File, index: number) => (
                <div className="flex w-full items-center" key={file.name}>
                  <div className="w-[20%] px-4">
                    <figure className="relative mx-auto aspect-square w-20 overflow-hidden rounded-xl border border-gray-300 @2xl:w-28">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw"
                      />
                    </figure>
                  </div>
                  <div className="w-[55%] px-4">
                    <Input
                      label="Product Description"
                      placeholder="Write product description here..."
                      // {...register('title')}
                      // error={errors.title?.message}
                    />
                  </div>
                  <div className="flex w-28 items-center justify-center px-4">
                    <Radio
                      value="NotTrackInventoryProduct"
                      inputClassName="dark:checked:!bg-gray-200 dark:checked:!border-gray-200 dark:focus:ring-gray-200 dark:focus:ring-offset-gray-0"
                    />
                  </div>
                  <div className="flex w-20 shrink-0 items-center justify-center px-4">
                    <TrashIcon
                      onClick={() => handleMultiImageDelete(index)}
                      className="h-5 w-5 cursor-pointer transition duration-75"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
