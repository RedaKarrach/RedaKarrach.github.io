"use client";

import { projects } from "@/content/projects";
import { useApp } from "@/lib/providers";
import { ProjectCard } from "./ProjectCard";
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
    </Section>
  );
}
