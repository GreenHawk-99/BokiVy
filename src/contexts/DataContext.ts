import {GameServer} from "../models/gameServer.ts";
import {createContext} from "react";

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

export const DataContext = createContext<DataContextType | undefined>(undefined);
