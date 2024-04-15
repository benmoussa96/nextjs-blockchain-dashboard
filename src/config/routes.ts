export const routes = {
  dashboard: {
    home: '/',
    network: (networkName: string) => `/network/${networkName}`,
    details: (networkName: string, blockId: string) =>
      `/network/${networkName}/block/${blockId}`,
    transactions: (networkName: string, blockId: string) =>
      `/network/${networkName}/block/${blockId}/transactions`,
    transacionDetails: (networkName: string, blockId: string, hash: string) =>
      `/network/${networkName}/block/${blockId}/transactions/${hash}`,
  },
  notFound: '/not-found',
};
