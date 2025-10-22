/**
 * Business Central API Data Transfer Objects
 */

export interface Environment {
  id: string;
  name: string;
  type: string;
  state: string;
  webServiceUrl: string;
  webClientUrl: string;
}

export interface Item {
  id: string;
  number: string;
  displayName: string;
  type: 'Inventory' | 'Service' | 'Non-Inventory';
  itemCategoryId: string;
  itemCategoryCode: string;
  blocked: boolean;
  baseUnitOfMeasureId: string;
  baseUnitOfMeasureCode: string;
  gtin: string;
  itemTrackingCode: string;
  lastModifiedDateTime: string;
}

export interface ItemCategory {
  id: string;
  code: string;
  displayName: string;
  lastModifiedDateTime: string;
}

export interface ItemVariant {
  id: string;
  itemId: string;
  itemNumber: string;
  code: string;
  description: string;
  lastModifiedDateTime: string;
}

export interface ItemLedgerEntry {
  id: string;
  itemId: string;
  itemNumber: string;
  postingDate: string;
  entryType:
    | 'Purchase'
    | 'Sale'
    | 'Positive_Adjmt'
    | 'Negative_Adjmt'
    | 'Transfer'
    | 'Consumption'
    | 'Output'
    | 'Assembly_Consumption'
    | 'Assembly_Output';
  documentType: string;
  documentNumber: string;
  description: string;
  locationCode: string;
  quantity: number;
  unitCost: number;
  costAmount: number;
  lastModifiedDateTime: string;
}

export interface Location {
  id: string;
  code: string;
  displayName: string;
  address: {
    street: string;
    city: string;
    state: string;
    countryRegionCode: string;
    postalCode: string;
  };
  lastModifiedDateTime: string;
}

export interface Vendor {
  id: string;
  number: string;
  displayName: string;
  type: 'Company' | 'Person';
  address: {
    street: string;
    city: string;
    state: string;
    countryRegionCode: string;
    postalCode: string;
  };
  phoneNumber: string;
  email: string;
  website: string;
  taxLiable: boolean;
  taxAreaId: string;
  taxAreaDisplayName: string;
  taxRegistrationNumber: string;
  currencyId: string;
  currencyCode: string;
  paymentTermsId: string;
  paymentMethodId: string;
  blocked: ' ' | 'Payment' | 'Ship' | 'All';
  lastModifiedDateTime: string;
}

export interface PurchaseOrder {
  id: string;
  number: string;
  vendorId: string;
  vendorNumber: string;
  vendorName: string;
  orderDate: string;
  requestedReceiptDate: string;
  status: 'Draft' | 'In_Review' | 'Open' | 'Released' | 'Pending_Approval' | 'Pending_Prepayment';
  currencyId: string;
  currencyCode: string;
  amountExcludingTax: number;
  taxAmount: number;
  amountIncludingTax: number;
  lastModifiedDateTime: string;
}

export interface PurchaseOrderLine {
  id: string;
  documentId: string;
  documentNumber: string;
  sequence: number;
  itemId: string;
  itemNumber: string;
  description: string;
  unitOfMeasureId: string;
  unitOfMeasureCode: string;
  quantity: number;
  directUnitCost: number;
  unitCost: number;
  lineAmount: number;
  lineDiscountAmount: number;
  lineDiscountPercent: number;
  lastModifiedDateTime: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  value: T[];
  '@odata.context': string;
  '@odata.count'?: number;
  '@odata.nextLink'?: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
    traceId?: string;
  };
}

// Query parameters for OData
export interface ODataQuery {
  $filter?: string;
  $select?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $skiptoken?: string;
  $count?: boolean;
}
