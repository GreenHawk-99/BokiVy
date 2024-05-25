import {AxiosInstance} from 'axios';
import {ApiClientFactory} from './ApiClientFactory';
import {ApiConfig} from '../models/config';

/**
 * Registry to manage multiple Axios instances for different domains.
 */
class ApiRegistry {
  private instances: Map<string, AxiosInstance> = new Map();
  private defaultKey: string = 'yggdrasil';

  /**
   * Registers a new API instance.
   * @param name The unique name for the API instance.
   * @param config The configuration for the API instance.
   */
  register(name: string, config: ApiConfig): AxiosInstance {
    const instance = ApiClientFactory.createApiClient(config);
    this.instances.set(name, instance);
    return instance;
  }

  /**
   * Retrieves an API instance by name.
   * @param name The name of the API instance.
   * @returns The AxiosInstance or throws an error if not found.
   */
  get(name: string): AxiosInstance {
    const instance = this.instances.get(name);
    if (!instance) {
      throw new Error(`API instance "${name}" not found. Ensure it is registered in ConfigProvider.`);
    }
    return instance;
  }

  /**
   * Returns the default API instance.
   */
  get default(): AxiosInstance {
    try {
      return this.get(this.defaultKey);
    } catch {
      // Return a temporary client if yggdrasil isn't registered yet
      // This helps during the initial loading phase before ConfigProvider finishes
      return ApiClientFactory.createApiClient({baseUrl: ''});
    }
  }

  /**
   * Checks if an API instance is already registered.
   */
  has(name: string): boolean {
    return this.instances.has(name);
  }
}

export const apiRegistry = new ApiRegistry();

// For backward compatibility during migration
// Proxy to the default instance once it's available
const apiProxy = new Proxy({} as AxiosInstance, {
  get: (_target, prop) => {
    const defaultInstance = apiRegistry.default;
    const value = (defaultInstance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(defaultInstance);
    }
    return value;
  }
});

export default apiProxy;
