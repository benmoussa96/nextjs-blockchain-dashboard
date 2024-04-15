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
  label: string;
  image: string;
  icon: React.JSX.Element;
  nativeTokenId: string;
  nativeTokenSymbol: string;
  nativeTokenAddress: string;
  apiUrl: string;
};

export type NetworkConfig = {
  [key: string]: NetworkData;
};

export const networksConfig: NetworkConfig = {
  eth: {
    network: Network.ETH_MAINNET,
    isAlchemySupported: true,
    chainId: '1',
    coingeckoPlatformId: 'ethereum',
    name: 'eth',
    label: 'Ethereum',
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029',
    icon: <LogoEthIcon className="h-5 w-5" />,
    nativeTokenId: 'ethereum',
    nativeTokenSymbol: 'ETH',
    nativeTokenAddress: '0x0000000000000000000000000000000000000000',
    apiUrl: 'https://eth.blockscout.com/api/v2/',
  },
  polygon: {
    network: Network.MATIC_MAINNET,
    isAlchemySupported: true,
    chainId: '137',
    coingeckoPlatformId: 'polygon-pos',
    name: 'polygon',
    label: 'Polygon',
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=029',
    icon: <LogoMaticIcon className="h-5 w-5" />,
    nativeTokenId: 'matic-network',
    nativeTokenSymbol: 'MATIC',
    nativeTokenAddress: '0x0000000000000000000000000000000000001010',
    apiUrl: 'https://polygon.blockscout.com/api/v2/',
  },
  arbitrum: {
    network: Network.ARB_MAINNET,
    isAlchemySupported: true,
    chainId: '42161',
    coingeckoPlatformId: 'arbitrum-one',
    name: 'arbitrum',
    label: 'Arbitrum',
    image: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029',
    icon: <LogoArbIcon className="h-5 w-5" />,
    nativeTokenId: 'arbitrum',
    nativeTokenSymbol: 'ETH',
    nativeTokenAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    apiUrl: 'https://explorer-v1.mxc.com/api/v2/',
  },
  optimism: {
    network: Network.OPT_MAINNET,
    isAlchemySupported: true,
    chainId: '10',
    coingeckoPlatformId: 'optimistic-ethereum',
    name: 'optimism',
    label: 'Optimism',
    image: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=029',
    icon: <LogoOptIcon className="h-5 w-5" />,
    nativeTokenId: 'optimism',
    nativeTokenSymbol: 'ETH',
    nativeTokenAddress: '0x4200000000000000000000000000000000000042',
    apiUrl: 'https://optimism.blockscout.com/api/v2/',
  },
};
