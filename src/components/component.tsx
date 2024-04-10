'use client';

import { buildAlchemyClient } from '@/utils/alchemy/alchemy';
import { Network } from 'alchemy-sdk';
import { useEffect } from 'react';

const alchemy = buildAlchemyClient(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);

export default function Component() {
  const network = {
    network: Network.ETH_MAINNET,
    isAlchemySupported: true,
    chainId: '1',
    coingeckoPlatformId: 'ethereum',
    name: 'Ethereum',
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029',
    // icon: <LogoEthIcon className="h-5 w-5" />,
    nativeTokenId: 'ethereum',
    nativeTokenSymbol: 'ETH',
    nativeTokenAddress: '0x0000000000000000000000000000000000000000',
  };

  useEffect(() => {
    async function fetchData() {
      const resp = await alchemy
        .forNetwork(network.network)
        .core.getBlockNumber();

      console.log('resp', resp);
    }

    fetchData();
  });

  return <></>;
}

// export const getStaticProps = (async (context) => {
//   const alchemy = buildAlchemyClient(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
//   const resp = await alchemy.forNetwork(network.network).core.getBlockNumber();

//   console.log(resp);

//   return { props: { repo } };
// }) satisfies GetStaticProps<{
//   repo: Repo;
// }>;
