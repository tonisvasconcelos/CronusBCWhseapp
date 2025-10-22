/**
 * GitHub Pages configuration
 */

// GitHub repository configuration
export const GITHUB_CONFIG = {
  username: 'tonisvasconcelos',
  repository: 'CronusBCWhseapp',
  // The base URL for your GitHub Pages site
  baseUrl: 'https://tonisvasconcelos.github.io/CronusBCWhseapp',
} as const;

// Helper function to get the correct API base URL based on environment
export function getApiBaseUrl(): string {
  // In production (GitHub Pages), you'll need to update this to your actual API URL
  if (process.env.NODE_ENV === 'production') {
    // Update this to your production API URL
    return 'https://your-api-domain.com';
  }
  
  // Development URL
  return 'http://localhost:4000';
}

// Helper function to get the correct redirect URI for MSAL
export function getRedirectUri(): string {
  if (process.env.NODE_ENV === 'production') {
    return GITHUB_CONFIG.baseUrl;
  }
  
  return window.location.origin;
}
