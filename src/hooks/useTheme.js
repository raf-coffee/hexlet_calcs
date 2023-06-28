import { useLayoutEffect, useState } from "react";

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  const preferLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (!theme) {
    return preferLight ? "light" : "dark";
  }
  if (theme === "green") {
    return preferLight ? "light" : "dark";
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
