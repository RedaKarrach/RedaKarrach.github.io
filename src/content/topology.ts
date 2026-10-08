import type { TopologyEdge, TopologyNode } from "./types";

/**
 * 3D scene data for the hero. Every node is a component named in the project
 * facts; positions are hand-placed in a unit cube. The SOC lab sits on the
 * left (x < 0), ReconTool on the right (x > 0).
 */
export const topologyNodes: TopologyNode[] = [
  // PC A (16 GB): Wazuh stack + Shuffle
  {
    id: "wazuh-manager",
    label: "Wazuh manager",
    group: "pc-a",
    pos: [-0.95, 0.25, 0.1],
    project: "soc-lab",
    detail: {
      fr: "PC A · reçoit les agents, applique les règles",
      en: "PC A · receives agents, applies rules",
    },
  },
  {
    id: "wazuh-indexer",
    label: "Wazuh indexer",
    group: "pc-a",
    pos: [-1.25, 0.55, -0.2],
    project: "soc-lab",
    detail: { fr: "PC A · indexation des alertes", en: "PC A · alert indexing" },
  },
  {
    id: "wazuh-dashboard",
    label: "Wazuh dashboard",
    group: "pc-a",
    pos: [-1.25, 0.05, -0.45],
    project: "soc-lab",
    detail: { fr: "PC A · visualisation", en: "PC A · visualisation" },
  },
  {
    id: "shuffle",
    label: "Shuffle",
    group: "pc-a",
    pos: [-0.6, 0.6, -0.1],
    project: "soc-lab",
    detail: {
      fr: "PC A · SOAR, webhook Wazuh, playbook",
      en: "PC A · SOAR, Wazuh webhook, playbook",
    },
  },
  // PC B (8 GB): TheHive, Cassandra, Elasticsearch, Cortex
  {
    id: "cortex",
    label: "Cortex",
    group: "pc-b",
    pos: [-0.25, 0.75, 0.35],
    project: "soc-lab",
    detail: { fr: "PC B · enrichissement des observables", en: "PC B · observable enrichment" },
  },
  {
    id: "thehive",
    label: "TheHive",
    group: "pc-b",
    pos: [-0.15, 0.3, 0.7],
    project: "soc-lab",
    detail: { fr: "PC B · cas TLP:AMBER / PAP:AMBER", en: "PC B · TLP:AMBER / PAP:AMBER cases" },
  },
  {
    id: "cassandra",
    label: "Cassandra",
    group: "pc-b",
    pos: [-0.45, -0.05, 0.95],
    project: "soc-lab",
    detail: { fr: "PC B · base de TheHive", en: "PC B · TheHive database" },
  },
  {
    id: "elasticsearch",
    label: "Elasticsearch",
    group: "pc-b",
    pos: [0.1, -0.05, 0.95],
    project: "soc-lab",
    detail: { fr: "PC B · index de TheHive", en: "PC B · TheHive index" },
  },
  // Monitored endpoints (Wazuh agents)
  {
    id: "ubuntu-server",
    label: "Ubuntu Server",
    group: "endpoint",
    pos: [-1.35, -0.55, 0.35],
    project: "soc-lab",
    detail: { fr: "Endpoint · agent Wazuh", en: "Endpoint · Wazuh agent" },
  },
  {
    id: "windows-11",
    label: "Windows 11",
    group: "endpoint",
    pos: [-0.95, -0.7, 0.6],
    project: "soc-lab",
    detail: { fr: "Endpoint · agent Wazuh", en: "Endpoint · Wazuh agent" },
  },
  {
    id: "linux-ws",
    label: "Linux workstation",
    group: "endpoint",
    pos: [-0.55, -0.6, 0.2],
    project: "soc-lab",
    detail: { fr: "Endpoint · agent Wazuh", en: "Endpoint · Wazuh agent" },
  },
  {
    id: "victim-vm",
    label: "Victim VM · Atomic Red Team",
    group: "attacker",
    pos: [-1.05, -0.3, -0.5],
    project: "soc-lab",
    detail: {
      fr: "VM jetable avec snapshot · tests T1053.003, T1543.002, T1003",
      en: "Snapshotted disposable VM · tests T1053.003, T1543.002, T1003",
    },
  },
  // External enrichment reached through Cortex
  {
    id: "abuseipdb",
    label: "AbuseIPDB",
    group: "external",
    pos: [-0.55, 1.15, 0.55],
    project: "soc-lab",
    detail: { fr: "Réputation IP", en: "IP reputation" },
  },
  {
    id: "malwarebazaar",
    label: "MalwareBazaar",
    group: "external",
    pos: [-0.15, 1.2, 0.2],
    project: "soc-lab",
    detail: { fr: "Hash de fichier", en: "File hash" },
  },
  {
    id: "urlhaus",
    label: "URLhaus",
    group: "external",
    pos: [0.15, 1.1, 0.6],
    project: "soc-lab",
    detail: { fr: "URL / domaine", en: "URL / domain" },
  },
  // ReconTool (VirtualBox host-only subnet)
  {
    id: "kali",
    label: "Kali attacker",
    group: "attacker",
    pos: [1.35, -0.5, -0.3],
    project: "recontool",
    detail: {
      fr: "ARP spoof · SYN flood · redirection ICMP",
      en: "ARP spoof · SYN flood · ICMP redirect",
    },
  },
  {
    id: "agent-win10",
    label: "Windows 10 agent",
    group: "recon",
    pos: [0.75, -0.55, 0.35],
    project: "recontool",
    detail: { fr: "Scapy · blocage netsh advfirewall", en: "Scapy · netsh advfirewall blocking" },
  },
  {
    id: "agent-ubuntu",
    label: "Ubuntu agent",
    group: "recon",
    pos: [1.3, -0.3, 0.6],
    project: "recontool",
    detail: { fr: "Scapy · blocage iptables", en: "Scapy · iptables blocking" },
  },
  {
    id: "django",
    label: "Django · Channels · Daphne",
    group: "recon",
    pos: [0.95, 0.25, 0.1],
    project: "recontool",
    detail: {
      fr: "API DRF, WebSocket temps réel, mapping ATT&CK",
      en: "DRF API, real-time WebSocket, ATT&CK mapping",
    },
  },
  {
    id: "mongodb",
    label: "MongoDB 6",
    group: "recon",
    pos: [1.35, 0.55, -0.1],
    project: "recontool",
    detail: { fr: "Alertes, hôtes, journal d'audit", en: "Alerts, hosts, audit log" },
  },
  {
    id: "react",
    label: "React dashboard",
    group: "recon",
    pos: [0.6, 0.75, -0.15],
    project: "recontool",
    detail: {
      fr: "D3 · Recharts · score de risque par hôte",
      en: "D3 · Recharts · per-host risk score",
    },
  },
  {
    id: "nginx",
    label: "Nginx",
    group: "recon",
    pos: [0.55, 0.3, -0.55],
    project: "recontool",
    detail: { fr: "Reverse proxy · Docker Compose", en: "Reverse proxy · Docker Compose" },
  },
];

