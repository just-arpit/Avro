import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Zap,
  Droplets,
  Box,
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Eye,
  Maximize2,
  Play,
  RotateCcw,
  Check,
  ArrowRight
} from 'lucide-react'

export interface FlavorInfo {
  id: string
  name: string
  subtitle: string
  accentColor: string
  glowColor: string
  badge: string
  tastingNotes: string[]
  metrics: {
    cooling: number
    freshness: number
    intensity: number
    dissolveSec: number
  }
  activeActives: string
  packagingFormat: string
  image: string
  stripColor: string
}

export const OFFICIAL_FLAVORS: FlavorInfo[] = [
  {
    id: 'mint',
    name: 'Mint Breeze',
    subtitle: 'Arctic Spearmint & Crisp Peppermint',
    accentColor: '#55E6D1',
    glowColor: 'rgba(85, 230, 209, 0.35)',
    badge: 'Mint Breeze Pocket Box',
    tastingNotes: ['Immediate burst of crisp peppermint', 'Zero bitter aftertaste', 'Micro-cooling finish'],
    metrics: { cooling: 95, freshness: 98, intensity: 80, dissolveSec: 22 },
    activeActives: '50mg Micro-Encapsulated Caffeine + 25mg L-Theanine',
    packagingFormat: 'Mint Pocket Box (30 Strips)',
    image: '/assets/AVRO Caffeine Strips_ Five Flavours.png',
    stripColor: '#55E6D1'
  },
  {
    id: 'citrus',
    name: 'Yuzu Lemon Citrus',
    subtitle: 'Sparkling Amalfi Lemon & Yuzu Zest',
    accentColor: '#FACC15',
    glowColor: 'rgba(250, 204, 21, 0.35)',
    badge: 'Solar Citrus Pocket Box',
    tastingNotes: ['Bright citrus morning burst', 'Natural yuzu terpenes', 'Clean palate lift'],
    metrics: { cooling: 65, freshness: 95, intensity: 88, dissolveSec: 25 },
    activeActives: '50mg Fast-Release Caffeine + Vitamin B-Complex',
    packagingFormat: 'Citrus Pocket Box (30 Strips)',
    image: '/assets/AVRO Caffeine Strips_ Five Flavours.png',
    stripColor: '#FACC15'
  },
  {
    id: 'orange',
    name: 'Blood Orange',
    subtitle: 'Sun-Drenched Valencia & Citrus Peel',
    accentColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.35)',
    badge: 'Vibrant Orange Pocket Box',
    tastingNotes: ['Juicy bittersweet orange rind', 'Smooth natural sweetness', 'No sour acidity'],
    metrics: { cooling: 55, freshness: 92, intensity: 85, dissolveSec: 24 },
    activeActives: '50mg Micro-Encapsulated Caffeine + Citrus Bioflavonoids',
    packagingFormat: 'Orange Pocket Box (30 Strips)',
    image: '/assets/AVRO Orange Metallic Sachet on Slate.png',
    stripColor: '#FB923C'
  },
  {
    id: 'berry',
    name: 'Wild Berry',
    subtitle: 'Blackcurrant & Macerated Bramble',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    badge: 'Wild Berry Pocket Box',
    tastingNotes: ['Rich forest berry depth', 'Smooth velvety dissolve', 'Zero dental residue'],
    metrics: { cooling: 40, freshness: 88, intensity: 90, dissolveSec: 27 },
    activeActives: 'Caffeine-Free Focus Blend (L-Theanine + Rhodiola)',
    packagingFormat: 'Berry Pocket Box (30 Strips)',
    image: '/assets/Premium AVRO Berry Caffeine Strips.png',
    stripColor: '#F43F5E'
  },
  {
    id: 'tropical',
    name: 'Tropical Sol',
    subtitle: 'Golden Passionfruit & Island Mango',
    accentColor: '#14B8A6',
    glowColor: 'rgba(20, 184, 166, 0.35)',
    badge: 'Tropical Sol Pocket Box',
    tastingNotes: ['Exotic passionfruit aroma', 'Crisp tropical melt', 'All-day clean clarity'],
    metrics: { cooling: 60, freshness: 94, intensity: 82, dissolveSec: 23 },
    activeActives: '50mg Natural Caffeine + Electrolyte Complex',
    packagingFormat: 'Tropical Pocket Box (30 Strips)',
    image: '/assets/AVRO Caffeine Strips_ Five Flavours.png',
    stripColor: '#14B8A6'
  }
]

