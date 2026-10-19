import React, { useState, useEffect } from 'react'
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react'
import { FlavorData } from '../constants/flavors'
import { useTheme } from '../context/ThemeContext'

interface NavbarProps {
  onOpenWaitlist: () => void
  activeFlavor?: FlavorData
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist, activeFlavor }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Ritual', href: '#ritual' },
    { name: 'Flavors', href: '#flavors' },
    { name: 'Why AVRO', href: '#why-avro' },
    { name: 'Story', href: '#story' },
    { name: 'FAQ', href: '#faq' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const topOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <header
      id="avro-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#fdfcfc]/90 dark:bg-[#06060A]/80 backdrop-blur-2xl border-b border-[#ebe8e4] dark:border-white/[0.06] shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group" aria-label="AVRO Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 720 153"
              className="h-5 sm:h-6 w-auto text-[#000000] dark:text-white fill-current transition-opacity group-hover:opacity-80"
              shapeRendering="geometricPrecision"
            >
              <path
                d="M 126 14 L 164 14 L 191 134 L 149 134 L 144 98 L 82 98 L 48 134 L 8 134 Z M 143 44 L 116 76 L 154 76 Z M 182 14 L 221 14 L 245 96 L 320 14 L 360 14 L 258 134 L 219 134 Z M 376 14 L 466 14 C 498 14, 516 30, 516 54 C 516 76, 498 90, 464 91 L 496 136 L 452 136 L 424 92 L 388 92 L 376 136 L 336 136 Z M 410 40 L 446 40 Q 472 55 442 70 L 400 70 Z M 585 16 L 678 16 C 698 16, 710 30, 708 48 L 684 116 C 682 128, 670 138, 654 138 L 562 138 C 538 138, 518 126, 518 108 L 542 46 C 544 30, 560 16, 585 16 Z M 586 46 L 648 46 C 662 46, 670 52, 668 62 L 654 96 C 652 104, 644 110, 630 110 L 570 110 C 556 110, 550 104, 552 94 L 566 62 C 568 52, 574 46, 586 46 Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-1.5 text-[14px] font-[400] text-[#777169] hover:text-[#000000] dark:text-white/60 dark:hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle + CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Pill Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[#ebe8e4] dark:border-white/10 bg-[#f5f3f1] dark:bg-white/5 text-[#44403b] hover:text-[#000000] dark:text-white/70 dark:hover:text-white transition-all cursor-pointer hover:bg-[#ebe8e4]"
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#44403b]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-300" />
              )}
            </button>

            {/* Filled Pill CTA Button (ElevenLabs Spec: #000000 fill, white text, 9999px radius, 14px/500, 1px border) */}
            <button
              onClick={onOpenWaitlist}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#000000] text-white dark:bg-white dark:text-[#06060A] px-5 py-2 text-[14px] font-[500] tracking-normal hover:opacity-90 transition-all duration-200 active:scale-[0.98] border border-[#e5e5e5] dark:border-transparent cursor-pointer shadow-sm"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#000000] dark:text-white/70 hover:opacity-80 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[56px] bg-[#fdfcfc]/98 dark:bg-[#06060A]/98 backdrop-blur-2xl z-40 animate-fade-in border-t border-[#ebe8e4] dark:border-white/10">
          <nav className="flex flex-col gap-2 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-2xl font-[300] tracking-[-0.02em] text-[#000000] dark:text-white/80 hover:opacity-70 py-3 border-b border-[#ebe8e4] dark:border-white/[0.04] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm text-[#777169] dark:text-white/60">Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#ebe8e4] dark:border-white/10 bg-[#f5f3f1] dark:bg-white/5 text-sm font-medium"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenWaitlist()
              }}
              className="mt-6 w-full py-4 rounded-full bg-[#000000] text-white dark:bg-white dark:text-black font-[500] text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