export const topologyEdges: TopologyEdge[] = [
  // SOC lab chain
  { from: "ubuntu-server", to: "wazuh-manager" },
  { from: "windows-11", to: "wazuh-manager" },
  { from: "linux-ws", to: "wazuh-manager" },
  { from: "victim-vm", to: "wazuh-manager", flow: "red" },
  { from: "wazuh-manager", to: "wazuh-indexer" },
  { from: "wazuh-indexer", to: "wazuh-dashboard" },
  { from: "wazuh-manager", to: "shuffle", flow: "amber" },
  { from: "shuffle", to: "cortex", flow: "amber" },
  { from: "cortex", to: "abuseipdb" },
  { from: "cortex", to: "malwarebazaar" },
  { from: "cortex", to: "urlhaus" },
  { from: "cortex", to: "thehive", flow: "amber" },
  { from: "thehive", to: "cassandra" },
  { from: "thehive", to: "elasticsearch" },
  // ReconTool chain
  { from: "kali", to: "agent-win10", flow: "red" },
  { from: "kali", to: "agent-ubuntu", flow: "red" },
  { from: "agent-win10", to: "django", flow: "amber" },
  { from: "agent-ubuntu", to: "django", flow: "amber" },
  { from: "django", to: "mongodb" },
  { from: "django", to: "react", flow: "green" },
  { from: "nginx", to: "django" },
  { from: "nginx", to: "react" },
];
