import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streaming-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("streaming-theme", theme);
    set({ theme });
  },
}));
