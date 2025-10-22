# GitHub Secrets Setup Guide

## 🔐 Setting up GitHub Secrets for Production

To configure your app for production with real Business Central data, you need to add the following secrets to your GitHub repository.

### Step 1: Navigate to GitHub Secrets

1. Go to your repository: https://github.com/tonisvasconcelos/CronusBCWhseapp
2. Click on **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Step 2: Add the Following Secrets

Add each secret with the name and value as shown:

#### Business Central Configuration:

- **Name**: `BC_TENANT_ID`
  - **Value**: Your actual Business Central tenant ID
  - **Example**: `your-bc-tenant-id`

- **Name**: `BC_ENVIRONMENT`
  - **Value**: Your Business Central environment name
  - **Example**: `Production` or `Sandbox`

- **Name**: `BC_COMPANY_ID`
  - **Value**: Your Business Central company ID
  - **Example**: `your-company-id`

- **Name**: `BC_BASE_URL`
  - **Value**: Business Central API base URL
  - **Example**: `https://api.businesscentral.dynamics.com/v2.0`

#### Azure AD Configuration:

- **Name**: `AZURE_AD_TENANT_ID`
  - **Value**: Your Azure AD tenant ID
  - **Example**: `your-azure-tenant-id`

- **Name**: `AZURE_AD_CLIENT_ID_SPA`
  - **Value**: Your SPA (Single Page App) client ID
  - **Example**: `your-spa-client-id`

- **Name**: `AZURE_AD_CLIENT_ID_API`
  - **Value**: Your API client ID
  - **Example**: `your-api-client-id`

- **Name**: `AZURE_AD_CLIENT_SECRET_API`
  - **Value**: Your API client secret
  - **Example**: `your-api-client-secret`

#### Optional Configuration:

- **Name**: `VITE_APP_NAME`
  - **Value**: App display name
  - **Example**: `CRONUS WHSE_BC and REACT`

- **Name**: `VITE_API_BASE_URL`
  - **Value**: API base URL (for local development)
  - **Example**: `http://localhost:4000`

- **Name**: `VITE_USE_MOCKS`
  - **Value**: Set to `false` for production
  - **Example**: `false`

### Step 3: Verify Secrets

After adding all secrets, you should see them listed in your repository secrets page.

### Step 4: Test Deployment

1. Make a small change to your code
2. Commit and push to the main branch
3. The GitHub Actions workflow will automatically use your secrets
4. Your app will be deployed with real configuration

## 🔍 How It Works

The GitHub Actions workflow will:

1. Use your secrets as environment variables during build
2. Fall back to demo values if secrets are not set
3. Build the app with the correct configuration
4. Deploy to GitHub Pages

## 🚨 Security Notes

- **Never commit real secrets to your repository**
- **Use GitHub Secrets for all sensitive data**
- **Rotate secrets regularly**
- **Use least privilege principle**

## 📝 Example Values

For testing purposes, you can use these example values:

```
BC_TENANT_ID: your-bc-tenant-id
BC_ENVIRONMENT: Production
BC_COMPANY_ID: your-company-id
BC_BASE_URL: https://api.businesscentral.dynamics.com/v2.0
AZURE_AD_TENANT_ID: your-azure-tenant-id
AZURE_AD_CLIENT_ID_SPA: your-spa-client-id
AZURE_AD_CLIENT_ID_API: your-api-client-id
AZURE_AD_CLIENT_SECRET_API: your-api-client-secret
VITE_USE_MOCKS: false
```

## 🎯 Next Steps

1. **Set up Azure AD app registration** (see SETUP_GUIDE.md)
2. **Configure Business Central API access**
3. **Add the secrets to GitHub**
4. **Test the deployment**
5. **Verify the app works with real data**

## 📞 Support

If you need help:

1. Check the GitHub Actions logs
2. Verify your secrets are set correctly
3. Ensure your Azure AD configuration is correct
4. Test with mock data first (`VITE_USE_MOCKS: true`)
