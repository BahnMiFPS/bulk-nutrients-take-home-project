'use client';
import { Dispatch, ElementType, SetStateAction } from 'react';

import { CalculatorIcon } from '@heroicons/react/24/outline';
import { Select, SelectItem } from '@tremor/react';

export type TSelectOption = {
  value: string;
  label: string;
  icon?: ElementType<any>;
};

interface ISelectMenuProps {
  defaultValue?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: TSelectOption[];
  enableClear?: boolean;
}

export default function SelectMenu({
  defaultValue = 'all',
  value,
  setValue,
  options,
  enableClear = true
}: ISelectMenuProps) {
  return (
    <Select
      value={value}
      title="Filter"
      onValueChange={setValue}
      defaultValue={defaultValue}
      className="w-1/3"
      enableClear={enableClear}
    >
      {options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          icon={option.icon || CalculatorIcon}
        >
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