export const KumoHeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorInfo>(OFFICIAL_FLAVORS[0])
  const [activeAssetView, setActiveAssetView] = useState<'box' | 'sachet' | 'strip' | 'suite'>('box')
  
  // Interactive "Hold to Melt" tactile simulation state
  const [isMelting, setIsMelting] = useState(false)
  const [meltProgress, setMeltProgress] = useState(0)
  const [meltComplete, setMeltComplete] = useState(false)
  const meltIntervalRef = useRef<number | null>(null)

  // 3D Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setRotate({
      x: -(y / rect.height) * 10,
      y: (x / rect.width) * 14,
    })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  // Handle "Hold to Melt" tactile interaction
  const startMelt = () => {
    if (meltComplete) return
    setIsMelting(true)
    meltIntervalRef.current = window.setInterval(() => {
      setMeltProgress((prev) => {
        if (prev >= 100) {
          if (meltIntervalRef.current) clearInterval(meltIntervalRef.current)
          setMeltComplete(true)
          setIsMelting(false)
          return 100
        }
        return prev + 4
      })
    }, 60)
  }

  const stopMelt = () => {
    if (!meltComplete) {
      setIsMelting(false)
      if (meltIntervalRef.current) clearInterval(meltIntervalRef.current)
    }
  }

  const resetMelt = () => {
    if (meltIntervalRef.current) clearInterval(meltIntervalRef.current)
    setMeltProgress(0)
    setMeltComplete(false)
    setIsMelting(false)
  }

  useEffect(() => {
    return () => {
      if (meltIntervalRef.current) clearInterval(meltIntervalRef.current)
    }
  }, [])

  // Asset display mapping
  const getDisplayImage = () => {
    switch (activeAssetView) {
      case 'box':
        return '/assets/Premium AVRO Berry Caffeine Strips.png'
      case 'sachet':
        return '/assets/AVRO Orange Metallic Sachet on Slate.png'
      case 'strip':
        return '/assets/AVRO Caffeine Strip Close-Up.png'
      case 'suite':
        return '/assets/AVRO Caffeine Strips_ Five Flavours.png'
      default:
        return selectedFlavor.image
    }
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6 sm:mt-10">
      {/* Dynamic Jeton-Style Ambient Aura */}
      <div
        className="absolute -inset-6 sm:-inset-16 rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-50"
        style={{
          background: `radial-gradient(circle, ${selectedFlavor.glowColor} 0%, rgba(10,10,14,0) 70%)`
        }}
      />

      {/* TOP FLOATING CONTROLS: JETON-STYLE SWITCHER TABS */}
      <div className="relative z-30 mb-8 flex flex-col items-center">
        {/* Flavor Selector Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#141416]/90 border border-white/12 backdrop-blur-2xl shadow-2xl">
          {OFFICIAL_FLAVORS.map((f) => {
            const isSelected = f.id === selectedFlavor.id
            return (
              <button
                key={f.id}
                onClick={() => {
                  setSelectedFlavor(f)
                  resetMelt()
                }}
                className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: f.accentColor }}
                />
                <span>{f.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* MAIN SHOWCASE STAGE: CENTRAL PRODUCT + SATELLITE METRIC CARDS */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT COLUMN: ACTIVE FLAVOR & SENSORY METRICS (JETON HIGH-CONTRAST CARD) */}
        <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1 text-left">
          {/* Flavor Sensory Breakdown Card */}
          <div className="p-5 rounded-3xl bg-[#121214]/80 border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border font-bold"
                style={{
                  color: selectedFlavor.accentColor,
                  borderColor: `${selectedFlavor.accentColor}40`,
                  backgroundColor: `${selectedFlavor.accentColor}12`
                }}
              >
                {selectedFlavor.badge}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">{selectedFlavor.name}</h3>
            <p className="text-xs text-white/60 mt-0.5 mb-4">{selectedFlavor.subtitle}</p>

            {/* Sensory Tasting Notes */}
            <div className="space-y-2 mb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">Tasting Notes</span>
              {selectedFlavor.tastingNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-white/85">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: selectedFlavor.accentColor }} />
                  <span>{note}</span>
                </div>
              ))}
            </div>

            {/* Sensory Velocity Meter */}
            <div className="space-y-2.5 pt-3 border-t border-white/8">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/50">Freshness Velocity</span>
                  <span className="font-mono text-white/90">{selectedFlavor.metrics.freshness}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${selectedFlavor.metrics.freshness}%`,
                      backgroundColor: selectedFlavor.accentColor
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/50">Disintegration Time</span>
                  <span className="font-mono text-white/90">&lt; {selectedFlavor.metrics.dissolveSec}s</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${100 - selectedFlavor.metrics.dissolveSec * 1.5}%`,
                      backgroundColor: selectedFlavor.accentColor
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sublingual Absorption Chip */}
          <div className="p-4 rounded-2xl bg-[#121214]/60 border border-white/8 backdrop-blur-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5 text-[#FF5722]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-wide">100% Water-Free</h4>
              <p className="text-[11px] text-white/50">Sublingual transmucosal delivery bypassing stomach acid.</p>
            </div>
          </div>
        </div>

        {/* CENTRAL HERO PRODUCT: 3D JETON-STYLE DEVICE STAGE */}
        <div className="lg:col-span-6 relative flex flex-col items-center order-1 lg:order-2">
          {/* Main Rounded Stage */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full rounded-3xl sm:rounded-[2.5rem] p-2.5 sm:p-3 bg-[#121214] border border-white/12 backdrop-blur-2xl transition-transform duration-500 ease-out will-change-transform shadow-2xl"
            style={{
              transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              boxShadow: `0 35px 90px -20px rgba(0,0,0,0.9), 0 0 50px -10px ${selectedFlavor.glowColor}`
            }}
          >
            {/* Inner Viewport */}
            <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#070709] aspect-[16/11] sm:aspect-[16/10] w-full border border-white/10 flex items-center justify-center group">
              {/* Dynamic Specular Sheen */}
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-screen transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${50 + rotate.y * 3}% ${50 + rotate.x * 3}%, ${selectedFlavor.accentColor} 0%, transparent 60%)`
                }}
              />

              {/* Product Visual */}
              <img
                src={getDisplayImage()}
                alt={selectedFlavor.name}
                className="w-full h-full object-contain sm:object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Top Left: Authentic Specification Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 border border-white/15 backdrop-blur-md text-[11px] font-semibold text-white uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedFlavor.accentColor }} />
                  {selectedFlavor.packagingFormat}
                </span>
              </div>

              {/* Top Right: Disintegration Velocity */}
              <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md text-[10px] font-mono text-white/80">
                <Clock className="w-3 h-3 text-[#FF5722]" />
                <span>&lt; {selectedFlavor.metrics.dissolveSec}s Rapid Melt</span>
              </div>

              {/* Dissolution Simulation Overlay */}
              {meltProgress > 0 && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center backdrop-blur-md bg-black/75 transition-all duration-300 px-6 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mb-3 relative">
                    <div
                      className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
                      style={{ borderTopColor: selectedFlavor.accentColor }}
                    />
                    <span className="text-sm font-mono font-bold text-white">{meltProgress}%</span>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {meltComplete ? 'Disintegration Complete' : 'Dissolving ThinSol™ Matrix...'}
                  </h4>
                  <p className="text-xs text-white/60 mt-1 max-w-xs">
                    {meltComplete
                      ? '100% active compounds bio-available via sublingual mucosa. Zero stomach digestion required.'
                      : 'Simulating contact with salivary moisture in oral cavity.'}
                  </p>
                  {meltComplete && (
                    <button
                      onClick={resetMelt}
                      className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 cursor-pointer shadow-lg"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Melt</span>
                    </button>
                  )}
                </div>
              )}

              {/* Bottom Inspection View Mode Switcher (Jeton-style Pill) */}
              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-20 flex items-center justify-center">
                <div className="flex items-center gap-1 p-1 bg-black/90 border border-white/15 rounded-full backdrop-blur-xl shadow-2xl">
                  <button
                    onClick={() => setActiveAssetView('box')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                      activeAssetView === 'box' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    30’s Pocket Box
                  </button>
                  <button
                    onClick={() => setActiveAssetView('sachet')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                      activeAssetView === 'sachet' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Freshness Sachet
                  </button>
                  <button
                    onClick={() => setActiveAssetView('strip')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                      activeAssetView === 'strip' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Active Strip
                  </button>
                  <button
                    onClick={() => setActiveAssetView('suite')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                      activeAssetView === 'suite' ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    5 Flavors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE TACTILE MELT ENGINE & 5 ZEROES */}
        <div className="lg:col-span-3 flex flex-col gap-4 order-3 text-left">
          {/* Tactile Dissolution Simulator Card */}
          <div className="p-5 rounded-3xl bg-[#121214]/80 border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5722] font-bold">
                ThinSol™ Science
              </span>
              <span className="text-[10px] font-mono text-white/40">&lt; 30s Dissolution</span>
            </div>

            <h3 className="text-base font-bold text-white tracking-tight">Rapid Melt Engine</h3>
            <p className="text-xs text-white/60 mt-0.5 mb-4">
              Press and hold to simulate ThinSol™ sublingual disintegration in real time.
            </p>

            {/* Interactive Tactile Hold Button */}
            <div className="relative mb-3">
              <button
                onMouseDown={startMelt}
                onMouseUp={stopMelt}
                onTouchStart={startMelt}
                onTouchEnd={stopMelt}
                disabled={meltComplete}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 select-none cursor-pointer border ${
                  meltComplete
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : isMelting
                    ? 'bg-white text-black border-white scale-98 shadow-lg shadow-white/20'
                    : 'bg-[#FF5722] text-white border-transparent hover:bg-white hover:text-black'
                }`}
              >
                {meltComplete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Melt Complete</span>
                  </>
                ) : isMelting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Melting... {meltProgress}%</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Press & Hold To Melt</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress Gauge */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-[#FF5722] to-white transition-all duration-150"
                style={{ width: `${meltProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>Oral Placement</span>
              <span>Sublingual Absorption</span>
            </div>
          </div>

          {/* 5 Zeroes™ Pharmaceutical & Cleanroom Guarantee */}
          <div className="p-4 rounded-2xl bg-[#121214]/60 border border-white/8 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5722]" />
              <span className="text-xs font-bold text-white tracking-wide">The 5 Zeroes™</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] text-white/70">
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#FF5722]" />
                <span>Zero Liquids</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#FF5722]" />
                <span>Zero Chewing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#FF5722]" />
                <span>Zero Sugar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#FF5722]" />
                <span>Zero GI Distress</span>
              </div>
            </div>
            <p className="mt-3 pt-2 border-t border-white/6 text-[10px] font-mono text-white/40">
              Formulated by AVRO Labs · Cleanroom Certified Purity
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
