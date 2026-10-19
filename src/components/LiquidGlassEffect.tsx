import React, { useEffect, useRef } from 'react'

/**
 * LiquidGlassEffect — Integrates liquid-gl (WebGPU/WebGL liquid glass refraction).
 * As requested in Section 4B of the master prompt:
 * "Use it to create a deliberate refractive, liquid-glass, or distortion effect
 * where it improves the experience—for example, on a selected visual layer,
 * product-adjacent environment, or a small number of interface surfaces.
 * Do not apply expensive distortion indiscriminately across every section."
 */

interface LiquidGlassEffectProps {
  targetSelector: string
  enabled?: boolean
  refraction?: number
  aberration?: number
  bevelDepth?: number
}

export const LiquidGlassEffect: React.FC<LiquidGlassEffectProps> = ({
  targetSelector,
  enabled = true,
  refraction = 0.015,
  aberration = 0.04,
  bevelDepth = 0.08,
}) => {
  const initRef = useRef(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Honor user prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let cancelled = false

    const init = async () => {
      try {
        const mod = await import('liquid-gl')
        const liquidGL = mod.default || (window as any).liquidGL

        if (cancelled || !liquidGL || typeof liquidGL !== 'function') return

        const el = document.querySelector(targetSelector)
        if (!el) return

        const instance = liquidGL({
          target: targetSelector,
          engine: 'auto',
          refraction,
          aberration,
          bevelDepth,
          bevelWidth: 0.12,
          shadow: false,
          specular: true,
          interaction: 'fluid',
          interactionStrength: 0.25,
          interactionRadius: 0.3,
        })

        initRef.current = true

        if (instance && typeof instance.destroy === 'function') {
          cleanupRef.current = () => {
            try {
              instance.destroy()
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        // Graceful fallback if liquid-gl fails to initialize
        console.warn('liquid-gl fallback active:', err)
      }
    }

    // Delay slightly to ensure target DOM is rendered
    const timeout = setTimeout(init, 800)

    return () => {
      cancelled = true
      clearTimeout(timeout)
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [targetSelector, enabled, refraction, aberration, bevelDepth])

  return null
}

export default LiquidGlassEffect
