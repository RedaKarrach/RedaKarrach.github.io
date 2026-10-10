import type { PathEntry } from "./types";

export const path: PathEntry[] = [
  {
    kind: "internship",
    period: "2025",
    title: {
      fr: "Stagiaire sécurité applicative (pentest web)",
      en: "Application security intern (web pentest)",
    },
    org: { fr: "Circet", en: "Circet" },
    place: "Casablanca",
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
