# CRONUS WHSE - Business Central React Integration

A production-ready React + Node.js application that connects to Microsoft Dynamics 365 Business Central via OAuth and OData v4. Built with TypeScript, featuring a modern dashboard, authentication, and comprehensive data management.

## 🏗️ Architecture

This is a monorepo built with pnpm workspaces containing:

- **`apps/web`**: React 18 + Vite + TypeScript + Tailwind CSS frontend
- **`apps/api`**: Node.js Express API gateway with Business Central integration
- **`packages/shared`**: Shared types, utilities, and configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher
- Microsoft Azure AD tenant
- Business Central environment with API access

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cronusapp-bcwhse-react
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy environment templates
   cp env.example .env
   cp apps/api/env.example apps/api/.env
   cp apps/web/env.example apps/web/.env
   ```

4. **Configure your environment variables** (see [Configuration](#configuration) section)

5. **Build the project**

   ```bash
   pnpm -r build
   ```

6. **Start development servers**

   ```bash
   # Start API server (port 4000)
   pnpm --filter ./apps/api dev

   # Start web app (port 5173)
   pnpm --filter ./apps/web dev
   ```

## ⚙️ Configuration

### Azure AD App Registrations

You need to create two Azure AD app registrations:

#### 1. SPA Application (Frontend)

1. Go to Azure Portal > Azure Active Directory > App registrations
2. Click "New registration"
3. Name: "CRONUS WHSE SPA"
4. Supported account types: "Accounts in this organizational directory only"
5. Redirect URI: `http://localhost:5173` (for development)
6. Click "Register"

**API Permissions:**

- Microsoft Graph > User.Read (Delegated)

**Authentication:**

- Platform: Single-page application
- Redirect URIs: `http://localhost:5173`, `https://yourdomain.com`
- Logout URL: `http://localhost:5173`, `https://yourdomain.com`

#### 2. API Application (Backend)

1. Create another app registration
2. Name: "CRONUS WHSE API"
3. Supported account types: "Accounts in this organizational directory only"
4. No redirect URI needed
5. Click "Register"

**API Permissions:**

- Business Central API > API.Read (Application)

**Certificates & secrets:**

