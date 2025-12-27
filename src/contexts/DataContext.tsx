import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {GameServer} from '../models/gameServer';
import {ServerService} from '../services/ServerService';
import {DataContext} from "./DataContext.ts";


/**
 * Provider component for managing game server data.
 */
export const DataProvider: React.FC<{ children: ReactNode }> = ({children}) => {
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
    <DataContext.Provider value={{servers, stats, refreshData}}>
      {children}
    </DataContext.Provider>
  );
};
