/**
 * Purchase Orders API queries
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '../client';
import type { PurchaseOrder, PurchaseOrderLine, ApiResponse, ODataQuery } from '@cronusapp/shared';

// Query keys
export const purchaseOrdersKeys = {
  all: ['purchaseOrders'] as const,
  lists: () => [...purchaseOrdersKeys.all, 'list'] as const,
  list: (filters: ODataQuery) => [...purchaseOrdersKeys.lists(), filters] as const,
  lines: () => [...purchaseOrdersKeys.all, 'lines'] as const,
  linesList: (filters: ODataQuery) => [...purchaseOrdersKeys.lines(), filters] as const,
};

// Purchase Orders queries
export const usePurchaseOrders = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: purchaseOrdersKeys.list(query),
    queryFn: async (): Promise<ApiResponse<PurchaseOrder>> => {
      const response = await apiClient.get('/api/purchase-orders', { params: query });
      return response.data;
    },
  });
};

export const usePurchaseOrderLines = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: purchaseOrdersKeys.linesList(query),
    queryFn: async (): Promise<ApiResponse<PurchaseOrderLine>> => {
      const response = await apiClient.get('/api/purchase-orders/lines', { params: query });
      return response.data;
    },
  });
};
