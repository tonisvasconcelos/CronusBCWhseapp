/**
 * Business Central API client with authentication
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getConfig, buildBcApiUrl } from '@cronusapp/shared';
import { tokenProvider } from '../auth/tokenProvider';
import type { ApiResponse, ApiError } from '@cronusapp/shared';

export class BusinessCentralClient {
  private client: AxiosInstance;
  private useMocks: boolean;

  constructor() {
    const config = getConfig();
    this.useMocks = config.USE_MOCKS;

    this.client = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Add request interceptor to inject auth token
    this.client.interceptors.request.use(
      async config => {
        if (!this.useMocks) {
          try {
            const token = await tokenProvider.getAccessToken();
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.error('Failed to get access token:', error);
            throw new Error('Authentication failed');
          }
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const apiError: ApiError = {
            error: {
              code: error.response.status.toString(),
              message: error.response.data?.error?.message || error.message,
              details: error.response.data?.error?.details,
              traceId: error.response.headers['x-ms-request-id'],
            },
          };
          return Promise.reject(apiError);
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * Make a GET request to Business Central API
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    if (this.useMocks) {
      return this.getMockData<T>(endpoint);
    }

    const config = getConfig();
    const url = buildBcApiUrl(config, endpoint);
    const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, { params });
    return response.data;
  }

  /**
   * Get environments list
   */
  async getEnvironments(): Promise<ApiResponse<any>> {
    if (this.useMocks) {
      return this.getMockData('environments');
    }

    const config = getConfig();
    const url = `${config.BC_BASE_URL}/${config.BC_TENANT_ID}/environments`;
    const response: AxiosResponse<ApiResponse<any>> = await this.client.get(url);
    return response.data;
  }

  /**
   * Get mock data for development
   */
  private async getMockData<T>(endpoint: string): Promise<ApiResponse<T>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const mockData = this.getMockDataForEndpoint(endpoint);
    return {
      value: mockData,
      '@odata.context': `$metadata#${endpoint}`,
      '@odata.count': mockData.length,
    };
  }

  /**
   * Get mock data for specific endpoints
   */
  private getMockDataForEndpoint(endpoint: string): any[] {
    switch (endpoint) {
      case 'environments':
        return [
          {
            id: 'env-1',
            name: 'ChemicalsSandbox',
            type: 'Sandbox',
            state: 'Active',
            webServiceUrl:
              'https://api.businesscentral.dynamics.com/v2.0/tenant-id/ChemicalsSandbox',
            webClientUrl: 'https://businesscentral.dynamics.com/tenant-id/ChemicalsSandbox',
          },
        ];

      case 'items':
        return [
          {
            id: 'item-1',
            number: 'ITEM001',
            displayName: 'Sample Item 1',
            type: 'Inventory',
            itemCategoryId: 'cat-1',
            itemCategoryCode: 'CAT001',
            blocked: false,
            baseUnitOfMeasureId: 'uom-1',
            baseUnitOfMeasureCode: 'PCS',
            gtin: '1234567890123',
            itemTrackingCode: '',
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
          {
            id: 'item-2',
            number: 'ITEM002',
            displayName: 'Sample Item 2',
            type: 'Service',
            itemCategoryId: 'cat-2',
            itemCategoryCode: 'CAT002',
            blocked: false,
            baseUnitOfMeasureId: 'uom-2',
            baseUnitOfMeasureCode: 'HRS',
            gtin: '1234567890124',
            itemTrackingCode: '',
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
        ];

      case 'itemCategories':
        return [
          {
            id: 'cat-1',
            code: 'CAT001',
            displayName: 'Category 1',
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
          {
            id: 'cat-2',
            code: 'CAT002',
            displayName: 'Category 2',
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
        ];

      case 'locations':
        return [
          {
            id: 'loc-1',
            code: 'MAIN',
            displayName: 'Main Warehouse',
            address: {
              street: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              countryRegionCode: 'US',
              postalCode: '12345',
            },
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
          {
            id: 'loc-2',
            code: 'SECONDARY',
            displayName: 'Secondary Warehouse',
            address: {
              street: '456 Oak Ave',
              city: 'Othertown',
              state: 'NY',
              countryRegionCode: 'US',
              postalCode: '67890',
            },
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
        ];

      case 'vendors':
        return [
          {
            id: 'vendor-1',
            number: 'VENDOR001',
            displayName: 'Sample Vendor 1',
            type: 'Company',
            address: {
              street: '789 Business Blvd',
              city: 'Vendortown',
              state: 'TX',
              countryRegionCode: 'US',
              postalCode: '54321',
            },
            phoneNumber: '+1-555-0123',
            email: 'contact@vendor1.com',
            website: 'https://vendor1.com',
            taxLiable: true,
            taxAreaId: 'tax-1',
            taxAreaDisplayName: 'Texas',
            taxRegistrationNumber: 'TX123456789',
            currencyId: 'usd',
            currencyCode: 'USD',
            paymentTermsId: 'terms-1',
            paymentMethodId: 'method-1',
            blocked: ' ',
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
        ];

      case 'purchaseOrders':
        return [
          {
            id: 'po-1',
            number: 'PO001',
            vendorId: 'vendor-1',
            vendorNumber: 'VENDOR001',
            vendorName: 'Sample Vendor 1',
            orderDate: '2024-01-01',
            requestedReceiptDate: '2024-01-15',
            status: 'Open',
            currencyId: 'usd',
            currencyCode: 'USD',
            amountExcludingTax: 1000.0,
            taxAmount: 100.0,
            amountIncludingTax: 1100.0,
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
        ];

      case 'itemLedgerEntries':
        return [
          {
            id: 'entry-1',
            itemId: 'item-1',
            itemNumber: 'ITEM001',
            postingDate: '2024-01-01',
            entryType: 'Purchase',
            documentType: 'Purchase Receipt',
            documentNumber: 'PR001',
            description: 'Purchase receipt entry',
            locationCode: 'MAIN',
            quantity: 100,
            unitCost: 10.0,
            costAmount: 1000.0,
            lastModifiedDateTime: '2024-01-01T00:00:00Z',
          },
        ];

      default:
        return [];
    }
  }
}

// Export a singleton instance
export const bcClient = new BusinessCentralClient();
