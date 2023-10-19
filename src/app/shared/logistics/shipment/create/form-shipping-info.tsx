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
      title="Acente Evrakları"
      description="Gerekli evrakları buraya ekleyin"
    >
      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  name="acenteDocuments"*/}
      {/*  render={({ field }) => (*/}
      {/*    <FileInput className="col-span-full" {...field} />*/}
      {/*  )}*/}
      {/*/>*/}
    </FormGroup>
  );
}
