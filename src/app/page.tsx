import { Experience } from "@/components/layout/Experience";
import { Hero } from "@/components/sections/Hero";
import { FeaturedStrip } from "@/components/sections/FeaturedStrip";
import { About } from "@/components/sections/About";
import { Founder } from "@/components/sections/Founder";
import { Awards } from "@/components/sections/Awards";
import { Team } from "@/components/sections/Team";
import { Services } from "@/components/sections/Services";
import { Clients } from "@/components/sections/Clients";
import { Media } from "@/components/sections/Media";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <Experience>
      <Hero />
      <FeaturedStrip />
      <About />
      <SectionDivider />
      <Founder />
      <Awards />
      <SectionDivider />
      <Team />
      <Services />
      <SectionDivider />
      <Clients />
      <Media />
      <SectionDivider />
      <Contact />
    </Experience>
  );
}
