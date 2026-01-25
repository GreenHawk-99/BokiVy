import {ReactNode, useEffect, useMemo, useState} from 'react';
import {CreateGameServer, GameServer} from '../models/gameServer';
import {ServerService} from '../services/ServerService';
import {DataSammanhang} from "./AppContext.ts";


/**
 * Provider component for managing game server data.
 */
export const DataProvider = ({children}: { children: ReactNode }) => {
  const [servers, setServers] = useState<GameServer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await ServerService.getServers();
      setServers([...data]);
    } catch (error) {
      console.error("Failed to fetch servers", error);
    } finally {
      setLoading(false);
    }
  };

  const createServer = async (server: CreateGameServer) => {
    setLoading(true);
    try {
      await ServerService.createServer(server);
      await refreshData();
    } catch (error) {
      console.error("Failed to add server", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshData();
  }, []);

  const stats = useMemo(() => {
    return ServerService.calculateStats(servers);
  }, [servers]);

  return (
    <DataSammanhang.Provider value={{servers, loading, stats, refreshData, createServer}}>
      {children}
    </DataSammanhang.Provider>
  );
};
