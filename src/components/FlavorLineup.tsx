import React from 'react'
import { Sparkles, Check, ArrowRight } from 'lucide-react'
import { FLAVORS, FlavorData } from '../constants/flavors'

interface FlavorLineupProps {
  onOpenWaitlist: () => void
  activeFlavor?: FlavorData
  onSelectFlavor?: (flavor: FlavorData) => void
}

export const FlavorLineup: React.FC<FlavorLineupProps> = ({
  onOpenWaitlist,
  activeFlavor = FLAVORS[0],
  onSelectFlavor
}) => {
  const flavorCards = [
    {
      id: 'orange',
      name: 'BLOOD ORANGE',
      tagline: 'Sun-Drenched Valencia & Citrus Peel',
      color: '#FF5722',
      borderColor: 'border-[#FF5722]/50',
      glow: '0 0 35px -5px rgba(255, 87, 34, 0.4)',
      packaging: 'Pocket Box (30 Strips)',
      count: '30 Sachets',
      profile: 'Sweet blood orange and tangerine aroma with instant smooth disintegration. Zero sour acidity.',
      stripColor: 'bg-orange-500/30 border-orange-500/60',
      badge: 'ORANGE POCKET BOX',
      actives: '50mg Micro-Encapsulated Caffeine'
    },
    {
      id: 'mint',
      name: 'MINT BREEZE',
      tagline: 'Arctic Spearmint & Crisp Peppermint',
      color: '#00E5C0',
      borderColor: 'border-[#00E5C0]/50',
      glow: '0 0 35px -5px rgba(0, 229, 192, 0.35)',
      packaging: 'Pocket Box (30 Strips)',
      count: '30 Sachets',
      profile: 'Cool crystalline spearmint with clean menthol sharpness. Instant palate lift with zero residual aftertaste.',
      stripColor: 'bg-teal-400/30 border-teal-400/60',
      badge: 'MINT POCKET BOX',
      actives: '50mg Caffeine + 25mg L-Theanine'
    },
    {
      id: 'lemon',
      name: 'LEMON CITRUS',
      tagline: 'Sparkling Amalfi Lemon & Yuzu Zest',
      color: '#FACC15',
      borderColor: 'border-yellow-400/50',
      glow: '0 0 35px -5px rgba(250, 204, 21, 0.35)',
      packaging: 'Pocket Box (30 Strips)',
      count: '30 Sachets',
      profile: 'Zesty cold-pressed lemon zest with rapid palate activation. Designed for morning sprint starts and clear mental focus.',
      stripColor: 'bg-yellow-400/30 border-yellow-400/60',
      badge: 'CITRUS POCKET BOX',
      actives: '50mg Fast-Release Caffeine + B-Vitamins'
    },
    {
      id: 'berry',
      name: 'WILD BERRY',
      tagline: 'Blackcurrant & Macerated Bramble',
      color: '#F43F5E',
      borderColor: 'border-rose-500/50',
      glow: '0 0 35px -5px rgba(244, 63, 94, 0.35)',
      packaging: 'Pocket Box (30 Strips)',
      count: '30 Sachets',
      profile: 'Rich dark raspberry and blackberry essence formulated in a velvety fast-dissolving film.',
      stripColor: 'bg-rose-500/30 border-rose-500/60',
      badge: 'BERRY POCKET BOX',
      actives: '50mg Clean Natural Caffeine'
    },
    {
      id: 'tropical',
      name: 'TROPICAL SOL',
      tagline: 'Golden Passionfruit & Island Mango',
      color: '#FF9100',
      borderColor: 'border-amber-500/50',
      glow: '0 0 35px -5px rgba(255, 145, 0, 0.35)',
      packaging: 'Pocket Box (30 Strips)',
      count: '30 Sachets',
      profile: 'Vibrant sun-ripened mango and passionfruit fusion with crisp citrus balance for sustained flow states.',
      stripColor: 'bg-amber-500/30 border-amber-500/60',
      badge: 'TROPICAL POCKET BOX',
      actives: '50mg Sustained-Melt Caffeine'
    },
  ]

  const current = flavorCards.find(f => f.id === activeFlavor.id) || flavorCards[0]

  const handleSelectCard = (cardId: string) => {
    const targetFlavor = FLAVORS.find(f => f.id === cardId)
    if (targetFlavor && onSelectFlavor) {
      onSelectFlavor(targetFlavor)
    }
  }

  return (
    <section id="flavors" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative border-t border-[#ebe8e4] dark:border-white/[0.08] bg-[#fdfcfc] dark:bg-[#08080A] text-[#000000] dark:text-white overflow-hidden transition-colors duration-500">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-[150px] pointer-events-none rounded-full transition-all duration-700 opacity-20 dark:opacity-40"
        style={{
          background: `radial-gradient(circle, ${activeFlavor.color} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f3f1] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10 text-[11px] font-mono text-[#44403b] dark:text-white/80 tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" style={{ color: activeFlavor.color }} />
            <span>OFFICIAL PRODUCT FLAVOR LINEUP</span>
          </div>
          <h2 className="whisper-display text-4xl sm:text-5xl lg:text-6xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white">
            Choose your flavor.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#777169] dark:text-white/60 font-normal leading-relaxed">
            Five signature expressions. Select any flavor to explore its real 3D packaging and adaptive palette.
          </p>
        </div>

        {/* Master Showcase Banner (Warm Taupe #f5f3f1, 24px radius) */}
        <div className="rounded-[24px] p-2.5 sm:p-3 bg-[#f5f3f1] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 backdrop-blur-2xl mb-12 shadow-xs">
          <div className="relative rounded-[20px] overflow-hidden aspect-[16/9] sm:aspect-[16/8] bg-white dark:bg-black border border-[#ebe8e4] dark:border-white/8 group">
            <img
              src="/assets/AVRO Caffeine Strips_ Five Flavours.png"
              alt="AVRO Caffeine Strips 5 Flavors Lineup"
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white/90">
                  THE 5-FLAVOR SUITE · DEMO CONCEPT
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-white mt-1 tracking-tight">
                  BLOOD ORANGE · MINT · LEMON CITRUS · WILD BERRY · TROPICAL
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  * Demo design prototype — visual concepts and packaging renders are for demonstration and not final production.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-xs font-mono text-white"
                >
                  FAST DISSOLVING · WATER FREE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Jeton-Style Flavor Switcher Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {flavorCards.map((flavor) => {
            const isSelected = activeFlavor.id === flavor.id
            return (
              <button
                key={flavor.id}
                onClick={() => handleSelectCard(flavor.id)}
                className={`p-4 rounded-[20px] border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#fdfcfc] dark:bg-[#18181A] border-[#000000] dark:border-white/40 shadow-xs scale-[1.02]'
                    : 'bg-[#f5f3f1] dark:bg-white/[0.02] border-[#ebe8e4] dark:border-white/8 hover:bg-[#ebe8e4]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-3 h-3 rounded-full transition-transform"
                    style={{
                      backgroundColor: flavor.color,
                      transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                  <span className="text-[10px] font-mono text-[#a59f97] dark:text-white/40">{flavor.count}</span>
                </div>
                <h4 className="text-sm font-[500] text-[#000000] dark:text-white tracking-wide">{flavor.name}</h4>
                <p className="text-[11px] text-[#777169] dark:text-white/50 truncate mt-0.5">{flavor.badge}</p>
              </button>
            )
          })}
        </div>

        {/* Active Flavor Deep-Dive Specification Card */}
        <div className="rounded-[24px] p-6 sm:p-10 bg-[#f5f3f1] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdfcfc] dark:bg-white/5 border border-[#ebe8e4] dark:border-white/10 text-xs font-mono mb-4">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: current.color }}
                />
                <span className="text-[#000000] dark:text-white font-[500]">{current.name}</span>
                <span className="text-[#ebe8e4] dark:text-white/40">|</span>
                <span className="text-[#777169] dark:text-white/60">{current.badge}</span>
              </div>

              <h3 className="whisper-heading text-2xl sm:text-3xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white">
                {current.tagline}
              </h3>

              <p className="mt-3 text-sm text-[#44403b] dark:text-white/70 leading-relaxed font-normal max-w-xl">
                {current.profile}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-[#777169] dark:text-white/60">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#000000] dark:text-white" />
                  <span>{current.packaging}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#000000] dark:text-white" />
                  <span>{current.actives}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#000000] dark:text-white" />
                  <span>Zero Water Required</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 shrink-0">
              {/* Strip Color Swatch Preview */}
              <div className="flex flex-col items-center p-4 rounded-[16px] bg-[#fdfcfc] dark:bg-white/[0.02] border border-[#ebe8e4] dark:border-white/6">
                <span className="text-[10px] font-mono text-[#a59f97] dark:text-white/40 uppercase mb-2">
                  STRIP MATRIX TINT
                </span>
                <div
                  className={`w-32 h-14 rounded-xl border flex items-center justify-center text-[11px] font-mono font-medium tracking-widest text-white shadow-xs ${current.stripColor}`}
                >
                  AVRO STRIP
                </div>
              </div>

              {/* Filled Pill CTA Button */}
              <button
                onClick={onOpenWaitlist}
                className="w-full py-3 px-6 rounded-full font-[500] text-xs uppercase tracking-widest transition-all duration-300 shadow-xs active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 bg-[#000000] text-white dark:bg-white dark:text-black hover:opacity-90 border border-[#e5e5e5] dark:border-transparent"
              >
                <span>Reserve {current.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}
