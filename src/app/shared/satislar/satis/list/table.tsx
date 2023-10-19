'use client';

import dynamic from 'next/dynamic';
import { PiTrashDuotone } from 'react-icons/pi';
import {useCallback, useEffect, useMemo, useState} from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { getColumns, statusColors } from './columns';
import ControlledTable from '@/components/controlled-table';
import DateFiled from '@/components/controlled-table/date-field';
import { useMedia } from '@/hooks/use-media';
import { useTable } from '@/hooks/use-table';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';
import StatusField from '@/components/controlled-table/status-field';
import { useColumn } from '@/hooks/use-column';
import { Badge } from '@/components/ui/badge';
import {
  shipmentData,
  paymentMethods,
  shippingStatuses,
  StatusType,
} from '@/data/shipment-data';
import apiHelper from "@/utils/apiHelper";

const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: true,
});

const paymentStatusOptions = Object.entries(shippingStatuses).map(
  ([value, name]) => ({
    label: (
      <div className="flex items-center">
        {/*<Badge renderAsDot color={statusColors(name as StatusType)} />*/}
        <Text className="ms-2">{name}</Text>
      </div>
    ),
    name,
    value,
  })
);

const paymentMethodOptions = Object.entries(paymentMethods).map(
  ([value, name]) => ({ name, value })
);

const filterState = {
    created_at: [null, null],
    is_active: '',
};

type Seller = {
    id: number;
    created_at: string;
    email: string;
    avatar: null | string;        // Tam olarak ne olabileceğini belirtmediniz.
    identity_number: string;
    first_name: string;
    last_name: string;
    phone: string;
    cep: string;
    whatsapp: string;
    role: string;
    tax_number: string;
    company_name: string;
    is_active: boolean;
    updated_at: string;
};

type Feature = {
    id: number;
    name: string;
    description: string;
    is_active: boolean;
    is_included: boolean;
};

type Service = {
    id: number;
    name: string;
};

type Policy = {
    id: number;
    name: string;
    price: string;
    percentage: number;
    age_limit: number;
    features: Feature[];
    services: Service[];
    contract_content: string;
    banner: string;
    is_active: boolean;
};

type PolicyServices = {
    id: number;
    name: string;
};

type BrandType = {
    id: number;
    name: string;
};
type ModelType = {
    id: number;
    name: string;
};

type CustomData = {
    id: number;
    seller: Seller;
    policy: Policy;
    policy_services: PolicyServices;
    policy_number: string;
    price: string;
    commission: string;
    identity_number: string;
    first_name: string;
    last_name: string;
    plaka: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    province: number;
    district: number;
    brand: BrandType;
    model: ModelType;
}

export default function SatisListTable() {
    const [data, setData] = useState<CustomData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState(10);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const isMediumScreen = useMedia('(max-width: 1860px)', false);
    const isLargeScreen = useMedia('(min-width: 1861px)', false);

    useEffect(() => {
        async function fetchShipments() {
            setLoading(true);
            try {
                const response = await apiHelper.get<CustomData[]>('satis/satislar');
                if (response.data) {
                    setData(response.data);
                }
                setLoading(false);
            } catch (error) {
                setError('API\'den veri çekerken bir hata oluştu.');
                setLoading(false);
            }
        }
        fetchShipments();
    }, []);

    const onHeaderCellClick = (value: string) => ({
        onClick: () => {
            handleSort(value);
        },
    });

    const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
  }, []);

  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
    handleReset,
    handleSelectAll,
    handleRowSelect,
    setSelectedRowKeys,
    selectedRowKeys,
    // } = useTable(data, pageSize, filterState);
  } = useTable(data, pageSize, filterState, loading, error);

  const columns = useMemo(
    () =>
      getColumns({
        data: data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    [onDeleteItem, sortConfig, selectedRowKeys, handleRowSelect, handleSelectAll, data]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  return (
    <div>
      <ControlledTable
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              İndir {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Satışlar' : 'Satış'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
