import type { AttackTechnique, Tactic } from "./types";

/** Tactics shown as matrix columns, in ATT&CK order. */
export const tactics: Tactic[] = [
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Credential Access",
  "Discovery",
  "Collection",
  "Impact",
];

/**
 * Only techniques that a project detects or validates. Nothing aspirational:
 * roadmap items (T1046 for the SOC lab, T1059, T1071, T1021) are not listed here.
 */
export const techniques: AttackTechnique[] = [
  {
    id: "T1053.003",
    name: "Scheduled Task/Job: Cron",
    tactics: ["Execution", "Persistence", "Privilege Escalation"],
    project: "soc-lab",
    evidence: {
      fr: "Chaîne complète validée : test ART, alerte Wazuh, playbook Shuffle, cas TheHive #3.",
      en: "Full chain validated: ART test, Wazuh alert, Shuffle playbook, TheHive case #3.",
    },
  },
  {
    id: "T1543.002",
    name: "Create or Modify System Process: Systemd Service",
    tactics: ["Persistence", "Privilege Escalation"],
    project: "soc-lab",
    evidence: {
      fr: "Alerte traitée par le playbook.",
      en: "Alert processed by the playbook.",
    },
  },
  {
    id: "T1003",
    name: "OS Credential Dumping",
    tactics: ["Credential Access"],
    project: "soc-lab",
    evidence: {
      fr: "Alerte « Mimikatz Usage Detected » reçue dans TheHive.",
      en: '"Mimikatz Usage Detected" alert received in TheHive.',
    },
  },
  {
    id: "T1046",
    name: "Network Service Discovery",
    tactics: ["Discovery"],
    project: "recontool",
    evidence: {
      fr: "Balayages de ports détectés (3 ports distincts ou plus en 10 s) et mappés par alerte.",
      en: "Port sweeps detected (3+ distinct ports in 10 s) and mapped per alert.",
    },
  },
  {
    id: "T1557",
    name: "Adversary-in-the-Middle",
    tactics: ["Credential Access", "Collection"],
    project: "recontool",
    evidence: {
      fr: "ARP spoofing (même IP, nouvelle MAC) et redirections ICMP détectés et bloqués par l'agent.",
      en: "ARP spoofing (same IP, new MAC) and ICMP redirects detected and blocked by the agent.",
    },
  },
  {
    id: "T1498",
    name: "Network Denial of Service",
    tactics: ["Impact"],
    project: "recontool",
    evidence: {
      fr: "SYN floods (200 SYN ou plus vers un port en 10 s) détectés et source bloquée.",
      en: "SYN floods (200+ SYNs to one port in 10 s) detected and source blocked.",
    },
  },
];

export const techniqueById = Object.fromEntries(techniques.map((t) => [t.id, t])) as Record<
  string,
  AttackTechnique
>;
