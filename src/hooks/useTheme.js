import { useLayoutEffect, useState } from "react";

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme || theme === "green") {
    return "light";
  }
  return theme;
};

export const useTheme = () => {
  const [theme, setTheme] = useState(() => getTheme());

  useLayoutEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
};
