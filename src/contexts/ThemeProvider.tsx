import React, {ReactNode, useState} from 'react';
import {ConfigProvider, theme} from 'antd';
import {ThemeSammanhang} from "./AppContext.ts";


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors = ['#01e973', '#8d42ff'];

  return (
    <ThemeSammanhang.Provider value={{isDarkMode, toggleDarkMode, colors}}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#01e973",
            colorPrimaryBorder: "#8d42ff",
            fontFamily: "'AlibabaSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
          },
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeSammanhang.Provider>
  );
};

