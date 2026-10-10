import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Landing } from "@/components/site/Landing";
import { Lab } from "@/components/site/Lab";
import { Nav } from "@/components/site/Nav";
import { PathTimeline } from "@/components/site/PathTimeline";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { SkipLink } from "@/components/site/SkipLink";

/**
 * Order follows what a recruiter checks first: who and what role (Landing,
 * About), the proof (Projects), the experience (Path), then the lab and skills.
 */
export default function Page() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Landing />
        <About />
        <Projects />
        <PathTimeline />
        <Lab />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
