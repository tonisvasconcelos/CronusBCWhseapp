/**
 * Locations page component
 */

import React, { useState } from 'react';
import { DataTable, Column } from '../components/ui/DataTable';
import { useLocations } from '../api/queries/locations';
import { createODataBuilder, odataHelpers } from '@cronusapp/shared';
import type { Location } from '@cronusapp/shared';

export const Locations: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Location>('code');
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

  const { data, isLoading, error } = useLocations(queryBuilder.toObject());

  const handleSort = (key: keyof Location, direction: 'asc' | 'desc') => {
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

  const columns: Column<Location>[] = [
    {
      key: 'code',
      title: 'Code',
      sortable: true,
    },
    {
      key: 'displayName',
      title: 'Name',
      sortable: true,
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
      key: 'address',
      title: 'Country',
      render: (value) => value?.countryRegionCode || '',
    },
  ];

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <p className="text-red-600">Error loading locations: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Locations
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your warehouse locations
        </p>
      </div>

      {/* Search and filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={handleSearch}
              className="input w-full"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary">
              Add Location
            </button>
            <button className="btn btn-secondary">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Locations table */}
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
