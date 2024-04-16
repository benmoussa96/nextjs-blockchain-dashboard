import NetworkLayout from '@/app/network/network-layout';
import { getColumns } from '@/app/shared/transactions/transactions-list/transactions-columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { networksConfig } from '@/config/networks';
import { routes } from '@/config/routes';
import { fetchAllTransactions } from '@/utils/fetch-block-data';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';

export default async function Transactions({
  params,
}: {
  params: { networkName: string; blockId: string };
}) {
  const network = networksConfig[params.networkName];

  if (!network) {
    notFound();
  }

  const pageHeader = useMemo(() => {
    return {
      title: `Block #${params.blockId}`,
      back: routes.dashboard.details(params.networkName, params.blockId),
      breadcrumb: [
        {
          href: routes.dashboard.home,
          name: 'Home',
        },
        {
          href: routes.dashboard.network(`${params.networkName}`),
          name: network.label,
        },
        {
          href: routes.dashboard.details(params.networkName, params.blockId),
          name: params.blockId,
        },
      ],
    };
  }, [params.networkName, params.blockId]);

  const transactionData = await fetchAllTransactions(
    network,
    params.blockId,
    process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY
  );

  return (
    <NetworkLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      back={pageHeader.back}
    >
      <BasicTableWidget
        networkName={params.networkName}
        blockId={params.blockId}
        variant="elegant"
        title={`${transactionData.length} transactions`}
        data={transactionData}
        // @ts-ignore
        getColumns={getColumns}
        pageSize={15}
        enableAction={false}
        noGutter
        enablePagination
        className="min-h-[480px] [&_.widget-card-header_h5]:font-medium"
      />
    </NetworkLayout>
  );
}
