const supportedThemes = {
  light: "light",
  dark: "dark",
};

export type themes = keyof typeof supportedThemes;

export type ThemeContextType = {
  theme: themes;
  toggleTheme: () => void;
};