import { type NetworkData } from '@/config/networks';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import Image from 'next/image';
import Link from 'next/link';

interface NetworkProps {
  network: NetworkData;
  className?: string;
}

export function NetworkCard({ network, className }: NetworkProps) {
  return (
    <div
      className={cn(
        'group relative top-0 overflow-hidden rounded-lg duration-200 hover:-top-1',
        className
      )}
    >
      <Link
        href={routes.dashboard.network(network.name)}
        className="max-w-[calc(100%-120px)] flex-grow"
      >
        <div className="bg-gray-200 dark:bg-gray-900 relative mx-auto aspect-square w-full">
          <Image
            alt={network.label}
            src={network.image}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
            placeholder="blur"
            style={{ transform: 'scale(0.5)' }}
            blurDataURL={
              network.image ?? `/_next/image?url=${network.image}&w=10&q=1`
            }
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between bg-gray-900/30 p-5 opacity-0 duration-200 group-hover:opacity-100 dark:bg-gray-100/50">
            <div className="flex items-center gap-2"></div>
            <p className="text-2xl font-semibold text-white">{network.label}</p>
          </div>
        </div>
        <div className="bg-gray-900 p-5 dark:bg-gray-200">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-gray-300/70 dark:text-gray-600">
                ChainID
              </span>
              <p className="relative ps-6 text-gray-100 after:absolute after:left-1.5 after:top-1.5 after:h-1.5 after:w-1.5 after:rounded-full after:bg-gray-100 @5xl:text-xl @5xl:after:top-2.5 @5xl:after:h-2 @5xl:after:w-2 dark:text-gray-900 dark:after:bg-gray-900">
                {network.chainId}
              </p>
            </div>
            {/* <CountDown target={network.endsAt} /> */}
            <div className="flex flex-col gap-1">
              <span className="text-gray-300/70 dark:text-gray-600">
                Currency
              </span>
              <p className="text-gray-100 @5xl:text-xl dark:text-gray-900">
                {network.nativeTokenSymbol}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
