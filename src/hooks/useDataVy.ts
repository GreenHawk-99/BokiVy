import {useContext} from 'react';
import {DataContext} from "../contexts/DataContext.ts";

/**
 * Hook to access game server data and statistics.
 */
export const useDataVy = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataVy must be used within a DataProvider');
  }
  return context;
};
