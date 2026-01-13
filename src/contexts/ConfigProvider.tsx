import React, {ReactNode, useEffect, useState} from 'react';
import axios from 'axios';
import {Config} from '../models/config';
import {ConfigContext} from './ConfigContext';
import {setBaseUrl} from "../services/api.ts";
import {ApiClientFactory} from "../services/ApiClientFactory";

/**
 * Provider component for managing application configuration.
 * Fetches the configuration from public/config.json dynamically.
 */
export const ConfigProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadConfig = async () => {
    try {
      const response = await axios.get<Config>('/config.json', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
      setConfig(response.data);

      // Update the base URL for the global API client
      if (response.data.apis?.yggdrasil) {
        setBaseUrl(response.data.apis.yggdrasil.baseUrl);
        
        // Example of using the factory to create a specific client if needed
        // const yggdrasilClient = ApiClientFactory.createApiClient(response.data.apis.yggdrasil);
        // ... store or use the client
      }
    } catch (error) {
      console.error('Error while parsing configuration JSON:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadConfig();
  }, []);

  if (loading) {
    // You can return a loading spinner here if desired
    return null;
  }

  return (
    <ConfigContext.Provider value={{config, loading}}>
      {children}
    </ConfigContext.Provider>
  );
};
