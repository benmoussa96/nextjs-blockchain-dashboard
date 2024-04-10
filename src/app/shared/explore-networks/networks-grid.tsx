'use client';

import { networksConfig } from '@/config/networks';
import hasSearchedParams from '@/utils/has-searched-params';
import { useState } from 'react';
import { Button } from 'rizzui';
// Note: using shuffle to simulate the filter effect
import { NetworkCard } from '@/components/cards/networks-card';
import shuffle from 'lodash/shuffle';

let CURRENT_PAGE = 12;

export default function NetworkGrid() {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(CURRENT_PAGE);

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + CURRENT_PAGE);
    }, 600);
  }

  const networkData = Object.entries(networksConfig);
  const filteredData = hasSearchedParams() ? shuffle(networkData) : networkData;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-6 @container @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
        {filteredData
          ?.slice(0, nextPage)
          ?.map(([chainId, network], index) => (
            <NetworkCard network={network} key={`filterProduct-${index}`} />
          ))}
      </div>

      {nextPage < filteredData?.length && (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button
            rounded="pill"
            isLoading={isLoading}
            onClick={() => handleLoadMore()}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
