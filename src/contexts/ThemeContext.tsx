import React, { createContext, useContext, useState, ReactNode } from 'react';
import { theme, ConfigProvider } from 'antd';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = ['#01e973', '#8d42ff'];

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#01e973",
            colorPrimaryBorder: "#8d42ff"
          },
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeVy = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeVy must be used within a ThemeProvider');
  }
  return context;
};
