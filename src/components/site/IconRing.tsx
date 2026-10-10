"use client";

import { useRef } from "react";
import { heroRing } from "@/content/brands";
import { useInView } from "@/lib/hooks";
import { useApp } from "@/lib/providers";
import { BrandIcon } from "./BrandIcon";
import { Portrait } from "./Portrait";

/**
 * The portrait inside a slowly rotating 3D ring of tool logos. Pure CSS 3D and
 * transform-only keyframes, so the browser runs it on the compositor (no style
 * recalculation per frame): the ring turns, and each badge counter-turns to
 * keep facing the viewer. Per-item offsets come from :nth-child rules so no
 * inline style attribute is rendered. Paused off-screen, static under
 * prefers-reduced-motion.
 */
export function IconRing({ priority = false }: { priority?: boolean }) {
  const { t } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  return (
    <div
      ref={ref}
      className={`orbit3d-scene relative mx-auto w-[240px] sm:w-[290px] lg:w-[330px] ${inView ? "" : "is-paused"}`}
    >
      <div className="orbit3d-stage">
        <ul className="orbit3d" aria-label={t.hero.ringLabel}>
          {heroRing.map((tool) => (
            <li key={tool} className="orbit3d-item">
              <span className="orbit3d-face">
                <span className="orbit3d-badge" title={tool}>
                  <BrandIcon tool={tool} className="h-6 w-6 sm:h-7 sm:w-7" title={tool} />
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="orbit3d-center">
          <Portrait size={330} priority={priority} />
        </div>
      </div>
    </div>
  );
}
