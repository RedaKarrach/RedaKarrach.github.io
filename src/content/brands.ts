/**
 * Tool name (as written in toolkit.ts and projects.ts stacks) → brand icon.
 * `slug` refers to a simple-icons icon copied by scripts/gen-brand-icons.mjs;
 * tools without a freely licensed logo get a two-letter monogram `badge`.
 */
export interface Brand {
  slug?: string;
  badge?: string;
}

export const brands: Record<string, Brand> = {
  // SOC and detection
  Wazuh: { badge: "Wz" },
  "Shuffle (SOAR)": { badge: "Sh" },
  Shuffle: { badge: "Sh" },
  TheHive: { badge: "TH" },
  Cortex: { badge: "Cx" },
  "MITRE ATT&CK": { badge: "M" },
  "Atomic Red Team": { badge: "ART" },
  Wireshark: { slug: "wireshark" },
  Cassandra: { slug: "apachecassandra" },
  Elasticsearch: { slug: "elasticsearch" },
  // Pentest
  "OWASP Top 10": { badge: "OW" },
  "Burp Suite": { slug: "burpsuite" },
  SQLMap: { badge: "SQ" },
  Nmap: { badge: "Nm" },
  Hydra: { badge: "Hy" },
  "Kali Linux": { slug: "kalilinux" },
  CVSS: { badge: "CV" },
  // Network and systems
  "TCP/IP": { badge: "IP" },
  Scapy: { badge: "Sc" },
  "Scapy 2.5": { badge: "Sc" },
  GNS3: { badge: "G3" },
  Linux: { slug: "linux" },
  Docker: { slug: "docker" },
  "Docker Compose": { slug: "docker" },
  Zabbix: { badge: "Zx" },
  Prometheus: { slug: "prometheus" },
  Grafana: { slug: "grafana" },
  VirtualBox: { slug: "virtualbox" },
  Nginx: { slug: "nginx" },
  // Cryptography
  OpenSSL: { slug: "openssl" },
  "PKI/TLS": { badge: "TLS" },
  "Chiffrement symétrique et asymétrique": { badge: "AES" },
  Cryptanalyse: { badge: "Cr" },
  // Software engineering
  Python: { slug: "python" },
  Bash: { slug: "gnubash" },
  SQL: { badge: "SQL" },
  JavaScript: { slug: "javascript" },
  React: { slug: "react" },
  "React 18": { slug: "react" },
  "Next.js": { slug: "nextdotjs" },
  "Node.js/Express": { slug: "nodedotjs" },
  "Django/DRF": { slug: "django" },
  "Django 4.2": { slug: "django" },
  DRF: { slug: "django" },
  "Django Channels": { slug: "django" },
  Daphne: { badge: "Da" },
  PHP: { slug: "php" },
  "MongoDB 6": { slug: "mongodb" },
  "D3.js": { slug: "d3" },
  Recharts: { badge: "Rc" },
  Tailwind: { slug: "tailwindcss" },
  // Studied subjects
  "GRC et gestion des risques": { badge: "GRC" },
  "Audit de sécurité": { badge: "Au" },
  "Forensique numérique": { badge: "Fo" },
  "Analyse de malware": { badge: "Mw" },
  "Hacking éthique": { badge: "EH" },
  "Sécurité cloud": { badge: "Cl" },
};

/** Tools shown on the 3D ring around the portrait, in orbit order. */
export const heroRing = [
  "Wazuh",
  "TheHive",
  "Docker",
  "Python",
  "React",
  "Linux",
  "Kali Linux",
  "Django/DRF",
];
