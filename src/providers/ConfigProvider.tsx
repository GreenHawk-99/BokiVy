import {ReactNode, useEffect, useState} from 'react';
import axios from 'axios';
import {Config} from '../models/config.ts';
import {apiRegistry} from "../services/api.ts";
import {ConfigSammanhang} from "../contexts/AppContext.ts";

/**
 * Provider component for managing application configuration.
 * Fetches the configuration from public/config.json dynamically.
 */
export const ConfigProvider = ({children}: { children: ReactNode }) => {
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

      // Register all APIs defined in the configuration
      if (response.data.apis) {
        Object.entries(response.data.apis).forEach(([name, apiConfig]) => {
          apiRegistry.register(name, apiConfig);
        });
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
    <ConfigSammanhang.Provider value={{config, loading}}>
      {children}
    </ConfigSammanhang.Provider>
  );
};
