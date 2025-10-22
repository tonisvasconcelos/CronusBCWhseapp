/**
 * Items page component
 */

import React, { useState } from 'react';
import { DataTable, Column } from '../components/ui/DataTable';
import { useItems } from '../api/queries/items';
import { createODataBuilder, odataHelpers } from '@cronusapp/shared';
import type { Item } from '@cronusapp/shared';

export const Items: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Item>('number');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
      odataHelpers.contains('displayName', searchTerm)
    );
  }

  const { data, isLoading, error } = useItems(queryBuilder.toObject());

  const handleSort = (key: keyof Item, direction: 'asc' | 'desc') => {
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

  const columns: Column<Item>[] = [
    {
      key: 'number',
      title: 'Item Number',
      sortable: true,
    },
    {
      key: 'displayName',
      title: 'Description',
      sortable: true,
    },
    {
      key: 'type',
      title: 'Type',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'Inventory'
              ? 'bg-blue-100 text-blue-800'
              : value === 'Service'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'itemCategoryCode',
      title: 'Category',
    },
    {
      key: 'baseUnitOfMeasureCode',
      title: 'Unit of Measure',
    },
    {
      key: 'blocked',
      title: 'Status',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {value ? 'Blocked' : 'Active'}
        </span>
      ),
    },
  ];

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <p className="text-red-600">Error loading items: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Items
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your inventory items
        </p>
      </div>

      {/* Search and filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={handleSearch}
              className="input w-full"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">
              Add Item
            </button>
            <button className="btn btn-secondary">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Items table */}
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
