"use client";

import { projects } from "@/content/projects";
import { internshipTools, toolLabelEn, toolkit } from "@/content/toolkit";
import { useApp } from "@/lib/providers";
import { Section } from "./Section";

export function Skills() {
  const { t, tl, lang, activeTool, setActiveTool } = useApp();
  const label = (tool: string) => (lang === "en" ? (toolLabelEn[tool] ?? tool) : tool);
  const usedBy = activeTool ? projects.filter((p) => p.tools.includes(activeTool)) : [];
  const usedByInternship = activeTool ? internshipTools.includes(activeTool) : false;

  return (
    <Section
      id="skills"
      kicker={t.skills.kicker}
      title={t.skills.title}
      sub={t.skills.sub}
      className="bg-surface-1/50"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="grid gap-5 lg:col-span-8">
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
                        className={`chip cursor-pointer transition-colors ${group.studied ? "border-dashed" : ""} ${
                          active
                            ? "border-accent bg-accent text-bg"
                            : "hover:border-accent hover:text-accent"
                        }`}
                      >
                        {label(tool)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <aside className="lg:col-span-4" aria-live="polite">
          <div className="card sticky top-24 p-5">
            <p className="text-muted text-xs font-semibold tracking-wide uppercase">
              {t.skills.selected}
            </p>
            {activeTool ? (
              <>
                <p className="mt-1 text-xl font-bold">{label(activeTool)}</p>
                <p className="text-muted mt-4 text-xs font-semibold tracking-wide uppercase">
                  {t.skills.usedIn}
                </p>
                {usedBy.length > 0 || usedByInternship ? (
                  <ul className="mt-2 grid gap-1.5">
                    {usedBy.map((p) => (
                      <li key={p.id}>
                        <a
                          href={`#project-${p.id}`}
                          className="text-accent font-medium underline-offset-4 hover:underline"
                        >
                          {tl(p.title)}
                        </a>
                      </li>
                    ))}
                    {usedByInternship ? (
                      <li>
                        <a
                          href="#path"
                          className="text-accent font-medium underline-offset-4 hover:underline"
                        >
                          {t.path.kinds.internship} 2024
                        </a>
                      </li>
                    ) : null}
                  </ul>
                ) : (
                  <p className="text-muted mt-2 text-sm">{t.skills.notInProjects}</p>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTool(null)}
                  className="btn-secondary mt-5 text-sm"
                >
                  {t.skills.clear}
                </button>
              </>
            ) : (
              <p className="text-muted mt-2">{t.skills.sub}</p>
            )}
          </div>
        </aside>
      </div>
    </Section>
  );
}
