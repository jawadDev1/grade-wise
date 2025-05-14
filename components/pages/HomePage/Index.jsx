import AboutUs from "@/components/sections/AboutUs";
import Brands from "@/components/sections/Brands";
import CTA from "@/components/sections/CTA";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">
      <Hero />
      <Brands />
      <Services />
      <AboutUs />
      <Features />
      <CTA />
    </main>
  );
};

export default HomePage;
