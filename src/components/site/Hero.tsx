"use client";

import { identity } from "@/content/identity";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";

export function Hero() {
  const { t } = useApp();
  return (
    <section id="top" aria-labelledby="hero-name" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative flex flex-col items-center py-20 text-center sm:py-28 lg:py-36">
        <div className="flex max-w-3xl flex-col items-center">
          <p className="kicker">{t.hero.greeting}</p>
          <h1
            id="hero-name"
            className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {identity.name}
          </h1>
          <p className="text-accent mt-3 text-xl font-semibold sm:text-2xl">{t.hero.role}</p>
          <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed">{t.hero.tagline}</p>

          <ul className="text-muted mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Icon name="pin" className="text-accent h-4 w-4" />
              {t.hero.location}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="calendar" className="text-accent h-4 w-4" />
              {t.hero.availability}
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={identity.cvPath} download="Karrach_CV.pdf" className="btn-primary">
              <Icon name="download" className="h-4.5 w-4.5" />
              {t.hero.cv}
            </a>
            <a href="#projects" className="btn-secondary">
              {t.hero.projects}
              <Icon name="arrow" className="h-4.5 w-4.5" />
            </a>
          </div>

          <ul
            className="mt-8 flex items-center justify-center gap-3"
            aria-label={t.hero.socialsLabel}
          >
            {[
              { href: identity.github, icon: "github" as const, label: t.hero.socials.github },
              {
                href: identity.linkedin,
                icon: "linkedin" as const,
                label: t.hero.socials.linkedin,
              },
            ].map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} ${t.a11y.external}`}
                  className="border-rule text-muted hover:border-accent hover:text-accent grid h-11 w-11 place-items-center rounded-full border transition-colors"
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${identity.email}`}
                aria-label={t.hero.socials.email}
                className="border-rule text-muted hover:border-accent hover:text-accent grid h-11 w-11 place-items-center rounded-full border transition-colors"
              >
                <Icon name="mail" className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
