# Mohamed Reda Karrach · Portfolio

Personal portfolio of Mohamed Reda Karrach, 5th-year cybersecurity engineering student in Casablanca (SOC and Blue Team focus, pentest background, full-stack development background). Written to be readable by non-technical visitors first, with technical depth one click away.

Live site: https://case-rk-2027.vercel.app (change `siteUrl` in `src/content/identity.ts` if the domain changes)

![Home](docs/screenshots/home.webp)

## Sections

1. **Home.** Name, role, one plain sentence, location and availability, CV download, GitHub / LinkedIn / email, round portrait.
2. **What I do.** Four cards around the portrait, in plain words: monitoring and incident response, penetration testing, software development, networks and systems.
3. **About.** Three short paragraphs and four facts (location, education, languages, goal: a 4 to 6 month PFE internship from early 2027).
4. **My lab.** An interactive 3D view of both projects' real infrastructure (Canvas 2D with hand-written perspective projection, no 3D library). Drag to rotate, hover a node to read its role, click to open the project. Static under `prefers-reduced-motion`.
5. **Projects.** One card per project with a one-paragraph explanation anyone can follow, key points, technologies, the attacks it detects (MITRE ATT&CK IDs, linked), known limitations, a **View the code on GitHub** button, and a **Technical details** toggle with architecture, detection rules, playbook, validation, roadmap and screenshots (lightbox). Below, the other public repositories, fetched from the GitHub API at build time with a committed fallback.
6. **Skills.** Grouped chips. Clicking a chip highlights the projects (and the internship) that used it. Studied subjects are labelled as such.
7. **Path.** Timeline of education, internship and projects, plus certifications and languages.
8. **Contact.** Email (with copy button), LinkedIn, GitHub, CV.

Also: FR / EN toggle (French by default), dark / light theme (follows the system on first visit, remembered in `localStorage`), print stylesheet, custom 404, Open Graph image generated at build time with the portrait.

## Architecture

```
src/
├─ app/            layout (fonts, metadata, theme boot script), page, globals.css (tokens, components, print),
│                  opengraph-image, sitemap, robots, not-found
├─ content/        ALL facts live here, typed: identity, projects, coverage (ATT&CK techniques),
│                  topology (3D scene), toolkit, path, i18n/{fr,en}, repos.json, screenshots.json
├─ components/site Nav, Hero, Portrait, Services, About, Lab + LabTopology, Projects + ProjectCard + Repos,
│                  Screenshots + Lightbox, Skills, PathTimeline, Contact, Footer, Section, Icon, SkipLink
└─ lib/            providers (app state), prefs (external store for theme and language),
                   projection (3D maths), hooks, format, attack (ATT&CK links)
scripts/
├─ fetch-repos.mjs       prebuild: GitHub API → src/content/repos.json, falls back to the committed file
├─ optimise-images.mjs   PNG screenshots → AVIF + WebP at 1600 and 640 px, writes a dimensions manifest
├─ csp-hashes.mjs        hashes every inline <script> in out/ and writes vercel.json (see Security)
└─ postbuild.mjs         fails the build on external scripts or styles, em dashes, or an expired security.txt
```

Design: deep navy background, mint accent, amber for caveats, with a light theme. All colour pairs meet WCAG 2.2 AA. IBM Plex Sans and Plex Mono are self-hosted (`src/fonts`, OFL) through `next/font/local`. Tailwind CSS 4 utilities map to CSS custom properties so one class works in both themes.

Runtime dependencies: `next`, `react`, `react-dom`. Nothing else ships to the browser.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run images       # regenerate public/screenshots from .raw-shots/*.png
npm run build        # prebuild fetches repos, builds the static export to out/, verifies CSP hashes, runs postbuild checks
npm run csp          # regenerate vercel.json hashes after a change that alters the HTML
npm run lint && npm run typecheck && npm run format:check
```

Put the CV at `public/cv/Karrach_CV.pdf` and the portrait source at `.raw-shots/profile/reda.png` (optimised copies live in `public/profile`).

## Deploy (Vercel)

1. Import the GitHub repository in Vercel. Framework preset: Next.js. Build command `npm run build`, output directory `out`.
2. `vercel.json` carries the security headers and clean URLs; it is committed.
3. Optional: a `GITHUB_TOKEN` environment variable raises the rate limit for the build-time repository fetch. Without it the committed `repos.json` is used when the API refuses.

If a deploy fails with `csp-hashes: vercel.json is stale`, run `npm run build && npm run csp` locally and commit `vercel.json`. A fixed `generateBuildId` keeps the inline bootstrap scripts byte-identical across machines for the same source tree.

## Security

Headers set in `vercel.json`:

| Header                       | Value                                                                                                                                                                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content-Security-Policy      | `default-src 'none'; script-src 'self' 'sha256-…' (one hash per inline script); style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'; object-src 'none'; upgrade-insecure-requests` |
| Strict-Transport-Security    | `max-age=63072000; includeSubDomains; preload`                                                                                                                                                                                                                          |
| X-Content-Type-Options       | `nosniff`                                                                                                                                                                                                                                                               |
| X-Frame-Options              | `DENY`                                                                                                                                                                                                                                                                  |
| Referrer-Policy              | `no-referrer`                                                                                                                                                                                                                                                           |
| Permissions-Policy           | camera, microphone, geolocation, payment, usb, sensors, Topics all denied                                                                                                                                                                                               |
| Cross-Origin-Opener-Policy   | `same-origin`                                                                                                                                                                                                                                                           |
| Cross-Origin-Resource-Policy | `same-origin`                                                                                                                                                                                                                                                           |

- **No `unsafe-eval`, no `unsafe-inline`.** Next.js emits a few inline bootstrap scripts and this site adds one small boot script that applies the stored theme before paint. `scripts/csp-hashes.mjs` hashes each of them after the build; `npm run build` fails if the committed hashes do not match.
- **`style-src 'self'` with no exception.** The exported HTML contains no `style` attribute and no `<style>` tag (checked at build time). Dynamic styles (3D view tooltip) are applied client-side through the CSSOM, which CSP does not restrict.
- Every external link has `rel="noopener noreferrer"` and is announced as opening a new tab.
- No analytics, no trackers, no third-party scripts or fonts. A `/.well-known/security.txt` (RFC 9116) is published with the contact addresses and an expiry one year ahead.

## Measurements

| Check                               | Result                                    |
| ----------------------------------- | ----------------------------------------- |
| TypeScript / ESLint errors          | 0 / 0                                     |
| Lighthouse mobile (local export)    | see the table in the latest release note  |
| securityheaders.com                 | pending (measured after the first deploy) |
| Horizontal scroll at 360 to 1600 px | none                                      |

## Content rules

Every fact on the site comes from the owner's own CV and project repositories: identity, education, the 2024 application security internship, the Distributed SOC Lab, ReconTool, the toolkit, certifications and languages. Nothing is invented; limitations are shown on purpose.

## Licence

Code: MIT. Content (texts, screenshots, portrait, CV) belongs to Mohamed Reda Karrach. IBM Plex is licensed under the SIL Open Font License (see `src/fonts/LICENSE-IBM-Plex.txt`).
