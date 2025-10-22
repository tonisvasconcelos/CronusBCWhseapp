/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BC_TENANT_ID: string;
  readonly VITE_BC_ENVIRONMENT: string;
  readonly VITE_BC_COMPANY_ID: string;
  readonly VITE_BC_BASE_URL: string;
  readonly VITE_AZURE_AD_TENANT_ID: string;
  readonly VITE_AZURE_AD_CLIENT_ID_SPA: string;
  readonly VITE_AZURE_AD_CLIENT_ID_API: string;
  readonly VITE_AZURE_AD_CLIENT_SECRET_API: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_MOCKS: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
