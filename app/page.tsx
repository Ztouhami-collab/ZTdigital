import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Process from "@/components/Process";
import PriceBanner from "@/components/PriceBanner";
import Faq from "@/components/Faq";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Benefits />
      <Services />
      <Cases />
      <Process />
      <PriceBanner />
      <Faq />
      <CtaSection />
      <Footer />
    </main>
  );
}
