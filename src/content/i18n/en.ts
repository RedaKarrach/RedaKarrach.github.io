import type { Dict } from "./fr";

export const en: Dict = {
  meta: {
    title: "Mohamed Reda Karrach · Cybersecurity",
    description:
      "Portfolio of Mohamed Reda Karrach, cybersecurity engineering student in Casablanca: intrusion detection, incident response, penetration testing and software development. Looking for a final-year internship (PFE) from early 2027.",
  },
  a11y: {
    skip: "Skip to content",
    external: "(opens in a new tab)",
    menu: "Open menu",
    closeMenu: "Close menu",
  },
  nav: {
    services: "What I do",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    path: "Path",
    contact: "Contact",
  },
  hero: {
    greeting: "Hello, I am",
    kicker: "Cybersecurity",
    role: "Cybersecurity engineering student",
    tagline:
      "I protect computer systems: I detect attacks, organise the response, and build the tools to do it myself.",
    location: "Casablanca, Morocco",
    availability: "Available for a 4 to 6 month final-year internship (PFE) from early 2027",
    cv: "Download my CV",
    projects: "See my projects",
    photoAlt: "Portrait of Mohamed Reda Karrach",
    ringLabel: "Tools I use every day",
    socialsLabel: "Social links and contact",
    socials: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Send me an email",
      phone: "Call me",
    },
  },
  services: {
    kicker: "What I do",
    title: "Four ways I can help a team",
    sub: "Explained simply, without jargon.",
    items: [
      {
        title: "Monitoring and incident response",
        text: "I set up tools that spot attacks in real time and trigger the response automatically: enrich the alert, open a case, notify the team.",
      },
      {
        title: "Penetration testing",
        text: "I look for weaknesses in an application before attackers do, demonstrate them, then help fix them. Hands-on experience on a real web API during an internship (OWASP Top 10, Burp Suite).",
      },
      {
        title: "Software development",
        text: "I build complete web applications, from database to interface: Python and Django, React, Next.js, Node.js. This website is one example.",
      },
      {
        title: "Networks and systems",
        text: "Linux, Docker, TCP/IP, monitoring with Zabbix, Prometheus and Grafana. I set up and run the environments of my projects myself.",
      },
    ],
  },
  about: {
    kicker: "About",
    title: "Who I am",
    paragraphs: [
      "I am in the 5th year of the Cybersecurity and Network Infrastructure engineering track at EMSI in Casablanca. My favourite side is defence: monitoring systems, detecting attacks and responding quickly and well.",
      "I also have an offensive background, with a web application penetration testing internship, and real full-stack development experience. That lets me understand the systems I protect and build my own tools when needed.",
      "I would rather show what actually works than make promises: each of my projects states clearly what it does, what it validated and where its limits are.",
    ],
    facts: [
      { label: "Location", value: "Casablanca, Morocco" },
      {
        label: "Education",
        value:
          "EMSI, Cybersecurity and Network Infrastructure engineering track, 5th year (2022–2027)",
      },
      { label: "Languages", value: "French (certified B2), professional English" },
      {
        label: "Goal",
        value:
          "4 to 6 month PFE internship from early 2027: SOC, incident response, pentest or cloud security",
      },
    ],
  },
  lab: {
    kicker: "My lab",
    title: "An infrastructure I built myself",
    sub: "Every dot in this interactive diagram is a real machine or piece of software from my two projects. Rotate the view, hover a dot to see what it does, click to open the project.",
    caption: "Interactive 3D view",
    hint: "Drag to rotate · hover a dot · click to open the project",
    staticHint: "Static view (reduced motion)",
    aria: "Interactive 3D diagram of both projects' infrastructure: the two-computer SOC lab and the ReconTool platform.",
    legend: {
      "pc-a": "Computer A · detection and automation",
      "pc-b": "Computer B · enrichment and incident cases",
      endpoint: "Monitored machines",
      external: "External threat intelligence",
      recon: "ReconTool",
      attacker: "Simulated attacker",
    },
    openProject: "Open the project",
  },
  projects: {
    kicker: "Projects",
    title: "What I have built",
    sub: "Two main projects, explained simply, with their source code on GitHub.",
    what: "In a few words",
    highlights: "Key points",
    tech: "Technologies",
    techniques: "Attacks detected (MITRE ATT&CK framework)",
    limits: "Known limitations",
    details: "Technical details",
    context: "Context",
    roadmap: "Next steps",
    github: "View the code on GitHub",
    screenshots: "Screenshots",
    openShot: "Enlarge screenshot",
    noScreens: "No screenshots published for this project.",
    usesTool: "uses",
  },
  skills: {
    kicker: "Skills",
    title: "Tools and technologies I use",
    sub: "Click an item to see which project I used it in.",
    studiedNote: "Subjects studied in the engineering track, not claimed expertise.",
  },
  path: {
    kicker: "Path",
    heading: "Education and experience",
    sub: "Studies, internship and projects, most recent first.",
    kinds: {
      education: "Education",
      internship: "Internship",
      project: "Project",
    },
    certifications: "Certifications",
    languages: "Languages",
    languageList: [
      { lang: "French", level: "B2 (certified)" },
      { lang: "English", level: "Professional" },
    ],
  },
  contact: {
    kicker: "Contact",
    title: "Let's work together",
    sub: "An internship, a question, a collaboration? Write to me, I reply quickly.",
    email: "By email",
    phone: "By phone",
    linkedin: "On LinkedIn",
    github: "My code on GitHub",
    cv: "Download my CV (PDF)",
    copy: "Copy address",
    copied: "Address copied",
    copyPhone: "Copy number",
    copiedPhone: "Number copied",
  },
  theme: { label: "Theme", dark: "Dark", light: "Light" },
  lang: { label: "Language", fr: "FR", en: "EN" },
  lightbox: {
    close: "Close",
    prev: "Previous screenshot",
    next: "Next screenshot",
    counter: (i: number, n: number) => `Screenshot ${i} of ${n}`,
  },
};
