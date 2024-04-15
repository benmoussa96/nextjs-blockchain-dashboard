/* eslint-disable no-empty-pattern */
'use client';

import { useEffect, useState } from 'react';
import { Input, Text } from 'rizzui';

type RangeFieldTypes = {
  label?: string;
  value: string[];
  minRange?: string;
  maxRange?: string;
  onChange: ([]: string[]) => void;
};

export default function RangeField({
  label = 'Amount',
  value,
  minRange,
  maxRange,
  onChange,
}: RangeFieldTypes) {
  const [minValue, setMinValue] = useState(value[0] ?? '');
  const [maxValue, setMaxValue] = useState(value[1] ?? '');

  function handleMinValue(value: string) {
    setMinValue(() => value);
    onChange([value, maxValue]);
  }

  function handleMaxValue(value: string) {
    setMaxValue(() => value);
    onChange([minValue, value]);
  }

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  return (
    <div className="range-field flex items-center">
      <Text
        as="span"
        className="mr-2 whitespace-nowrap font-medium text-gray-500"
      >
        {label}
      </Text>
      <div className="flex items-center">
        <Input
          inputClassName="w-24 h-9"
          type="number"
          placeholder={minRange || '0'}
          min={0}
          value={minValue}
          onChange={(event) => handleMinValue(event.target.value)}
        />
        <Text as="span" className="mx-1.5 h-0.5 w-3 bg-gray-200" />
        <Input
          min={Number(minValue)}
          inputClassName="w-24 h-9"
          type="number"
          placeholder={maxRange || '100.00'}
          value={maxValue}
          onChange={(event) => handleMaxValue(event.target.value)}
        />
      </div>
    </div>
  );
}
