import React from 'react'
import { ArrowRight } from 'lucide-react'
import { ThreeWebGPUScene } from './ThreeWebGPUScene'
import { InterstellarFluidHero } from './InterstellarFluidHero'
import { FLAVORS, FlavorData } from '../constants/flavors'

interface HeroProps {
  onOpenWaitlist: () => void
  activeFlavor?: FlavorData
  onSelectFlavor?: (flavor: FlavorData) => void
}

export const Hero: React.FC<HeroProps> = ({
  onOpenWaitlist,
  activeFlavor = FLAVORS[0],
  onSelectFlavor
}) => {
  const scrollToProduct = () => {
    const el = document.getElementById('product')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100dvh] w-full bg-[#fdfcfc] dark:bg-[#06060A] text-[#000000] dark:text-white flex flex-col overflow-hidden transition-colors duration-500">
      {/* Layer 0: Interstellar Fluid Background for Dark Mode */}
      <div className="hidden dark:block absolute inset-0 z-0 pointer-events-none">
        <InterstellarFluidHero
          flavorColor={activeFlavor.color}
          intensity={0.8}
        />
      </div>

      {/* Layer 0: Ethereal Subtle Warm Spark for Light Mode (ElevenLabs Warm Minimalist Paper) */}
      <div className="block dark:hidden absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 48% 46%, ${activeFlavor.color}15 0%, transparent 60%), radial-gradient(circle at 75% 30%, #0447ff0a 0%, transparent 50%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcfc]/30 via-transparent to-[#fdfcfc]" />
      </div>

      {/* Layer 1: Dark Mode Ambient Depth Gradient */}
      <div className="hidden dark:block absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060A] via-[#06060A]/20 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060A]/40 via-transparent to-[#06060A]/20" />
      </div>

      {/* Layer 2: Three.js Product Scene - pointer-events-auto so 360-degree drag works everywhere */}
      <div className="absolute inset-0 z-[2] pointer-events-auto">
        <ThreeWebGPUScene
          activeFlavor={activeFlavor}
          activeFlavorColor={activeFlavor.color}
          activeFlavorName={activeFlavor.name}
        />
      </div>

      {/* Layer 3: Overlay Content - pointer-events-none on container so drag passes directly to 3D scene */}
      <div className="relative z-10 flex flex-col justify-between min-h-[100dvh] px-5 sm:px-8 lg:px-12 pt-24 pb-8 sm:pb-12 pointer-events-none">
        {/* Top: Concept notice + flavor switcher (pointer-events-auto for clicks) */}
        <div className="flex items-center justify-between gap-4 pointer-events-auto">
          <div className="rounded-full px-3.5 py-1.5 text-[11px] font-[500] tracking-[0.08em] uppercase bg-[#f5f3f1] dark:bg-white/10 text-[#44403b] dark:text-white/70 border border-[#ebe8e4] dark:border-white/10 shadow-xs">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            Concept Preview
          </div>

          {/* Flavor Switcher Pill */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#f5f3f1] dark:bg-white/10 border border-[#ebe8e4] dark:border-white/10 shadow-xs">
            {FLAVORS.map((f) => {
              const isSelected = activeFlavor.id === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => onSelectFlavor?.(f)}
                  className={`px-3 py-1 rounded-full text-[12px] font-[500] transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#000000] text-white dark:bg-white dark:text-black font-[500] shadow-xs'
                      : 'text-[#777169] hover:text-[#000000] dark:text-white/60 dark:hover:text-white hover:bg-[#ebe8e4]/60 dark:hover:bg-white/10'
                  }`}
                  aria-label={`Select ${f.name} flavor`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: f.color,
                      boxShadow: isSelected ? `0 0 8px ${f.color}` : 'none'
                    }}
                  />
                  <span className="hidden lg:inline">{f.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Spacer for 3D scene (completely transparent to drag) */}
        <div className="flex-1 min-h-[180px] sm:min-h-[260px] pointer-events-none" />

        {/* Bottom: Editorial headline + CTA */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pointer-events-none">
          {/* Left: Whisper Headline */}
          <div className="lg:col-span-7 pointer-events-none select-none">
            <h1 className="whisper-display text-5xl sm:text-7xl lg:text-8xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white select-none leading-[1.04]">
              Focus,<br />
              dissolved.
            </h1>
            <p className="mt-4 text-[13px] text-[#777169] dark:text-white/40 max-w-md font-[400]">
              * Concept prototype — visuals are for demonstration, not final production.
            </p>
          </div>

          {/* Right: Supporting copy + CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6 pointer-events-none">
            <p className="text-base sm:text-lg text-[#777169] dark:text-white/70 max-w-md text-left lg:text-right select-none font-[400] leading-[1.5]">
              A pocket-sized oral strip that delivers functional caffeine sublingually — no water, no cup, no crash.
            </p>

            {/* Interactive Pill Buttons: pointer-events-auto */}
            <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
              {/* Primary Filled Pill Button */}
              <button
                onClick={onOpenWaitlist}
                className="group inline-flex items-center gap-2 rounded-full bg-[#000000] text-white dark:bg-white dark:text-black font-[500] px-6 py-3 text-[14px] hover:opacity-90 transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-sm border border-[#e5e5e5] dark:border-transparent"
              >
                <span>Join the Waitlist</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Secondary Outline Pill Button */}
              <button
                onClick={scrollToProduct}
                className="inline-flex items-center gap-2 rounded-full bg-[#fdfcfc] text-[#000000] dark:bg-white/10 dark:text-white font-[500] px-5 py-3 text-[14px] hover:bg-[#f5f3f1] dark:hover:bg-white/20 transition-all cursor-pointer border border-[#ebe8e4] dark:border-white/15"
              >
                Explore
              </button>
            </div>

            {/* Micro labels */}
            <div className="flex items-center gap-4 text-[11px] text-[#a59f97] dark:text-white/35 font-normal select-none">
              <span>Water-Free</span>
              <span className="w-px h-3 bg-[#ebe8e4] dark:bg-white/10" />
              <span>Under 30s Melt</span>
              <span className="w-px h-3 bg-[#ebe8e4] dark:bg-white/10" />
              <span>5 Flavors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

