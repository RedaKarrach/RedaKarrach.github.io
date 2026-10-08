"use client";

import { identity } from "@/content/identity";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="border-rule border-t py-10">
      <div className="container-x text-muted flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {identity.name}. {t.footer.madeBy}
        </p>
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <a
              href={identity.siteRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              {t.footer.source}
              <span className="sr-only"> {t.a11y.external}</span>
            </a>
          </li>
          <li>
            <a href="#top" className="hover:text-fg inline-flex items-center gap-1">
              {t.footer.top}
              <Icon name="arrow" className="h-4 w-4 -rotate-90" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
