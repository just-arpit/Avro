import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return

    setSubmitting(true)
    setError('')

    // NOTE: No backend integration is currently configured.
    // This simulates a local submission. The data is NOT persisted
    // to any server or database. A real integration (e.g. Supabase,
    // Airtable, or custom API) should replace this setTimeout.
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      // Reset state after close animation
      setTimeout(() => {
        setSubmitted(false)
        setName('')
        setEmail('')
        setError('')
      }, 300)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="!max-w-lg !rounded-[24px] !p-0 !bg-[#fdfcfc] dark:!bg-[#101012] !border-[#ebe8e4] dark:!border-white/[0.08] !ring-0 text-[#000000] dark:text-white shadow-2xl"
      >
        {!submitted ? (
          <div className="p-6 sm:p-8">
            <DialogHeader className="text-left mb-6">
              <div className="label-mono text-[#000000]/60 dark:text-[#FF5722] mb-3 text-xs uppercase tracking-widest font-mono">Early Access</div>
              <DialogTitle className="!text-2xl sm:!text-3xl font-light tracking-[-0.02em] !text-[#000000] dark:!text-white">
                Reserve your spot.
              </DialogTitle>
              <DialogDescription className="!text-sm !text-[#777169] dark:!text-white/50 !mt-2 !leading-relaxed font-normal">
                Join the waitlist for AVRO's first production batch.
                We'll notify you when it's ready — no spam.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="waitlist-name" className="block text-xs font-medium text-[#44403b] dark:text-white/60 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-[4px] bg-[#f5f3f1] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/[0.08] text-[#000000] dark:text-white placeholder-[#a59f97] dark:placeholder-white/25 text-sm focus:outline-none focus:border-[#000000]/40 dark:focus:border-white/40 transition-all"
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="waitlist-email" className="block text-xs font-medium text-[#44403b] dark:text-white/60 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-[4px] bg-[#f5f3f1] dark:bg-white/[0.04] border border-[#ebe8e4] dark:border-white/[0.08] text-[#000000] dark:text-white placeholder-[#a59f97] dark:placeholder-white/25 text-sm focus:outline-none focus:border-[#000000]/40 dark:focus:border-white/40 transition-all"
                  disabled={submitting}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-[#000000] text-white hover:bg-[#1a1a1a] dark:bg-white dark:text-black dark:hover:bg-white/90 font-medium text-sm transition-all duration-200 active:scale-[0.98] border border-[#e5e5e5] dark:border-transparent flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#a59f97] dark:text-white/30 mt-2">
                No payment required. We only send launch updates.
              </p>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center py-12">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-light tracking-tight text-[#000000] dark:text-white">
              You're on the list.
            </h3>

            <p className="text-sm text-[#777169] dark:text-white/50 mt-3 max-w-sm mx-auto leading-relaxed">
              We'll email <span className="text-[#000000] dark:text-white font-medium">{email}</span> when
              AVRO's first batch is ready.
            </p>

            <p className="text-xs text-[#a59f97] dark:text-white/25 mt-6 italic">
              Note: This is a local registration only. No data has been sent to a server — a backend integration is needed for production.
            </p>

            <button
              onClick={() => handleOpenChange(false)}
              className="mt-8 rounded-full border border-[#ebe8e4] dark:border-white/10 px-5 py-2 text-sm text-[#44403b] hover:text-[#000000] dark:text-white/60 dark:hover:text-white bg-[#f5f3f1] dark:bg-white/[0.05] transition-colors"
            >
              Close and explore
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
