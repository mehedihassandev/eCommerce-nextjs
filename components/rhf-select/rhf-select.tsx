import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectProps } from '@radix-ui/react-select';

type RhfSelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  options: { value: string; label: string }[];
  label?: string;
} & Omit<SelectProps, 'onChange' | 'value'> &
  Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfSelect = <T extends FieldValues>({
  control,
  options,
  label,
  ...props
}: RhfSelectFieldProps<T>) => {
  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col">
          {label && <Label className="mb-1 text-sm font-medium">{label}</Label>}
          <Select onValueChange={onChange} value={value} {...props}>
            <SelectTrigger>{value || 'Select an option'}</SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <span className="text-red-500 text-sm pt-1 pl-1">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default RhfSelect;
