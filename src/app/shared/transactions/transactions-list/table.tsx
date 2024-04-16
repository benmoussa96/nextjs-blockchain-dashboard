import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { NetworkData } from '@/config/networks';
import cn from '@/utils/class-names';
import { fetchAllTransactions } from '@/utils/fetch-block-data';
import { getColumns } from './transactions-columns';

interface DeliveryDetailsProps {
  network: NetworkData;
  blockId: string;
  className?: string;
}

export default async function TransactionsTable({
  network,
  blockId,
  className,
}: DeliveryDetailsProps) {
  const PAGE_SIZE = 5;

  const transactionData = await fetchAllTransactions(
    network,
    blockId,
    process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY
  );

  return (
    transactionData && (
      <BasicTableWidget
        variant="elegant"
        title="Transactions "
        subtitle={`(5 out of ${transactionData.length})`}
        className={cn(
          'pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0'
        )}
        data={transactionData.slice(0, PAGE_SIZE)}
        pageSize={PAGE_SIZE}
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
