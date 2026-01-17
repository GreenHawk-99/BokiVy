import {useContext} from "react";
import {ConfigContext, DataContext, MessageContext, ThemeContext, UserContext} from "../contexts/AppContext.ts";


/**
 * Custom hook to access the application configuration.
 * @returns The configuration object and loading state.
 */
export const useConfigVy = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfigVy must be used within a ConfigProvider');
  }
  return context;
};

export const useThemeVy = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeVy must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook to use the global message API.
 */
export const useMessageVy = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageVy must be used within a MessageProvider');
  }
  return context.messageApi;
};

export const useUserVy = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserVy must be used within a UserProvider');
  }
  return context;
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

