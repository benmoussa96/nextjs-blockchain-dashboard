'use client';

import PercentWidget from '@/app/shared/blocks/percent-widget';
import EyeIcon from '@/components/icons/eye';
import { CountDown } from '@/components/ui/count-down';
import DateCell from '@/components/ui/date-cell';
import { HeaderCell } from '@/components/ui/table';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { numberWithCommas, truncateAddr } from '@/utils/ethereum-utils';
import Link from 'next/link';
import { ActionIcon, Text, Tooltip } from 'rizzui';

type Columns = {
  networkName: string;
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  networkName,
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: (
      <HeaderCell
        title="Block"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'height'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('height'),
    dataIndex: 'height',
    key: 'height',
    width: 120,
    render: (value: string, row: any) => (
      <div className={cn('grid gap-1')}>
        <span>
          <Link
            href={routes.dashboard.details(networkName, value)}
            className="rounded-none border-b border-primary px-0 font-medium text-primary"
          >
            #{value}
          </Link>
        </span>
        <CountDown target={new Date(row.timestamp)} />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Timestamp"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'timestamp'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('timestamp'),
    dataIndex: 'timestamp',
    key: 'timestamp',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="Size (bytes)"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'size'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('size'),
    dataIndex: 'size',
    key: 'size',
    width: 150,
    render: (value: number) => (
      <Text className="font-medium text-gray-700">
        {numberWithCommas(value)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Validator" />,
    dataIndex: 'validator',
    key: 'validator',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{truncateAddr(value)}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Txn Count"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'txCount'
        }
      />
    ),

    onHeaderCell: () => onHeaderCellClick('txCount'),
    dataIndex: 'txCount',
    key: 'txCount',
    width: 150,
    render: (value: string, row: any) => (
      <Link
        href={routes.dashboard.transactions(networkName, row.height)}
        className="rounded-none border-b border-primary px-0 font-medium text-primary"
      >
        {value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Gas Used" />,
    dataIndex: 'gas',
    key: 'gas',
    width: 200,
    render: (value: {
      gasUsed: number;
      gasUsedPercent: number;
      gasTargetPercent: number;
    }) => (
      <>
        <PercentWidget
          value={numberWithCommas(value.gasUsed)}
          percent={value.gasUsedPercent}
          secondPercent={value.gasTargetPercent}
        />
      </>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Reward (ETH)"
        sortable
        ascending={
          sortConfig?.direction === 'asc' &&
          sortConfig?.key === 'blockRewardETH'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('blockRewardETH'),
    dataIndex: 'blockRewardETH',
    key: 'blockRewardETH',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Burnt Fees (ETH)" />,
    dataIndex: 'fees',
    key: 'fees',
    width: 150,
    render: (value: { burntFees: number; burntFeesPercent: number }) => (
      <>
        <PercentWidget
          value={value.burntFees}
          percent={value.burntFeesPercent}
        />
      </>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => {
      return (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={'View Block'}
            placement="top"
            color="invert"
          >
            <Link href={routes.dashboard.details(networkName, row.height)}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
        </div>
      );
    },
  },
];
