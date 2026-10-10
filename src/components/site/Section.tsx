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
  /** Centre the header. */
  centered?: boolean;
  /** Decorative element shown to the right of the header on large screens. */
  aside?: ReactNode;
}

export function Section({
  id,
  kicker,
  title,
  sub,
  children,
  className = "",
  centered,
  aside,
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
        <div className={aside ? "mb-10 flex items-center justify-between gap-8 sm:mb-14" : ""}>
          <header
            className={`grid gap-3 ${aside ? "" : "mb-10 sm:mb-14"} ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
          >
            <p className="kicker">{kicker}</p>
            <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {sub ? <p className="text-muted text-lg">{sub}</p> : null}
          </header>
          {aside ? <div className="hidden shrink-0 lg:block">{aside}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
