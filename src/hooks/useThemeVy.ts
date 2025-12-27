import {useContext} from 'react';
import {ThemeContext} from "../contexts/ThemeContext.ts";

export const useThemeVy = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeVy must be used within a ThemeProvider');
  }
  return context;
};
