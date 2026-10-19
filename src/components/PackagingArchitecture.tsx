import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { LiquidGlassEffect } from './LiquidGlassEffect'

export const PackagingArchitecture: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'outer' | 'inner' | 'strip'>('outer')

  const layers = [
    {
      id: 'outer',
      index: '01',
      title: 'OUTER BOX ARCHITECTURE',
      name: 'Pocket Box — 30 Strips',
      format: 'Rigid Pocket Flip-Top Box',
      specs: '30 Individually Wrapped Strips · Pocket Size',
      description:
        'An ergonomic, pocket-sized vertical flip-top box with a precision thumb notch. Protects individual sachets from crushing inside pockets or bags while providing effortless one-handed dispensing.',
      image: '/assets/Premium AVRO Berry Caffeine Strips.png',
      badge: 'AVRO 30-STRIP POCKET PACK',
      bulletPoints: [
        'Pocket-sized vertical flip-top lid with secure friction lock',
        'Die-cut inner collar with thumb notch for smooth dispensing',
        'Holds 30 individually sealed single-dose sachets upright',
        'Crush-resistant rigid cardstock architecture',
      ],
      technicalData: [
        { label: 'Capacity', value: '30 Sealed Strips' },
        { label: 'Format', value: 'Pocket Flip-Top' },
        { label: 'Closure', value: 'Friction Lock' },
        { label: 'Protection', value: 'Pocket Crush-Proof' }
      ]
    },
    {
      id: 'inner',
      index: '02',
      title: 'INNER FRESHNESS SEAL',
      name: 'Airtight Freshness Sachet',
      format: 'Multi-Layer Moisture-Barrier Foil',
      specs: 'Single-Strip Pouch · Corner Pull Notch · Zero Humidity',
      description:
        'Every single strip is individually sealed in an ultra-hygienic multi-layer barrier foil sachet with an intuitive corner pull notch. Locks out ambient moisture and lets you slide 2 or 3 loose strips directly into your wallet, phone case, or pocket.',
      image: '/assets/AVRO Orange Metallic Sachet on Slate.png',
      badge: 'AIRTIGHT FRESHNESS SACHET',
      bulletPoints: [
        'Engineered single-strip pouch for maximum active freshness',
        'Corner pull notch for instant, clean opening on the move',
        '100% moisture and oxygen barrier protection',
        'Discreet everyday carry without having to carry the whole box',
      ],
      technicalData: [
        { label: 'Portability', value: 'Slim Wallet EDC' },
        { label: 'Barrier Grade', value: 'Hermetic Foil' },
        { label: 'Tear Feature', value: 'Corner Pull Notch' },
        { label: 'Protection', value: 'Moisture-Proof' }
      ]
    },
    {
      id: 'strip',
      index: '03',
      title: 'ACTIVE DISSOLVING FILM',
      name: 'Fast-Dissolving Oral Strip',
      format: 'Sublingual / Buccal Polymer Matrix',
      specs: '< 30s Dissolve · 0 mL Water · Zero Sugar',
      description:
        'Engineered with a food-grade hydrophilic polymer matrix calibrated to dissolve smoothly on the tongue in under 30 seconds with zero water, chewing, or swallowing resistance.',
      image: '/assets/AVRO Caffeine Strip Close-Up.png',
      badge: 'ORAL THIN-FILM MATRIX',
      bulletPoints: [
        'Fast dissolution in under 30 seconds on dorsal tongue or sublingual mucosa',
        'Micro-encapsulated formula for clean flavor and high stability',
        'Zero sugars, zero chewing, zero swallowing resistance',
        'Plant-based food-grade dissolvable polymer matrix',
      ],
      technicalData: [
        { label: 'Melt Speed', value: '< 30 Seconds' },
        { label: 'Water Needed', value: '0.00 mL' },
        { label: 'Sugar Content', value: '0.00 g' },
        { label: 'Status', value: 'Formulation Prototype' }
      ]
    },
  ]

  const current = layers.find((l) => l.id === activeLayer) || layers[0]

  return (
    <section id="product" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative bg-[#fdfcfc] dark:bg-[#08080A] text-[#000000] dark:text-white overflow-hidden border-t border-[#ebe8e4] dark:border-white/[0.08] transition-colors duration-500">
      {/* Liquid glass effect on the packaging showcase card */}
      <LiquidGlassEffect targetSelector="#packaging-stage-card" enabled={true} />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-12 border-b border-[#ebe8e4] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f3f1] dark:bg-white/10 border border-[#ebe8e4] dark:border-white/15 text-[11px] font-mono text-[#44403b] dark:text-white/80 tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff4704]" />
              <span>3-LAYER PACKAGING ARCHITECTURE</span>
            </div>

            <h2 className="whisper-display text-3xl sm:text-5xl lg:text-6xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white leading-[1.08]">
              Pocket form factor? <span className="text-[#000000] dark:text-white font-[400] underline decoration-[#ebe8e4] dark:decoration-white/20">Sure.</span> <br />
              Under 30s melt? <span className="text-[#000000] dark:text-white font-[400] underline decoration-[#ebe8e4] dark:decoration-white/20">Check.</span> <br />
              Zero water or crash? <span className="text-[#000000] dark:text-white font-[400] underline decoration-[#ebe8e4] dark:decoration-white/20">Also check.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base sm:text-lg text-[#777169] dark:text-white/60 font-normal leading-relaxed">
              Every layer from the pocket-sized outer box to the individual freshness sachet and dissolving film is engineered for instant, water-free focus.
            </p>
            <p className="text-[12px] font-mono text-[#a59f97] dark:text-white/40 mt-3">
              * Note: Packaging architecture and 3D renders shown are conceptual prototypes for evaluation, not final production units.
            </p>
          </div>
        </div>

        {/* Layer Switcher Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {layers.map((layer) => {
            const isSelected = activeLayer === layer.id
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`p-5 rounded-[20px] border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#000000] text-white dark:bg-white dark:text-black font-medium shadow-md border-transparent'
                    : 'bg-[#f5f3f1] dark:bg-white/[0.03] text-[#000000] dark:text-white border-[#ebe8e4] dark:border-white/10 hover:bg-[#ebe8e4]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-medium tracking-widest uppercase ${
                      isSelected ? 'text-white/80 dark:text-black/80' : 'text-[#a59f97] dark:text-white/40'
                    }`}
                  >
                    LAYER {layer.index}
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isSelected ? 'bg-[#ff4704]' : 'bg-[#ebe8e4] dark:bg-white/20'
                    }`}
                  />
                </div>
                <h4 className="text-base font-[500] tracking-tight">
                  {layer.name}
                </h4>
                <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-white/70 dark:text-black/60' : 'text-[#777169] dark:text-white/50'}`}>
                  {layer.specs}
                </p>
              </button>
            )
          })}
        </div>

        {/* Stage Container - Large Feature Card (Taupe #f5f3f1, 24px radius, 32px padding) */}
        <div
          id="packaging-stage-card"
          className="rounded-[24px] p-6 sm:p-10 lg:p-12 bg-[#f5f3f1] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 shadow-xs relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[20px] overflow-hidden bg-white dark:bg-black aspect-[16/11] border border-[#ebe8e4] dark:border-white/10 group shadow-xs">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-xs font-medium text-white">
                    <span className="w-2 h-2 rounded-full bg-[#ff4704]" />
                    {current.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Column */}
            <div className="lg:col-span-6 text-left">
              <span className="text-xs font-mono text-[#777169] dark:text-white/50 font-medium tracking-widest uppercase block mb-1">
                LAYER {current.index} · {current.title}
              </span>
              <h3 className="whisper-heading text-2xl sm:text-4xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white mb-1">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#a59f97] dark:text-white/50 mt-1 mb-5">
                {current.format}
              </p>

              <p className="text-sm sm:text-base text-[#44403b] dark:text-white/80 leading-relaxed mb-6 font-normal">
                {current.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-8">
                {current.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#44403b] dark:text-white/80">
                    <span className="w-5 h-5 rounded-full bg-[#fdfcfc] dark:bg-white/[0.08] border border-[#ebe8e4] dark:border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#000000] dark:text-white" />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 border-t border-[#ebe8e4] dark:border-white/10">
                {current.technicalData.map((tech, idx) => (
                  <div key={idx} className="p-3 rounded-[12px] bg-[#fdfcfc] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10">
                    <span className="text-[10px] font-mono text-[#a59f97] dark:text-white/50 uppercase tracking-widest block">
                      {tech.label}
                    </span>
                    <span className="text-xs sm:text-sm font-[500] text-[#000000] dark:text-white mt-1 block truncate">
                      {tech.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PackagingArchitecture
