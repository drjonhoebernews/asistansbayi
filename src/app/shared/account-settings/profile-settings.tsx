'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import z from 'zod';
import { SubmitHandler, Controller } from 'react-hook-form';
import {
  PiEnvelopeSimple,
  PiQuestion,
  PiSealCheckFill,
  PiTrashBold,
} from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import SelectBox from '@/components/ui/select';
import Upload from '@/components/ui/upload';
import HorizontalFormBlockWrapper from './horiozontal-block';
import { ActionIcon } from '@/components/ui/action-icon';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

const role = [
  {
    name: 'Product Designer',
    value: 'product_designer',
  },
  {
    name: 'Software Engineer',
    value: 'software_engineer',
  },
];

const profileFormSchema = z.object({
  first_name: z.string().min(1, { message: 'Fist name is required' }),
  website: z.string().optional(),
  email: z.string().min(1, { message: 'Email is required' }),
  role: z.string({ required_error: 'Role is required' }),
  description: z.string().optional(),
  images: z.array(z.object({}).optional()).optional(),
});

type ProfileFormTypes = z.infer<typeof profileFormSchema>;

const staticProjectPreviews = [
  {
    name: 'project-1',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/projects/1.webp',
  },
  {
    name: 'project-2',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/projects/2.webp',
  },
  {
    name: 'project-3',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/projects/3.webp',
  },
  {
    name: 'project-4',
    thumbnail:
      'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/projects/4.webp',
  },
];

