import {MessageInstance} from "antd/es/message/interface";
import {createContext} from "react";
import {GameServer} from "../models/gameServer.ts";
import {Config} from "../models/config.ts";

// Config Context
export interface ConfigContextType {
  config: Config | null;
  loading: boolean;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Theme Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: string[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Message Context
interface MessageContextType {
  messageApi: MessageInstance;
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined);

// User Context
interface UserContextType {
  username: string | null;
  avatar: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

// Data Context
interface DataContextType {
  servers: GameServer[];
  stats: {
    total: number;
    online: number;
    offline: number;
    totalPlayers: number;
    maxPlayers: number;
  };
  refreshData: () => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);
