import { networksConfig } from '@/config/networks';
import { notFound } from 'next/navigation';

export default function Network({
  params,
}: {
  params: { chainId: keyof typeof networksConfig };
}) {
  const network = networksConfig[params.chainId];

  if (!network) {
    notFound();
  }

  return <div>{params.chainId}</div>;
}
