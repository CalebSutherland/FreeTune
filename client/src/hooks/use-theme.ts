import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
    document.documentElement.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
}
