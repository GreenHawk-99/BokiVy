import {createContext} from "react";
import {Config} from "../models/config.ts";

export interface ConfigContextType {
  config: Config | null;
  loading: boolean;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);
