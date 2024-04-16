'use client';

import WidgetCard from '@/components/cards/widget-card';
import ControlledTable from '@/components/controlled-table';
import { routes } from '@/config/routes';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import cn from '@/utils/class-names';
import Link from 'next/link';
import React from 'react';

type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

type BasicTableWidgetProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,
  }: ColumnTypes) => any;
  data: any[];
  blockId: string;
  networkName: string;
  enablePagination?: boolean;
  variant?: 'modern' | 'minimal' | 'classic' | 'elegant' | 'retro';
  enableAction?: boolean;
  paginatorClassName?: string;
  searchPlaceholder?: string;
  noGutter?: boolean;
  scroll?: {
    x?: number;
    y?: number;
  };
  sticky?: boolean;
};

export default function BasicTableWidget({
  title,
  subtitle,
  data = [],
  blockId,
  networkName,
  getColumns,
  pageSize = 5,
  setPageSize,
  enablePagination,
  variant = 'modern',
  enableAction = true,
  paginatorClassName,
  noGutter,
  sticky,
  scroll = { x: 1300 },
  className,
  searchPlaceholder = 'Search...',
}: BasicTableWidgetProps) {
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };

  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,
    currentPage,
    handleSort,
    handleDelete,
    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
  } = useTable(data, pageSize);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,
        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);

  return (
    <WidgetCard
      title={title}
      subtitle={subtitle}
      className={cn('flex flex-col', className)}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      {...(enableAction && {
        action: (
          <Link
            href={routes.dashboard.transactions(networkName, blockId)}
            className="rounded-none border-b border-primary px-0 font-medium text-primary"
          >
            View All Transactions
          </Link>
        ),
      })}
    >
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7')}
      >
        <ControlledTable
          isLoading={isLoading}
          data={tableData}
          columns={visibleColumns}
          scroll={scroll}
          sticky={sticky}
          variant={variant}
          className="mt-4"
          {...(enablePagination && {
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
              total: totalItems,
              current: currentPage,
              onChange: (page: number) => handlePaginate(page),
            },
            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
            ),
          })}
        />
      </div>
    </WidgetCard>
  );
}
