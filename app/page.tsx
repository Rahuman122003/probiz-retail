import Hero from "@/components/Hero";
import ScrollStory from "@/components/ScrollStory";
import Features from "@/components/Features";
import AISection from "@/components/AISection";
import AICameraShowcase from "@/components/AICameraShowcase";
import POSShowcase from "@/components/POSShowcase";
import MeetProx from "@/components/MeetProx";
import Timeline from "@/components/Timeline";
import Dashboard from "@/components/Dashboard";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollStory />
      <Features />
      <AISection />
      <AICameraShowcase />
      <POSShowcase />
      <MeetProx />
      <Timeline />
      <Dashboard />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}