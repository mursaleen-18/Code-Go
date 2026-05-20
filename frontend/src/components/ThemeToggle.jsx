import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "codego-theme";
const LIGHT_THEME = "codego";
const DARK_THEME = "codego-dark";

function getInitialTheme() {
  if (typeof window === "undefined") return LIGHT_THEME;

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_THEME : LIGHT_THEME;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === DARK_THEME;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="btn btn-ghost btn-square theme-toggle"
      onClick={() => setTheme(isDark ? LIGHT_THEME : DARK_THEME)}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
}

export default ThemeToggle;
