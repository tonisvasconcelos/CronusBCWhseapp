/**
 * Vendors page component
 */

import React, { useState } from 'react';
import { DataTable, Column } from '../components/ui/DataTable';
import { useVendors } from '../api/queries/vendors';
import { createODataBuilder, odataHelpers } from '@cronusapp/shared';
import type { Vendor } from '@cronusapp/shared';

export const Vendors: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Vendor>('number');
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

  const { data, isLoading, error } = useVendors(queryBuilder.toObject());

  const handleSort = (key: keyof Vendor, direction: 'asc' | 'desc') => {
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

  const columns: Column<Vendor>[] = [
    {
      key: 'number',
      title: 'Vendor Number',
      sortable: true,
    },
    {
      key: 'displayName',
      title: 'Name',
      sortable: true,
    },
    {
      key: 'type',
      title: 'Type',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'Company'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'address',
      title: 'Address',
      render: (value) => {
        if (!value) return '';
        const { street, city, state, postalCode } = value;
        return `${street}, ${city}, ${state} ${postalCode}`;
      },
    },
    {
      key: 'phoneNumber',
      title: 'Phone',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'blocked',
      title: 'Status',
      render: (value) => {
        if (value === ' ') {
          return (
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          );
        }
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            {value}
          </span>
        );
      },
    },
  ];

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <p className="text-red-600">Error loading vendors: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Vendors
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your vendor relationships
        </p>
      </div>

      {/* Search and filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={handleSearch}
              className="input w-full"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">
              Add Vendor
            </button>
            <button className="btn btn-secondary">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Vendors table */}
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
