import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { identity } from "@/content/identity";
import { fr } from "@/content/i18n/fr";

export const dynamic = "force-static";
export const alt = fr.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b1620";
const FG = "#e8eef3";
const ACCENT = "#34d399";

async function font(file: string) {
  return readFile(path.join(process.cwd(), "src", "fonts", "og", file));
}

export default async function OpenGraphImage() {
  const [sans600, sans400, photo] = await Promise.all([
    font("ibm-plex-sans-latin-600-normal.woff"),
    font("ibm-plex-sans-latin-400-normal.woff"),
    readFile(path.join(process.cwd(), "public", "profile", "reda-400.webp")),
  ]);
  const photoSrc = `data:image/webp;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: BG,
        color: FG,
        padding: "64px 72px",
        fontFamily: "Plex Sans",
        backgroundImage: `radial-gradient(circle at 80% 30%, rgba(52,211,153,0.22), transparent 55%)`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 720 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: ACCENT,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          <div style={{ width: 28, height: 3, background: ACCENT }} />
          CYBERSÉCURITÉ
        </div>
        <div style={{ fontSize: 74, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
          {identity.name}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            lineHeight: 1.35,
            color: "rgba(232,238,243,0.8)",
          }}
        >
          Étudiant ingénieur en cybersécurité. Détection d&apos;intrusions, réponse aux incidents,
          tests d&apos;intrusion et développement logiciel.
        </div>
        <div style={{ fontSize: 24, color: ACCENT, marginTop: 10 }}>
          Casablanca · Stage PFE dès début 2027
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 340,
          height: 340,
          borderRadius: 999,
          border: `6px solid ${ACCENT}`,
          padding: 8,
          background: BG,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          width={312}
          height={312}
          alt=""
          style={{ borderRadius: 999, objectFit: "cover" }}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Plex Sans", data: sans600, weight: 600, style: "normal" },
        { name: "Plex Sans", data: sans400, weight: 400, style: "normal" },
      ],
    },
  );
}
