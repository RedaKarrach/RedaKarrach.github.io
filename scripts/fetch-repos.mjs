/**
 * Build-time fetch of public repositories from the GitHub REST API.
 * Writes public/repos.json (fetched by the browser at runtime, so the HTML and its CSP hashes do not change when repositories do). If the API is unreachable or rate-limited,
 * the committed file is kept so the build never fails. Runs as `prebuild`.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const USER = "RedaKarrach";
const target = path.join(process.cwd(), "public", "repos.json");

async function main() {
  let existing = null;
  try {
    existing = JSON.parse(await readFile(target, "utf8"));
  } catch {
    existing = null;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "case-rk-2027-build",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        signal: controller.signal,
      },
    );
    clearTimeout(timer);
    if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Unexpected payload");

    const repos = data
      // Forks and the profile-README repository are not "my" projects.
      .filter((r) => !r.fork && r.name !== USER)
      .map((r) => ({
        name: r.name,
        description: r.description ?? null,
        language: r.language ?? null,
        pushedAt: r.pushed_at,
        url: r.html_url,
      }));

    const payload = { fetchedAt: new Date().toISOString(), user: USER, repos };
    await writeFile(target, JSON.stringify(payload, null, 2) + "\n");
    console.log(
      `fetch-repos: ${repos.length} repositories written to ${path.relative(process.cwd(), target)}`,
    );
  } catch (err) {
    if (existing) {
      console.warn(
        `fetch-repos: ${err.message}. Keeping committed fallback (${existing.repos.length} repos, fetched ${existing.fetchedAt}).`,
      );
      return;
    }
    console.error("fetch-repos: no fallback available and the API call failed.");
    throw err;
  }
}

await main();
