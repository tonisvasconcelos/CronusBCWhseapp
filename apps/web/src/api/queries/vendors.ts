/**
 * Vendors API queries
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '../client';
import type { Vendor, ApiResponse, ODataQuery } from '@cronusapp/shared';

// Query keys
export const vendorsKeys = {
  all: ['vendors'] as const,
  lists: () => [...vendorsKeys.all, 'list'] as const,
  list: (filters: ODataQuery) => [...vendorsKeys.lists(), filters] as const,
};

// Vendors queries
export const useVendors = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: vendorsKeys.list(query),
    queryFn: async (): Promise<ApiResponse<Vendor>> => {
      const response = await apiClient.get('/api/vendors', { params: query });
      return response.data;
    },
  });
};
