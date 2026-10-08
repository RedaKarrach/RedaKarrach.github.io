"use client";

import { heroRing } from "@/content/brands";
import { useApp } from "@/lib/providers";
import { BrandIcon } from "./BrandIcon";
import { Portrait } from "./Portrait";

/**
 * The portrait inside a slowly rotating 3D ring of tool logos. Pure CSS 3D
 * (preserve-3d, a registered @property angle animated on the ring and
 * inherited by each item); per-item offsets come from :nth-child rules so no
 * inline style attribute is rendered. Static under prefers-reduced-motion.
 */
export function IconRing() {
  const { t } = useApp();
  return (
    <div className="orbit3d-scene relative mx-auto w-[240px] sm:w-[290px] lg:w-[330px]">
      <div className="orbit3d-stage">
        <ul className="orbit3d" aria-label={t.hero.ringLabel}>
          {heroRing.map((tool) => (
            <li key={tool} className="orbit3d-item">
              <span className="orbit3d-badge" title={tool}>
                <BrandIcon tool={tool} className="h-6 w-6 sm:h-7 sm:w-7" title={tool} />
              </span>
            </li>
          ))}
        </ul>
        <div className="orbit3d-center">
          <Portrait size={330} priority />
        </div>
      </div>
    </div>
  );
}
