import { ThemeContextType } from "@/shared/models/model-theme";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
});
