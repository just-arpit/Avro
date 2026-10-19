import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '@/components/ui/motion-footer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// -------------------------------------------------------------------------
// FOOTER STYLES (Aurora, Grid, Parallax Giant Text, Marquee, Glass Pills)
// -------------------------------------------------------------------------
const FOOTER_MOTION_STYLES = `
@keyframes footer-breathe-glow {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.95; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(255,87,34,0.6)); }
  15%, 45% { transform: scale(1.22); filter: drop-shadow(0 0 10px rgba(255,87,34,0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe-glow {
  animation: footer-breathe-glow 7s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 32s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 56px 56px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

/* Ambient Neutral Dark Aura - 100% Free of Reddish Tones */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(255, 255, 255, 0.02) 0%, 
    transparent 65%
  );
}

/* Giant Background Wordmark - Neutral Monochromatic Slate */
.footer-giant-bg-text {
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(8rem, 24vw, 22rem);
  line-height: 0.72;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(203, 213, 225, 0.10) 40%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Glass Pill Styling */
.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%);
  box-shadow: 
      0 10px 30px -10px rgba(0, 0, 0, 0.5), 
      inset 0 1px 1px rgba(255, 255, 255, 0.15), 
      inset 0 -1px 2px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%);
  border-color: rgba(255, 87, 34, 0.4);
  box-shadow: 
      0 16px 36px -10px rgba(255, 87, 34, 0.2), 
      inset 0 1px 1px rgba(255, 255, 255, 0.25);
}
`

interface FooterProps {
  onOpenWaitlist: () => void
}

// 100% mathematically clean, razor-sharp vector paths for AVRO brand logotype
const AVRO_VECTOR_PATH =
  "M 126 14 L 164 14 L 191 134 L 149 134 L 144 98 L 82 98 L 48 134 L 8 134 Z M 143 44 L 116 76 L 154 76 Z " +
  "M 182 14 L 221 14 L 245 96 L 320 14 L 360 14 L 258 134 L 219 134 Z " +
  "M 376 14 L 466 14 C 498 14, 516 30, 516 54 C 516 76, 498 90, 464 91 L 496 136 L 452 136 L 424 92 L 388 92 L 376 136 L 336 136 Z M 410 40 L 446 40 Q 472 55 442 70 L 400 70 Z " +
  "M 585 16 L 678 16 C 698 16, 710 30, 708 48 L 684 116 C 682 128, 670 138, 654 138 L 562 138 C 538 138, 518 126, 518 108 L 542 46 C 544 30, 560 16, 585 16 Z M 586 46 L 648 46 C 662 46, 670 52, 668 62 L 654 96 C 652 104, 644 110, 630 110 L 570 110 C 556 110, 550 104, 552 94 L 566 62 C 568 52, 574 46, 586 46 Z";

