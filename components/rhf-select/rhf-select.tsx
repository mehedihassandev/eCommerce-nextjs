import React, { useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';
import { SelectProps } from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

type RhfSelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  placeholder?: string;
} & Omit<SelectProps, 'onChange' | 'value'> &
  Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfSelect = <T extends FieldValues>({
  control,
  options,
  placeholder,
  ...props
}: RhfSelectFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOption = options.find((option) => option.value === value);

        const selectedLabel = selectedOption
          ? selectedOption.label
          : isFocused
          ? placeholder
          : '';

        const handleChange = (newValue: string) => {
          onChange(newValue);
          if (props.onChange) {
            props.onChange(newValue);
          }
        };

        const handleFocus = () => {
          setIsFocused(true);
        };

        const handleBlur = () => {
          setIsFocused(false);
        };

        return (
          <div className="relative flex flex-col w-full">
            <div onFocus={handleFocus} onBlur={handleBlur}>
              <Select onValueChange={handleChange} value={value} {...props}>
                <SelectTrigger
                  className={cn(
                    isFocused || value ? 'justify-between' : 'justify-end',
                  )}
                >
                  {selectedLabel}
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span
              className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none ${
                isFocused || value
                  ? 'text-xs -top-2 bg-white px-1'
                  : 'text-base top-2'
              }`}
            >
              {placeholder}
            </span>
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
