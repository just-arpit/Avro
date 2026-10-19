import React from 'react'
import { Check, Maximize, DropletOff, Clock, Sparkles } from 'lucide-react'

export const WhyAvroSection: React.FC = () => {
  const benefits = [
    {
      num: '01',
      title: 'POCKET-SIZED EDC',
      lead: 'Slides into any wallet, cardholder, or pocket.',
      detail:
        'Thinner than a pack of gum. Carry individual hermetic foil sachets or the 30-strip pocket box with zero liquid bulk or spill risk.',
      icon: Maximize,
      tag: 'ULTRA-COMPACT',
    },
    {
      num: '02',
      title: '100% WATER-FREE',
      lead: 'No cup. No shaker. Zero preparation.',
      detail:
        'Complete freedom from liquids, cafe queues, and bulky cans. Instant oral focus anywhere—during red-eye flights, meetings, or deep coding sprints.',
      icon: DropletOff,
      tag: 'INDEPENDENT',
    },
    {
      num: '03',
      title: 'UNDER 30S MELT',
      lead: 'Dissolves cleanly on the tongue in seconds.',
      detail:
        'Engineered with a plant-based hydrophilic matrix that hydrates instantly with saliva. Zero chewing, zero swallowing resistance, and zero chalky residue.',
      icon: Clock,
      tag: 'FAST DISSOLVE',
    },
    {
      num: '04',
      title: 'ZERO ACIDITY & SUGAR',
      lead: 'Clean active delivery without stomach distress.',
      detail:
        '0g sugar, 0 calories, and pH-neutral formulation. Skips the aggressive acidity of dark coffee and the artificial sweeteners of energy drinks.',
      icon: Sparkles,
      tag: 'PURE PROFILE',
    },
  ]

  const comparisonData = [
    {
      dimension: 'Portability & Pocket Carry',
      avro: 'Pocket flip-top box or single 50×79mm sachet',
      coffee: 'Bulky disposable cups (spill & burn risk)',
      energyDrinks: 'Heavy 250–500ml aluminum cans',
      tabletsGum: 'Bulky plastic bottles or blister foil',
    },
    {
      dimension: 'Water-Free Consumption',
      avro: '100% Water-free (dissolves on tongue in < 30s)',
      coffee: 'Requires boiling water, brewing, and mug',
      energyDrinks: 'Liquid beverage (requires full stomach drinking)',
      tabletsGum: 'Tablets need water; gum requires constant chewing',
    },
    {
      dimension: 'Absorption Route',
      avro: 'Direct oral mucosa & sublingual contact',
      coffee: 'Gastric digestive absorption (30–45 mins)',
      energyDrinks: 'Stomach digestion with high sugar spike',
      tabletsGum: 'Slow gastric pill disintegration in stomach',
    },
    {
      dimension: 'Discreetness in Daily Routine',
      avro: 'Silent, instant, discreet (meetings, flights, exams)',
      coffee: 'Low (mug clatter, steam, coffee breath)',
      energyDrinks: 'Low (loud pop-tab opening, neon branding)',
      tabletsGum: 'Moderate (visible pill popping or chewing)',
    },
    {
      dimension: 'Metabolic & Stomach Profile',
      avro: 'Zero sugar, zero calories, pH-neutral',
      coffee: 'High acidity, often irritates fasting stomachs',
      energyDrinks: 'Up to 27g+ sugar or intense artificial sweeteners',
      tabletsGum: 'Chalky binding fillers and artificial coatings',
    },
  ]

  return (
    <section id="why-avro" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 relative border-t border-[#ebe8e4] dark:border-white/[0.08] bg-[#f5f3f1] dark:bg-[#08080A] text-[#000000] dark:text-white overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdfcfc] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10 text-[11px] font-mono text-[#44403b] dark:text-white/80 tracking-widest uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4704]" />
            <span>FORMAT POSITIONING & ADVANTAGE</span>
          </div>
          <h2 className="whisper-display text-4xl sm:text-5xl lg:text-6xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white leading-[1.05]">
            Why AVRO strips.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777169] dark:text-white/60 font-normal leading-relaxed">
            Traditional caffeine was designed around liquids—heavy cans, coffee queues, and stomach acidity. AVRO strips re-engineer active energy for modern workflows.
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {benefits.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.num}
                className="rounded-[20px] p-6 sm:p-10 bg-[#fdfcfc] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 hover:border-[#000000]/30 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-[500] tracking-widest text-[#ff4704] uppercase">
                      {item.tag}
                    </span>
                    <span className="w-10 h-10 rounded-[12px] bg-[#f5f3f1] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/10 font-mono font-[500] text-xs text-[#44403b] dark:text-white/40 flex items-center justify-center group-hover:text-[#000000] dark:group-hover:text-white transition-colors">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="whisper-heading text-2xl sm:text-3xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base font-[500] text-[#44403b] dark:text-white/90">
                    {item.lead}
                  </p>

                  <p className="mt-3 text-sm text-[#777169] dark:text-white/60 leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ebe8e4] dark:border-white/8 flex items-center gap-2 text-xs font-mono text-[#777169] dark:text-white/50">
                  <Icon className="w-4 h-4 text-[#000000] dark:text-white" />
                  <span>AVRO Form-Factor Advantage</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Comparison Matrix Header */}
        <div className="mt-20 mb-8 text-center sm:text-left">
          <span className="text-xs font-mono font-[500] tracking-widest uppercase text-[#ff4704]">
            DIRECT FORMAT COMPARISON
          </span>
          <h3 className="whisper-heading text-2xl sm:text-3xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white mt-1">
            How AVRO compares against everyday caffeine formats.
          </h3>
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-[24px] p-4 sm:p-6 bg-[#fdfcfc] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-[#ebe8e4] dark:border-white/10 text-xs font-mono tracking-wider text-[#a59f97] dark:text-white/40 uppercase">
                  <th className="py-5 px-6 font-[500] w-1/4">FORMAT DIMENSION</th>
                  <th className="py-5 px-6 font-[600] text-[#000000] dark:text-white bg-[#f5f3f1] dark:bg-white/10 rounded-t-[14px] w-1/3">
                    AVRO ORAL STRIPS
                  </th>
                  <th className="py-5 px-6 font-[500] w-1/5">BREWED COFFEE</th>
                  <th className="py-5 px-6 font-[500] w-1/5">ENERGY DRINKS</th>
                  <th className="py-5 px-6 font-[500] w-1/5">PILLS / GUM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebe8e4] dark:divide-white/5 text-xs sm:text-sm">
                {comparisonData.map((row) => (
                  <tr key={row.dimension} className="hover:bg-[#f5f3f1]/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-6 font-[500] text-[#000000] dark:text-white/90">
                      {row.dimension}
                    </td>
                    <td className="py-5 px-6 font-[500] text-[#000000] dark:text-white bg-[#f5f3f1]/60 dark:bg-white/[0.03] border-x border-[#ebe8e4] dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#000000] dark:text-white shrink-0" />
                        <span>{row.avro}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-[#777169] dark:text-white/50">
                      {row.coffee}
                    </td>
                    <td className="py-5 px-6 text-[#777169] dark:text-white/50">
                      {row.energyDrinks}
                    </td>
                    <td className="py-5 px-6 text-[#777169] dark:text-white/50">
                      {row.tabletsGum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyAvroSection
