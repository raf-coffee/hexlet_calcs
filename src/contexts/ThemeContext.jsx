import { createContext, useMemo } from "react";
import { useTheme } from "../hooks/useTheme.js";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useTheme();

  const memoizedContext = useMemo(() => [theme, setTheme], [theme, setTheme]);

  return <ThemeContext.Provider value={memoizedContext}>{children}</ThemeContext.Provider>;
}
