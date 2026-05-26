"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { FeaturesSection } from "@/components/ui/features-section";
import { ArchitectureGrid } from "@/components/ui/architecture-grid";
import { FaqSection } from "@/components/ui/faq-section";
import { PerspectiveMarquee } from "@/components/ui/perspective-marquee";
import { TechStackCarousel } from "@/components/ui/tech-stack-carousel";
import { Announcements } from "@/components/ui/announcements";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Home() {
  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full bg-background min-h-screen font-sans selection:bg-white/20 overflow-x-hidden">
      {/* 
        MAIN CONTENT AREA 
        We use a high z-index and minimum height to allow the user 
        to scroll down and reveal the footer securely underneath.
      */}
      <main className="relative z-10 w-full bg-background border-b border-border/10 shadow-2xl rounded-b-3xl pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Hero Section */}
        <CinematicHero />

        {/* Tech Stack Loop */}
        <TechStackCarousel />
        
        {/* Perspective Marquee Ribbon showing Core Excel MCP Operations */}
        <div className="w-full py-12 relative overflow-hidden bg-background">
          <PerspectiveMarquee 
            items={["THINKERHUB", "FOOS UNITED"]}
            speed={0.4}
            fontSize={64} 
            color="color-mix(in srgb, var(--color-foreground) 40%, transparent)" 
            fadeColor="var(--background)" 
            rotateY={-24}
            rotateX={6}
          />
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* System Architecture Grid */}
        <ArchitectureGrid />

        {/* Technical FAQ Section */}
        <FaqSection />

        {/* Announcements Section */}
        <Announcements />
      </main>

      {/* The Cinematic Footer is injected here */}
      <CinematicFooter />
    </div>
  );
}
