# CRONUS WHSE BC React App - Setup Guide

## 🚀 Quick Start (Demo Mode)

The app is already deployed and working in demo mode at:
**https://tonisvasconcelos.github.io/CronusBCWhseapp/**

## 🔧 Production Setup

### 1. Azure AD App Registration

#### Step 1: Create App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Fill in:
   - **Name**: `CRONUS WHSE BC React App`
   - **Supported account types**: `Accounts in this organizational directory only`
   - **Redirect URI**: `https://tonisvasconcelos.github.io/CronusBCWhseapp/`
5. Click **Register**

#### Step 2: Configure Authentication

1. In your app registration, go to **Authentication**
2. Add platform: **Single-page application (SPA)**
3. Add redirect URI: `https://tonisvasconcelos.github.io/CronusBCWhseapp/`
4. Enable **Access tokens** and **ID tokens**
5. Click **Save**

#### Step 3: Create API App Registration

1. Create another app registration for the API
2. Name: `CRONUS WHSE BC API`
3. Go to **Certificates & secrets**
4. Create a new client secret
5. Note down the **Client ID** and **Client Secret**

### 2. Business Central Setup

#### Step 1: Enable API Access

1. In Business Central, go to **Users** → **API Users**
2. Create a new API user
3. Assign appropriate permissions

#### Step 2: Configure OData Services

1. Go to **Web Services**
2. Publish the following services:
   - Items
   - Item Categories
   - Item Variants
   - Item Ledger Entries
   - Locations
   - Vendors
   - Purchase Orders
   - Purchase Order Lines

### 3. Environment Configuration

#### For Local Development:

1. Copy `.env.example` to `.env`
2. Fill in your actual values:

```bash
# Business Central
BC_TENANT_ID=your-actual-bc-tenant-id
BC_ENVIRONMENT=your-bc-environment
BC_COMPANY_ID=your-bc-company-id

# Azure AD
AZURE_AD_TENANT_ID=your-azure-tenant-id
AZURE_AD_CLIENT_ID_SPA=your-spa-client-id
AZURE_AD_CLIENT_ID_API=your-api-client-id
AZURE_AD_CLIENT_SECRET_API=your-api-client-secret

# Development
USE_MOCKS=false
```

#### For Production (GitHub Pages):

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:
   - `BC_TENANT_ID`
   - `BC_ENVIRONMENT`
   - `BC_COMPANY_ID`
   - `AZURE_AD_TENANT_ID`
   - `AZURE_AD_CLIENT_ID_SPA`
   - `AZURE_AD_CLIENT_ID_API`
   - `AZURE_AD_CLIENT_SECRET_API`

### 4. Update GitHub Actions Workflow

The workflow will automatically use the repository secrets for production deployment.

## 🧪 Testing

### Local Development:

```bash
# Install dependencies
pnpm install

# Start API server
pnpm --filter @cronusapp/api dev

# Start web app
pnpm --filter @cronusapp/web dev
```

### Production:

The app will automatically deploy when you push to the main branch.

## 🔍 Troubleshooting

### Common Issues:

1. **Authentication fails**: Check that your Azure AD app registration is configured correctly
2. **API calls fail**: Verify Business Central API permissions
3. **CORS errors**: Ensure redirect URIs are configured correctly

### Debug Mode:

Set `USE_MOCKS=true` in your environment to use mock data for testing.

## 📚 API Endpoints

The app provides the following endpoints:

- `/api/health` - Health check
- `/api/environments` - List BC environments
- `/api/items` - Get items
- `/api/locations` - Get locations
- `/api/vendors` - Get vendors
- `/api/purchase-orders` - Get purchase orders

## 🎯 Next Steps

1. **Set up Azure AD app registration**
2. **Configure Business Central API access**
3. **Update environment variables**
4. **Test the full integration**
5. **Deploy to production**

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify your Azure AD configuration
3. Ensure Business Central API is accessible
4. Check the GitHub Actions logs for deployment issues
