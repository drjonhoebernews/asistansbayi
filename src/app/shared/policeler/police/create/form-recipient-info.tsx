import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import QuillEditor from "@/components/ui/quill-editor";

interface FormRecipientInfoProps {
  className?: string;
}
export default function FormRecipientInfo({

  className,
}: FormRecipientInfoProps) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Poliçe Sözleşme"
      description="Poliçe Sözleşmesini buraya yazın"
      className={cn(className)}
    >
      <Controller
          control={control}
          name="contract_content"
          render={({ field: { onChange, value } }) => (
              <QuillEditor
                  value={value}
                  onChange={onChange}
                  label="Sözleşme"
                  className="col-span-full [&_.ql-editor]:min-h-[100px]"
                  labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              />
          )}
      />
    </FormGroup>
  );
};
