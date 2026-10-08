"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dictionaries, type Dict } from "@/content/i18n";
import type { L, Lang } from "@/content/types";
import { prefsStore, type Theme } from "./prefs";

export type { Theme };

interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: Dict;
  /** Picks the current language from a bilingual string. */
  tl: (l: L) => string;
  /** Tool selected in the Skills section; highlights the projects using it. */
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  /** Project ids whose "technical details" panel is expanded. */
  openProjects: Record<string, boolean>;
  setProjectOpen: (id: string, open: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const prefs = useSyncExternalStore(
    prefsStore.subscribe,
    prefsStore.getSnapshot,
    prefsStore.getServerSnapshot,
  );
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});

  const setProjectOpen = useCallback((id: string, open: boolean) => {
    setOpenProjects((prev) => (prev[id] === open ? prev : { ...prev, [id]: open }));
  }, []);

  const value = useMemo<AppState>(() => {
    const { lang, theme } = prefs;
    return {
      lang,
      setLang: prefsStore.setLang,
      theme,
      setTheme: prefsStore.setTheme,
      t: dictionaries[lang],
      tl: (l: L) => l[lang],
      activeTool,
      setActiveTool,
      openProjects,
      setProjectOpen,
    };
  }, [prefs, activeTool, openProjects, setProjectOpen]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
