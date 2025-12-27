import {createContext} from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: string[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);