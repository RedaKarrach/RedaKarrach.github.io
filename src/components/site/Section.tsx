"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "@/lib/hooks";

interface SectionProps {
  id: string;
  kicker: string;
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
  /** Centre the header (used for the services grid). */
  centered?: boolean;
}

export function Section({
  id,
  kicker,
  title,
  sub,
  children,
  className = "",
  centered,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { rootMargin: "0px 0px -8% 0px" });
  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className={`reveal ${inView ? "in" : ""} py-16 sm:py-24 ${className}`}
    >
      <div className="container-x">
        <header
          className={`mb-10 grid gap-3 sm:mb-14 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
        >
          <p className="kicker">{kicker}</p>
          <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {sub ? <p className="text-muted text-lg">{sub}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
