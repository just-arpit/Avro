declare module 'liquid-gl' {
  export interface LiquidGLOptions {
    target: string
    engine?: 'auto' | 'webgpu' | 'webgl2' | 'webgl'
    snapshot?: string
    resolution?: number
    zIndex?: number
    content?: string | boolean
    refraction?: number
    aberration?: number
    bevelDepth?: number
    bevelWidth?: number
    frost?: number
    shadow?: boolean
    specular?: boolean
    reveal?: 'none' | 'fade'
    tilt?: boolean
    tiltFactor?: number
    tiltEase?: number
    draggable?: boolean
    interaction?: 'none' | 'fluid'
    interactionStrength?: number
    interactionRadius?: number
    interactionViscosity?: number
    magnify?: number
    tint?: string | null
    helper?: boolean
    on?: {
      init?: (instance: any) => void
      dragstart?: (instance: any, info: { x: number; y: number }) => void
      drag?: (instance: any, info: { x: number; y: number }) => void
      dragend?: (instance: any, info: { x: number; y: number }) => void
    }
  }

  export interface LiquidGLInstance {
    destroy: () => void
    setTint?: (tint: string) => void
    setDraggable?: (draggable: boolean) => void
  }

  function liquidGL(options: LiquidGLOptions): LiquidGLInstance

  export default liquidGL
}
