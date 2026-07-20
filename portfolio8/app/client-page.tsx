"use client"

import dynamic from "next/dynamic"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EducationAndCertificationsSection, TestimonialsSection } from "@/components/credibility-sections"
import { CurrentWorkSection } from "@/components/current-work-section"

const HeroSection = dynamic(() => import("@/components/hero-section").then((mod) => mod.HeroSection), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-background">
      {/* <div className="animate-pulse text-primary">Loading...</div> */}
    </div>
  ),
})

export function ClientPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <EducationAndCertificationsSection />
      <CurrentWorkSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

