"use client";

import { useState, useEffect } from "react";

type ThemeType = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = document.cookie.match(/theme=(dark|light)/)?.[1];
    if (savedTheme) setTheme(savedTheme as ThemeType);
    setLoading(false);
  }, []);

  function toggleTheme() {
    setLoading(true);
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTimeout(() => setLoading(false), 1000);
  }

  if (loading) {
    return <button disabled>Loading...</button>;
  }

  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
