// import { envConfig } from '@/config/site.config';
import { Network } from 'alchemy-sdk';
import { AlchemyMultichainClient } from './alchemy-multichain-client';

export function buildAlchemyClient(apiKey?: string) {
  if (apiKey) {
    // Default config to use for all networks.
    const defaultConfig = {
      apiKey,
      network: Network.ETH_MAINNET,
    };

    // Include optional setting overrides for specific networks.
    const overrides = {
      [Network.MATIC_MAINNET]: { apiKey },
      [Network.ARB_MAINNET]: { apiKey },
      [Network.OPT_MAINNET]: { apiKey },
    };

    return new AlchemyMultichainClient(defaultConfig, overrides);
  }
}
