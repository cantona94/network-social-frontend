import { ReactNode, createContext, useState } from "react";

const supportedThemes = {
  light: "light",
  dark: "dark",
};

type themes = keyof typeof supportedThemes;

type ThemeContextType = {
  theme: themes;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const storedTheme = localStorage.getItem("theme");
  const currentTheme = storedTheme ? (storedTheme as themes) : "dark";

  const [theme, setTheme] = useState<themes>(currentTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  );
};
