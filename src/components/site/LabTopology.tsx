"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { topologyEdges, topologyNodes } from "@/content/topology";
import type { TopologyNode } from "@/content/types";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { clamp, project, rotateX, rotateY, type Vec3 } from "@/lib/projection";
import { useApp } from "@/lib/providers";

interface Colors {
  fg: string;
  muted: string;
  rule: string;
  ruleStrong: string;
  rust: string;
  amber: string;
  red: string;
  green: string;
  bg: string;
}

const nodeById = Object.fromEntries(topologyNodes.map((n) => [n.id, n])) as Record<
  string,
  TopologyNode
>;
const vec = (p: [number, number, number]): Vec3 => ({ x: p[0], y: p[1], z: p[2] });

const HOSTS: { id: string; label: string; members: string[]; dashed?: boolean }[] = [
  {
    id: "pc-a",
    label: "PC A · 16 GB · Docker Compose",
    members: ["wazuh-manager", "wazuh-indexer", "wazuh-dashboard", "shuffle"],
  },
  {
    id: "pc-b",
    label: "PC B · 8 GB · Docker Compose",
    members: ["cortex", "thehive", "cassandra", "elasticsearch"],
  },
  {
    id: "vbox",
    label: "VirtualBox host-only",
    members: ["kali", "agent-win10", "agent-ubuntu", "django", "mongodb", "react", "nginx"],
    dashed: true,
  },
];

function nodeColor(n: TopologyNode, c: Colors): string {
  if (n.group === "attacker") return c.red;
  if (n.group === "external") return c.muted;
  if (n.group === "endpoint") return c.fg;
  return n.project === "soc-lab" ? c.rust : c.amber;
}

function readColors(el: HTMLElement): Colors {
  const s = getComputedStyle(el);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    fg: v("--fg"),
    muted: v("--muted"),
    rule: v("--rule"),
    ruleStrong: v("--rule-strong"),
    rust: v("--accent"),
    amber: v("--warn"),
    red: v("--danger"),
    green: v("--accent"),
    bg: v("--bg"),
  };
}

