import {ReactNode, useEffect, useMemo, useState} from 'react';
import {CreateGameServer, GameServer, PlayerHistory, BackendApp} from '../models/gameServer.ts';
import {ServerService} from '../services/ServerService.ts';
import {DataSammanhang} from "../contexts/AppContext.ts";


/**
 * Provider component for managing game server data.
 */
export const DataProvider = ({children}: { children: ReactNode }) => {
  const [servers, setServers] = useState<GameServer[]>([]);
  const [playerHistory, setPlayerHistory] = useState<PlayerHistory[]>([]);
  const [backendApps, setBackendApps] = useState<BackendApp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [serverData, historyData, backendData] = await Promise.all([
        ServerService.getServers(),
        ServerService.getPlayerHistory(),
        ServerService.getBackendApps()
      ]);
      setServers([...serverData]);
      setPlayerHistory([...historyData]);
      setBackendApps([...backendData]);
    } catch (error) {
      console.error("Failed to fetch data", error);
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
    <DataSammanhang.Provider value={{servers, loading, playerHistory, backendApps, stats, refreshData, createServer}}>
      {children}
    </DataSammanhang.Provider>
  );
};
