"use client";

import { identity } from "@/content/identity";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";
import { IconRing } from "./IconRing";
import { Portrait } from "./Portrait";

/**
 * Landing section: who, which role, the three facts that prove it, and the CV.
 * The portrait sits in the tool ring on large screens and inline on small ones,
 * so the CV button stays in the first screen on a phone.
 */
export function Landing() {
  const { t } = useApp();
  return (
    <section id="top" aria-labelledby="hero-name" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative grid items-center gap-10 py-14 sm:py-20 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4 lg:block">
            <Portrait size={80} priority className="w-20 shrink-0 lg:hidden" />
            <p className="kicker">{t.hero.kicker}</p>
          </div>
          <h1
            id="hero-name"
            className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:mt-4 lg:text-6xl"
          >
            {identity.name}
          </h1>
          <p className="text-accent mt-3 text-xl font-semibold sm:text-2xl">{t.hero.role}</p>
          <p className="text-muted mt-5 max-w-xl text-lg leading-relaxed">{t.hero.tagline}</p>
          <ul className="text-muted mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Icon name="pin" className="text-accent h-4 w-4" />
              {t.hero.location}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="calendar" className="text-accent h-4 w-4" />
              {t.hero.availability}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={identity.cvPath} download="Karrach_CV.pdf" className="btn-primary">
              <Icon name="download" className="h-4.5 w-4.5" />
              {t.hero.cv}
            </a>
            <a href="#projects" className="btn-secondary">
              {t.hero.projects}
              <Icon name="arrow" className="h-4.5 w-4.5" />
            </a>
          </div>
          <ul className="mt-6 flex items-center gap-3" aria-label={t.hero.socialsLabel}>
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
            <li>
              <a
                href={identity.phoneHref}
                aria-label={`${t.hero.socials.phone} ${identity.phone}`}
                className="border-rule text-muted hover:border-accent hover:text-accent grid h-11 w-11 place-items-center rounded-full border transition-colors"
              >
                <Icon name="phone" className="h-5 w-5" />
              </a>
            </li>
          </ul>
          <h2 className="sr-only">{t.hero.proofLabel}</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {t.hero.proof.map((p) => (
              <li key={p.value}>
                <a href={p.href} className="card proof-card block h-full p-4">
                  <span className="text-accent block text-base font-semibold">{p.value}</span>
                  <span className="text-muted mt-1 block text-sm leading-snug">{p.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
          <IconRing priority />
        </div>
      </div>
    </section>
  );
}
