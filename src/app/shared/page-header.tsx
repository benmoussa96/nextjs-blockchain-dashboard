import Breadcrumb from '@/components/ui/breadcrumb';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PiArrowLeftBold } from 'react-icons/pi';
import { Title } from 'rizzui';

export type PageHeaderTypes = {
  title: string;
  back?: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

export default function PageHeader({
  title,
  back,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  const router = useRouter();

  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          <Title
            as="h2"
            className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
          >
            {back && (
              <Link href={back}>
                <PiArrowLeftBold className="h-7 w-7 mr-1.5 text-lg inline pb-2" />
              </Link>
            )}
            <span>{title}</span>
          </Title>

          <Breadcrumb
            separator=""
            separatorVariant="circle"
            className="flex-wrap"
          >
            {breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                {...(item?.href && { href: item?.href })}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        {children}
      </div>
    </header>
  );
}
