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
import toast from "react-hot-toast";

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

type CustomUser = {
    id: number;
    name: string;
    price: string;
    age_limit: number | string;
    percentage: number | string;
    contract_content: any;
    is_active: boolean;
}

export default function PoliceListTable() {
    const [data, setData] = useState<CustomUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState(10);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const isMediumScreen = useMedia('(max-width: 1860px)', false);
    const isLargeScreen = useMedia('(min-width: 1861px)', false);
    const [reloadData, setReloadData] = useState<number>(0);


    useEffect(() => {
        async function fetchShipments() {
            setLoading(true);
            try {
                const response = await apiHelper.get<CustomUser[]>('paketler/policeler');
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
    }, [reloadData]);

    const onHeaderCellClick = (value: string) => ({
        onClick: () => {
            handleSort(value);
        },
    });

    const handleDeletee = async (id: string | number) => {
        setLoading(true);
        try {
            await apiHelper.delete(`/paketler/police/${id}`);
            toast.success(
                <Text tag="b" className="font-semibold">
                    Başarıyla Silindi
                </Text>
            );
            setReloadData(prev => prev + 1);  // Silme başarılı olduğunda reloadData'yı güncelliyoruz
        } catch (error: any) {
            if (error.response && error.response.data) {
                Object.entries(error.response.data).forEach(([key, errorArray]) => {
                    (errorArray as string[]).forEach((errorMessage: string) => {
                        toast.error(`${key}: ${errorMessage}`);
                    });
                });
            } else {
                toast.error('API ile iletişim kurulurken bir hata oluştu.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onDeleteItem = useCallback((id: string) => {
        handleDeletee(id);
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
              {selectedRowKeys.length > 1 ? 'Police' : 'Police'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
