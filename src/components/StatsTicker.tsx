import React from 'react'
import { Sparkles, Zap, Droplets, Gauge, Layers } from 'lucide-react'
import { FlavorData } from '../constants/flavors'

interface StatsTickerProps {
  activeFlavor?: FlavorData
}

export const StatsTicker: React.FC<StatsTickerProps> = ({ activeFlavor }) => {
  const accentColor = activeFlavor?.color || '#FF5722'

  const stats = [
    {
      value: '< 30s',
      label: 'Rapid Dissolution',
      sub: 'Salivary oral contact melt',
      icon: Zap
    },
    {
      value: '0.0 mL',
      label: '100% Water-Free',
      sub: 'Zero cups, cans, or prep',
      icon: Droplets
    },
    {
      value: '50 mg',
      label: 'Target Caffeine',
      sub: 'Calibrated steady focus',
      icon: Gauge
    },
    {
      value: '0 g',
      label: 'Zero Sugar',
      sub: 'No jitter, acidity, or crash',
      icon: Sparkles
    },
    {
      value: '5 Profiles',
      label: 'Signature Flavors',
      sub: 'Crafted formulation suite',
      icon: Layers
    }
  ]

  return (
    <section className="relative py-12 border-y border-[#ebe8e4] dark:border-white/[0.08] bg-[#f5f3f1] dark:bg-[#08080A] transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex flex-col items-center lg:items-start text-center lg:text-left p-5 rounded-[20px] bg-[#fdfcfc] dark:bg-white/[0.02] border border-[#ebe8e4] dark:border-white/5 transition-all hover:shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-[#000000] dark:text-white" style={{ color: undefined }} />
                  <span className="text-xl sm:text-2xl font-[300] text-[#000000] dark:text-white tracking-tight font-mono">
                    {item.value}
                  </span>
                </div>
                <div className="text-[12px] font-[500] text-[#44403b] dark:text-white/90 uppercase tracking-[0.06em]">{item.label}</div>
                <div className="text-[11px] text-[#777169] dark:text-white/50 mt-0.5">{item.sub}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsTicker

