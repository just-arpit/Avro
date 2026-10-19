import React, { useState } from 'react'
import { Terminal, BookOpen, Plane, Clock, Sparkles } from 'lucide-react'

export const BrandStory: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  const contexts = [
    {
      id: 'coding',
      title: 'CODING & TERMINAL',
      headline: 'Stay locked into your mental stack.',
      description:
        'When you are debugging complex systems or pushing production commits, stepping away to brew coffee breaks your flow state. AVRO sits discreetly on your desk next to your keyboard.',
      icon: Terminal,
      image: '/assets/Cinematic AVRO Caffeine Workspace.png',
      tag: 'DEEP WORK',
    },
    {
      id: 'study',
      title: 'ACADEMIC REVISION',
      headline: 'Quiet, permissible focus.',
      description:
        'Late-night library sessions require quiet, frictionless alertness. Zero paper cups, zero cafeteria lines, and permitted in exam environments where drinks are banned.',
      icon: BookOpen,
      image: '/assets/Cinematic Late-Night Coding Study Desk.png',
      tag: 'QUIET STUDY',
    },
    {
      id: 'travel',
      title: 'AIRPORT & TRANSIT',
      headline: 'Zero liquids. TSA friendly.',
      description:
        'Security lines, early morning flights, and tight connections. AVRO travels through checkpoints without liquid restrictions, spills, or tray table clutter.',
      icon: Plane,
      image: '/assets/Premium Airport Essentials Still Life.png',
      tag: 'TRANSIT EDC',
    },
    {
      id: 'deadlines',
      title: 'MIDNIGHT SPRINTS',
      headline: 'Clean alertness on demand.',
      description:
        'When deliverables or client launches are due in hours, AVRO provides clean, calibrated focus right from your pocket without leaving your workspace.',
      icon: Clock,
      image: '/assets/Premium AVRO EDC Flat Lay.png',
      tag: 'VELOCITY',
    },
  ]

  const activeContext = contexts[activeTab]

  return (
    <section id="story" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative border-t border-[#ebe8e4] dark:border-white/[0.08] bg-[#fdfcfc] dark:bg-[#08080A] text-[#000000] dark:text-white overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Brand Origin Statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f3f1] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10 text-[11px] font-mono text-[#44403b] dark:text-white/80 tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ff4704]" />
            <span>ORIGIN & PURPOSE</span>
          </div>

          <h2 className="whisper-display text-4xl sm:text-5xl lg:text-6xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white leading-[1.05]">
            Built for people who <br />
            refuse to break their flow.
          </h2>

          <div className="mt-6 space-y-4 text-base sm:text-lg text-[#777169] dark:text-white/70 leading-relaxed font-normal max-w-2xl mx-auto">
            <p>
              AVRO began with a simple reality: the moments when you need sharp focus are rarely the moments when brewing coffee, standing in lines, or lugging cans is convenient.
            </p>
            <p className="text-[#000000] dark:text-white font-[500]">
              We designed AVRO as an everyday carry (EDC) oral strip platform—frictionless, pocket-sized, and formulated for instant water-free dissolve.
            </p>
          </div>
        </div>

        {/* EDC Lifestyle Contexts Showcase - Large Feature Card (Taupe #f5f3f1, 24px radius) */}
        <div className="rounded-[24px] p-6 sm:p-12 bg-[#f5f3f1] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 shadow-xs">
          <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 mb-10">
            {contexts.map((c, idx) => {
              const isSelected = activeTab === idx
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-2 rounded-full text-xs font-[500] tracking-wider transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#000000] text-white dark:bg-white dark:text-black border-transparent shadow-xs'
                      : 'bg-[#fdfcfc] dark:bg-white/[0.03] text-[#777169] dark:text-white/60 border-[#ebe8e4] dark:border-white/10 hover:text-[#000000] dark:hover:text-white hover:bg-[#ebe8e4]/60'
                  }`}
                >
                  {c.title}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[20px] overflow-hidden aspect-[16/11] bg-white dark:bg-black border border-[#ebe8e4] dark:border-white/10 shadow-xs group">
                <img
                  src={activeContext.image}
                  alt={activeContext.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs font-mono font-[500] text-white">
                    {activeContext.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Context Content */}
            <div className="lg:col-span-6 text-left">
              <span className="text-xs font-mono text-[#ff4704] font-[500] tracking-widest uppercase block mb-2">
                CONTEXT {activeTab + 1} OF {contexts.length}
              </span>
              <h3 className="whisper-heading text-2xl sm:text-4xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white mb-4">
                {activeContext.headline}
              </h3>
              <p className="text-base sm:text-lg text-[#44403b] dark:text-white/70 leading-relaxed font-normal mb-8">
                {activeContext.description}
              </p>

              <div className="pt-6 border-t border-[#ebe8e4] dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#a59f97] dark:text-white/40">
                <span>AVRO EDC PLATFORM</span>
                <span>PROTOTYPE EVALUATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Signature Wordmark */}
        <div className="mt-16 pt-8 border-t border-[#ebe8e4] dark:border-white/10 flex items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 720 153"
            className="h-5 w-auto text-[#000000] dark:text-white fill-current opacity-80"
          >
            <path
              d="M 126 14 L 164 14 L 191 134 L 149 134 L 144 98 L 82 98 L 48 134 L 8 134 Z M 143 44 L 116 76 L 154 76 Z M 182 14 L 221 14 L 245 96 L 320 14 L 360 14 L 258 134 L 219 134 Z M 376 14 L 466 14 C 498 14, 516 30, 516 54 C 516 76, 498 90, 464 91 L 496 136 L 452 136 L 424 92 L 388 92 L 376 136 L 336 136 Z M 410 40 L 446 40 Q 472 55 442 70 L 400 70 Z M 585 16 L 678 16 C 698 16, 710 30, 708 48 L 684 116 C 682 128, 670 138, 654 138 L 562 138 C 538 138, 518 126, 518 108 L 542 46 C 544 30, 560 16, 585 16 Z M 586 46 L 648 46 C 662 46, 670 52, 668 62 L 654 96 C 652 104, 644 110, 630 110 L 570 110 C 556 110, 550 104, 552 94 L 566 62 C 568 52, 574 46, 586 46 Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <span className="text-xs font-mono text-[#a59f97] dark:text-white/40 tracking-wider">
            AVRO LABS · PRODUCT DESIGN
          </span>
        </div>
      </div>
    </section>
  )

}

export default BrandStory
