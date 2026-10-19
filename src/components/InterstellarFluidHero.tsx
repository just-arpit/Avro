import React, { useEffect, useRef, useCallback } from 'react'

/**
 * InterstellarFluidHero — Custom WebGL fluid simulation background.
 * Replaces uilora's Pro-only `interstellar-fluid-hero` with an equivalent
 * cinematic fluid shader that responds to mouse/touch interaction and
 * accepts a flavor color for dynamic tinting.
 *
 * Uses a metaball / fluid noise shader rendered on a full-screen canvas.
 * Falls back gracefully if WebGL is unavailable.
 */

interface InterstellarFluidHeroProps {
  flavorColor?: string
  intensity?: number
  className?: string
}

// Convert hex color to normalized RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [1.0, 0.34, 0.13] // fallback AVRO orange
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ]
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec3 u_color;
  uniform float u_intensity;

  // Simplex-style noise for fluid motion
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractal Brownian Motion for layered fluid movement
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = uv * aspect;

    float t = u_time * 0.15;

    // Mouse influence — creates gentle attraction field
    vec2 mouse = u_mouse * aspect;
    float mouseDist = length(p - mouse);
    float mouseInfluence = smoothstep(0.8, 0.0, mouseDist) * 0.3 * u_intensity;

    // Warped fluid coordinates
    vec2 warp1 = vec2(
      fbm(p * 1.5 + vec2(t * 0.4, t * 0.3)),
      fbm(p * 1.5 + vec2(t * 0.3 + 5.0, t * 0.4 + 3.0))
    );

    vec2 warp2 = vec2(
      fbm(p * 2.0 + warp1 * 1.2 + vec2(t * 0.2 + mouseInfluence)),
      fbm(p * 2.0 + warp1 * 1.2 + vec2(t * 0.15 + 2.0 + mouseInfluence))
    );

    float n = fbm(p * 1.0 + warp2 * 1.5);

    // Color palette: deep void base with flavor-reactive aurora
    vec3 voidColor = vec3(0.024, 0.024, 0.039);
    vec3 deepColor = u_color * 0.15;
    vec3 midColor = u_color * 0.4;
    vec3 brightColor = u_color * 0.7;

    // Layer colors based on noise value
    vec3 col = voidColor;
    col = mix(col, deepColor, smoothstep(-0.5, 0.0, n) * u_intensity);
    col = mix(col, midColor, smoothstep(0.0, 0.4, n) * 0.5 * u_intensity);
    col = mix(col, brightColor, smoothstep(0.3, 0.7, n) * 0.2 * u_intensity);

    // Mouse glow halo
    col += u_color * mouseInfluence * 0.5;

    // Subtle radial vignette
    float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5));
    col *= (0.7 + 0.3 * vignette);

    // Gamma correction for richness
    col = pow(col, vec3(0.95));

    gl_FragColor = vec4(col, 1.0);
  }
`

export const InterstellarFluidHero: React.FC<InterstellarFluidHeroProps> = ({
  flavorColor = '#FF5722',
  intensity = 1.0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
  const startTimeRef = useRef(Date.now())

  const initGL = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return false

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    })
    if (!gl) return false

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, VERTEX_SHADER)
    gl.compileShader(vs)
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.warn('Fluid hero vertex shader error:', gl.getShaderInfoLog(vs))
      return false
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, FRAGMENT_SHADER)
    gl.compileShader(fs)
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.warn('Fluid hero fragment shader error:', gl.getShaderInfoLog(fs))
      return false
    }

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Fluid hero program link error:', gl.getProgramInfoLog(program))
      return false
    }

    gl.useProgram(program)

    // Full-screen quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    glRef.current = gl
    programRef.current = program
    startTimeRef.current = Date.now()

    return true
  }, [])

  useEffect(() => {
    // Check for reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const success = initGL()
    if (!success) return

    const canvas = canvasRef.current!
    const gl = glRef.current!
    const program = programRef.current!

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5) // Limit for performance
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    resize()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      if (touch) {
        targetMouseRef.current = {
          x: (touch.clientX - rect.left) / rect.width,
          y: 1.0 - (touch.clientY - rect.top) / rect.height,
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    const render = () => {
      if (!gl || !program) return

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04

      const time = (Date.now() - startTimeRef.current) / 1000
      const [r, g, b] = hexToRgb(flavorColor)

      gl.useProgram(program)
      gl.uniform1f(gl.getUniformLocation(program, 'u_time'), time)
      gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), canvas.width, canvas.height)
      gl.uniform2f(gl.getUniformLocation(program, 'u_mouse'), mouseRef.current.x, mouseRef.current.y)
      gl.uniform3f(gl.getUniformLocation(program, 'u_color'), r, g, b)
      gl.uniform1f(gl.getUniformLocation(program, 'u_intensity'), intensity)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', resize)
      if (gl) {
        const ext = gl.getExtension('WEBGL_lose_context')
        if (ext) ext.loseContext()
      }
    }
  }, [flavorColor, intensity, initGL])

  return (
    <canvas
      ref={canvasRef}
      className={`fluid-hero-canvas ${className}`}
      aria-hidden="true"
      role="presentation"
    />
  )
}
