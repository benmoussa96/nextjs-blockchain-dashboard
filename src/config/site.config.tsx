import logoIconImg from '@public/logo-short.svg';
import logoImg from '@public/logo.svg';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Ben Moussa - Blockchain Dashboard',
  description: `A user-friendly and informative blockchain dashboard using Next.js`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: 'beryllium',
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Venture Miner` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Venture Miner` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Blockchain Dashboard', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://giveth.mypinata.cloud/ipfs/QmfR6JuV1wGQPqmpNv3Avvvvxck6z8AMpgh3vCCygajKv9',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
