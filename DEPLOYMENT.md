# GitHub Pages Deployment Guide

This guide will help you deploy the React frontend to GitHub Pages.

## 🚀 Quick Setup

### 1. Update Repository Configuration

First, update the GitHub Pages configuration file with your repository details:

**File: `apps/web/src/config/github-pages.ts`**

```typescript
export const GITHUB_CONFIG = {
  username: 'tonisvasconcelos',
  repository: 'CronusBCWhseapp',
  // This will be your GitHub Pages URL
  baseUrl: 'https://tonisvasconcelos.github.io/CronusBCWhseapp',
} as const;
```

### 2. Update Package.json Homepage

**File: `apps/web/package.json`**

```json
{
  "homepage": "https://tonisvasconcelos.github.io/CronusBCWhseapp"
}
```

### 3. Configure GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment workflow will automatically deploy when you push to the `main` branch

### 4. Set Up Environment Variables

For production deployment, you'll need to set up GitHub Secrets:

1. Go to your repository **Settings** > **Secrets and variables** > **Actions**
2. Add the following repository secrets:

```
VITE_BC_TENANT_ID=your-bc-tenant-id
VITE_BC_ENVIRONMENT=ChemicalsSandbox
VITE_BC_COMPANY_ID=your-company-id
VITE_BC_BASE_URL=https://api.businesscentral.dynamics.com/v2.0
VITE_AZURE_AD_TENANT_ID=your-azure-tenant-id
VITE_AZURE_AD_CLIENT_ID_SPA=your-spa-client-id
VITE_AZURE_AD_CLIENT_ID_API=your-api-client-id
VITE_AZURE_AD_CLIENT_SECRET_API=your-api-client-secret
VITE_APP_NAME=CRONUS WHSE_BC and REACT
VITE_API_BASE_URL=https://your-api-domain.com
VITE_USE_MOCKS=false
```

### 5. Update Azure AD App Registration

Update your Azure AD SPA app registration with the GitHub Pages URL:

1. Go to Azure Portal > Azure Active Directory > App registrations
2. Select your SPA application
3. Go to **Authentication**
4. Add redirect URI: `https://tonisvasconcelos.github.io/CronusBCWhseapp`
5. Add logout URL: `https://tonisvasconcelos.github.io/CronusBCWhseapp`

### 6. Deploy

The deployment is automatic! Just push to the `main` branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 🔧 Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the project
pnpm install
pnpm --filter @cronusapp/shared build
pnpm --filter @cronusapp/web build

# Deploy to GitHub Pages
cd apps/web
pnpm deploy
```

## 🌐 Production Configuration

### API Backend

For production, you'll need to host your API backend separately. Options include:

1. **Azure App Service**
2. **Heroku**
3. **Railway**
4. **Vercel** (for serverless)
5. **DigitalOcean App Platform**

Update the `VITE_API_BASE_URL` environment variable with your production API URL.

### CORS Configuration

Make sure your API backend allows requests from your GitHub Pages domain:

```javascript
// In your API CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Development
    'https://tonisvasconcelos.github.io' // Production
  ],
  credentials: true
};
```

## 🔍 Troubleshooting

### Common Issues

1. **404 on refresh**: This is normal for SPAs. GitHub Pages serves `index.html` for all routes.

2. **API calls failing**: Check that your production API URL is correct and CORS is configured.

3. **Authentication not working**: Verify that your Azure AD redirect URIs include the GitHub Pages URL.

4. **Build failing**: Check that all environment variables are set in GitHub Secrets.

### Debugging

1. Check the GitHub Actions workflow logs
2. Verify environment variables are set correctly
3. Test the API endpoints independently
4. Check browser console for errors

## 📝 Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `apps/web/public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `GITHUB_CONFIG.baseUrl` in the configuration file

## 🔄 Continuous Deployment

The GitHub Actions workflow automatically:
- Builds the shared package
- Builds the web application
- Deploys to GitHub Pages
- Runs on every push to `main` branch

You can also trigger manual deployments from the GitHub Actions tab.

---

Your React app will be available at: `https://tonisvasconcelos.github.io/CronusBCWhseapp`
