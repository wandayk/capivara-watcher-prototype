import { createContext, useContext, ReactNode } from "react";
import { Theme } from "../types";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Sempre usa tema light
  const theme: Theme = "light";

  // Funções vazias para manter compatibilidade com API existente
  const toggleTheme = () => {};
  const setTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
}
