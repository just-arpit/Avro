import React, { useState } from 'react'
import { ArrowDown, ArrowRight, HelpCircle, Sparkles } from 'lucide-react'

interface FAQSectionProps {
  onOpenWaitlist?: () => void
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenWaitlist }) => {
  const [openId, setOpenId] = useState<string | null>('item-1')

  const faqs = [
    {
      id: 'item-1',
      num: '01',
      q: 'What is AVRO?',
      a: 'AVRO is a pocket-sized functional oral-strip platform in active development. Our initial prototype is a fast-dissolving caffeine oral strip engineered for convenient, water-free focus support during deep work, coding, study sessions, and travel.',
    },
    {
      id: 'item-2',
      num: '02',
      q: 'How does the oral strip work?',
      a: 'You retrieve a single sealed foil sachet from the pocket box, open at the corner pull notch, and place the ultra-thin polymer strip on or beneath your tongue. It dissolves in oral saliva in under 30 seconds—no chewing, no water, and no pills to swallow.',
    },
    {
      id: 'item-3',
      num: '03',
      q: 'What is the targeted caffeine dosage?',
      a: 'The initial formulation is calibrated for 50mg of caffeine per strip (approximately half an 8oz cup of coffee), paired with clean flavoring. Exact nutritional and dosing information will be finalized and certified on commercial packaging upon production release.',
    },
    {
      id: 'item-4',
      num: '04',
      q: 'What is the current development status of AVRO?',
      a: 'AVRO is currently an evolving product concept and prototype. The 3D packaging renders, flavor profiles, and visual experiences shown on this website represent our design intent and formulation targets. We have not yet begun retail shipping.',
    },
    {
      id: 'item-5',
      num: '05',
      q: 'Does it require any water or preparation?',
      a: 'None. AVRO strips are completely water-free. They dissolve cleanly through natural oral moisture, freeing you from carrying cans, bottles, or shaker cups.',
    },
    {
      id: 'item-6',
      num: '06',
      q: 'What ingredients and polymers are used?',
      a: 'The prototype matrix uses food-grade pullulan—a natural, plant-based dissolving polymer—along with natural flavoring, clean sweeteners, and active caffeine. The strip contains zero sugar and zero unnecessary bulk.',
    },
    {
      id: 'item-7',
      num: '07',
      q: 'What flavors are being developed?',
      a: 'We are currently developing five signature profiles: Blood Orange, Mint Breeze, Lemon Citrus, Wild Berry, and Tropical Sol. A caffeine-free evening focus variant is also on our formulation roadmap.',
    },
    {
      id: 'item-8',
      num: '08',
      q: 'How does the waitlist work?',
      a: 'Joining the waitlist gives you priority access to private prototype testing rounds and first notification when Batch 01 production reservations open. Submissions on this site are stored locally for early preview registration.',
    },
  ]

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <section id="faq" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative border-t border-[#ebe8e4] dark:border-white/[0.08] bg-[#f5f3f1] dark:bg-[#06060A] text-[#000000] dark:text-white overflow-hidden transition-colors duration-500">
      {/* Background ambient blur */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#ff4704]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement & Action Button */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdfcfc] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10 text-[11px] font-mono text-[#44403b] dark:text-white/80 tracking-widest uppercase mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4704]" />
              <span>TRANSPARENCY & SPECIFICATIONS</span>
            </div>

            <h2 className="whisper-heading text-3xl sm:text-4xl lg:text-5xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white leading-[1.08] mb-6">
              Every detail answered with clarity.
            </h2>

            <p className="text-base sm:text-lg text-[#777169] dark:text-white/70 leading-relaxed font-normal mb-8 max-w-md">
              Methodical formulation, sublingual speed, zero sugar, total transparency. We are building a new standard for portable cognitive energy.
            </p>

            {/* Signature Filled Pill CTA Button */}
            {onOpenWaitlist && (
              <button
                onClick={onOpenWaitlist}
                className="group inline-flex items-center justify-between gap-4 rounded-full border border-[#e5e5e5] dark:border-white/15 bg-[#000000] hover:bg-black/90 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] px-6 py-3.5 text-sm font-[500] text-white transition-all duration-300 cursor-pointer shadow-xs active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Reserve your allocation</span>
                <span className="w-7 h-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:translate-x-1 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            )}

            <div className="mt-8 pt-8 border-t border-[#ebe8e4] dark:border-white/[0.08] w-full max-w-md flex items-center justify-between text-xs font-mono text-[#a59f97] dark:text-white/40">
              <span>AVRO LABS FAQ</span>
              <span>BATCH 01 PROTOTYPE</span>
            </div>
          </div>

          {/* Right Column: Distinct Pill-Card Accordions (20px radii, whisper elevation) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4 w-full">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div
                  key={faq.id}
                  className={`rounded-[20px] border transition-all duration-300 overflow-hidden relative cursor-pointer group ${
                    isOpen
                      ? 'border-[#000000] dark:border-white/30 bg-[#fdfcfc] dark:bg-[#161618] shadow-sm'
                      : 'border-[#ebe8e4] dark:border-white/10 bg-[#fdfcfc] dark:bg-[#0E0E10] hover:border-[#44403b]/40 dark:hover:border-white/20 shadow-xs'
                  }`}
                  onClick={() => toggle(faq.id)}
                >
                  {/* Subtle top inner gradient sheen on open */}
                  {isOpen && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#000000]/20 dark:via-white/30 to-transparent pointer-events-none" />
                  )}

                  {/* Header Row */}
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4 select-none">
                    <div className="flex items-center gap-3.5 sm:gap-4 text-left">
                      <span className="text-xs font-mono font-[500] text-[#ff4704] shrink-0">
                        {faq.num}
                      </span>
                      <h3 className={`text-base sm:text-lg font-[500] tracking-tight transition-colors duration-200 ${
                        isOpen ? 'text-[#000000] dark:text-white' : 'text-[#44403b] dark:text-white/85 group-hover:text-[#000000] dark:group-hover:text-white'
                      }`}>
                        {faq.q}
                      </h3>
                    </div>

                    {/* Arrow Icon Box */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'border-[#000000] bg-[#000000] text-white dark:border-white dark:bg-white dark:text-black'
                          : 'border-[#ebe8e4] bg-[#f5f3f1] text-[#44403b] dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60 group-hover:border-[#44403b]/40 group-hover:text-[#000000] dark:group-hover:border-white/25 dark:group-hover:text-white'
                      }`}
                    >
                      <ArrowDown
                        className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Animated Smooth Expanding Content */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#777169] dark:text-white/65 leading-relaxed font-normal border-t border-[#ebe8e4] dark:border-white/[0.04]">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
