import {useContext} from "react";
import {ConfigSammanhang, DataSammanhang, MessageSammanhang, ThemeSammanhang, UserSammanhang} from "../contexts/AppContext.ts";


/**
 * Custom hook to access the application configuration.
 * @returns The configuration object and loading state.
 */
export const useConfigKrok = () => {
  const context = useContext(ConfigSammanhang);
  if (context === undefined) {
    throw new Error('useConfigSammanhang must be used within a ConfigProvider');
  }
  return context;
};

export const useThemeKrok = () => {
  const context = useContext(ThemeSammanhang);
  if (context === undefined) {
    throw new Error('useThemeSammanhang must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook to use the global message API.
 */
export const useMessageKrok = () => {
  const context = useContext(MessageSammanhang);
  if (!context) {
    throw new Error('useMessageSammanhang must be used within a MessageProvider');
  }
  return context.messageApi;
};

export const useUserKrok = () => {
  const context = useContext(UserSammanhang);
  if (context === undefined) {
    throw new Error('useUserSammanhang must be used within a UserProvider');
  }
  return context;
};

/**
 * Hook to access game server data and statistics.
 */
export const useDataKrok = () => {
  const context = useContext(DataSammanhang);
  if (!context) {
    throw new Error('useDataSammanhang must be used within a DataProvider');
  }
  return context;
};

