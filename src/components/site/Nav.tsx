"use client";

import { useState } from "react";
import type { Lang } from "@/content/types";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";

const links = ["services", "about", "projects", "skills", "path", "contact"] as const;

export function Nav() {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const [open, setOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="no-print border-rule bg-bg/85 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3">
          <span
            className="bg-accent text-bg grid h-9 w-9 place-items-center rounded-full text-sm font-bold"
            aria-hidden
          >
            RK
          </span>
          <span className="sr-only text-sm font-semibold sm:not-sr-only">Mohamed Reda Karrach</span>
        </a>

        <nav aria-label="Navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l}`}
                  className="text-muted hover:text-fg text-[15px] font-medium transition-colors"
                >
                  {t.nav[l]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.lang.label}
            className="border-rule flex rounded-full border p-0.5"
          >
            {(["fr", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                lang={l}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
                className="text-muted hover:text-fg aria-pressed:bg-fg aria-pressed:text-bg rounded-full px-2.5 py-1 text-xs font-semibold transition-colors"
              >
                {t.lang[l]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`${t.theme.label}: ${theme === "dark" ? t.theme.light : t.theme.dark}`}
            className="border-rule text-muted hover:text-fg grid h-9 w-9 place-items-center rounded-full border transition-colors"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.menu}
            className="border-rule text-muted hover:text-fg grid h-9 w-9 place-items-center rounded-full border lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Navigation"
        className={`border-rule bg-bg border-t lg:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="container-x grid gap-1 py-3">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l}`}
                onClick={() => setOpen(false)}
                className="text-fg hover:bg-surface-2 block rounded-lg px-3 py-2.5 text-base font-medium"
              >
                {t.nav[l]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
