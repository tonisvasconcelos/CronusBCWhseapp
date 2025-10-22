/**
 * Locations API queries
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '../client';
import type { Location, ApiResponse, ODataQuery } from '@cronusapp/shared';

// Query keys
export const locationsKeys = {
  all: ['locations'] as const,
  lists: () => [...locationsKeys.all, 'list'] as const,
  list: (filters: ODataQuery) => [...locationsKeys.lists(), filters] as const,
};

// Locations queries
export const useLocations = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: locationsKeys.list(query),
    queryFn: async (): Promise<ApiResponse<Location>> => {
      const response = await apiClient.get('/api/locations', { params: query });
      return response.data;
    },
  });
};
