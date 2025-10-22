/**
 * Azure AD token provider for Business Central API access
 */

import { ClientSecretCredential } from '@azure/identity';
import { config } from '../config';

export class TokenProvider {
  private credential: ClientSecretCredential;
  private cachedToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.credential = new ClientSecretCredential(
      config.AZURE_AD_TENANT_ID,
      config.AZURE_AD_CLIENT_ID_API,
      config.AZURE_AD_CLIENT_SECRET_API,
    );
  }

  /**
   * Get a valid access token for Business Central API
   */
  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.cachedToken && Date.now() < this.tokenExpiry) {
      return this.cachedToken;
    }

    try {
      // Request a new token
      const tokenResponse = await this.credential.getToken(
        'https://api.businesscentral.dynamics.com/.default',
      );

      if (!tokenResponse) {
        throw new Error('Failed to obtain access token');
      }

      // Cache the token with a 5-minute buffer before expiry
      this.cachedToken = tokenResponse.token;
      this.tokenExpiry = tokenResponse.expiresOnTimestamp - 5 * 60 * 1000;

      return this.cachedToken;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw new Error(
        `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Clear the cached token (useful for testing or when token is invalid)
   */
  clearCache(): void {
    this.cachedToken = null;
    this.tokenExpiry = 0;
  }
}

// Export a singleton instance
export const tokenProvider = new TokenProvider();
