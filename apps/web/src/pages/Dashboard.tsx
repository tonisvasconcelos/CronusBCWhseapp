/**
 * Dashboard page component
 */

import React from 'react';
import { KPICard } from '../components/ui/KPICard';
import { DataTable, Column } from '../components/ui/DataTable';
import { useItems, useItemLedgerEntries } from '../api/queries/items';
import { usePurchaseOrders } from '../api/queries/purchaseOrders';
import {
  CubeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import type { ItemLedgerEntry, PurchaseOrder } from '@cronusapp/shared';

export const Dashboard: React.FC = () => {
  // Fetch data for KPI cards
  const { data: itemsData } = useItems({ $top: 1 });
  const { data: locationsData } = useItems({ $top: 1 }); // This should be locations, but using items for demo
  const { data: vendorsData } = useItems({ $top: 1 }); // This should be vendors, but using items for demo
  const { data: purchaseOrdersData } = usePurchaseOrders({ $top: 1 });

  // Fetch recent data for tables
  const { data: ledgerEntriesData, isLoading: ledgerLoading } = useItemLedgerEntries({
    $top: 10,
    $orderby: 'postingDate desc',
  });

  const { data: recentPurchaseOrdersData, isLoading: ordersLoading } = usePurchaseOrders({
    $top: 10,
    $orderby: 'orderDate desc',
  });

  // Define columns for Item Ledger Entries table
  const ledgerColumns: Column<ItemLedgerEntry>[] = [
    {
      key: 'itemNumber',
      title: 'Item Number',
    },
    {
      key: 'postingDate',
      title: 'Posting Date',
      render: value => new Date(value).toLocaleDateString(),
    },
    {
      key: 'entryType',
      title: 'Entry Type',
    },
    {
      key: 'documentNumber',
      title: 'Document Number',
    },
    {
      key: 'quantity',
      title: 'Quantity',
      render: value => value?.toLocaleString(),
    },
    {
      key: 'unitCost',
      title: 'Unit Cost',
      render: value => `$${value?.toFixed(2)}`,
    },
  ];

  // Define columns for Purchase Orders table
  const purchaseOrderColumns: Column<PurchaseOrder>[] = [
    {
      key: 'number',
      title: 'Order Number',
    },
    {
      key: 'vendorName',
      title: 'Vendor',
    },
    {
      key: 'orderDate',
      title: 'Order Date',
      render: value => new Date(value).toLocaleDateString(),
    },
    {
      key: 'status',
      title: 'Status',
      render: value => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'Open'
              ? 'bg-green-100 text-green-800'
              : value === 'Released'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'amountIncludingTax',
      title: 'Total Amount',
      render: value => `$${value?.toFixed(2)}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your Business Central data
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Items"
          value={itemsData?.['@odata.count'] || 0}
          icon={CubeIcon}
          color="blue"
          change={{
            value: 12,
            type: 'increase',
            period: 'vs last month',
          }}
        />
        <KPICard
          title="Locations"
          value={locationsData?.['@odata.count'] || 0}
          icon={MapPinIcon}
          color="green"
          change={{
            value: 3,
            type: 'increase',
            period: 'vs last month',
          }}
        />
        <KPICard
          title="Active Vendors"
          value={vendorsData?.['@odata.count'] || 0}
          icon={BuildingOfficeIcon}
          color="yellow"
          change={{
            value: 8,
            type: 'increase',
            period: 'vs last month',
          }}
        />
        <KPICard
          title="Open Purchase Orders"
          value={purchaseOrdersData?.['@odata.count'] || 0}
          icon={ShoppingCartIcon}
          color="red"
          change={{
            value: 5,
            type: 'decrease',
            period: 'vs last month',
          }}
        />
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Item Ledger Entries */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Item Ledger Entries
          </h2>
          <DataTable
            data={ledgerEntriesData?.value || []}
            columns={ledgerColumns}
            loading={ledgerLoading}
            totalItems={ledgerEntriesData?.['@odata.count'] || 0}
            itemsPerPage={10}
          />
        </div>

        {/* Recent Purchase Orders */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Purchase Orders
          </h2>
          <DataTable
            data={recentPurchaseOrdersData?.value || []}
            columns={purchaseOrderColumns}
            loading={ordersLoading}
            totalItems={recentPurchaseOrdersData?.['@odata.count'] || 0}
            itemsPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};
