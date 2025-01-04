'use client';

import { InputHTMLAttributes, useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';

import { Input } from '../ui/input';

// Create a generic type for the RhfTextField component
type RhfTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  trim?: boolean; // Add a trim prop to enable/disable trimming
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> &
  Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfTextField = <T extends FieldValues>({
  control,
  trim = true,
  ...props
}: RhfTextFieldProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

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
          setIsFocused(false);
        };

        const handleFocus = () => {
          setIsFocused(true);
        };

        return (
          <div className="relative flex flex-col w-full">
            <Input
              className={`border ${error ? 'border-red-500' : ''} rounded p-2`}
              onChange={onChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              value={value}
              {...props}
              placeholder={isFocused ? props.placeholder : ''}
            />
            <span
              className={`absolute left-3 transition-all duration-200 ease-in-out pointer-events-none ${
                isFocused || value
                  ? 'text-sm -top-3 bg-white px-1'
                  : 'text-base top-2'
              }`}
            >
              {props.placeholder}
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

export default RhfTextField;
