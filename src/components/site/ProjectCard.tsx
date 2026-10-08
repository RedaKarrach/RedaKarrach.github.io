"use client";

import { techniqueById } from "@/content/coverage";
import type { Project } from "@/content/types";
import { attackUrl } from "@/lib/attack";
import { useApp } from "@/lib/providers";
import { Icon } from "./Icon";
import { Screenshots } from "./Screenshots";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, tl, lang, openProjects, setProjectOpen, activeTool } = useApp();
  const detailsOpen = openProjects[project.id] ?? false;
  const usesActiveTool = activeTool !== null && project.tools.includes(activeTool);
  const dimmed = activeTool !== null && !usesActiveTool;

  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      className={`card scroll-mt-24 overflow-hidden transition-opacity ${dimmed ? "opacity-40" : ""} ${
        usesActiveTool ? "ring-accent ring-2" : ""
      }`}
    >
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="kicker">
            {String(index + 1).padStart(2, "0")} · {project.period}
          </p>
          <h3
            id={`project-${project.id}-title`}
            className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {tl(project.title)}
          </h3>
          <p className="text-muted mt-1 text-lg">{tl(project.subtitle)}</p>
          {usesActiveTool ? (
            <p className="bg-accent-soft text-accent mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold">
              <Icon name="check" className="h-3.5 w-3.5" />
              {t.projects.usesTool} {activeTool}
            </p>
          ) : null}

          <h4 className="text-muted mt-6 text-sm font-semibold tracking-wide uppercase">
            {t.projects.what}
          </h4>
          <p className="mt-2 text-[17px] leading-relaxed">{tl(project.plain)}</p>

          <h4 className="text-muted mt-6 text-sm font-semibold tracking-wide uppercase">
            {t.projects.highlights}
          </h4>
          <ul className="mt-2 grid gap-2">
            {project.highlights.map((h) => (
              <li key={h.en} className="flex gap-3 text-[15px] leading-relaxed">
                <Icon name="check" className="text-accent mt-1 h-4 w-4 shrink-0" />
                <span>{tl(h)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Icon name="github" className="h-4.5 w-4.5" />
              {t.projects.github}
              <span className="sr-only"> {t.a11y.external}</span>
            </a>
            <button
              type="button"
              aria-expanded={detailsOpen}
              aria-controls={`project-${project.id}-details`}
              onClick={() => setProjectOpen(project.id, !detailsOpen)}
              className="btn-secondary"
            >
              {t.projects.details}
              <span
                aria-hidden
                className={`transition-transform ${detailsOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>
          </div>
        </div>

        <div className="grid content-start gap-6 lg:col-span-5">
          <div>
            <h4 className="text-muted text-sm font-semibold tracking-wide uppercase">
              {t.projects.tech}
            </h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-muted text-sm font-semibold tracking-wide uppercase">
              {t.projects.techniques}
            </h4>
            <ul className="mt-2 grid gap-2">
              {project.techniques.map((id) => {
                const tech = techniqueById[id];
                return (
                  <li
                    key={id}
                    className="border-rule bg-surface-2/60 rounded-lg border px-3 py-2 text-sm"
                  >
                    <a
                      href={attackUrl(id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent font-semibold underline-offset-4 hover:underline"
                    >
                      {id}
                      <span className="sr-only"> {t.a11y.external}</span>
                    </a>{" "}
                    <span className="font-medium">{tech?.name}</span>
                    {tech ? <span className="text-muted block">{tech.evidence[lang]}</span> : null}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border-warn/40 bg-warn/8 rounded-lg border p-4">
            <h4 className="text-warn text-sm font-semibold tracking-wide uppercase">
              {t.projects.limits}
            </h4>
            <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed">
              {project.limitations.map((l) => (
                <li key={l.en}>{tl(l)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id={`project-${project.id}-details`} className={detailsOpen ? "block" : "hidden"}>
        <div className="border-rule bg-surface-2/40 grid gap-8 border-t p-6 sm:p-8">
          <p className="text-muted text-sm">
            <span className="text-fg font-semibold">{t.projects.context}:</span>{" "}
            {tl(project.context)}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {project.sections.map((sec) => (
              <div key={sec.heading.en}>
                <h4 className="text-muted text-sm font-semibold tracking-wide uppercase">
                  {tl(sec.heading)}
                </h4>
                <ul className="mt-2 grid gap-1.5 text-[15px] leading-relaxed">
                  {sec.items.map((item) => (
                    <li key={item.en} className="flex gap-2">
                      <span
                        aria-hidden
                        className="bg-accent mt-[0.7em] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span>{tl(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {project.roadmap ? (
              <div>
                <h4 className="text-muted text-sm font-semibold tracking-wide uppercase">
                  {t.projects.roadmap}
                </h4>
                <ul className="text-muted mt-2 grid gap-1.5 text-[15px] leading-relaxed">
                  {project.roadmap.map((r) => (
                    <li key={r.en}>{tl(r)}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div>
            <h4 className="text-muted mb-3 text-sm font-semibold tracking-wide uppercase">
              {t.projects.screenshots}
            </h4>
            <Screenshots project={project.id} shots={project.screenshots} />
          </div>
        </div>
      </div>
    </article>
  );
}
