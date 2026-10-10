"use client";

import { useEffect, useState } from "react";
import { identity } from "@/content/identity";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function Contact() {
  const { t } = useApp();
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(null), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async (what: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(what === "email" ? identity.email : identity.phone);
      setCopied(what);
    } catch {
      setCopied(null);
    }
  };
  const copiedLabel =
    copied === "email" ? t.contact.copied : copied === "phone" ? t.contact.copiedPhone : "";

  return (
    <Section id="contact" kicker={t.contact.kicker} title={t.contact.title} sub={t.contact.sub}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card flex flex-col gap-3 p-6">
          <span className="bg-accent-soft text-accent grid h-12 w-12 place-items-center rounded-full">
            <Icon name="mail" className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-semibold">{t.contact.email}</h3>
          <a
            href={`mailto:${identity.email}`}
            className="text-accent font-medium break-all underline-offset-4 hover:underline"
          >
            {identity.email}
          </a>
          <button
            type="button"
            onClick={() => copy("email")}
            className="btn-secondary mt-auto w-fit text-sm"
          >
            <Icon name={copied === "email" ? "check" : "mail"} className="h-4 w-4" />
            {copied === "email" ? t.contact.copied : t.contact.copy}
          </button>
        </div>
        <div className="card flex flex-col gap-3 p-6">
          <span className="bg-accent-soft text-accent grid h-12 w-12 place-items-center rounded-full">
            <Icon name="phone" className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-semibold">{t.contact.phone}</h3>
          <a
            href={identity.phoneHref}
            className="text-accent font-medium whitespace-nowrap underline-offset-4 hover:underline"
          >
            {identity.phone}
          </a>
          <button
            type="button"
            onClick={() => copy("phone")}
            className="btn-secondary mt-auto w-fit text-sm"
          >
            <Icon name={copied === "phone" ? "check" : "phone"} className="h-4 w-4" />
            {copied === "phone" ? t.contact.copiedPhone : t.contact.copyPhone}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {copiedLabel}
        </p>
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="card card-3d group hover:border-accent flex flex-col gap-3 p-6 transition-colors"
        >
          <span className="bg-accent-soft text-accent grid h-12 w-12 place-items-center rounded-full">
            <Icon name="linkedin" className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-semibold">{t.contact.linkedin}</h3>
          <span className="text-muted group-hover:text-accent break-all">
            linkedin.com/in/reda-karrach-a2a52730b
          </span>
          <span className="sr-only">{t.a11y.external}</span>
        </a>
        <a
          href={identity.github}
          target="_blank"
          rel="noopener noreferrer"
          className="card card-3d group hover:border-accent flex flex-col gap-3 p-6 transition-colors"
        >
          <span className="bg-accent-soft text-accent grid h-12 w-12 place-items-center rounded-full">
            <Icon name="github" className="h-6 w-6" />
          </span>
          <h3 className="text-lg font-semibold">{t.contact.github}</h3>
          <span className="text-muted group-hover:text-accent">
            github.com/{identity.githubHandle}
          </span>
          <span className="sr-only">{t.a11y.external}</span>
        </a>
      </div>
      <div className="mt-8">
        <a href={identity.cvPath} download="Karrach_CV.pdf" className="btn-primary">
          <Icon name="download" className="h-4.5 w-4.5" />
          {t.contact.cv}
        </a>
      </div>
    </Section>
  );
}
