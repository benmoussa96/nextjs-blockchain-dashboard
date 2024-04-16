import NetworkLayout from '@/app/network/network-layout';
import { networksConfig } from '@/config/networks';
import { routes } from '@/config/routes';
import { truncateHash } from '@/utils/ethereum-utils';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';

export default async function Transaction({
  params,
}: {
  params: { networkName: string; blockId: string; hash: string };
}) {
  const network = networksConfig[params.networkName];

  if (!network) {
    notFound();
  }

  const pageHeader = useMemo(() => {
    return {
      title: `Transaction Details`,
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
        {
          href: routes.dashboard.transacionDetails(
            params.networkName,
            params.blockId,
            params.hash
          ),
          name: truncateHash(params.hash),
        },
      ],
    };
  }, [params.networkName, params.blockId]);

  return (
    <NetworkLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      back={pageHeader.back}
    >
      Transaction hash: {params.hash}
    </NetworkLayout>
  );
}
