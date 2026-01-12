import {useContext} from 'react';
import {ConfigContext} from '../contexts/ConfigContext';

/**
 * Custom hook to access the application configuration.
 * @returns The configuration object and loading state.
 */
export const useConfigVy = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfigVy must be used within a ConfigProvider');
  }
  return context;
};
