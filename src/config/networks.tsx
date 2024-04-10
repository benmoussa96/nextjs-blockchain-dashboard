import { Network } from 'alchemy-sdk';

import LogoArbIcon from '@/components/icons/logo-arb';
import LogoEthIcon from '@/components/icons/logo-eth';
import LogoMaticIcon from '@/components/icons/logo-matic';
import LogoOptIcon from '@/components/icons/logo-opt';

export type NetworkData = {
    network: Network;
    isAlchemySupported: boolean;
    chainId: string;
    coingeckoPlatformId: string;
    name: string;
    image: string;
    icon: React.JSX.Element;
    nativeTokenId: string;
    nativeTokenSymbol: string;
    nativeTokenAddress: string;
  };

export type NetworkConfig = {
    [key: number]: NetworkData;
}

export const networksConfig: NetworkConfig = {
    1: {
      network: Network.ETH_MAINNET,
      isAlchemySupported: true,
      chainId: '1',
      coingeckoPlatformId: 'ethereum',
      name: 'Ethereum',
      image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029',
      icon: <LogoEthIcon className="h-5 w-5" />,
      nativeTokenId: 'ethereum',
      nativeTokenSymbol: 'ETH',
      nativeTokenAddress: '0x0000000000000000000000000000000000000000',
    },
    137: {
      network: Network.MATIC_MAINNET,
      isAlchemySupported: true,
      chainId: '137',
      coingeckoPlatformId: 'polygon-pos',
      name: 'Polygon',
      image: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=029',
      icon: <LogoMaticIcon className="h-5 w-5" />,
      nativeTokenId: 'matic-network',
      nativeTokenSymbol: 'MATIC',
      nativeTokenAddress: '0x0000000000000000000000000000000000001010',
    },
    42161: {
      network: Network.ARB_MAINNET,
      isAlchemySupported: true,
      chainId: '42161',
      coingeckoPlatformId: 'arbitrum-one',
      name: 'Arbitrum',
      image: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029',
      icon: <LogoArbIcon className="h-5 w-5" />,
      nativeTokenId: 'arbitrum',
      nativeTokenSymbol: 'ETH',
      nativeTokenAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    },
    10: {
      network: Network.OPT_MAINNET,
      isAlchemySupported: true,
      chainId: '10',
      coingeckoPlatformId: 'optimistic-ethereum',
      name: 'Optimism',
      image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=029',
      icon: <LogoOptIcon className="h-5 w-5" />,
      nativeTokenId: 'optimism',
      nativeTokenSymbol: 'ETH',
      nativeTokenAddress: '0x4200000000000000000000000000000000000042',
    },
};