'use client';

import BlocksTable from '@/app/shared/blocks/blocks-list/table';
import { networksConfig } from '@/config/networks';
import { routes } from '@/config/routes';
import { fetchBlocksData } from '@/utils/fetch-block-data';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import NetworkLayout from '../network-layout';

export default async function Network({
  params,
}: {
  params: { networkName: keyof typeof networksConfig };
}) {
  const network = networksConfig[params.networkName];

  if (!network) {
    notFound();
  }

  const pageHeader = useMemo(() => {
    return {
      title: 'Network Data',
      back: routes.dashboard.home,
      breadcrumb: [
        {
          href: routes.dashboard.home,
          name: 'Home',
        },
        {
          href: routes.dashboard.network(`${params.networkName}`),
          name: network.label,
        },
      ],
    };
  }, [params.networkName]);

  // const fetchData = async () => {
  const { blocksData, blockHeight } = (await fetchBlocksData(
    network,
    process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY
  )) || { blocksData: [], blockHeight: 0 };

  // return { blocksData, blockHeight };
  // };

  return (
    <NetworkLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      back={pageHeader.back}
    >
      <BlocksTable
        data={blocksData}
        blockHeight={blockHeight}
        network={network}
        variant="elegant"
        className="[&_.table-filter]:hidden [&_.table-pagination]:hidden"
      />
    </NetworkLayout>
  );
}
