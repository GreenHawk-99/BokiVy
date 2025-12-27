import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { GameServer } from '../models/gameServer';
import { ServerService } from '../services/ServerService';

interface DataContextType {
  servers: GameServer[];
  stats: {
    total: number;
    online: number;
    offline: number;
    totalPlayers: number;
    maxPlayers: number;
  };
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * Provider component for managing game server data.
 */
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [servers, setServers] = useState<GameServer[]>([]);

  const refreshData = () => {
    const data = ServerService.getServers();
    setServers([...data]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const stats = useMemo(() => {
    return ServerService.calculateStats(servers);
  }, [servers]);

  return (
    <DataContext.Provider value={{ servers, stats, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};

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
