'use client';

import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { CountDown } from '@/components/ui/count-down';
import { HeaderCell } from '@/components/ui/table';
import { NetworkData } from '@/config/networks';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { truncateAddr, truncateHash } from '@/utils/ethereum-utils';
import { fetchAllTransactions } from '@/utils/fetch-block-data';
import Link from 'next/link';
import { Badge } from 'rizzui';

interface DeliveryDetailsProps {
  network: NetworkData;
  blockId: string;
  className?: string;
}

const typeColors: any = {
  Transaction: 'primary',
  'Coin Transfer': 'secondary',
  'Contract Call': 'info',
  'Token Transfer': 'warning',
};

export const getColumns = ({
  onHeaderCellClick,
  sortConfig,
}: {
  onHeaderCellClick: (value: string) => void;
  sortConfig?: any;
}) => [
  {
    title: <HeaderCell title="Txn hash" />,
    dataIndex: 'hash',
    key: 'hash',
    width: 100,
    render: (hash: string, row: any) => (
      <div className={cn('grid gap-1')}>
        <span>
          <Link
            href={routes.dashboard.transacionDetails(
              row.network,
              row.number,
              hash
            )}
            className="rounded-none border-b border-primary px-0 font-medium text-primary"
          >
            {truncateHash(hash)}
          </Link>
        </span>
        <CountDown target={new Date(row.timestamp)} />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Type"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'type'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('type'),
    dataIndex: 'type',
    key: 'type',
    width: 200,
    render: (type: string) => (
      <Badge color={typeColors[type]} rounded="md">
        {type}
      </Badge>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Method"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'method'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('method'),
    dataIndex: 'method',
    key: 'method',
    width: 200,
    render: (method: string) => method && <Badge rounded="md">{method}</Badge>,
  },
  {
    title: <HeaderCell title="From/To" />,
    dataIndex: 'fromTo',
    key: 'fromTo',
    width: 400,
    render: (fromTo: { from: string; to: string }) => (
      <p>{`${truncateAddr(fromTo.from)} -> ${truncateAddr(fromTo.to)}`}</p>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Value (ETH)"
        align="right"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'value'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('value'),
    dataIndex: 'value',
    key: 'value',
    align: 'right',
    width: 150,
    render: (value: string) => <p>{value}</p>,
  },
  {
    title: (
      <HeaderCell
        title="Fee (ETH)"
        align="right"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'fee'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('fee'),
    dataIndex: 'fee',
    key: 'fee',
    align: 'right',
    width: 200,
    render: (fee: string) => <p>{fee}</p>,
  },
];

export default async function TransactionsTable({
  network,
  blockId,
  className,
}: DeliveryDetailsProps) {
  const transactionData = await fetchAllTransactions(
    network,
    blockId,
    process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY
  );

  // console.log(transactionData.length);

  return (
    transactionData && (
      <BasicTableWidget
        title="Transactions "
        subtitle={`(5 out of ${transactionData.length})`}
        className={cn(
          'pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0'
        )}
        data={transactionData}
        blockId={blockId}
        networkName={network.name}
        getColumns={getColumns}
        noGutter
        scroll={{
          x: 900,
        }}
      />
    )
  );
}
