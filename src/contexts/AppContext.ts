import {MessageInstance} from "antd/es/message/interface";
import {createContext} from "react";
import {CreateGameServer, GameServer, PlayerHistory, BackendApp} from "../models/gameServer.ts";
import {Config} from "../models/config.ts";

// Config Context
export interface ConfigContextType {
  config: Config | null;
  loading: boolean;
}

export const ConfigSammanhang = createContext<ConfigContextType | undefined>(undefined);

// Theme Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: string[];
}

export const ThemeSammanhang = createContext<ThemeContextType | undefined>(undefined);

// Message Context
interface MessageContextType {
  messageApi: MessageInstance;
}

export const MessageSammanhang = createContext<MessageContextType | undefined>(undefined);

// User Context
interface UserContextType {
  username: string | null;
  avatar: string | null;
  steamId: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const UserSammanhang = createContext<UserContextType | undefined>(undefined);

// Data Context
interface DataContextType {
  servers: GameServer[];
  loading: boolean;
  playerHistory: PlayerHistory[];
  backendApps: BackendApp[];
  stats: {
    total: number;
    online: number;
    offline: number;
    totalPlayers: number;
    maxPlayers: number;
    avgUptime: number;
    totalCPU: number;
    totalMemory: number;
  };
  refreshData: () => Promise<void>;
  createServer: (server: CreateGameServer) => Promise<void>;
}

export const DataSammanhang = createContext<DataContextType | undefined>(undefined);
