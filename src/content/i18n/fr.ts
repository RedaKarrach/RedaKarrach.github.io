/**
 * French dictionary. This file defines the shape of the dictionary: `en.ts`
 * must provide the same keys (enforced by the Dict type).
 */
export const fr = {
  meta: {
    title: "Mohamed Reda Karrach · Cybersécurité",
    description:
      "Portfolio de Mohamed Reda Karrach, étudiant ingénieur en cybersécurité à Casablanca : détection d'intrusions, réponse aux incidents, tests d'intrusion et développement logiciel. À la recherche d'un stage de fin d'études (PFE) à partir de début 2027.",
  },
  a11y: {
    skip: "Aller au contenu",
    external: "(ouvre un nouvel onglet)",
    menu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  nav: {
    services: "Ce que je fais",
    about: "À propos",
    projects: "Projets",
    skills: "Compétences",
    path: "Parcours",
    contact: "Contact",
  },
  hero: {
    greeting: "Bonjour, je suis",
    kicker: "Cybersécurité",
    role: "Étudiant ingénieur en cybersécurité",
    tagline:
      "Je protège les systèmes informatiques : je détecte les attaques, j'organise la réponse et je développe moi-même les outils pour le faire.",
    location: "Casablanca, Maroc",
    availability: "Disponible pour un stage de fin d'études (PFE) de 4 à 6 mois dès début 2027",
    cv: "Télécharger mon CV",
    projects: "Voir mes projets",
    photoAlt: "Portrait de Mohamed Reda Karrach",
    ringLabel: "Outils que j'utilise au quotidien",
    socialsLabel: "Réseaux et contact",
    socials: { github: "GitHub", linkedin: "LinkedIn", email: "M'écrire un e-mail" },
  },
  services: {
    kicker: "Ce que je fais",
    title: "Quatre façons dont je peux aider une équipe",
    sub: "Expliquées simplement, sans jargon.",
    items: [
      {
        title: "Surveillance et réponse aux incidents",
        text: "Je mets en place des outils qui repèrent les attaques en temps réel et déclenchent automatiquement la réponse : enrichissement de l'alerte, ouverture d'un dossier, notification de l'équipe.",
      },
      {
        title: "Tests d'intrusion",
        text: "Je cherche les failles d'une application avant les attaquants, je les démontre, puis j'aide à les corriger. Expérience sur une API web réelle en stage (OWASP Top 10, Burp Suite).",
      },
      {
        title: "Développement logiciel",
        text: "Je construis des applications web complètes, de la base de données à l'interface : Python et Django, React, Next.js, Node.js. Ce site en est un exemple.",
      },
      {
        title: "Réseaux et systèmes",
        text: "Linux, Docker, TCP/IP, supervision avec Zabbix, Prometheus et Grafana. Je monte et j'administre moi-même les environnements de mes projets.",
      },
    ],
  },
  about: {
    kicker: "À propos",
    title: "Qui je suis",
    paragraphs: [
      "Je suis en 5e année du cycle ingénieur Cybersécurité et Infrastructure Réseau à l'EMSI, à Casablanca. Mon domaine de prédilection est la défense : surveiller des systèmes, détecter les attaques et y répondre vite et bien.",
      "J'ai aussi un passé côté attaque, avec un stage de tests d'intrusion sur une application web, et un vrai bagage de développeur full-stack. Cela me permet de comprendre les systèmes que je protège et de construire mes propres outils quand il le faut.",
      "Je préfère montrer ce qui fonctionne vraiment plutôt que de promettre : chacun de mes projets indique clairement ce qu'il fait, ce qu'il a validé et ses limites.",
    ],
    facts: [
      { label: "Localisation", value: "Casablanca, Maroc" },
      {
        label: "Formation",
        value: "EMSI, cycle ingénieur Cybersécurité et Infrastructure Réseau, 5e année (2022–2027)",
      },
      { label: "Langues", value: "Français (B2 certifié), anglais professionnel" },
      {
        label: "Objectif",
        value:
          "Stage PFE de 4 à 6 mois à partir de début 2027 : SOC, réponse à incident, pentest ou sécurité cloud",
      },
    ],
  },
  lab: {
    kicker: "Mon laboratoire",
    title: "Une infrastructure que j'ai montée moi-même",
    sub: "Chaque point de ce schéma interactif est une vraie machine ou un vrai logiciel de mes deux projets. Faites pivoter la vue, survolez un point pour savoir à quoi il sert, cliquez pour ouvrir le projet.",
    caption: "Vue 3D interactive",
    hint: "Glisser pour pivoter · survoler un point · cliquer pour ouvrir le projet",
    staticHint: "Vue statique (mouvement réduit)",
    aria: "Schéma 3D interactif de l'infrastructure des deux projets : le laboratoire SOC sur deux ordinateurs et la plateforme ReconTool.",
    legend: {
      "pc-a": "Ordinateur A · détection et automatisation",
      "pc-b": "Ordinateur B · enrichissement et dossiers d'incident",
      endpoint: "Machines surveillées",
      external: "Sources de renseignement externes",
      recon: "ReconTool",
      attacker: "Attaquant simulé",
    },
    openProject: "Ouvrir le projet",
  },
  projects: {
    kicker: "Projets",
    title: "Ce que j'ai construit",
    sub: "Deux projets principaux, expliqués simplement, avec leur code source sur GitHub.",
    what: "En quelques mots",
    highlights: "Points clés",
    tech: "Technologies",
    techniques: "Attaques détectées (référentiel MITRE ATT&CK)",
    limits: "Limites connues",
    details: "Détails techniques",
    context: "Contexte",
    roadmap: "Prochaines étapes",
    github: "Voir le code sur GitHub",
    screenshots: "Captures d'écran",
    openShot: "Agrandir la capture",
    noScreens: "Aucune capture d'écran publiée pour ce projet.",
    usesTool: "utilise",
  },
  skills: {
    kicker: "Compétences",
    title: "Outils et technologies que j'utilise",
    sub: "Cliquez sur un élément pour voir dans quel projet je l'ai utilisé.",
    studiedNote: "Matières étudiées en cycle ingénieur, pas une expertise revendiquée.",
  },
  path: {
    kicker: "Parcours",
    heading: "Formation et expérience",
    sub: "Études, stage et projets, du plus récent au plus ancien.",
    kinds: {
      education: "Formation",
      internship: "Stage",
      project: "Projet",
    },
    certifications: "Certifications",
    languages: "Langues",
    languageList: [
      { lang: "Français", level: "B2 (certifié)" },
      { lang: "Anglais", level: "Professionnel" },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Travaillons ensemble",
    sub: "Un stage, une question, une collaboration ? Écrivez-moi, je réponds rapidement.",
    email: "Par e-mail",
    linkedin: "Sur LinkedIn",
    github: "Mon code sur GitHub",
    cv: "Télécharger mon CV (PDF)",
    copy: "Copier l'adresse",
    copied: "Adresse copiée",
  },
  theme: { label: "Thème", dark: "Sombre", light: "Clair" },
  lang: { label: "Langue", fr: "FR", en: "EN" },
  lightbox: {
    close: "Fermer",
    prev: "Capture précédente",
    next: "Capture suivante",
    counter: (i: number, n: number) => `Capture ${i} sur ${n}`,
  },
};

export type Dict = typeof fr;
