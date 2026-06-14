import { create } from "zustand";

export type CursorVariant = "default" | "hover" | "view" | "drag" | "text";

interface AppState {
  /* Preloader */
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;

  /* Navigation menu (mobile) */
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  /* Custom cursor */
  cursorVariant: CursorVariant;
  cursorLabel: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;

  /* Capability flags (resolved on the client) */
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  setLoaded: (v) => set({ isLoaded: v }),

  isMenuOpen: false,
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  cursorVariant: "default",
  cursorLabel: "",
  setCursor: (cursorVariant, cursorLabel = "") =>
    set({ cursorVariant, cursorLabel }),
  resetCursor: () => set({ cursorVariant: "default", cursorLabel: "" }),

  reducedMotion: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),
}));
