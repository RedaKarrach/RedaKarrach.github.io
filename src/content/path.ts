import type { PathEntry } from "./types";

export const path: PathEntry[] = [
  {
    kind: "project",
    period: "2025–2026",
    title: { fr: "Distributed SOC Lab", en: "Distributed SOC Lab" },
    org: {
      fr: "Projet académique en équipe, playbooks de réponse à incident automatisés",
      en: "Academic team project, automated incident response playbooks",
    },
    link: {
      href: "#project-soc-lab",
      label: { fr: "Voir le projet", en: "View the project" },
    },
  },
  {
    kind: "project",
    period: "2025–2026",
    title: { fr: "ReconTool (PFA)", en: "ReconTool (PFA)" },
    org: {
      fr: "Plateforme de détection d'intrusion réseau en temps réel",
      en: "Real-time network intrusion detection platform",
    },
    link: {
      href: "#project-recontool",
      label: { fr: "Voir le projet", en: "View the project" },
    },
  },
  {
    kind: "internship",
    period: "2024",
    title: {
      fr: "Stagiaire sécurité applicative (pentest web)",
      en: "Application security intern (web pentest)",
    },
    org: { fr: "Stage académique encadré", en: "Supervised academic internship" },
    bullets: [
      {
        fr: "Tests d'intrusion d'une API Django REST contre l'OWASP Top 10 avec Burp Suite (manuel) et SQLMap (automatisé) ; SQLi, XSS et Broken Access Control identifiés et exploités.",
        en: "Penetration testing of a Django REST API against the OWASP Top 10 with Burp Suite (manual) and SQLMap (automated); SQLi, XSS and Broken Access Control identified and exploited.",
      },
      {
        fr: "Correctifs déployés : requêtes paramétrées, contrôle d'accès RBAC, Content Security Policy.",
        en: "Fixes deployed: parameterised queries, RBAC access control, Content Security Policy.",
      },
      {
        fr: "Rapports techniques avec scoring CVSS et recommandations ; veille CVE sur les composants Django.",
        en: "Technical reports with CVSS scoring and recommendations; CVE monitoring of Django components.",
      },
    ],
  },
  {
    kind: "education",
    period: "2022–2027",
    title: {
      fr: "Diplôme d'ingénieur, Cybersécurité et Infrastructure Réseau",
      en: "Engineering degree, Cybersecurity and Network Infrastructure",
    },
    org: {
      fr: "EMSI (École Marocaine des Sciences de l'Ingénieur), actuellement en 5e année",
      en: "EMSI (École Marocaine des Sciences de l'Ingénieur), currently 5th year",
    },
    place: "Casablanca",
  },
  {
    kind: "education",
    period: "2022",
    title: {
      fr: "Baccalauréat Sciences Physiques, mention Bien",
      en: "Baccalauréat Sciences Physiques, mention Bien",
    },
    org: { fr: "Azhar Erriad", en: "Azhar Erriad" },
    place: "Casablanca",
  },
];

export const certifications: { name: string; issuer: string; year: number }[] = [
  { name: "Introduction to Cybersecurity", issuer: "Coursera", year: 2024 },
  { name: "OWASP Top 10", issuer: "Coursera", year: 2024 },
  { name: "Unix/Linux Workbench", issuer: "Coursera", year: 2023 },
];
