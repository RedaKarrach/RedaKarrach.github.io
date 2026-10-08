export type Lang = "fr" | "en";

/** A string available in both languages. French is the default. */
export type L = Record<Lang, string>;

export type ProjectId = "soc-lab" | "recontool";

export type Tactic =
  | "Execution"
  | "Persistence"
  | "Privilege Escalation"
  | "Credential Access"
  | "Discovery"
  | "Collection"
  | "Impact";

export interface AttackTechnique {
  /** MITRE ATT&CK technique ID, e.g. "T1053.003". */
  id: string;
  name: string;
  tactics: Tactic[];
  /** Which project detects or validates it. */
  project: ProjectId;
  /** How the technique was exercised: validated end to end, or detected by a rule. */
  evidence: L;
}

export interface Screenshot {
  /** File stem inside /public/screenshots/<project>/ (without extension). */
  file: string;
  alt: L;
}

export interface Project {
  id: ProjectId;
  title: L;
  subtitle: L;
  period: string;
  repo: string;
  /** One paragraph anyone can understand, no jargon. */
  plain: L;
  /** Three or four short bullets for a non-technical reader. */
  highlights: L[];
  context: L;
  /** Technical detail sections, shown behind a "Technical details" toggle. */
  sections: { heading: L; items: L[] }[];
  techniques: string[];
  stack: string[];
  limitations: L[];
  roadmap?: L[];
  screenshots: Screenshot[];
  /** Toolkit tool names used by the project (must match toolkit.ts labels). */
  tools: string[];
}

export interface PathEntry {
  kind: "education" | "internship" | "project";
  period: string;
  title: L;
  org: L;
  place?: string;
  bullets?: L[];
  link?: { href: string; label: L };
}

export interface ToolGroup {
  id: string;
  label: L;
  studied?: boolean;
  tools: string[];
}

export interface TopologyNode {
  id: string;
  label: string;
  group: "pc-a" | "pc-b" | "endpoint" | "external" | "recon" | "attacker";
  /** Position in a unit cube, roughly in [-1, 1]. */
  pos: [number, number, number];
  project: ProjectId;
  detail: L;
}

export interface TopologyEdge {
  from: string;
  to: string;
  /** Packets travel along this edge, coloured by kind. */
  flow?: "red" | "amber" | "green";
}
