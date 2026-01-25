import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {ApiConfig} from '../models/config';

export class ApiClientFactory {
  /**
   * Creates an Axios instance based on the provided configuration.
   * @param apiConfig The configuration for the API client.
   * @returns A configured Axios instance.
   */
  static createApiClient(apiConfig: ApiConfig): AxiosInstance {
    const client = axios.create({
      baseURL: apiConfig.baseUrl,
      timeout: apiConfig.timeout || 10000,
      headers: apiConfig.headers || {},
      // withCredentials: true
      withCredentials: false
    });

    // Add retry logic if configured
    if (apiConfig.retryAttempts) {
      client.interceptors.response.use(
        (response) => response,
        async (error) => {
          const config = error.config as InternalAxiosRequestConfig & { retryCount?: number };

          if (!config || (config.retryCount ?? 0) >= (apiConfig.retryAttempts || 0)) {
            return Promise.reject(error);
          }

          config.retryCount = (config.retryCount ?? 0) + 1;

          // Exponential backoff or simple delay could be added here
          return client(config);
        }
      );
    }

    return client;
  }
}
