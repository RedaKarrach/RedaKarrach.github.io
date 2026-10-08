import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "soc-lab",
    title: { fr: "Distributed SOC Lab", en: "Distributed SOC Lab" },
    subtitle: {
      fr: "Un centre de surveillance de sécurité avec réponse automatique aux incidents",
      en: "A security operations centre with automated incident response",
    },
    period: "2025–2026",
    repo: "https://github.com/RedaKarrach/distributed-soc-lab",
    plain: {
      fr: "J'ai monté, sur deux ordinateurs, l'équivalent d'une salle de surveillance de sécurité comme on en trouve en entreprise. Des sondes installées sur les machines surveillées remontent ce qui s'y passe, un moteur de règles repère les comportements suspects, puis un automate enrichit l'alerte avec des sources de renseignement, décide si elle est malveillante et ouvre un dossier d'incident pour l'analyste. J'ai vérifié que tout fonctionne en simulant de vraies attaques, de bout en bout.",
      en: "On two computers, I built the equivalent of the security monitoring room you find in companies. Sensors on the monitored machines report what happens, a rules engine spots suspicious behaviour, then an automation enriches the alert with threat intelligence, decides whether it is malicious and opens an incident case for the analyst. I verified the whole chain by simulating real attacks, end to end.",
    },
    highlights: [
      {
        fr: "Surveillance en temps réel de trois machines : Ubuntu Server, Windows 11 et un poste Linux.",
        en: "Real-time monitoring of three machines: Ubuntu Server, Windows 11 and a Linux workstation.",
      },
      {
        fr: "Réponse automatisée : enrichissement de l'alerte, ouverture du dossier d'incident, notification de l'analyste.",
        en: "Automated response: alert enrichment, incident case creation, analyst notification.",
      },
      {
        fr: "Validé avec des simulations d'attaque réelles (Atomic Red Team), de la détection jusqu'au dossier.",
        en: "Validated with real attack simulations (Atomic Red Team), from detection to the case file.",
      },
      {
        fr: "Projet académique en équipe avec Mohamed Reda Radouani.",
        en: "Academic team project with Mohamed Reda Radouani.",
      },
    ],
    context: {
      fr: "Projet académique en équipe avec Mohamed Reda Radouani. SOC open source sur deux hôtes physiques.",
      en: "Academic team project with Mohamed Reda Radouani. Open-source SOC across two physical hosts.",
    },
    sections: [
      {
        heading: { fr: "Architecture", en: "Architecture" },
        items: [
          {
            fr: "PC A (16 Go) : Wazuh (manager, indexer, dashboard) et Shuffle.",
            en: "PC A (16 GB): Wazuh (manager, indexer, dashboard) and Shuffle.",
          },
          {
            fr: "PC B (8 Go) : TheHive, Cassandra, Elasticsearch et Cortex.",
            en: "PC B (8 GB): TheHive, Cassandra, Elasticsearch and Cortex.",
          },
          {
            fr: "Docker Compose sur les deux hôtes, LAN dédié 192.168.10.0/24.",
            en: "Docker Compose on both hosts, dedicated LAN 192.168.10.0/24.",
          },
          {
            fr: "Endpoints surveillés : Ubuntu Server, Windows 11, poste Linux (agents Wazuh).",
            en: "Monitored endpoints: Ubuntu Server, Windows 11, Linux workstation (Wazuh agents).",
          },
        ],
      },
      {
        heading: { fr: "Détection", en: "Detection" },
        items: [
          {
            fr: "Règles Wazuh personnalisées, chacune avec une sévérité et un identifiant de technique ATT&CK.",
            en: "Custom Wazuh rules, each with a severity and an ATT&CK technique ID.",
          },
          {
            fr: "Familles : exécution de commande suspecte via interpréteur de script (High), accès aux fichiers ou processus d'identifiants (Critical), scan de ports et découverte de services (Medium), trafic sortant vers un domaine ou une IP de réputation inconnue (High).",
            en: "Families: suspicious command execution via script interpreter (High), access to credential files or processes (Critical), port scanning and service discovery (Medium), outbound traffic to an unknown-reputation domain or IP (High).",
          },
        ],
      },
      {
        heading: { fr: "Playbook (Shuffle)", en: "Playbook (Shuffle)" },
        items: [
          {
            fr: "Une alerte Wazuh arrive par webhook, l'observable est extrait.",
            en: "A Wazuh alert arrives by webhook and the observable is extracted.",
          },
          {
            fr: "Enrichissement selon le type : IP via Cortex AbuseIPDB, hash de fichier via MalwareBazaar, URL ou domaine via URLhaus.",
            en: "Enrichment by observable type: IP via Cortex AbuseIPDB, file hash via MalwareBazaar, URL or domain via URLhaus.",
          },
          {
            fr: "Si malveillant : création d'un cas TheHive avec tags ATT&CK, classé TLP:AMBER / PAP:AMBER, et notification de l'analyste. Sinon : log seulement.",
            en: "If malicious: create a TheHive case with ATT&CK tags, classified TLP:AMBER / PAP:AMBER, and notify the analyst. If not: log only.",
          },
          {
            fr: "Modèles de cas avec champs obligatoires et convention de tagging des observables.",
            en: "Case templates with mandatory fields and an observable tagging convention.",
          },
        ],
      },
      {
        heading: {
          fr: "Validation (Atomic Red Team, VM victime jetable avec snapshot)",
          en: "Validation (Atomic Red Team, snapshotted disposable victim VM)",
        },
        items: [
          {
            fr: "T1053.003 Scheduled Task/Job: Cron, chaîne complète validée (test ART, alerte Wazuh, playbook, cas TheHive #3).",
            en: "T1053.003 Scheduled Task/Job: Cron, full chain validated (ART test, Wazuh alert, playbook, TheHive case #3).",
          },
          {
            fr: "T1543.002 Create or Modify System Process: Systemd Service, alerte traitée par le playbook.",
            en: "T1543.002 Create or Modify System Process: Systemd Service, alert processed by the playbook.",
          },
          {
            fr: "T1003 OS Credential Dumping, alerte « Mimikatz Usage Detected » reçue dans TheHive.",
            en: 'T1003 OS Credential Dumping, "Mimikatz Usage Detected" alert received in TheHive.',
          },
        ],
      },
    ],
    techniques: ["T1053.003", "T1543.002", "T1003"],
    stack: [
      "Wazuh",
      "Shuffle",
      "TheHive",
      "Cortex",
      "Cassandra",
      "Elasticsearch",
      "Docker Compose",
      "Atomic Red Team",
    ],
    limitations: [
      {
        fr: "Un seul réseau physique : en production il faudrait des VLAN, de la haute disponibilité et un gestionnaire de secrets.",
        en: "Single physical LAN: production would need VLANs, HA and a secrets manager.",
      },
      { fr: "Détection uniquement à base de règles.", en: "Rule-based detection only." },
      {
        fr: "Couverture ATT&CK volontairement étroite, validée en profondeur.",
        en: "Deliberately narrow ATT&CK coverage, validated in depth.",
      },
    ],
    roadmap: [
      {
        fr: "Plus de techniques : T1046, T1059, T1071, T1021.",
        en: "More techniques: T1046, T1059, T1071, T1021.",
      },
      { fr: "Responders Cortex pour le blocage d'IP.", en: "Cortex responders for IP blocking." },
      { fr: "Segmentation VLAN.", en: "VLAN segmentation." },
    ],
    screenshots: [
      { file: "01-wazuh-overview", alt: { fr: "Vue d'ensemble Wazuh", en: "Wazuh overview" } },
      {
        file: "02-wazuh-rules-breakdown",
        alt: { fr: "Répartition des règles Wazuh", en: "Wazuh rules breakdown" },
      },
      {
        file: "03-wazuh-agents",
        alt: { fr: "Agents Wazuh connectés", en: "Connected Wazuh agents" },
      },
      {
        file: "04-shuffle-playbook-overview",
        alt: { fr: "Vue d'ensemble du playbook Shuffle", en: "Shuffle playbook overview" },
      },
      { file: "05-playbook-logic", alt: { fr: "Logique du playbook", en: "Playbook logic" } },
      { file: "06-shuffle-editor", alt: { fr: "Éditeur Shuffle", en: "Shuffle editor" } },
      {
        file: "07-shuffle-executions",
        alt: { fr: "Exécutions Shuffle", en: "Shuffle executions" },
      },
      {
        file: "08-shuffle-execution-t1543",
        alt: { fr: "Exécution du playbook pour T1543", en: "Playbook execution for T1543" },
      },
      { file: "09-thehive-alerts", alt: { fr: "Alertes TheHive", en: "TheHive alerts" } },
      { file: "10-thehive-cases", alt: { fr: "Cas TheHive", en: "TheHive cases" } },
      {
        file: "11-thehive-case-t1053",
        alt: { fr: "Cas TheHive pour T1053", en: "TheHive case for T1053" },
      },
      { file: "12-cortex-analyzers", alt: { fr: "Analyseurs Cortex", en: "Cortex analyzers" } },
      { file: "13-cortex-jobs", alt: { fr: "Jobs Cortex", en: "Cortex jobs" } },
      {
        file: "14-cortex-urlhaus-report",
        alt: { fr: "Rapport Cortex URLhaus", en: "Cortex URLhaus report" },
      },
      {
        file: "17-attack-chain",
        alt: { fr: "Chaîne d'attaque validée", en: "Validated attack chain" },
      },
    ],
    tools: [
      "Wazuh",
      "Shuffle (SOAR)",
      "TheHive",
      "Cortex",
      "MITRE ATT&CK",
      "Atomic Red Team",
      "Linux",
      "Docker",
    ],
  },
  {
    id: "recontool",
    title: { fr: "ReconTool", en: "ReconTool" },
    subtitle: {
      fr: "Une plateforme qui détecte les intrusions sur un réseau en temps réel",
      en: "A platform that detects network intrusions in real time",
    },
    period: "2025–2026",
    repo: "https://github.com/RedaKarrach/NetworkReconnaissanceTool",
    plain: {
      fr: "Une application complète qui surveille un réseau et repère les attaques pendant qu'elles se produisent : balayage de ports, saturation du réseau, usurpation d'adresse. De petits programmes installés sur chaque machine bloquent automatiquement l'attaquant, et un tableau de bord web affiche les alertes en direct avec un score de risque par machine. Un rapport PDF résume chaque session. Projet de fin d'année (PFA), réalisé en laboratoire sur un réseau isolé.",
      en: "A complete application that watches a network and spots attacks as they happen: port scans, network flooding, address spoofing. Small programs installed on each machine block the attacker automatically, and a web dashboard shows live alerts with a risk score per machine. A PDF report summarises each session. End-of-year project (PFA), run in a lab on an isolated network.",
    },
    highlights: [
      {
        fr: "Détection et blocage automatique des attaques réseau courantes (SYN flood, ARP spoofing, redirection ICMP).",
        en: "Automatic detection and blocking of common network attacks (SYN flood, ARP spoofing, ICMP redirect).",
      },
      {
        fr: "Tableau de bord en temps réel avec un score de risque de 0 à 100 par machine.",
        en: "Real-time dashboard with a 0 to 100 risk score per machine.",
      },
      {
        fr: "Journal d'audit et rapports PDF de chaque session.",
        en: "Audit log and PDF reports for each session.",
      },
      {
        fr: "Développé de A à Z : agents Python, serveur Django, interface React.",
        en: "Built end to end: Python agents, Django server, React interface.",
      },
    ],
    context: {
      fr: "Usage en laboratoire uniquement, restreint à un sous-réseau VirtualBox host-only.",
      en: "Lab use only, restricted to a VirtualBox host-only subnet.",
    },
    sections: [
      {
        heading: { fr: "Agents endpoint", en: "Endpoint agents" },
        items: [
          {
            fr: "Agents Python/Scapy sur des VM Windows 10 et Ubuntu : détection des SYN floods, de l'ARP spoofing et des redirections ICMP.",
            en: "Python/Scapy agents on Windows 10 and Ubuntu VMs detect SYN floods, ARP spoofing and ICMP redirects.",
          },
          {
            fr: "Blocage automatique de la source avec iptables ou netsh advfirewall, avec un temps de refroidissement.",
            en: "Automatic blocking of the source with iptables or netsh advfirewall, with a cooldown.",
          },
        ],
      },
      {
        heading: { fr: "Détections plateforme", en: "Platform detections" },
        items: [
          {
            fr: "Balayages de ports : 3 ports distincts ou plus depuis une source en 10 s.",
            en: "Port sweeps: 3+ distinct ports from one source in 10 s.",
          },
          {
            fr: "SYN floods : 200 SYN ou plus vers un port en 10 s.",
            en: "SYN floods: 200+ SYNs to one port in 10 s.",
          },
          { fr: "Anomalies ARP : même IP, nouvelle MAC.", en: "ARP anomalies: same IP, new MAC." },
        ],
      },
      {
        heading: { fr: "Reconnaissance et simulation", en: "Reconnaissance and simulation" },
        items: [
          {
            fr: "Découverte d'hôtes ARP, scans SYN/UDP, fingerprinting OS passif (TTL, fenêtre TCP).",
            en: "ARP host discovery, SYN/UDP scans, passive OS fingerprinting (TTL, TCP window).",
          },
          {
            fr: "Simulation d'attaques (ARP spoof, SYN flood, redirection ICMP) depuis le dashboard ou un script Kali.",
            en: "Attack simulation (ARP spoof, SYN flood, ICMP redirect) from the dashboard or a Kali script.",
          },
        ],
      },
      {
        heading: { fr: "Fonctions SOC", en: "SOC features" },
        items: [
          {
            fr: "Mapping ATT&CK par alerte : T1046 Network Service Discovery, T1557 Adversary-in-the-Middle (ARP spoofing, redirection ICMP), T1498 Network Denial of Service.",
            en: "ATT&CK mapping per alert: T1046 Network Service Discovery, T1557 Adversary-in-the-Middle (ARP spoofing, ICMP redirect), T1498 Network Denial of Service.",
          },
          { fr: "Score de risque par hôte de 0 à 100.", en: "Per-host risk score 0 to 100." },
          {
            fr: "Heartbeat des agents (hors ligne après 5 min).",
            en: "Agent heartbeat (offline after 5 min).",
          },
          {
            fr: "Journal d'audit et rapports de session PDF (ReportLab).",
            en: "Audit log and PDF session reports (ReportLab).",
          },
        ],
      },
    ],
    techniques: ["T1046", "T1557", "T1498"],
    stack: [
      "Django 4.2",
      "DRF",
      "Django Channels",
      "Daphne",
      "Scapy 2.5",
      "MongoDB 6",
      "React 18",
      "D3.js",
      "Recharts",
      "Tailwind",
      "Docker Compose",
      "Nginx",
    ],
    limitations: [
      {
        fr: "Usage en laboratoire uniquement : sous-réseau VirtualBox host-only, pas de réseau de production.",
        en: "Lab use only: VirtualBox host-only subnet, no production network.",
      },
      {
        fr: "Détections à seuils fixes (3 ports / 10 s, 200 SYN / 10 s), pas d'apprentissage de ligne de base.",
        en: "Fixed-threshold detections (3 ports / 10 s, 200 SYNs / 10 s), no baseline learning.",
      },
    ],
    screenshots: [],
    tools: [
      "Scapy",
      "MITRE ATT&CK",
      "Kali Linux",
      "VirtualBox",
      "TCP/IP",
      "Python",
      "React",
      "Django/DRF",
      "Docker",
      "Linux",
    ],
  },
];

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<
  Project["id"],
  Project
>;
