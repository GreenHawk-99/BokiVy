import React, {ReactNode, useMemo, useState} from 'react';
import {ConfigProvider, ThemeConfig} from 'antd';
import {ThemeSammanhang} from "./AppContext.ts";
import {darkTheme, lightTheme} from "../config/theme.ts";


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  const antdTheme: ThemeConfig = useMemo(() => {
    return isDarkMode ? darkTheme : lightTheme;
  }, [isDarkMode]);

  const gradientColors: string[] = useMemo(() => {
    // Keep your existing "gradient colors" concept but source it from the theme.
    // Falls back to your original values if tokens are missing.
    const primary: string = antdTheme.token?.colorPrimary ?? "#01e973";
    const secondary: string =
      // you can pick any token you like here; "colorSuccess" is a decent "accent #2"
      antdTheme.token?.colorSuccess ?? "#8d42ff";

    return [primary, secondary];
  }, [antdTheme]);

  return (
    <ThemeSammanhang.Provider value={{isDarkMode, toggleDarkMode, colors: gradientColors}}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </ThemeSammanhang.Provider>
  );
};

