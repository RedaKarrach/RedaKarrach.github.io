"use client";

import { toolLabelEn, toolkit } from "@/content/toolkit";
import { useApp } from "@/lib/providers";
import { BrandIcon } from "./BrandIcon";
import { Section } from "./Section";

export function Skills() {
  const { t, tl, lang, activeTool, setActiveTool } = useApp();
  const label = (tool: string) => (lang === "en" ? (toolLabelEn[tool] ?? tool) : tool);

  return (
    <Section
      id="skills"
      kicker={t.skills.kicker}
      title={t.skills.title}
      sub={t.skills.sub}
      className="bg-surface-1/50"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 lg:grid-cols-2">
          {toolkit.map((group) => (
            <div key={group.id} className="card p-5">
              <h3 className="text-base font-semibold">
                {tl(group.label)}
                {group.studied ? (
                  <span className="text-muted mt-0.5 block text-sm font-normal">
                    {t.skills.studiedNote}
                  </span>
                ) : null}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={tl(group.label)}>
                {group.tools.map((tool) => {
                  const active = activeTool === tool;
                  return (
                    <li key={tool}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveTool(active ? null : tool)}
                        className={`chip card-3d cursor-pointer gap-1.5 transition-colors ${group.studied ? "border-dashed" : ""} ${
                          active ? "chip-active" : "hover:border-accent hover:text-accent"
                        }`}
                      >
                        <BrandIcon tool={tool} className="h-4 w-4 shrink-0 opacity-80" />
                        {label(tool)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
