'use client';

import DateFiled from '@/components/controlled-table/date-field';
import RangeField from '@/components/controlled-table/range-field';
import { useMedia } from '@/hooks/use-media';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import { PiTrashDuotone } from 'react-icons/pi';
import { Button } from 'rizzui';

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
  blockHeight?: number;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
  blockHeight,
}: FilterElementProps) {
  const isMediumScreen = useMedia('(max-width: 1860px)', false);
  return (
    <>
      <RangeField
        value={filters['height']}
        onChange={(data) => updateFilter('height', data)}
        maxRange={blockHeight?.toString()}
      />
      <DateFiled
        selected={getDateRangeStateValues(filters['timestamp'][0])}
        startDate={getDateRangeStateValues(filters['timestamp'][0])}
        endDate={getDateRangeStateValues(filters['timestamp'][1])}
        onChange={(date: any) => {
          updateFilter('timestamp', date);
        }}
        placeholderText="Select date from"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Date From',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
      />
      {isFiltered ? (
        <Button
          size="sm"
          onClick={handleReset}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </>
  );
}
