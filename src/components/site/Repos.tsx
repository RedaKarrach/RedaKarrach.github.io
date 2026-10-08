"use client";

import { useEffect, useState } from "react";
import { identity } from "@/content/identity";
import { formatDate } from "@/lib/format";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  url: string;
}

/** The two featured projects have their own cards above; everything else is listed here. */
const FEATURED = ["distributed-soc-lab", "NetworkReconnaissanceTool"];

/**
 * The list is written at build time to /repos.json and fetched here at runtime,
 * so repository changes never alter the HTML (and therefore the CSP hashes).
 */
export function Repos() {
  const { t, lang } = useApp();
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/repos.json", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { repos: Repo[] }) =>
        setRepos(data.repos.filter((r) => !FEATURED.includes(r.name))),
      )
      .catch(() => setRepos([]));
    return () => controller.abort();
  }, []);

  if (repos === null) {
    return (
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <li key={i} className="card h-28 animate-pulse" />
        ))}
      </ul>
    );
  }

  if (repos.length === 0) {
    return (
      <a
        href={identity.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent font-medium underline-offset-4 hover:underline"
      >
        github.com/{identity.githubHandle}
        <span className="sr-only"> {t.a11y.external}</span>
      </a>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => (
        <li key={r.name}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-3d group hover:border-accent flex h-full flex-col gap-2 p-4 transition-colors"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="group-hover:text-accent truncate font-semibold">{r.name}</span>
              <Icon name="github" className="text-muted h-4 w-4 shrink-0" />
            </span>
            {r.description ? (
              <span className="text-muted text-sm leading-snug">{r.description}</span>
            ) : null}
            <span className="text-muted mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs">
              <span className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${r.language ? "bg-accent" : "bg-rule-strong"}`}
                  aria-hidden
                />
                {r.language ?? t.projects.noLanguage}
              </span>
              <span>
                {t.projects.updated} {formatDate(r.pushedAt, lang)}
              </span>
            </span>
            <span className="sr-only">{t.a11y.external}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
