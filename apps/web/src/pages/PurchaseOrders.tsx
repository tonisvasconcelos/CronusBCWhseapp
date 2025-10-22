/**
 * Purchase Orders page component
 */

import React, { useState } from 'react';
import { DataTable, Column } from '../components/ui/DataTable';
import { usePurchaseOrders } from '../api/queries/purchaseOrders';
import { createODataBuilder, odataHelpers } from '@cronusapp/shared';
import type { PurchaseOrder } from '@cronusapp/shared';

export const PurchaseOrders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof PurchaseOrder>('number');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const itemsPerPage = 20;
  const skip = (currentPage - 1) * itemsPerPage;

  // Build OData query
  const queryBuilder = createODataBuilder()
    .top(itemsPerPage)
    .skip(skip)
    .orderBy(sortField, sortDirection)
    .count(true);

  if (searchTerm) {
    queryBuilder.filter(
      odataHelpers.contains('vendorName', searchTerm)
    );
  }

  const { data, isLoading, error } = usePurchaseOrders(queryBuilder.toObject());

  const handleSort = (key: keyof PurchaseOrder, direction: 'asc' | 'desc') => {
    setSortField(key);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Released':
        return 'bg-blue-100 text-blue-800';
      case 'Pending_Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: Column<PurchaseOrder>[] = [
    {
      key: 'number',
      title: 'Order Number',
      sortable: true,
    },
    {
      key: 'vendorName',
      title: 'Vendor',
      sortable: true,
    },
    {
      key: 'orderDate',
      title: 'Order Date',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'requestedReceiptDate',
      title: 'Requested Receipt',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(value)}`}
        >
          {value.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'amountIncludingTax',
      title: 'Total Amount',
      sortable: true,
      render: (value) => `$${value?.toFixed(2)}`,
    },
    {
      key: 'currencyCode',
      title: 'Currency',
    },
  ];

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <p className="text-red-600">Error loading purchase orders: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Purchase Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your purchase orders and procurement
        </p>
      </div>

      {/* Search and filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by vendor name..."
              value={searchTerm}
              onChange={handleSearch}
              className="input w-full"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">
              Create Purchase Order
            </button>
            <button className="btn btn-secondary">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Orders table */}
      <DataTable
        data={data?.value || []}
        columns={columns}
        loading={isLoading}
        onSort={handleSort}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={Math.ceil((data?.['@odata.count'] || 0) / itemsPerPage)}
        totalItems={data?.['@odata.count'] || 0}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};
