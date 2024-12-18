import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';
import { Input } from '../ui/input';
import { InputHTMLAttributes } from 'react';
import { Label } from '../ui/label';

// Create a generic type for the RhfTextField component
type RhfTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  trim?: boolean; // Add a trim prop to enable/disable trimming
  label?: string; // Add label prop
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> &
  Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfTextField = <T extends FieldValues>({
  control,
  trim = true,
  label,
  ...props
}: RhfTextFieldProps<T>) => {
  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleBlur = () => {
          let trimmedValue = value;

          if (typeof value === 'string' && trim) {
            trimmedValue = trimmedValue.trim(); // Trim leading and trailing spaces
            // If both values are not same, send trimmedValue to onChange
            trimmedValue = trimmedValue.replace(/\s+/g, ' ');
          }
          if (trimmedValue !== value) {
            onChange(trimmedValue);
          }
        };

        return (
          <div className="flex flex-col">
            {label && (
              <Label className="mb-1 text-sm font-medium">{label}</Label>
            )}
            <Input
              className={`border ${error ? 'border-red-500' : ''} rounded p-2`}
              onChange={onChange}
              onBlur={handleBlur}
              value={value}
              {...props}
            />
            {error && (
              <span className="text-red-500 text-sm pt-1 pl-1">
                {error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default RhfTextField;
