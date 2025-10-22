/**
 * Items API queries
 */

import { useQuery } from '@tanstack/react-query';
import apiClient from '../client';
import type { Item, ItemCategory, ItemVariant, ItemLedgerEntry, ApiResponse, ODataQuery } from '@cronusapp/shared';

// Query keys
export const itemsKeys = {
  all: ['items'] as const,
  lists: () => [...itemsKeys.all, 'list'] as const,
  list: (filters: ODataQuery) => [...itemsKeys.lists(), filters] as const,
  categories: () => [...itemsKeys.all, 'categories'] as const,
  variants: () => [...itemsKeys.all, 'variants'] as const,
  ledgerEntries: () => [...itemsKeys.all, 'ledgerEntries'] as const,
};

// Items queries
export const useItems = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: itemsKeys.list(query),
    queryFn: async (): Promise<ApiResponse<Item>> => {
      const response = await apiClient.get('/api/items', { params: query });
      return response.data;
    },
  });
};

export const useItemCategories = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: [...itemsKeys.categories(), query],
    queryFn: async (): Promise<ApiResponse<ItemCategory>> => {
      const response = await apiClient.get('/api/items/categories', { params: query });
      return response.data;
    },
  });
};

export const useItemVariants = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: [...itemsKeys.variants(), query],
    queryFn: async (): Promise<ApiResponse<ItemVariant>> => {
      const response = await apiClient.get('/api/items/variants', { params: query });
      return response.data;
    },
  });
};

export const useItemLedgerEntries = (query: ODataQuery = {}) => {
  return useQuery({
    queryKey: [...itemsKeys.ledgerEntries(), query],
    queryFn: async (): Promise<ApiResponse<ItemLedgerEntry>> => {
      const response = await apiClient.get('/api/items/ledger-entries', { params: query });
      return response.data;
    },
  });
};