const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6">
    <span>WATER-FREE DISSOLUTION</span> <span className="text-[#FF5722]">✦</span>
    <span>SUB-LINGUAL ABSORPTION</span> <span className="text-[#FF8A65]">✦</span>
    <span>65MG MICRO-CAFFEINE</span> <span className="text-[#FF5722]">✦</span>
    <span>100MG L-THEANINE HARMONY</span> <span className="text-[#FF8A65]">✦</span>
    <span>EDC POCKET ARCHITECTURE</span> <span className="text-[#FF5722]">✦</span>
    <span>ZERO SUGAR ZERO JITTERS</span> <span className="text-[#FF8A65]">✦</span>
  </div>
)

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlist }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const footerRef = useRef<HTMLElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const topOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      onOpenWaitlist()
    }, 400)
  }

  // Scroll to top with smooth physics
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // GSAP ScrollTrigger Scrubbing for the Giant Text & Cards
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // Background Parallax for Giant "AVRO" Text
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { y: '8vh', scale: 0.88, opacity: 0.3 },
          {
            y: '0vh',
            scale: 1,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              end: 'bottom bottom',
              scrub: 1.2,
            },
          }
        )
      }

      // Smooth entry for footer cards
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { y: 35, opacity: 0.9 },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 75%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_MOTION_STYLES }} />

      <section
        id="footer"
        ref={footerRef}
        className="footer-section relative bg-[#f5f3f1] dark:bg-[#06060A] text-[#000000] dark:text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#ebe8e4] dark:border-white/[0.08] overflow-hidden transition-colors duration-500"
      >
        {/* Ambient Light & Tech Grid Background */}
        <div className="footer-aurora absolute left-1/2 top-1/2 h-[70vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe-glow rounded-[50%] blur-[90px] pointer-events-none z-0" />
        <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

        {/* ─── 1. KINETIC DIAGONAL MARQUEE STRIP (Motion Footer Inspired) ─── */}
        <div className="relative z-10 w-full overflow-hidden border-y border-[#ebe8e4] dark:border-white/10 bg-[#ebe8e4]/60 dark:bg-black/40 backdrop-blur-md py-3.5 mb-14 -rotate-1 scale-[1.03] shadow-xs">
          <div className="flex w-max animate-footer-scroll-marquee text-xs font-[500] tracking-[0.28em] text-[#44403b] dark:text-white/50 uppercase select-none">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* ─── 2. DUAL-CARD MAIN ARCHITECTURE (Kresna Inspired) ─── */}
        <div
          ref={cardsRef}
          className="footer-wrapper max-w-[1150px] mx-auto grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-4 sm:gap-5 items-stretch relative z-10"
        >
          {/* ─── LEFT CARD (Video Background + Logo + Tagline + Socials) ─── */}
          <div className="footer-left relative min-h-[350px] sm:min-h-[400px] rounded-[24px] p-8 overflow-hidden flex flex-col justify-between shadow-xs bg-[#fdfcfc] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 group">
            {/* Autoplaying Loop Video with neutral desaturation to harmonize with greyish studio hero */}
            <video
              className="footer-left-video absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.70] contrast-[1.08] grayscale-[0.85] group-hover:scale-105 transition-transform duration-1000 ease-out"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4"
                type="video/mp4"
              />
            </video>
            {/* Neutral Dark / Light Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fdfcfc] dark:from-[#121214] via-[#fdfcfc]/60 dark:via-[#121214]/50 to-[#fdfcfc]/30 dark:to-[#121214]/30 pointer-events-none z-0" />

            {/* Top Logo Row with Official AVRO Logo */}
            <div className="footer-logo relative z-10 flex items-center gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 720 153"
                className="h-6 sm:h-7 w-auto text-[#000000] dark:text-white fill-current"
                shapeRendering="geometricPrecision"
              >
                <path d={AVRO_VECTOR_PATH} fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>

            {/* Middle Tagline */}
            <div className="footer-tagline-container mt-auto mb-7 relative z-10">
              <p className="footer-tagline text-[19px] font-normal text-[#000000] dark:text-white leading-[1.45] font-['Inter',sans-serif]">
                Focus, dissolved.<br />
                <span className="text-[#777169] dark:text-white/65">Functional caffeine, water-free.</span>
              </p>
            </div>

            {/* Bottom Social Row with Caveat Accent & Magnetic Buttons */}
            <div className="footer-social-row relative z-10 flex items-center justify-between gap-3 pt-3 border-t border-[#ebe8e4] dark:border-white/15">
              <span className="footer-social-label text-[17px] font-semibold text-[#44403b] dark:text-white/90 font-['Caveat',cursive] tracking-[0.3px]">
                Stay in touch!
              </span>

              {/* Social Icons with Magnetic Hover Physics (Discord, X, LinkedIn, GitHub) */}
              <div className="footer-social-icons flex items-center gap-[7px]">
                {/* Discord */}
                <MagneticButton
                  as="a"
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="w-9 h-9 rounded-[9px] bg-[#f5f3f1] hover:bg-[#ebe8e4] dark:bg-[#161618] dark:hover:bg-black border border-[#ebe8e4] dark:border-white/10 flex items-center justify-center text-[#000000] dark:text-white transition-all duration-200 shadow-xs hover:border-[#000000]/30"
                >
                  <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </MagneticButton>

                {/* X / Twitter */}
                <MagneticButton
                  as="a"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-9 h-9 rounded-[9px] bg-[#f5f3f1] hover:bg-[#ebe8e4] dark:bg-[#161618] dark:hover:bg-black border border-[#ebe8e4] dark:border-white/10 flex items-center justify-center text-[#000000] dark:text-white transition-all duration-200 shadow-xs hover:border-[#000000]/30"
                >
                  <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </MagneticButton>

                {/* LinkedIn */}
                <MagneticButton
                  as="a"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-[9px] bg-[#f5f3f1] hover:bg-[#ebe8e4] dark:bg-[#161618] dark:hover:bg-black border border-[#ebe8e4] dark:border-white/10 flex items-center justify-center text-[#000000] dark:text-white transition-all duration-200 shadow-xs hover:border-[#000000]/30"
                >
                  <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </MagneticButton>

                {/* GitHub */}
                <MagneticButton
                  as="a"
                  href="https://github.com/deathseeker3717/avro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-[9px] bg-[#f5f3f1] hover:bg-[#ebe8e4] dark:bg-[#161618] dark:hover:bg-black border border-[#ebe8e4] dark:border-white/10 flex items-center justify-center text-[#000000] dark:text-white transition-all duration-200 shadow-xs hover:border-[#000000]/30"
                >
                  <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* ─── RIGHT CARD (Elevated Titanium Card + Floating Cube + Nav + Subscribe) ─── */}
          <div className="footer-right relative bg-[#fdfcfc] dark:bg-[#121214] border border-[#ebe8e4] dark:border-white/10 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between shadow-xs overflow-visible">
            {/* Floating "Feeling focused?" Badge with AVRO Orange Cube & Magnetic Physics */}
            <div className="footer-lucky-graphic absolute -top-9 right-8 sm:right-10 z-20 flex flex-col items-start gap-1 pointer-events-auto">
              {/* 3D Angled Cube with Magnetic Physics */}
              <MagneticButton
                as="div"
                onClick={onOpenWaitlist}
                className="lucky-cube w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] sm:rounded-[22px] flex items-center justify-center cursor-pointer transition-shadow duration-300"
                style={{
                  transform: 'rotate(-10deg)',
                  background: 'linear-gradient(135deg, #FF6B4A 0%, #ff4704 55%, #D83B0E 100%)',
                  boxShadow:
                    'inset 3px 3px 8px rgba(255,255,255,0.4), inset -3px -3px 12px rgba(0,0,0,0.3), 0 12px 30px rgba(255,71,4,0.35)',
                }}
                title="Click for Early Access Allocation"
              >
                <span
                  className="lucky-cube-mark text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Inter',sans-serif] select-none"
                  style={{
                    transform: 'rotate(10deg)',
                    textShadow: '0 3px 6px rgba(0,0,0,0.35)',
                  }}
                >
                  A
                </span>
              </MagneticButton>

              {/* Hand-drawn curved arrow & Caveat accent */}
              <div
                className="lucky-text-row flex items-center gap-1.5 mt-1 select-none"
                style={{ transform: 'rotate(-4deg)' }}
              >
                <svg
                  className="lucky-arrow w-5 h-5 text-[#777169] dark:text-white/50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 20 C 6 14, 10 9, 18 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 5 L 12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 5 L 18 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="lucky-text text-[17px] font-semibold text-[#777169] dark:text-white/60 whitespace-nowrap font-['Caveat',cursive]">
                  Feeling focused?
                </span>
              </div>
            </div>

            {/* Top Section: Navigation Columns with Caveat Headers */}
            <div className="footer-right-top flex flex-col sm:flex-row gap-10 sm:gap-16 pt-2">
              {/* Column 1: Navigation */}
              <div className="footer-col">
                <h4 className="footer-col-title text-2xl font-semibold italic text-[#777169] dark:text-white/50 mb-4 font-['Caveat',cursive]">
                  Navigation
                </h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => scrollTo('product')}
                      className="block text-sm font-[500] text-[#44403b] hover:text-[#000000] dark:text-white/80 dark:hover:text-[#FF5722] transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      Packaging Architecture
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo('ritual')}
                      className="block text-sm font-[500] text-[#44403b] hover:text-[#000000] dark:text-white/80 dark:hover:text-[#FF5722] transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      The 30s Melt Ritual
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo('flavors')}
                      className="block text-sm font-[500] text-[#44403b] hover:text-[#000000] dark:text-white/80 dark:hover:text-[#FF5722] transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      5-Flavor Suite
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo('why-avro')}
                      className="block text-sm font-[500] text-[#44403b] hover:text-[#000000] dark:text-white/80 dark:hover:text-[#FF5722] transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      Why AVRO Strips
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo('story')}
                      className="block text-sm font-[500] text-[#44403b] hover:text-[#000000] dark:text-white/80 dark:hover:text-[#FF5722] transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      Everyday Carry Contexts
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Transparency & Specifications */}
              <div className="footer-col">
                <h4 className="footer-col-title text-2xl font-semibold italic text-[#777169] dark:text-white/50 mb-4 font-['Caveat',cursive]">
                  Transparency
                </h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => scrollTo('faq')}
                      className="block text-sm font-[500] text-[#44403b] hover:text-[#000000] dark:text-white/80 dark:hover:text-[#FF5722] transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      FAQ & Specifications
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo('story')}
                      className="block text-sm font-[500] text-[#44403b] hover:text-[#000000] dark:text-white/80 dark:hover:text-[#FF5722] transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      Origin & Purpose
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={onOpenWaitlist}
                      className="block text-sm font-[500] text-[#000000] dark:text-white underline decoration-[#ebe8e4] hover:opacity-80 transition-colors font-['Inter',sans-serif] cursor-pointer"
                    >
                      Batch 01 Early Access
                    </button>
                  </li>
                  <li>
                    <a
                      href="#privacy"
                      onClick={(e) => {
                        e.preventDefault()
                        onOpenWaitlist()
                      }}
                      className="block text-sm font-[500] text-[#777169] hover:text-[#000000] dark:text-white/50 dark:hover:text-white transition-colors font-['Inter',sans-serif]"
                    >
                      Terms & Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Row: Copyright + Mini Newsletter Subscribe */}
            <div className="footer-bottom flex flex-col md:flex-row md:items-end justify-between gap-6 mt-12 pt-8 border-t border-[#ebe8e4] dark:border-white/[0.08]">
              {/* Copyright */}
              <div className="footer-copyright text-xs font-normal text-[#777169] dark:text-white/45 font-['Inter',sans-serif]">
                <div>© {new Date().getFullYear()} AVRO Labs. All rights reserved.</div>
                <div className="text-[11px] text-[#a59f97] dark:text-white/30 mt-1">
                  * Prototype concept. Formulated for water-free focus.
                </div>
              </div>

              {/* Mini CTA & Subscribe Input with Magnetic Button */}
              <div className="footer-cta-mini flex flex-col gap-3">
                <h4 className="text-sm font-normal text-[#44403b] dark:text-white/60 leading-snug font-['Inter',sans-serif]">
                  Fast focus moves fast.<br />
                  <strong className="block text-base font-[500] text-[#000000] dark:text-white font-['Inter',sans-serif]">
                    Stay ahead with AVRO.
                  </strong>
                </h4>

                <form
                  onSubmit={handleSubscribe}
                  className="footer-subscribe-row flex items-center w-full sm:w-[320px] bg-[#f5f3f1] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/12 rounded-[14px] p-1 shadow-inner focus-within:border-[#000000]/40 transition-colors"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={subscribed ? "You're on the list!" : 'Enter email address'}
                    disabled={subscribed}
                    className="flex-1 bg-transparent px-3 py-2 text-xs text-[#000000] dark:text-white placeholder-[#a59f97] dark:placeholder-white/35 outline-none font-['Inter',sans-serif]"
                  />
                  <MagneticButton
                    as="button"
                    type="submit"
                    className="px-5 py-2.5 bg-[#000000] hover:bg-black/90 dark:bg-white dark:text-black text-white text-xs font-[500] rounded-[10px] transition-all duration-200 shadow-xs shrink-0 cursor-pointer font-['Inter',sans-serif]"
                  >
                    {subscribed ? 'Joined' : 'Join'}
                  </MagneticButton>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. OFFICIAL AVRO RAZOR-SHARP VECTOR LOGO WATERMARK (Light Mode Stone & Dark Mode Silver) ─── */}
        <div className="relative mt-10 sm:mt-14 w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none z-0 px-4">
          <div
            ref={giantTextRef}
            className="w-full max-w-[1150px] flex items-center justify-center will-change-transform"
          >
            <svg
              viewBox="0 0 720 153"
              className="w-full h-auto select-none pointer-events-none block"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
            >
              <defs>
                <linearGradient id="avroSharpSilverGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#44403b" stopOpacity="0.22" />
                  <stop offset="35%" stopColor="#777169" stopOpacity="0.10" />
                  <stop offset="70%" stopColor="#a59f97" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#f5f3f1" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="avroSharpSilverGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                  <stop offset="35%" stopColor="#E2E8F0" stopOpacity="0.40" />
                  <stop offset="70%" stopColor="#94A3B8" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#06060A" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Light Mode Watermark */}
              <path
                d={AVRO_VECTOR_PATH}
                fill="url(#avroSharpSilverGradLight)"
                stroke="none"
                fillRule="evenodd"
                className="block dark:hidden"
              />
              {/* Dark Mode Watermark */}
              <path
                d={AVRO_VECTOR_PATH}
                fill="url(#avroSharpSilverGradDark)"
                stroke="none"
                fillRule="evenodd"
                className="hidden dark:block"
              />
            </svg>
          </div>
        </div>

        {/* ─── 4. BOTTOM CREDITS BAR & MAGNETIC BACK-TO-TOP ─── */}
        <div className="relative z-20 max-w-[1150px] mx-auto mt-6 pt-6 border-t border-[#ebe8e4] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#777169] dark:text-white/40 text-[11px] font-[500] tracking-widest uppercase">
            Designed for Instant Clarity & Zero Water Dependency
          </div>

          <div className="px-5 py-2 rounded-full flex items-center gap-2 cursor-default border border-[#ebe8e4] dark:border-white/10 bg-[#fdfcfc] dark:bg-white/[0.03] shadow-xs">
            <span className="text-[#777169] dark:text-white/50 text-[11px] font-[500] uppercase tracking-wider">Engineered with</span>
            <span className="animate-footer-heartbeat text-sm text-[#ff4704]">✦</span>
            <span className="text-[#777169] dark:text-white/50 text-[11px] font-[500] uppercase tracking-wider">by</span>
            <span className="text-[#000000] dark:text-white font-[600] text-xs tracking-normal ml-0.5">AVRO LABS</span>
          </div>

          {/* Magnetic Back-To-Top Button */}
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-[#ebe8e4] dark:border-white/10 bg-[#fdfcfc] dark:bg-white/[0.03] flex items-center justify-center text-[#44403b] hover:text-[#000000] dark:text-white/50 dark:hover:text-white transition-colors group cursor-pointer shadow-xs"
            aria-label="Back to top"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </section>
    </>
  )
}

export default Footer
