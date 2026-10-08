import type { ToolGroup } from "./types";

export const toolkit: ToolGroup[] = [
  {
    id: "soc",
    label: { fr: "SOC et détection", en: "SOC and detection" },
    tools: [
      "Wazuh",
      "Shuffle (SOAR)",
      "TheHive",
      "Cortex",
      "MITRE ATT&CK",
      "Atomic Red Team",
      "Wireshark",
    ],
  },
  {
    id: "pentest",
    label: { fr: "Pentest", en: "Pentest" },
    tools: ["OWASP Top 10", "Burp Suite", "SQLMap", "Nmap", "Hydra", "Kali Linux", "CVSS"],
  },
  {
    id: "network",
    label: { fr: "Réseau et systèmes", en: "Network and systems" },
    tools: [
      "TCP/IP",
      "Scapy",
      "GNS3",
      "Linux",
      "Docker",
      "Zabbix",
      "Prometheus",
      "Grafana",
      "VirtualBox",
    ],
  },
  {
    id: "crypto",
    label: { fr: "Cryptographie", en: "Cryptography" },
    tools: ["OpenSSL", "PKI/TLS", "Chiffrement symétrique et asymétrique", "Cryptanalyse"],
  },
  {
    id: "software",
    label: { fr: "Ingénierie logicielle", en: "Software engineering" },
    tools: [
      "Python",
      "Bash",
      "SQL",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js/Express",
      "Django/DRF",
      "PHP",
    ],
  },
  {
    id: "studied",
    label: { fr: "Étudié", en: "Studied" },
    studied: true,
    tools: [
      "GRC et gestion des risques",
      "Audit de sécurité",
      "Forensique numérique",
      "Analyse de malware",
      "Hacking éthique",
      "Sécurité cloud",
    ],
  },
];

/** English labels for the tools whose names are not language-neutral. */
export const toolLabelEn: Record<string, string> = {
  "Chiffrement symétrique et asymétrique": "Symmetric and asymmetric encryption",
  Cryptanalyse: "Cryptanalysis",
  "GRC et gestion des risques": "GRC and risk management",
  "Audit de sécurité": "Security audit",
  "Forensique numérique": "Digital forensics",
  "Analyse de malware": "Malware analysis",
  "Hacking éthique": "Ethical hacking",
  "Sécurité cloud": "Cloud security",
};

/** Tools the 2024 internship relied on, used to highlight the Path entry too. */
export const internshipTools = ["OWASP Top 10", "Burp Suite", "SQLMap", "CVSS", "Django/DRF"];
