import type { Lang } from "@/content/types";

export type Theme = "dark" | "light";

export interface Prefs {
  lang: Lang;
  theme: Theme;
}

const LANG_KEY = "rk-lang";
const THEME_KEY = "rk-theme";

/** What the server renders: French, dark. The boot script in <head> corrects the DOM before paint. */
const SERVER_PREFS: Prefs = { lang: "fr", theme: "dark" };

const listeners = new Set<() => void>();
let cached: Prefs | null = null;

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* preference simply does not persist */
  }
}

function read(): Prefs {
  const theme: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const stored = readStorage(LANG_KEY);
  const lang: Lang = stored === "en" ? "en" : "fr";
  if (!cached || cached.lang !== lang || cached.theme !== theme) cached = { lang, theme };
  return cached;
}

function emit() {
  for (const l of listeners) l();
}

/**
 * Tiny external store for display preferences, consumed through
 * useSyncExternalStore. The DOM (`data-theme`, `lang`) is the source of truth
 * so that the pre-hydration boot script and React never disagree.
 */
export const prefsStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
  getSnapshot: read,
  getServerSnapshot: () => SERVER_PREFS,
  setLang(lang: Lang) {
    document.documentElement.lang = lang;
    writeStorage(LANG_KEY, lang);
    emit();
  },
  setTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    writeStorage(THEME_KEY, theme);
    emit();
  },
};
