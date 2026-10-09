import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Landing } from "@/components/site/Landing";
import { Lab } from "@/components/site/Lab";
import { Nav } from "@/components/site/Nav";
import { PathTimeline } from "@/components/site/PathTimeline";
import { Projects } from "@/components/site/Projects";
import { Services } from "@/components/site/Services";
import { Skills } from "@/components/site/Skills";
import { SkipLink } from "@/components/site/SkipLink";

export default function Page() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Landing />
        <Services />
        <About />
        <Lab />
        <Projects />
        <Skills />
        <PathTimeline />
        <Contact />
      </main>
    </>
  );
}