export function LabTopology() {
  const { t, tl, theme, setProjectOpen } = useApp();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrapRef, { once: false, threshold: 0.05 });
  const [hover, setHover] = useState<{ id: string; x: number; y: number; w: number } | null>(null);

  // Mutable scene state lives in refs so the render loop never re-renders React.
  const yaw = useRef(-0.55);
  const pitch = useRef(0.32);
  const vel = useRef(0);
  const drag = useRef<{ x: number; y: number; moved: number } | null>(null);
  const hoverId = useRef<string | null>(null);
  const hits = useRef<{ id: string; x: number; y: number; r: number }[]>([]);
  const colors = useRef<Colors | null>(null);
  const dirty = useRef(true);

  useEffect(() => {
    if (wrapRef.current) colors.current = readColors(wrapRef.current);
    dirty.current = true;
  }, [theme]);

  const openNode = useCallback(
    (id: string) => {
      const node = nodeById[id];
      if (!node) return;
      setProjectOpen(node.project, true);
      const target = document.getElementById(`project-${node.project}`);
      target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      window.setTimeout(
        () => target?.querySelector<HTMLElement>("button")?.focus({ preventScroll: true }),
        400,
      );
    },
    [reduced, setProjectOpen],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!colors.current) colors.current = readColors(wrap);

    let raf = 0;
    let last = performance.now();
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      width = Math.max(1, Math.round(r.width));
      height = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      dirty.current = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const draw = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const c = colors.current!;
      const animate = !reduced;

      if (!drag.current) {
        if (animate) {
          yaw.current += 0.00008 * dt + vel.current;
          vel.current *= 0.94;
        } else if (Math.abs(vel.current) > 0.00005) {
          yaw.current += vel.current;
          vel.current *= 0.9;
          dirty.current = true;
        }
      }

      if (!animate && !dirty.current) {
        raf = requestAnimationFrame(draw);
        return;
      }
      dirty.current = false;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const cam = { width, height, distance: 4.6, zoom: Math.min(width / 3.1, height / 2.6) };
      const tf = (p: Vec3) => project(rotateX(rotateY(p, yaw.current), pitch.current), cam);
      const pos = new Map<string, ReturnType<typeof tf>>();
      for (const n of topologyNodes) pos.set(n.id, tf(vec(n.pos)));

      // Host boxes: wireframe cuboids around each group's members.
      ctx.lineWidth = 1;
      for (const host of HOSTS) {
        const pts = host.members.map((id) => nodeById[id].pos);
        const pad = 0.22;
        const min = [0, 1, 2].map((i) => Math.min(...pts.map((p) => p[i])) - pad);
        const max = [0, 1, 2].map((i) => Math.max(...pts.map((p) => p[i])) + pad);
        const corners: Vec3[] = [];
        for (const x of [min[0], max[0]])
          for (const y of [min[1], max[1]])
            for (const z of [min[2], max[2]]) corners.push({ x, y, z });
        const pc = corners.map(tf);
        const edges: [number, number][] = [
          [0, 1],
          [0, 2],
          [0, 4],
          [1, 3],
          [1, 5],
          [2, 3],
          [2, 6],
          [3, 7],
          [4, 5],
          [4, 6],
          [5, 7],
          [6, 7],
        ];
        ctx.strokeStyle = c.rule;
        ctx.setLineDash(host.dashed ? [3, 4] : []);
        ctx.beginPath();
        for (const [a, b] of edges) {
          ctx.moveTo(pc[a].x, pc[a].y);
          ctx.lineTo(pc[b].x, pc[b].y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        // Label at the top-front corner.
        const top = pc.reduce((best, p) => (p.y < best.y ? p : best), pc[0]);
        ctx.font = `500 10px ${getComputedStyle(canvas).getPropertyValue("--font-plex-mono") || "monospace"}`;
        ctx.fillStyle = c.muted;
        ctx.textBaseline = "bottom";
        ctx.textAlign = "left";
        ctx.fillText(host.label.toUpperCase(), top.x + 4, top.y - 3);
      }

      // Edges.
      for (const e of topologyEdges) {
        const a = pos.get(e.from)!;
        const b = pos.get(e.to)!;
        const depth = (a.depth + b.depth) / 2;
        ctx.globalAlpha = clamp(1.25 - depth / 8, 0.35, 1);
        ctx.strokeStyle = e.flow ? c.ruleStrong : c.rule;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Packets travelling along flow edges (off under reduced motion).
      if (animate) {
        const flows = topologyEdges.filter((e) => e.flow);
        flows.forEach((e, i) => {
          const a = nodeById[e.from].pos;
          const b = nodeById[e.to].pos;
          const tt = (((now / 2600 + i * 0.173) % 1) + 1) % 1;
          const p = tf({
            x: a[0] + (b[0] - a[0]) * tt,
            y: a[1] + (b[1] - a[1]) * tt,
            z: a[2] + (b[2] - a[2]) * tt,
          });
          const col = e.flow === "red" ? c.red : e.flow === "amber" ? c.amber : c.green;
          ctx.fillStyle = col;
          ctx.globalAlpha = clamp(1.3 - p.depth / 8, 0.4, 1);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.4 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // Nodes, far to near.
      const ordered = [...topologyNodes].sort(
        (m, n) => pos.get(n.id)!.depth - pos.get(m.id)!.depth,
      );
      const newHits: typeof hits.current = [];
      const monoFont = getComputedStyle(canvas).getPropertyValue("--font-plex-mono") || "monospace";
      for (const n of ordered) {
        const p = pos.get(n.id)!;
        const isHover = hoverId.current === n.id;
        const base = n.group === "external" ? 3.2 : n.group === "endpoint" ? 4 : 5;
        const r = base * p.scale * (isHover ? 1.5 : 1);
        const col = nodeColor(n, c);
        ctx.globalAlpha = clamp(1.3 - p.depth / 8, 0.45, 1);
        ctx.fillStyle = c.bg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = col;
        ctx.beginPath();
        if (n.group === "endpoint" || n.group === "attacker") {
          ctx.rect(p.x - r, p.y - r, r * 2, r * 2);
        } else {
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        }
        ctx.fill();
        if (isHover) {
          ctx.strokeStyle = col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
          ctx.stroke();
        }
        const fontSize = clamp(10.5 * p.scale, 8.5, 12);
        ctx.font = `${isHover ? 600 : 400} ${fontSize}px ${monoFont}`;
        ctx.fillStyle = isHover ? c.fg : n.group === "external" ? c.muted : c.fg;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillText(n.label, p.x + r + 5, p.y + 0.5);
        newHits.push({ id: n.id, x: p.x, y: p.y, r: Math.max(12, r + 8) });
      }
      ctx.globalAlpha = 1;
      hits.current = newHits;
      if (animate) raf = requestAnimationFrame(draw);
      else raf = requestAnimationFrame(draw);
    };

    const visible = () => inView && document.visibilityState === "visible";
    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (visible()) raf = requestAnimationFrame(draw);
    };
    const onVis = () => start();
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [inView, reduced, theme]);

  const hitTest = (x: number, y: number): string | null => {
    let best: { id: string; d: number } | null = null;
    for (const h of hits.current) {
      const d = Math.hypot(h.x - x, h.y - y);
      if (d <= h.r && (!best || d < best.d)) best = { id: h.id, d };
    }
    return best?.id ?? null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drag.current = { x: e.clientX, y: e.clientY, moved: 0 };
    vel.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (drag.current) {
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current = {
        x: e.clientX,
        y: e.clientY,
        moved: drag.current.moved + Math.abs(dx) + Math.abs(dy),
      };
      yaw.current += dx * 0.006;
      vel.current = dx * 0.0012;
      pitch.current = clamp(pitch.current + dy * 0.004, -1.1, 1.1);
      dirty.current = true;
      return;
    }
    const id = hitTest(x, y);
    if (id !== hoverId.current) {
      hoverId.current = id;
      dirty.current = true;
      setHover(id ? { id, x, y, w: rect.width } : null);
    } else if (id && hover && (Math.abs(hover.x - x) > 2 || Math.abs(hover.y - y) > 2)) {
      setHover({ id, x, y, w: rect.width });
    }
  };
  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = drag.current;
    drag.current = null;
    if (d && d.moved < 6) {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = hitTest(e.clientX - rect.left, e.clientY - rect.top);
      if (id) openNode(id);
    }
  };
  const onPointerLeave = () => {
    drag.current = null;
    hoverId.current = null;
    dirty.current = true;
    setHover(null);
  };

  const hovered = hover ? nodeById[hover.id] : null;

  return (
    <figure className="m-0">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <figcaption className="mono text-muted text-[11px] tracking-[0.12em] uppercase">
          {t.lab.caption}
        </figcaption>
        <p className="mono text-muted hidden text-[11px] sm:block">
          {reduced ? t.lab.staticHint : t.lab.hint}
        </p>
      </div>
      <div
        ref={wrapRef}
        className="border-rule bg-surface-1 relative aspect-[4/3] w-full overflow-hidden border sm:aspect-[5/4] lg:aspect-[4/3]"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t.lab.aria}
          className="block h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerLeave}
          onPointerLeave={onPointerLeave}
        />
        {hovered && hover ? (
          <div
            role="status"
            className="border-rule-strong bg-bg shadow-card pointer-events-none absolute z-10 max-w-[240px] border px-2 py-1.5"
            style={{
              left: Math.min(hover.x + 14, hover.w - 250),
              top: Math.max(8, hover.y - 10),
            }}
          >
            <p className="mono text-[11px] font-semibold">{hovered.label}</p>
            <p className="text-muted text-[12px]">{tl(hovered.detail)}</p>
            <p className="mono text-accent mt-1 text-[10px]">{t.lab.openProject} →</p>
          </div>
        ) : null}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {(
          [
            ["pc-a", "bg-accent"],
            ["pc-b", "bg-warn"],
            ["recon", "bg-warn"],
            ["endpoint", "bg-fg"],
            ["attacker", "bg-danger"],
            ["external", "bg-muted"],
          ] as const
        ).map(([key, cls]) => (
          <li key={key} className="mono text-muted flex items-center gap-1.5 text-[10.5px]">
            <span className={`inline-block h-1.5 w-1.5 ${cls}`} aria-hidden />
            {t.lab.legend[key]}
          </li>
        ))}
      </ul>
      {/* Text alternative for the canvas: every node, linked to its case file. */}
      <ul className="sr-only">
        {topologyNodes.map((n) => (
          <li key={n.id}>
            <a href={`#project-${n.project}`}>
              {n.label}: {tl(n.detail)}
            </a>
          </li>
        ))}
      </ul>
    </figure>
  );
}
