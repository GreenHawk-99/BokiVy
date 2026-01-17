import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {GameServer} from '../models/gameServer';
import {ServerService} from '../services/ServerService';
import {DataContext} from "./AppContext.ts";


/**
 * Provider component for managing game server data.
 */
export const DataProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [servers, setServers] = useState<GameServer[]>([]);

  const refreshData = async () => {
    try {
      const data = await ServerService.getServers();
      setServers([...data]);
    } catch (error) {
      console.error("Failed to fetch servers, falling back to mock data", error);
      const data = ServerService.getMockServers();
      setServers([...data]);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const stats = useMemo(() => {
    return ServerService.calculateStats(servers);
  }, [servers]);

  return (
    <DataContext.Provider value={{servers, stats, refreshData}}>
      {children}
    </DataContext.Provider>
  );
};
