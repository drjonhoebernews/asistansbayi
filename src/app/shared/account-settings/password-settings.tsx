'use client';

import React, { useState } from 'react';
import * as z from 'zod';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiDesktop } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ProfileHeader } from './profile-settings';
import { Password } from '@/components/ui/password';
import HorizontalFormBlockWrapper from './horiozontal-block';

// form zod validation schema
const passwordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: 'Current password is required' }),
  newPassword: z.string().min(8, { message: 'New password required' }),
  confirmedPassword: z
    .string()
    .min(8, { message: 'Confirmed password required' }),
});

// generate form types from zod validation schema
type PasswordFormTypes = z.infer<typeof passwordFormSchema>;

export default function PasswordSettingsView({
  settings,
}: {
  settings?: PasswordFormTypes;
}) {
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<PasswordFormTypes> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Password settings data ->', data);
      setReset({
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
      });
    }, 600);
  };

  return (
    <>
      <Form<PasswordFormTypes>
        validationSchema={passwordFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: {
            ...settings,
          },
        }}
      >
        {({ register, control, formState: { errors }, getValues }) => {
          return (
            <>
              <ProfileHeader
                title="Olivia Rhye"
                description="olivia@example.com"
              />

              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="Current Password"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="currentPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder="Enter your password"
                        value={value}
                        onChange={onChange}
                        error={errors.currentPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="New Password"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder="Enter your password"
                        helperText={
                          getValues().newPassword.length < 8 &&
                          'Your current password must be more than 8 characters'
                        }
                        onChange={onChange}
                        error={errors.newPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Confirm New Password"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="confirmedPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder="Enter your password"
                        onChange={onChange}
                        error={errors.confirmedPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="solid"
                    className="dark:bg-gray-100 dark:text-white"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
      <LoggedDevices className="mt-10" />
    </>
  );
}

// Logged devices
function LoggedDevices({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-2xl', className)}>
      <div className="border-b border-dashed border-gray-200">
        <Text tag="h2" className="mb-3 text-xl font-bold text-gray-900">
          Where you’re logged in
        </Text>
        <Text className="mb-6 text-sm text-gray-500">
          We’ll alert you via olivia@untitledui.com if there is any unusual
          activity on your account.
        </Text>
      </div>
      <div className="flex items-center gap-6 border-b border-dashed border-gray-200 py-6">
        <PiDesktop className="h-7 w-7 text-gray-500" />
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Text
              tag="h3"
              className="text-base font-medium text-gray-900 dark:text-gray-700"
            >
              2018 Macbook Pro 15-inch
            </Text>
            <Text
              tag="span"
              className="relative hidden rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green ltr:before:left-2.5 rtl:before:right-2.5 sm:block"
            >
              Active Now
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-500">Melbourne, Australia</Text>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <Text className="text-sm text-gray-500">22 Jan at 4:20pm</Text>
          </div>
          <Text
            tag="span"
            className="relative mt-2 inline-block rounded-md border border-gray-200 py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green ltr:before:left-2.5 rtl:before:right-2.5 sm:hidden"
          >
            Active Now
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-6 py-6">
        <PiDesktop className="h-7 w-7 text-gray-500" />
        <div>
          <Text
            tag="h3"
            className="mb-2 text-base font-medium text-gray-900 dark:text-gray-700"
          >
            2020 Macbook Air M1
          </Text>
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-500">Melbourne, Australia</Text>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <Text className="text-sm text-gray-500">22 Jan at 4:20pm</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
