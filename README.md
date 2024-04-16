# Project Showcase: Blockchain Dashboard

Sample project as an assessment for the Blockchain Frontend Engineer position at Venture Miner.

Deployed at: https://ben-moussa-nextjs-blockchain-dashboard.vercel.app

## Description

This project aims to assess your skills in building a user-friendly and informative blockchain dashboard using Next.js and a CSS framework of your choice. You will demonstrate your ability to fetch and display relevant data from a public blockchain, implement unit tests, and document your development process.

### Built with

- Typescript
- NPM
- Node JS (>=14.0.0)
- React JS (>=18.0.0)
- Next JS (>=14.0.0)
- Tailwind CSS
- RizzUI
- Jotai

## Getting Started

### Dependencies

- [Blockscout](https://www.blockscout.com) account & API key.

### Installing

1. Clone the repo

   ```sh
   git clone https://github.com/benmoussa96/nextjs-blockchain-dashboard.git
   ```

2. Change into repo root directory

   ```sh
   cd nextjs-blockchain-dashboard
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Create a `.env.local` file at the root of the project

   ```sh
   cp example.env.local
   ```

5. Replace your own Blockscout API key in the `.env.local` file

   ```sh
   NEXT_PUBLIC_BLOCKSCOUT_API_KEY=YOUR_BLOCKSCOUT_API_KEY
   ```

6. Build the project

   ```sh
   npm run build
   ```

7. Launching the project

   ```sh
   npm run start
   ```

### Adding new networks (optional)

1. Open the networks config file located at `@/src/config/networks.tsx` and add your network with the following format

   ```typescript
   {
    eth: {
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
    }
   }
   ```

2. Add your network's icon in SVG format in the `@/src/components/icons` directory