- Create a new client secret
- Copy the secret value (you'll need this for `AZURE_AD_CLIENT_SECRET_API`)

### Business Central Setup

1. **Enable API Access**
   - Go to Business Central > Administration > API Setup
   - Enable the required APIs:
     - Items API
     - Locations API
     - Vendors API
     - Purchase Orders API

2. **Get Environment Information**
   - Tenant ID: Found in Azure Portal > Business Central
   - Environment: Your BC environment name (e.g., "ChemicalsSandbox")
   - Company ID: Found in BC > Company Information

### Environment Variables

#### Root `.env`

```env
# Business Central base config
BC_TENANT_ID=your-bc-tenant-id
BC_ENVIRONMENT=ChemicalsSandbox
BC_COMPANY_ID=your-company-id
BC_BASE_URL=https://api.businesscentral.dynamics.com/v2.0

# Azure AD / Entra
AZURE_AD_TENANT_ID=your-azure-tenant-id
AZURE_AD_CLIENT_ID_SPA=your-spa-client-id
AZURE_AD_CLIENT_ID_API=your-api-client-id
AZURE_AD_CLIENT_SECRET_API=your-api-client-secret
AZURE_AD_AUTHORITY=https://login.microsoftonline.com/your-azure-tenant-id

# Frontend
VITE_APP_NAME=CRONUS WHSE_BC and REACT
VITE_API_BASE_URL=http://localhost:4000

# Development
USE_MOCKS=true
NODE_ENV=development
```

#### API `.env` (`apps/api/.env`)

```env
# Business Central base config
BC_TENANT_ID=your-bc-tenant-id
BC_ENVIRONMENT=ChemicalsSandbox
BC_COMPANY_ID=your-company-id
BC_BASE_URL=https://api.businesscentral.dynamics.com/v2.0

# Azure AD / Entra
AZURE_AD_TENANT_ID=your-azure-tenant-id
AZURE_AD_CLIENT_ID_API=your-api-client-id
AZURE_AD_CLIENT_SECRET_API=your-api-client-secret

# Development
USE_MOCKS=true
NODE_ENV=development
PORT=4000
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
```

#### Web `.env` (`apps/web/.env`)

```env
# Business Central base config
VITE_BC_TENANT_ID=your-bc-tenant-id
VITE_BC_ENVIRONMENT=ChemicalsSandbox
VITE_BC_COMPANY_ID=your-company-id
VITE_BC_BASE_URL=https://api.businesscentral.dynamics.com/v2.0

# Azure AD / Entra
VITE_AZURE_AD_TENANT_ID=your-azure-tenant-id
VITE_AZURE_AD_CLIENT_ID_SPA=your-spa-client-id
VITE_AZURE_AD_CLIENT_ID_API=your-api-client-id
VITE_AZURE_AD_CLIENT_SECRET_API=your-api-client-secret

# Frontend
VITE_APP_NAME=CRONUS WHSE_BC and REACT
VITE_API_BASE_URL=http://localhost:4000

# Development
VITE_USE_MOCKS=true
```

## 🛠️ Development

### Available Scripts

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm -r build

# Start all development servers
pnpm -r dev

# Start specific app
pnpm --filter ./apps/api dev      # API server
pnpm --filter ./apps/web dev      # Web app

# Lint all packages
pnpm -r lint

# Type check all packages
pnpm -r typecheck

# Run tests
pnpm -r test

# Format code
pnpm format
```

### Project Structure

```
.
├── apps/
│   ├── web/                 # React frontend
│   │   ├── src/
│   │   │   ├── auth/        # MSAL authentication
│   │   │   ├── api/         # API client and queries
│   │   │   ├── components/  # React components
│   │   │   ├── pages/       # Page components
│   │   │   └── routes/      # Routing configuration
│   │   └── package.json
│   └── api/                 # Express backend
│       ├── src/
│       │   ├── auth/        # Token provider
│       │   ├── bc/          # Business Central client
│       │   ├── middleware/  # Express middleware
│       │   └── routes/      # API routes
│       └── package.json
├── packages/
│   └── shared/              # Shared utilities
│       ├── src/
│       │   ├── types/       # TypeScript types
│       │   ├── utils/       # Utility functions
│       │   └── config.ts    # Configuration loader
│       └── package.json
├── .github/workflows/       # CI/CD workflows
└── package.json            # Root package.json
```

## 🔧 Features

### Frontend (React)

- **Authentication**: Microsoft Entra ID integration with MSAL
- **Dashboard**: KPI cards and data tables
- **Data Management**: Items, Locations, Vendors, Purchase Orders
- **Responsive Design**: Mobile-first with Tailwind CSS
- **State Management**: React Query for server state
- **Type Safety**: Full TypeScript coverage

### Backend (Express)

- **OAuth 2.0**: Client credentials flow for BC API access
- **API Gateway**: Proxy requests to Business Central
- **Error Handling**: Comprehensive error handling and logging
- **CORS**: Configured for development and production
- **Mock Data**: Development mode with mock data

### Shared Package

- **Type Definitions**: Business Central entity types
- **OData Builder**: Type-safe query building
- **Configuration**: Environment validation with Zod
- **Utilities**: Common helper functions

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Jest for API, Vitest for web
- **Integration Tests**: API endpoint testing
- **Component Tests**: React Testing Library
- **Mock Data**: Development mode with realistic mock data

```bash
# Run all tests
pnpm -r test

# Run tests with coverage
pnpm -r test -- --coverage

# Run tests in watch mode
pnpm --filter ./apps/web test -- --watch
```

## 🚀 Deployment

### GitHub Pages (Frontend)

The React frontend is configured for automatic deployment to GitHub Pages:

1. **Update repository configuration** in `apps/web/src/config/github-pages.ts`
2. **Set up GitHub Secrets** with your environment variables
3. **Update Azure AD redirect URIs** to include your GitHub Pages URL
4. **Push to main branch** - deployment happens automatically!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### API Backend Deployment

For the API backend, deploy to your preferred platform:

```bash
# Build for production
pnpm -r build

# Start production servers
pnpm --filter ./apps/api start
```

**Recommended platforms:**

- Azure App Service
- Heroku
- Railway
- DigitalOcean App Platform

### Environment Variables for Production

Update the following for production:

- Set `USE_MOCKS=false`
- Update `VITE_API_BASE_URL` to your production API URL
- Configure proper CORS origins
- Set up proper Azure AD redirect URIs

### Docker Support

The project can be containerized:

```dockerfile
# Example Dockerfile for API
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm -r build
EXPOSE 4000
CMD ["pnpm", "--filter", "./apps/api", "start"]
```

## 🔒 Security

- **Authentication**: Microsoft Entra ID with PKCE
- **Authorization**: Role-based access control ready
- **HTTPS**: Required for production
- **CORS**: Properly configured
- **Environment Variables**: Sensitive data in environment variables
- **Input Validation**: Zod schema validation

## 📊 API Endpoints

### Business Central Integration

- `GET /api/environments` - List available environments
- `GET /api/items` - Items with filtering and pagination
- `GET /api/items/categories` - Item categories
- `GET /api/items/variants` - Item variants
- `GET /api/items/ledger-entries` - Item ledger entries
- `GET /api/locations` - Warehouse locations
- `GET /api/vendors` - Vendor information
- `GET /api/purchase-orders` - Purchase orders
- `GET /api/purchase-orders/lines` - Purchase order lines

### Health Check

- `GET /health` - API health status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Write tests for new features
- Update documentation as needed
- Follow conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include environment details and error messages

## 🔄 Changelog

### v1.0.0

- Initial release
- Business Central integration
- React dashboard
- Authentication with Microsoft Entra ID
- Comprehensive testing setup
- CI/CD pipeline

---

**Built with ❤️ for Business Central integration**
#   T e s t   d e p l o y m e n t   w i t h   A z u r e   A D   c o n f i g u r a t i o n 
 
 
