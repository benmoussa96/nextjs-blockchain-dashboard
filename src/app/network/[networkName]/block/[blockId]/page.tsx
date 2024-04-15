'use client';

import BlockInfo from '@/app/shared/blocks/blocks-details/block-info';
import BlockOverview from '@/app/shared/blocks/blocks-details/block-overview';
import TransactionsTable from '@/app/shared/blocks/transactions-list/table';
import { networksConfig } from '@/config/networks';
import { routes } from '@/config/routes';
import { fetchBlockData } from '@/utils/fetch-block-data';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import NetworkLayout from '../../../network-layout';

export default async function Network({
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
      back: routes.dashboard.network(`${params.networkName}`),
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

  const blockData = await fetchBlockData(
    network,
    params.blockId,
    process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY
  );

  if (!blockData) {
    notFound();
  }

  return (
    <NetworkLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      back={pageHeader.back}
    >
      <div className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
        <BlockOverview className="mb-10" blockData={blockData} />
        <BlockInfo blockData={blockData} />
        <TransactionsTable network={network} blockId={params.blockId} />
      </div>
    </NetworkLayout>
  );
}
