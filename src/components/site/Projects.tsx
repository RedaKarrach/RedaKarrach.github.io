"use client";

import { projects } from "@/content/projects";
import { useApp } from "@/lib/providers";
import { ProjectCard } from "./ProjectCard";
import { Repos } from "./Repos";
import { Section } from "./Section";

export function Projects() {
  const { t } = useApp();
  return (
    <Section id="projects" kicker={t.projects.kicker} title={t.projects.title} sub={t.projects.sub}>
      <div className="grid gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
      <div className="mt-16">
        <h3 className="text-2xl font-bold tracking-tight">{t.projects.otherRepos}</h3>
        <p className="text-muted mt-1">{t.projects.otherReposSub}</p>
        <div className="mt-6">
          <Repos />
        </div>
      </div>
    </Section>
  );
}
