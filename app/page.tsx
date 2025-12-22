import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DemoToggle from "@/components/DemoToggle";
import Revolutionize from "@/components/Revolutionize";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Revolutionize />
      <Features />
      <DemoToggle />
      <CTA />
    </main>
  );
}