export default function ProfileSettingsView({
  settings,
}: {
  settings?: ProfileFormTypes;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<Array<File>>([]);
  const [projectPreview, setProjectPreview] = useState(staticProjectPreviews);
  const [reset, setReset] = useState({});

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

  const handlePreviewImageDelete = (index: number) => {
    const updatedFiles = projectPreview.filter((_, i) => i !== index);
    setProjectPreview(updatedFiles);
  };

  const onSubmit: SubmitHandler<ProfileFormTypes> = (data) => {
    toast.success(<Text tag="b">Profile successfully updated!</Text>);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Profile settings data ->', data);
    }, 600);
  };

  return (
    <>
      <Form<ProfileFormTypes>
        validationSchema={profileFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            ...settings,
          },
        }}
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <ProfileHeader
                title="Olivia Rhye"
                description="Update your photo and personal details."
              >
                <div className="w-full sm:w-auto md:ms-auto">
                  <Link href={routes.profile}>
                    <Button
                      tag="span"
                      className="dark:bg-gray-100 dark:text-white dark:focus:bg-gray-100"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </ProfileHeader>

              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="Name"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    className="col-span-full"
                    prefix="https://redq.io/"
                    placeholder="First Name"
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Website"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    type="url"
                    className="col-span-full"
                    prefix="https://"
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    placeholder="First Name"
                    {...register('website')}
                    error={errors.first_name?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={
                    <>
                      Your Photo <PiQuestion className="h4 w-4 text-gray-500" />
                    </>
                  }
                  titleClassName="flex gap-2 items-center"
                  description="This will be displayed on your profile."
                >
                  <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatar.png"
                        className="aspect-square object-cover"
                        priority
                        alt="Profile avatar"
                        sizes="(max-width: 768px) 100vw"
                        fill
                      />
                    </div>
                    <Button type="button" variant="outline">
                      Change
                    </Button>
                  </div>
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Your Bio"
                  titleClassName="text-base font-medium"
                >
                  <div className="@3xl:col-span-2">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          className="[&>.ql-container_.ql-editor]:min-h-[100px] [&>.ql-toolbar]:3xl:overflow-x-auto"
                        />
                      )}
                    />
                  </div>
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Job Title"
                  titleClassName="text-base font-medium"
                >
                  <div className="col-span-full">
                    <Controller
                      control={control}
                      name="role"
                      render={({ field: { value, onChange } }) => (
                        <SelectBox
                          placeholder={role[0].name}
                          options={role}
                          onChange={onChange}
                          value={value}
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            role?.find((r) => r.value === selected)?.name ?? ''
                          }
                          error={errors?.role?.message as string}
                        />
                      )}
                    />
                    <Checkbox
                      label="Show my job title in my profile"
                      className="mt-3"
                    />
                  </div>
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Alternative contact email"
                  description="Enter an alternative email if you’d like to be contacted via a different email."
                  descriptionClassName="max-w-[263px]"
                  titleClassName="text-base font-medium"
                >
                  <Input
                    prefix={
                      <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                    }
                    type="email"
                    className="col-span-full"
                    placeholder="georgia.young@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Portfolio Projects"
                  description="Share a few snippets of your work"
                  className="border-0"
                  titleClassName="text-base font-medium"
                >
                  <div className="@3xl:col-span-2">
                    <div
                      className={cn(
                        'mb-5 grid gap-5',
                        projectPreview.length === 2
                          ? 'grid-cols-2'
                          : 'grid-cols-3'
                      )}
                    >
                      {projectPreview?.map((item, index: number) => (
                        <div
                          key={item.name}
                          className={cn(
                            'group relative min-h-[80px] w-full overflow-hidden rounded-md first:min-h-[300px] xs:min-h-[144px] xs:first:min-h-[424px]',
                            projectPreview.length !== 2 && 'first:col-span-3'
                          )}
                        >
                          <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 opacity-0 backdrop-blur-md  transition-all group-hover:opacity-100 dark:bg-opacity-20"></div>
                          <Image
                            src={item.thumbnail}
                            className="aspect-[193/144] object-cover"
                            priority
                            alt="Profile avatar"
                            sizes="(max-width: 768px) 100vw"
                            fill
                          />
                          <ActionIcon
                            onClick={() => handlePreviewImageDelete(index)}
                            size="sm"
                            variant="flat"
                            color="danger"
                            className="invisible absolute right-5 top-5 z-50 ms-auto flex-shrink-0 bg-gray-0 p-0 opacity-0 transition-all hover:enabled:bg-white group-hover:visible group-hover:opacity-100"
                          >
                            <PiTrashBold className="w-6" />
                          </ActionIcon>
                        </div>
                      ))}
                      {images?.map((file: File, index: number) => (
                        <div
                          key={file.name}
                          className="group relative min-h-[80px] w-full overflow-hidden rounded-md  xs:min-h-[144px]"
                        >
                          <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40 opacity-0 backdrop-blur-md  transition-all group-hover:opacity-100 dark:bg-opacity-20"></div>
                          <Image
                            src={URL.createObjectURL(file)}
                            className="aspect-[193/144] object-cover"
                            priority
                            alt="Profile avatar"
                            sizes="(max-width: 768px) 100vw"
                            fill
                          />
                          <ActionIcon
                            onClick={() => handleImageDelete(index)}
                            size="sm"
                            variant="flat"
                            color="danger"
                            className="invisible absolute right-5 top-5 z-50 ms-auto flex-shrink-0 bg-gray-0 p-0 opacity-0 transition-all hover:enabled:bg-white group-hover:visible group-hover:opacity-100"
                          >
                            <PiTrashBold className="w-6" />
                          </ActionIcon>
                        </div>
                      ))}
                    </div>
                    <div className="my-5">
                      <Upload
                        label={''}
                        ref={imageRef}
                        accept="img"
                        multiple
                        onChange={handleImageUpload}
                        iconClassName="w-28 h-auto"
                        className="mb-5 min-h-[200px] justify-center border-dashed bg-gray-50"
                      />
                    </div>
                  </div>
                </HorizontalFormBlockWrapper>
              </div>

              <div className="border-gary-300 sticky bottom-0 z-40 -mx-6 -mb-7 flex items-center justify-end gap-3 border-t bg-gray-0/10 px-10 py-5 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col 3xl:-mx-8 4xl:-mx-10">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full @xl:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full @xl:w-auto dark:bg-gray-100 dark:text-white dark:focus:bg-gray-100"
                >
                  Save
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </>
  );
}

export function ProfileHeader({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description?: string }>) {
  return (
    <div className="relative z-0 -mx-4 px-4 pt-28 before:absolute before:left-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10">
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-gray-300 pb-10">
        <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
          <Image
            src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/profile-image.webp"
            alt="profile-pic"
            fill
            sizes="(max-width: 768px) 100vw"
            className="aspect-auto"
          />
        </div>
        <div>
          <Text
            tag="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
          >
            {title}
            <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </Text>
          {description ? (
            <Text className="text-sm text-gray-500">{description}</Text>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
