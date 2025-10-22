# Add Missing GitHub Secrets

## 🔧 The Issue

The app is still using `demo-tenant-id` because some GitHub secrets are missing. You need to add these additional secrets:

## 📋 Add These Secrets to GitHub

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

### Required Secrets:

1. **Name**: `BC_TENANT_ID`
   - **Value**: Your Business Central tenant ID (or use `demo-tenant` for now)

2. **Name**: `BC_ENVIRONMENT`
   - **Value**: `Production` (or `demo-environment` for now)

3. **Name**: `BC_COMPANY_ID`
   - **Value**: Your Business Central company ID (or use `demo-company` for now)

4. **Name**: `BC_BASE_URL`
   - **Value**: `https://api.businesscentral.dynamics.com/v2.0`

5. **Name**: `VITE_APP_NAME`
   - **Value**: `CRONUS WHSE_BC and REACT`

6. **Name**: `VITE_API_BASE_URL`
   - **Value**: `http://localhost:4000`

7. **Name**: `VITE_USE_MOCKS`
   - **Value**: `true` (for now, until you have real BC data)

## 🎯 Quick Fix for Testing

For immediate testing, you can add these minimal secrets:

```
BC_TENANT_ID: demo-tenant
BC_ENVIRONMENT: demo-environment
BC_COMPANY_ID: demo-company
BC_BASE_URL: https://api.businesscentral.dynamics.com/v2.0
VITE_APP_NAME: CRONUS WHSE_BC and REACT
VITE_API_BASE_URL: http://localhost:4000
VITE_USE_MOCKS: true
```

## ✅ After Adding Secrets

1. Make a small change to trigger deployment
2. Wait for GitHub Actions to complete
3. Test your app - it should now use the real Azure AD tenant ID
