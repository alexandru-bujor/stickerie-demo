import { About } from "../components/home/About";
import { BestSellers } from "../components/home/BestSellers";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { Hero } from "../components/home/Hero";
import { HowToOrder } from "../components/home/HowToOrder";
import { SavedProjects } from "../components/home/SavedProjects";
import { WhatsAppBand } from "../components/home/WhatsAppBand";

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <SavedProjects />
      <About />
      <HowToOrder />
      <BestSellers />
      <WhatsAppBand />
    </>
  );
}
