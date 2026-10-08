"use client";

import { certifications, path } from "@/content/path";
import { internshipTools } from "@/content/toolkit";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function PathTimeline() {
  const { t, tl, activeTool } = useApp();
  return (
    <Section id="path" kicker={t.path.kicker} title={t.path.heading} sub={t.path.sub}>
      <div className="grid gap-10 lg:grid-cols-12">
        <ol className="border-rule relative border-l-2 lg:col-span-8">
          {path.map((e) => {
            const highlight =
              e.kind === "internship" &&
              activeTool !== null &&
              internshipTools.includes(activeTool);
            return (
              <li key={`${e.period}-${e.title.en}`} className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className={`border-bg absolute top-1 -left-[9px] h-4 w-4 rounded-full border-4 ${
                    e.kind === "project"
                      ? "bg-accent"
                      : e.kind === "internship"
                        ? "bg-warn"
                        : "bg-fg"
                  }`}
                />
                <p className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="text-fg font-semibold">{e.period}</span>
                  <span className="bg-surface-2 rounded-full px-2 py-0.5 text-xs font-semibold">
                    {t.path.kinds[e.kind]}
                  </span>
                  {e.place ? <span>{e.place}</span> : null}
                  {highlight ? (
                    <span className="text-accent inline-flex items-center gap-1">
                      <Icon name="check" className="h-3.5 w-3.5" />
                      {t.projects.usesTool} {activeTool}
                    </span>
                  ) : null}
                </p>
                <h3 className="mt-1.5 text-xl font-semibold">{tl(e.title)}</h3>
                <p className="text-muted">{tl(e.org)}</p>
                {e.bullets ? (
                  <ul className="mt-3 grid gap-2 text-[15px] leading-relaxed">
                    {e.bullets.map((b) => (
                      <li key={b.en} className="flex gap-2">
                        <span
                          aria-hidden
                          className="bg-accent mt-[0.7em] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        />
                        <span>{tl(b)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {e.link ? (
                  <a
                    href={e.link.href}
                    className="text-accent mt-3 inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                  >
                    {tl(e.link.label)}
                    <Icon name="arrow" className="h-4 w-4" />
                  </a>
                ) : null}
              </li>
            );
          })}
        </ol>
        <div className="grid content-start gap-6 lg:col-span-4">
          <div className="card p-5">
            <h3 className="text-base font-semibold">{t.path.certifications}</h3>
            <ul className="divide-rule mt-3 divide-y">
              {certifications.map((c) => (
                <li
                  key={c.name}
                  className="flex items-baseline justify-between gap-3 py-2.5 text-[15px]"
                >
                  <span>
                    {c.name} <span className="text-muted">· {c.issuer}</span>
                  </span>
                  <span className="text-muted text-sm">{c.year}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="text-base font-semibold">{t.path.languages}</h3>
            <ul className="divide-rule mt-3 divide-y">
              {t.path.languageList.map((l) => (
                <li
                  key={l.lang}
                  className="flex items-baseline justify-between gap-3 py-2.5 text-[15px]"
                >
                  <span>{l.lang}</span>
                  <span className="text-muted text-sm">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
