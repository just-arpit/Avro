import React, { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { StatsTicker } from './components/StatsTicker'
import { PackagingArchitecture } from './components/PackagingArchitecture'
import { StepperRitual } from './components/StepperRitual'
import { FlavorLineup } from './components/FlavorLineup'
import { WhyAvroSection } from './components/WhyAvroSection'
import { BrandStory } from './components/BrandStory'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'
import { WaitlistModal } from './components/WaitlistModal'
import { FLAVORS, FlavorData } from './constants/flavors'

function AppContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const [activeFlavor, setActiveFlavor] = useState<FlavorData>(FLAVORS[0])

  const handleOpenWaitlist = () => setWaitlistOpen(true)
  const handleCloseWaitlist = () => setWaitlistOpen(false)

  return (
    <div
      className="min-h-screen bg-[#fdfcfc] dark:bg-[#06060A] text-[#000000] dark:text-[#F5F5F2] selection:bg-[#ff4704]/20 selection:text-[#ff4704] relative font-['Inter',sans-serif] transition-colors duration-500 ease-out"
      style={{
        // Global flavor theme CSS variables
        ['--flavor-color' as any]: activeFlavor.color,
        ['--flavor-glow' as any]: activeFlavor.glowColor,
        ['--flavor-bg-hero' as any]: activeFlavor.bgHero,
        ['--flavor-bg-section' as any]: activeFlavor.bgSection,
      }}
    >
      {/* Floating Sticky Navigation */}
      <Navbar
        onOpenWaitlist={handleOpenWaitlist}
        activeFlavor={activeFlavor}
      />

      {/* Main Content: 7-Stage Cinematic Narrative */}
      <main>
        {/* Stage 1: The Reveal — 3D Product Scene + Interstellar Fluid + Flavor Switcher */}
        <Hero
          onOpenWaitlist={handleOpenWaitlist}
          activeFlavor={activeFlavor}
          onSelectFlavor={setActiveFlavor}
        />

        {/* Transition: Purity & Formulation Metrics */}
        <StatsTicker activeFlavor={activeFlavor} />

        {/* Stage 2: The Product — 3-Layer Packaging Architecture & Macro Details */}
        <PackagingArchitecture />

        {/* Stage 3: The Ritual — 5-Step Interactive 30-Second Dissolution Sequence */}
        <StepperRitual />

        {/* Stage 4: Flavors — 5 Signature Profiles & 3D Adaptive Studio */}
        <FlavorLineup
          onOpenWaitlist={handleOpenWaitlist}
          activeFlavor={activeFlavor}
          onSelectFlavor={setActiveFlavor}
        />

        {/* Stage 5: Why AVRO — 4 Architectural Pillars & Direct Format Comparison Matrix */}
        <WhyAvroSection />

        {/* Stage 6: Brand Story — Origin, Design Vision & Everyday Carry (EDC) Contexts */}
        <BrandStory />

        {/* Stage 7: Questions & Truth — 13g.fr-style FAQ with animated pill cards */}
        <FAQSection onOpenWaitlist={handleOpenWaitlist} />

        {/* Conversion Finale: Priority Access Reservation */}
        <CTASection
          onOpenWaitlist={handleOpenWaitlist}
          activeFlavor={activeFlavor}
        />
      </main>

      {/* Footer with Colossal Wordmark & Transparent Disclaimers */}
      <Footer onOpenWaitlist={handleOpenWaitlist} />

      {/* Early Access Waitlist Dialog (shadcn/ui primitive) */}
      <WaitlistModal isOpen={waitlistOpen} onClose={handleCloseWaitlist} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
