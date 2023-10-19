import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import Select from '@/components/ui/select';
import NoSSR from '@/components/no-ssr';
import FileInput from './file-input';

export default function FormShippingInfo() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormGroup
      title="Poliçe Banner"
      description="Poliçe için Banneri ekleyin lütfen!"
    >
      <Controller
          control={control}
          name="banner"
          render={({ field }) => (
              <FileInput
                  className="col-span-full"
                  onChange={(file: File) => field.onChange(file)}
              />
          )}
      />
    </FormGroup>
  );
}
