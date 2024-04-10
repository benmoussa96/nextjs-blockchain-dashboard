export const routes = {
  dashboard: {
    home: '/',
    network: (chainId: string) => `/network/${chainId}`,
    details: (chainId: string, blockId: string) => `/network/${chainId}/block/${blockId}`,
  },
  notFound: '/not-found',
};
