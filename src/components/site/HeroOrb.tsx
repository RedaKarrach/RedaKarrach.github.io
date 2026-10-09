"use client";

import { useEffect, useRef } from "react";

/**
 * Animated 3D orb for the landing section: three burgundy rings spinning on
 * different axes around a pulsing dark-red core, with an orbiting spark. Pure
 * CSS 3D; the only JavaScript is a pointer parallax that writes two custom
 * properties through the CSSOM (no inline style attribute is rendered).
 * Everything is static under prefers-reduced-motion.
 */
export function HeroOrb() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const section = scene.closest("section") ?? scene;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        scene.style.setProperty("--px", px.toFixed(3));
        scene.style.setProperty("--py", py.toFixed(3));
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      scene.style.setProperty("--px", "0");
      scene.style.setProperty("--py", "0");
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={sceneRef} className="orb-scene" aria-hidden="true">
      <div className="orb-stage">
        <span className="orb-glow" />
        <span className="orb-core" />
        <span className="orb-ring orb-ring-main" />
        <span className="orb-ring orb-ring-x" />
        <span className="orb-ring orb-ring-y" />
        <span className="orb-track">
          <span className="orb-spark" />
        </span>
      </div>
    </div>
  );
}
