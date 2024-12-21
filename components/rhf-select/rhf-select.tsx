import React from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';
import { SelectProps } from '@radix-ui/react-select';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

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
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOption = options.find((option) => option.value === value);

        const selectedLabel = selectedOption
          ? selectedOption.label
          : 'Select an option...';

        const handleChange = (newValue: string) => {
          onChange(newValue);
        };

        return (
          <div className="flex flex-col">
            {label && (
              <Label className="mb-2 text-sm font-medium font-noto">
                {label}
              </Label>
            )}
            <Select onValueChange={handleChange} value={value} {...props}>
              <SelectTrigger>{selectedLabel}</SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <span className="text-red-500 text-sm pt-2 pl-1 font-noto">
                {error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default RhfSelect;
