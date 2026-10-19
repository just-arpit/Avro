import React, { useState } from 'react'
import { ArrowRight, Check, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react'

export const StepperRitual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      num: '01',
      title: 'Peel Sachet',
      time: '0s',
      subtitle: 'Corner Pull Notch',
      desc: 'Retrieve an individually sealed freshness foil sachet from your pocket pack. Tear cleanly at the corner notch.',
      badge: 'AIRTIGHT FOIL SACHET',
      image: '/assets/AVRO Orange Metallic Sachet on Slate.png',
      stat: 'Moisture Barrier',
      detail: 'Hermetic barrier protects active compounds from ambient humidity and pocket friction.'
    },
    {
      num: '02',
      title: 'Place on Tongue',
      time: '5s',
      subtitle: 'Oral Contact',
      desc: 'Extract the micro-thin polymer strip and place it directly on or beneath your tongue. No chewing, no glass of water, and no bulky pill to swallow.',
      badge: 'LAYER 03: ORAL STRIP MATRIX',
      image: '/assets/AVRO Caffeine Strip Close-Up.png',
      stat: 'Micro-Thin Film',
      detail: 'Instantly adheres to moist oral mucosal tissue without sticking to dry fingers.'
    },
    {
      num: '03',
      title: 'Dissolve in Saliva',
      time: '18s',
      subtitle: 'Hydrophilic Hydration',
      desc: 'Salivary moisture naturally activates the hydrophilic pullulan polymer matrix. The strip dissolves smoothly in under 30 seconds with no chalky residue.',
      badge: 'RAPID MELT MATRIX',
      image: '/assets/AVRO Caffeine Strip in Cinematic Teal.png',
      stat: '< 30 Seconds Melt',
      detail: 'Smooth oral breakdown eliminates the bitter chemical bite common to chewable caffeine.'
    },
    {
      num: '04',
      title: 'Direct Uptake',
      time: '25s',
      subtitle: 'Buccal & Sublingual Absorption',
      desc: 'Active caffeine is absorbed through vascularized oral mucosa directly into circulation, providing a faster, smoother onset than liquid caffeine sitting in your stomach.',
      badge: 'RAPID ONSET',
      image: '/assets/Cinematic AVRO Caffeine Workspace.png',
      stat: 'Water-Free Delivery',
      detail: 'Eliminates the stomach acid distress and bloating often caused by acidic energy drinks.'
    },
    {
      num: '05',
      title: 'Sustained Flow',
      time: '30s+',
      subtitle: 'Clean Cognitive Focus',
      desc: 'Enjoy clear, sustained alertness without caffeine jitters or the harsh midday crash associated with high-sugar energy drinks.',
      badge: 'CLEAN FOCUS',
      image: '/assets/Cinematic Late-Night Coding Study Desk.png',
      stat: 'Smooth Alertness',
      detail: 'Precise dosing designed to keep your momentum without interrupting your workflow.'
    }
  ]

  const current = steps[activeStep]

  return (
    <section id="ritual" className="relative py-24 sm:py-36 bg-[#f5f3f1] dark:bg-[#08080A] text-[#000000] dark:text-white overflow-hidden border-t border-[#ebe8e4] dark:border-white/[0.08] transition-colors duration-500">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff4704]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#ebe8e4] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdfcfc] dark:bg-white/10 border border-[#ebe8e4] dark:border-white/15 text-[11px] font-mono tracking-widest uppercase text-[#44403b] dark:text-white/80 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#ff4704]" />
              THE 30-SECOND RITUAL
            </div>
            <h2 className="whisper-heading text-3xl sm:text-5xl lg:text-6xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white leading-[1.05]">
              How AVRO delivers fast focus.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#777169] dark:text-white/60 max-w-sm font-normal">
            Five deliberate steps from pocket sachet to steady mental flow. Select each step to explore the ritual.
          </p>
        </div>

        {/* Numbered Interactive Stepper Bar */}
        <div className="mt-12 w-full overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center min-w-[650px] border-b border-[#ebe8e4] dark:border-white/10 pb-6 gap-2">
            {steps.map((step, idx) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 text-left px-4 py-3 rounded-[16px] transition-all cursor-pointer group ${
                  activeStep === idx
                    ? 'bg-[#000000] text-white dark:bg-white dark:text-black font-[500] shadow-sm'
                    : 'text-[#777169] hover:text-[#000000] hover:bg-[#ebe8e4]/60 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={activeStep === idx ? 'text-white/70 dark:text-black/70' : 'text-[#a59f97] dark:text-white/40'}>
                    STEP {step.num}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeStep === idx ? 'bg-white/20 text-white dark:bg-black/10 dark:text-black' : 'bg-[#ebe8e4] dark:bg-white/10 text-[#44403b] dark:text-white/60'
                  }`}>
                    {step.time}
                  </span>
                </div>
                <div className="text-sm truncate font-[500]">{step.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step Presentation Stage - White Card with Whisper Shadow (Elevated Card in Bauhaus System) */}
        <div className="mt-12 rounded-[24px] p-6 sm:p-12 bg-[#fdfcfc] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Step Macro Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[20px] overflow-hidden aspect-[16/11] bg-white dark:bg-black border border-[#ebe8e4] dark:border-white/10 shadow-xs group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs font-mono text-white">
                    {current.badge}
                  </span>
                  <span className="text-xs font-mono text-white/70">
                    STAGE {current.num}/05
                  </span>
                </div>
              </div>
            </div>

            {/* Step Editorial Content */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f3f1] dark:bg-white/5 border border-[#ebe8e4] dark:border-white/10 text-xs font-mono text-[#ff4704] mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>ELAPSED: {current.time}</span>
              </div>

              <h3 className="whisper-heading text-2xl sm:text-4xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#a59f97] dark:text-white/50 mt-1 mb-6">
                {current.subtitle}
              </p>

              <p className="text-base sm:text-lg text-[#44403b] dark:text-white/80 leading-relaxed mb-8 font-normal">
                {current.desc}
              </p>

              {/* Metric Card */}
              <div className="p-5 rounded-[20px] bg-[#f5f3f1] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ff4704]/10 border border-[#ff4704]/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-[#ff4704]" />
                </div>
                <div>
                  <div className="text-sm font-[500] text-[#000000] dark:text-white">{current.stat}</div>
                  <div className="text-xs text-[#777169] dark:text-white/60 mt-0.5 leading-relaxed">
                    {current.detail}
                  </div>
                </div>
              </div>

              {/* Nav Next / Prev - Pill Buttons */}
              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  disabled={activeStep === 0}
                  className="px-5 py-2.5 rounded-full text-xs font-[500] border border-[#ebe8e4] dark:border-white/10 text-[#44403b] dark:text-white/60 hover:text-[#000000] dark:hover:text-white bg-[#fdfcfc] dark:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="px-6 py-2.5 rounded-full text-xs font-[500] bg-[#000000] text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 cursor-pointer shadow-xs border border-[#e5e5e5] dark:border-transparent"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepperRitual
