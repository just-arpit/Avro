import React from 'react'
import { ArrowUpRight, Sparkles, Check } from 'lucide-react'
import { FlavorData } from '../constants/flavors'

interface CTASectionProps {
  onOpenWaitlist: () => void
  activeFlavor?: FlavorData
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenWaitlist, activeFlavor }) => {
  const accentColor = activeFlavor?.color || '#FF5722'
  const glowColor = activeFlavor?.glowColor || 'rgba(255, 87, 34, 0.4)'
  return (
    <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-[#ebe8e4] dark:border-white/[0.08] bg-[#fdfcfc] dark:bg-[#08080A] text-[#000000] dark:text-white transition-colors duration-500">
      {/* Background Atmosphere - Flavor-Responsive Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] blur-[160px] pointer-events-none rounded-full transition-all duration-700 opacity-20 dark:opacity-60"
        style={{
          background: `radial-gradient(circle, ${accentColor}40 0%, ${accentColor}10 50%, transparent 80%)`
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="rounded-[24px] p-8 sm:p-16 bg-[#f5f3f1] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/12 shadow-xs text-center relative overflow-hidden">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdfcfc] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10 mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ff4704]" />
            <span className="text-[11px] font-mono tracking-[0.16em] text-[#44403b] dark:text-white/80 uppercase">
              REDEFINING EVERYDAY FOCUS
            </span>
          </div>

          {/* Headline - Whisper Display */}
          <h2 className="whisper-display text-4xl sm:text-6xl md:text-7xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white leading-[1.05]">
            Keep your flow. <br />
            No break required.
          </h2>

          {/* Supporting Line */}
          <p className="mt-6 text-base sm:text-lg text-[#777169] dark:text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
            Discover a more portable way to add function to your day. No cup. No bottle. No prep. Slides into your pocket, dissolves under your tongue.
          </p>

          {/* Actions - Filled Pill Button */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onOpenWaitlist}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#000000] text-white dark:bg-white dark:text-black hover:opacity-90 font-[500] px-8 py-4 text-[14px] tracking-normal transition-all duration-300 shadow-sm border border-[#e5e5e5] dark:border-transparent active:scale-[0.98] cursor-pointer"
            >
              <span>Join The Priority Waitlist</span>
              <span className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Value Micro-Points */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#777169] dark:text-white/50 font-mono">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#000000] dark:text-white" />
              <span>BATCH 01 PRODUCTION ALLOCATION</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#000000] dark:text-white" />
              <span>30 STRIPS PER POCKET BOX</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#000000] dark:text-white" />
              <span>FREE DISPATCH FOR EARLY ACCESS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

