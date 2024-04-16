'use client';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { PiChecksBold, PiCopySimple } from 'react-icons/pi';
import { Button, Text, Title } from 'rizzui';

export default function BlockOverview({
  blockData,
  className,
}: {
  blockData: any;
  className?: string;
}) {
  const params = useParams();
  const [isCopied, setCopied] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard(value: string) {
    copyToClipboard(value);
    toast.success(<b>{`Copied '${value}' to clipboard`}</b>);

    setCopied(() => true);
    setTimeout(() => {
      setCopied(() => false);
    }, 2000);
  }

  return (
    <div>
      <div>
        <Text className="mb-2 text-gray-700">Block Hash:</Text>
        <Title
          as="h2"
          className="mb-3 text-2xl font-bold text-gray-700 3xl:text-3xl"
        >
          {blockData.hash}
          <Button
            variant="text"
            onClick={() => handleCopyToClipboard(blockData.hash as string)}
            className="inline-flex h-auto w-auto items-center gap-1 px-4 py-0 font-normal"
          >
            <PiCopySimple className="h-5 w-5" />
            <Text as="span" className="text-gray-700">
              {isCopied ? 'Copied' : 'Copy'}
            </Text>
          </Button>
        </Title>

        <div className="mb-7 flex items-center gap-x-5">
          <Text className="inline-flex items-center gap-1">
            <PiChecksBold className="h-5 w-5" />
            <Text as="span" className="text-gray-700">
              Validator: {blockData.validator}
            </Text>
          </Text>
        </div>
      </div>
    </div>
  );
}
