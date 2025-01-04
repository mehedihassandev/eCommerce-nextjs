import React, { useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';

import { Autocomplete } from '../ui/autocomplete';

type RhfAutocompleteProps<T extends FieldValues> = {
  control: Control<T>;
  options: { value: string; label: string }[];
  disabled?: boolean;
  placeholder?: string;
} & Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfAutocomplete = <T extends FieldValues>({
  control,
  options,
  disabled = false,
  placeholder,
  ...props
}: RhfAutocompleteProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleFocus = () => {
          setIsFocused(true);
        };

        const handleBlur = () => {
          setIsFocused(false);
        };

        return (
          <div className="relative flex flex-col w-full">
            <div onFocus={handleFocus} onBlur={handleBlur}>
              <Autocomplete
                value={value}
                onValueChange={onChange}
                options={options}
                disabled={disabled}
                placeholder={placeholder}
                isFocused={isFocused}
                {...props}
              />
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

export default RhfAutocomplete;
