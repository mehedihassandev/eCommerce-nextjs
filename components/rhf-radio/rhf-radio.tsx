import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from 'react-hook-form';

import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type RhfRadioFieldProps<T extends FieldValues> = {
  control: Control<T>;
  options: { value: string; label: string }[];
  label?: string;
  row?: boolean;
  labelStyle?: string;
} & Omit<ControllerProps<T>, 'render' | 'control'>;

export const RhfRadio = <T extends FieldValues>({
  control,
  options,
  label,
  row = false,
  labelStyle,
  ...props
}: RhfRadioFieldProps<T>) => {
  return (
    <Controller
      control={control}
      {...props}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col">
          {label && (
            <Label className="mb-2 text-sm font-medium font-noto">
              {label}
            </Label>
          )}
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className={`flex ${row ? 'flex-row' : 'flex-col'} gap-4`}
          >
            {options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-3 font-noto"
              >
                <RadioGroupItem value={option.value} />
                <Label
                  className={`font-semibold text-sm font-noto ${labelStyle}`}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {error && (
            <span className="text-red-500 text-sm pt-2 pl-1">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default RhfRadio;
