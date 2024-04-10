// import NetworkFilter from '@/app/shared/explore-networks/networks-filter';
import NetworkGrid from '@/app/shared/explore-networks/networks-grid';
import { Suspense } from 'react';

export default function NetworkSearchPageView() {
  return (
    <>
      {/* <NetworkFilter /> */}
      <Suspense>
        <NetworkGrid />
      </Suspense>
    </>
  );
}
