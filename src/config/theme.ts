import {theme, ThemeConfig} from "antd";

// Base layer: shared across light + dark
export const baseTheme: ThemeConfig = {
  token: {
    colorPrimary: "#01e973",
    colorSuccess: "#8d42ff",
    colorError: "#ff4d77",
    colorWarning: "#fa9a14",
    colorInfo: "#01e973",
  },
};

// Light layer: uses baseTheme + light-specific adjustments
export const lightTheme: ThemeConfig = {
  ...baseTheme,
  token: {
    ...baseTheme.token,
    // Light-only tokens go here, e.g.
    // colorBgBase: "#ffffff",
    // colorTextBase: "#0f172a",
  },
  algorithm: theme.defaultAlgorithm,
};

// Dark layer: uses baseTheme + dark-specific adjustments
export const darkTheme: ThemeConfig = {
  ...baseTheme,
  token: {
    ...baseTheme.token,
    // Dark-only tokens go here, e.g.
    // colorBgBase: "#0b1220",
    // colorTextBase: "#e5e7eb",
  },
  algorithm: theme.darkAlgorithm,
};