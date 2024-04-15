export const truncateAddr = (addr: string) => {
  return addr.substring(0, 5) + '...' + addr.substring(addr.length - 5);
};

export const truncateHash = (addr: string) => {
  return addr.substring(0, 12) + '...' + addr.substring(addr.length - 5);
};

export const numberWithCommas = (x: string | number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
