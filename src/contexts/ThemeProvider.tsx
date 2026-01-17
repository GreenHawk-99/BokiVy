import React, {ReactNode, useState} from 'react';
import {ConfigProvider, theme} from 'antd';
import {ThemeContext} from "./AppContext.ts";


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = ['#01e973', '#8d42ff'];

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleDarkMode, colors}}>
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

