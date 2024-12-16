import React from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';
import { Label } from '../ui/label';
import { Autocomplete } from '../ui/auto-complete';

type RhfAutocompleteProps<T extends FieldValues> = {
  control: Control<T>;
  options: { value: string; label: string }[];
  label?: string;
  disabled?: boolean;
} & Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfAutocomplete = <T extends FieldValues>({
  control,
  options,
  label,
  disabled = false,
  ...props
}: RhfAutocompleteProps<T>) => {
  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col">
          {label && <Label className="mb-1 text-sm font-medium">{label}</Label>}
          <Autocomplete
            value={value}
            onValueChange={onChange}
            options={options}
            disabled={disabled}
          />
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

export default RhfAutocomplete;
