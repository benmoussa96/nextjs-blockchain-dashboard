'use client';

import PercentWidget from '@/app/shared/blocks/percent-widget';
import DeliveryTruckIcon from '@/components/icons/delivery-truck';
import PackageOpenIcon from '@/components/icons/package-open';
import { CountDown } from '@/components/ui/count-down';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { numberWithCommas } from '@/utils/ethereum-utils';
import { formatDate } from '@/utils/format-date';
import Link from 'next/link';
import { PiCaretDownBold, PiPackageFill } from 'react-icons/pi';
import { Collapse, Text, Title } from 'rizzui';

export default function BlockInfo({
  blockData,
  className,
}: {
  blockData: any;
  className?: string;
}) {
  const shippingInformation = [
    {
      title: 'Block Overview',
      icon: <PiPackageFill className="h-6 w-6 text-primary" />,
      data: [
        {
          name: 'Block height',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.height}
            </Text>
          ),
        },
        {
          name: 'Size',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {numberWithCommas(blockData.size)}
            </Text>
          ),
        },
        {
          name: 'Timestamp',
          value: (
            <>
              <Text className="gap-3 font-medium text-gray-700 pr-2">
                <time
                  dateTime={formatDate(
                    blockData.timestamp,
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                  className={cn('pr-1')}
                >
                  {formatDate(blockData.timestamp, 'MMMM D, YYYY h:mm A')}
                </time>
                {' | '}
              </Text>
              <CountDown target={new Date(blockData.timestamp)} />
            </>
          ),
        },
        {
          name: 'Transactions',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              <Link
                href={routes.dashboard.transactions(
                  blockData.network,
                  blockData.height
                )}
                className="rounded-none border-b border-primary px-0 font-medium text-primary"
              >
                {blockData.txCount} txns
              </Link>
              {' in this block'}
            </Text>
          ),
        },
        {
          name: 'Withdrawals',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.withdrawalsCount} withdrawls
            </Text>
          ),
        },
        {
          name: 'Validated by',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.validator}
            </Text>
          ),
        },
        {
          name: 'Block reward',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.blockRewardETH} ETH{' '}
              <span className="text-sm text-gray-500">
                (0 + {blockData.fees.txFees} - {blockData.fees.burntFees})
              </span>
            </Text>
          ),
        },
      ],
    },
    {
      title: 'Gas',
      icon: <DeliveryTruckIcon className="h-5 w-6 text-primary" />,
      data: [
        {
          name: 'Gas used',
          value: (
            <PercentWidget
              value={numberWithCommas(blockData.gas.gasUsed)}
              percent={blockData.gas.gasUsedPercent}
              secondPercent={blockData.gas.gasTargetPercent}
            />
          ),
        },
        {
          name: 'Gas limit',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {numberWithCommas(blockData.gas.gasLimit)}
            </Text>
          ),
        },
        {
          name: 'Base fee per gas',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.fees.baseFeePerGas.eth} ETH
              <span className="text-sm text-gray-500">
                {' (' + blockData.fees.baseFeePerGas.gwei + ' Gwei)'}
              </span>
            </Text>
          ),
        },
        {
          name: 'Burnt fees',
          value: (
            <PercentWidget
              value={blockData.fees.burntFees}
              percent={blockData.fees.burntFeesPercent}
            />
          ),
        },
        {
          name: 'Priority fee / Tip',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.fees.priorityFee} ETH
            </Text>
          ),
        },
      ],
    },
    {
      title: 'More Details',
      icon: <PackageOpenIcon className="h-5 w-5 text-primary" />,
      data: [
        {
          name: 'Difficulty',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.difficulty}
            </Text>
          ),
        },
        {
          name: 'Total difficulty',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {numberWithCommas(blockData.totalDifficulty)}
            </Text>
          ),
        },
        {
          name: 'Hash',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.hash}
            </Text>
          ),
        },
        {
          name: 'Parent hash',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.parentHash}
            </Text>
          ),
        },
        {
          name: 'Nonce',
          value: (
            <Text className="gap-3 font-medium text-gray-700">
              {blockData.nonce}
            </Text>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Collapse
        defaultOpen={true}
        className={cn('mx-0 py-5 md:py-7 ', className)}
        header={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="flex w-full cursor-pointer items-center justify-between text-left font-lexend text-xl font-semibold text-gray-700"
          >
            Block Information
            <PiCaretDownBold
              className={cn(
                'h-5 w-5 -rotate-90 transform transition-transform duration-300 rtl:rotate-90',
                open && '-rotate-0 rtl:rotate-0'
              )}
            />
          </button>
        )}
      >
        {shippingInformation.map((item, index) => (
          <div
            className={cn(
              'my-10 flex gap-4',
              index === shippingInformation.length - 1 && 'mb-3'
            )}
            key={`shipping-block-${index}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-lighter">
              {item.icon}
            </span>

            <div className="flex flex-col gap-y-3">
              <Title as="h3" className="text-base font-semibold">
                {item.title}
              </Title>
              {item.data.map((info, index) => (
                <div
                  className="flex flex-col sm:flex-row sm:items-center"
                  key={`info-${index}`}
                >
                  <Title
                    as="h4"
                    className="text-sm font-normal capitalize text-gray-700 sm:min-w-[244px] md:min-w-[424px]"
                  >
                    {info.name}:
                  </Title>
                  {info.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Collapse>
    </>
  );
}
