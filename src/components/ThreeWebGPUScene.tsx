import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { FlavorData, FLAVORS } from '../constants/flavors'

interface ThreeWebGPUSceneProps {
  activeFlavor?: FlavorData
  activeFlavorName?: string
  activeFlavorColor?: string
}

interface BBox {
  x: number
  y: number
  w: number
  h: number
}

// Calibrated inset crops avoiding all outer template white borders
// while keeping center and proportions identical across all 5 flavors
const EXACT_BBOXES: Record<string, {
  front: BBox
  back: BBox
  spine: BBox
  right: BBox
  top: BBox
  bottom: BBox
}> = {
  orange: {
    front: { x: 118, y: 22, w: 1018, h: 1205 },
    back: { x: 88, y: 38, w: 1078, h: 1184 },
    spine: { x: 404, y: 22, w: 154, h: 840 },
    right: { x: 1215, y: 22, w: 154, h: 840 },
    top: { x: 120, y: 195, w: 1530, h: 195 },
    bottom: { x: 120, y: 520, w: 1530, h: 235 }
  },
  mint: {
    front: { x: 96, y: 24, w: 1056, h: 1198 },
    back: { x: 88, y: 38, w: 1078, h: 1184 },
    spine: { x: 404, y: 22, w: 154, h: 840 },
    right: { x: 1215, y: 22, w: 154, h: 840 },
    top: { x: 120, y: 195, w: 1530, h: 195 },
    bottom: { x: 120, y: 520, w: 1530, h: 235 }
  },
  lemon: {
    front: { x: 118, y: 22, w: 1018, h: 1205 },
    back: { x: 88, y: 38, w: 1078, h: 1184 },
    spine: { x: 404, y: 22, w: 154, h: 840 },
    right: { x: 1215, y: 22, w: 154, h: 840 },
    top: { x: 120, y: 195, w: 1530, h: 195 },
    bottom: { x: 120, y: 520, w: 1530, h: 235 }
  },
  berry: {
    front: { x: 96, y: 24, w: 1056, h: 1198 },
    back: { x: 88, y: 38, w: 1078, h: 1184 },
    spine: { x: 401, y: 16, w: 151, h: 852 },
    right: { x: 1221, y: 16, w: 151, h: 852 },
    top: { x: 120, y: 195, w: 1530, h: 195 },
    bottom: { x: 120, y: 515, w: 1530, h: 235 }
  },
  tropical: {
    front: { x: 96, y: 24, w: 1056, h: 1198 },
    back: { x: 88, y: 38, w: 1078, h: 1184 },
    spine: { x: 401, y: 16, w: 151, h: 852 },
    right: { x: 1221, y: 16, w: 151, h: 852 },
    top: { x: 110, y: 205, w: 1550, h: 185 },
    bottom: { x: 110, y: 480, w: 1550, h: 225 }
  }
}

// Map each flavor ID to its real packaging textures in public/assets/3d_images/
const FLAVOR_IMAGE_MAP: Record<string, {
  front: string
  back: string
  sides: string
  topbottom: string
}> = {
  orange: {
    front: '/assets/3d_images/orangefront.png',
    back: '/assets/3d_images/orangeback.png',
    sides: '/assets/3d_images/orangesides.png',
    topbottom: '/assets/3d_images/orangetopbottom.png',
  },
  mint: {
    front: '/assets/3d_images/mintfront.png',
    back: '/assets/3d_images/mintback.png',
    sides: '/assets/3d_images/mintsides.png',
    topbottom: '/assets/3d_images/minttopbottom.png',
  },
  lemon: {
    front: '/assets/3d_images/lemonfront.png',
    back: '/assets/3d_images/lemonback.png',
    sides: '/assets/3d_images/lemonsides.png',
    topbottom: '/assets/3d_images/lemontopbottom.png',
  },
  berry: {
    front: '/assets/3d_images/berryfront.png',
    back: '/assets/3d_images/berryback.png',
    sides: '/assets/3d_images/berrysides.png',
    topbottom: '/assets/3d_images/berrytopbottom.png',
  },
  tropical: {
    front: '/assets/3d_images/tropicalfront.png',
    back: '/assets/3d_images/tropicalback.png',
    sides: '/assets/3d_images/tropicalsides.png',
    topbottom: '/assets/3d_images/tropicaltopbottom.png',
  },
}

// In-memory texture image cache
const imageCache: Record<string, HTMLImageElement> = {}

function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache[src] && imageCache[src].complete && imageCache[src].naturalWidth > 0) {
    return Promise.resolve(imageCache[src])
  }
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imageCache[src] = img
      resolve(img)
    }
    img.onerror = (err) => {
      console.warn(`Could not load packaging texture: ${src}`, err)
      reject(err)
    }
    img.src = src
  })
}

// Microscopic cardstock paper tooth to avoid digital plastic look
function applyPaperGrain(ctx: CanvasRenderingContext2D, w: number, h: number, intensity = 0.012) {
  try {
    const imgData = ctx.getImageData(0, 0, w, h)
    const d = imgData.data
    const factor = 255 * intensity
    for (let i = 0; i < d.length; i += 4) {
      const noise = (Math.random() - 0.5) * factor
      d[i] = Math.min(255, Math.max(0, d[i] + noise))
      d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise))
      d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise))
    }
    ctx.putImageData(imgData, 0, 0)
  } catch (e) {
    // Ignore cross-origin image data security in edge environments
  }
}

// Precise edge-to-edge drawing cropped cleanly inside packaging artwork with 0 white bleed
function drawCroppedFace(
  sourceImg: HTMLImageElement,
  destCanvas: HTMLCanvasElement,
  bbox: BBox,
  fillBgColor: string
) {
  const ctx = destCanvas.getContext('2d', { willReadFrequently: true })!
  const dw = destCanvas.width
  const dh = destCanvas.height
  ctx.clearRect(0, 0, dw, dh)

  // 1. Fill base with carton tone
  ctx.fillStyle = fillBgColor
  ctx.fillRect(0, 0, dw, dh)

  // 2. Draw cropped packaging artwork edge-to-edge
  ctx.drawImage(
    sourceImg,
    bbox.x, bbox.y, bbox.w, bbox.h,
    0, 0, dw, dh
  )

  // 3. Subtle tactile paper grain for premium folding carton texture
  applyPaperGrain(ctx, dw, dh, 0.012)
}

// High-contrast, tactile sublingual strip palettes ensuring the micro-dissolve texture
// and pullulan polymer pores remain crisply visible across all flavors (including Lemon Citrus and Tropical Sol)
const STRIP_FLAVOR_PALETTES: Record<string, {
  base: string
  grad1: string
  grad2: string
  poreShadow: string
}> = {
  orange: {
    base: '#FF6D00',
    grad1: '#FFA726',
    grad2: '#E64A19',
    poreShadow: 'rgba(90, 20, 0, 0.38)',
  },
  mint: {
    base: '#00BFA5',
    grad1: '#64FFDA',
    grad2: '#00796B',
    poreShadow: 'rgba(0, 60, 50, 0.38)',
  },
  lemon: {
    base: '#FBC02D',
    grad1: '#FFF176',
    grad2: '#F57F17',
    poreShadow: 'rgba(100, 60, 0, 0.40)',
  },
  tropical: {
    base: '#FFA000',
    grad1: '#FFD54F',
    grad2: '#E65100',
    poreShadow: 'rgba(100, 35, 0, 0.40)',
  },
  berry: {
    base: '#D81B60',
    grad1: '#FF4081',
    grad2: '#880E4F',
    poreShadow: 'rgba(70, 5, 25, 0.38)',
  },
}

// Procedural micro-texture matching the authentic ThinSol™ sublingual polymer matrix
// with clearly visible dissolving micro-pores and natural seamless edges (zero white outline)
function createStripTexture(flavor: FlavorData): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 1024
  const ctx = c.getContext('2d')!

  const palette = STRIP_FLAVOR_PALETTES[flavor.id] || STRIP_FLAVOR_PALETTES.orange

  // Vibrant high-contrast gradient matching the sublingual flavor matrix
  const grad = ctx.createLinearGradient(0, 0, 512, 1024)
  grad.addColorStop(0, palette.grad1)
  grad.addColorStop(0.35, palette.base)
  grad.addColorStop(0.70, palette.grad1)
  grad.addColorStop(1, palette.grad2)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 1024)

  // ThinSol™ dissolving micro-pores — clearly visible pore matrix with crisp depth, NO outline
  for (let y = 14; y < 1024; y += 22) {
    for (let x = 14; x < 512; x += 22) {
      const offsetX = (y % 44 === 0) ? 11 : 0
      const px = x + offsetX
      // Cavity depth shadow
      ctx.fillStyle = palette.poreShadow
      ctx.beginPath()
      ctx.arc(px + 0.8, y + 0.8, 2.8, 0, Math.PI * 2)
      ctx.fill()
      // Crisp dissolving pore core
      ctx.fillStyle = 'rgba(255, 255, 255, 0.72)'
      ctx.beginPath()
      ctx.arc(px, y, 2.2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Frosted micro-grain for authentic sublingual polymer tooth
  try {
    const imgData = ctx.getImageData(0, 0, 512, 1024)
    const d = imgData.data
    for (let i = 0; i < d.length; i += 4) {
      const noise = (Math.random() - 0.5) * 12
      d[i] = Math.min(255, Math.max(0, d[i] + noise))
      d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise))
      d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise))
    }
    ctx.putImageData(imgData, 0, 0)
  } catch (e) { }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 16
  tex.needsUpdate = true
  return tex
}

// Curved strip geometry matching avro-strip-float.jpg (smooth harmonic S-curve wave with subtle surface curl)
function createCurvedStripGeometry(width = 0.88, length = 2.1): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(width, length, 48, 96)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const u = y / (length / 2) // -1 to 1

    // Double harmonic S-curve wave from reference avro-strip-float.jpg
    let z = 0.22 * Math.sin(u * Math.PI * 1.25 + 0.35) + 0.08 * Math.cos(u * Math.PI * 2.2)
    // Subtle transverse surface tension curl across width
    z += -0.025 * Math.pow(x / (width / 2), 2)
    pos.setZ(i, z)
  }
  geo.computeVertexNormals()
  return geo
}

// Laying strip geometry (natural resting curl on table surface)
function createLayingStripGeometry(width = 0.82, length = 1.45): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(width, length, 32, 64)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const u = y / (length / 2)
    const z = 0.04 * (1 - Math.cos(u * Math.PI * 0.8)) + 0.02 * Math.sin(u * Math.PI)
    pos.setZ(i, z)
  }
  geo.computeVertexNormals()
  return geo
}

export const ThreeWebGPUScene: React.FC<ThreeWebGPUSceneProps> = ({
  activeFlavor,
  activeFlavorName,
  activeFlavorColor
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rendererType, setRendererType] = useState<'WebGPU (TSL)' | 'WebGL2'>('WebGPU (TSL)')
  const [fps, setFps] = useState(60)

  // Determine current flavor data
  const currentFlavor: FlavorData = activeFlavor ||
    FLAVORS.find(f => f.name === activeFlavorName) ||
    FLAVORS[0]

  // References to dynamic 3D elements
  const boxMeshRef = useRef<THREE.Mesh | null>(null)
  const faceCanvasesRef = useRef<{
    right: HTMLCanvasElement
    spine: HTMLCanvasElement
    top: HTMLCanvasElement
    bottom: HTMLCanvasElement
    front: HTMLCanvasElement
    back: HTMLCanvasElement
  } | null>(null)
  const faceTexturesRef = useRef<THREE.CanvasTexture[]>([])
  const stripMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([])
  const floatingStripRef = useRef<THREE.Mesh | null>(null)
  const floatingShadowRef = useRef<THREE.Mesh | null>(null)
  const flavorLightRef = useRef<THREE.PointLight | null>(null)

  // Preload all 5 flavors packaging textures on mount
  useEffect(() => {
    Object.values(FLAVOR_IMAGE_MAP).forEach((pkg) => {
      loadImage(pkg.front).catch(() => { })
      loadImage(pkg.back).catch(() => { })
      loadImage(pkg.sides).catch(() => { })
      loadImage(pkg.topbottom).catch(() => { })
    })
  }, [])

  // Function to load and render packaging faces for a specific flavor
  async function updateTexturesForFlavor(flavor: FlavorData) {
    const pkgPaths = FLAVOR_IMAGE_MAP[flavor.id] || FLAVOR_IMAGE_MAP.orange
    const bboxes = EXACT_BBOXES[flavor.id] || EXACT_BBOXES.orange
    const canvases = faceCanvasesRef.current
    const textures = faceTexturesRef.current

    if (!canvases || textures.length < 6) return

    try {
      const [frontImg, backImg, sidesImg, topbottomImg] = await Promise.all([
        loadImage(pkgPaths.front),
        loadImage(pkgPaths.back),
        loadImage(pkgPaths.sides),
        loadImage(pkgPaths.topbottom),
      ])

      // 0. Right Side face (+X)
      drawCroppedFace(sidesImg, canvases.right, bboxes.right, flavor.color)

      // 1. Left/Spine face (-X)
      drawCroppedFace(sidesImg, canvases.spine, bboxes.spine, flavor.color)

      // 2. Top Flap face (+Y)
      drawCroppedFace(topbottomImg, canvases.top, bboxes.top, flavor.color)

      // 3. Bottom Flap face (-Y)
      drawCroppedFace(topbottomImg, canvases.bottom, bboxes.bottom, flavor.color)

      // 4. Front Face (+Z)
      drawCroppedFace(frontImg, canvases.front, bboxes.front, flavor.color)

      // 5. Back Face (-Z)
      drawCroppedFace(backImg, canvases.back, bboxes.back, flavor.color)

      // Notify Three.js to re-upload updated canvas textures to GPU
      textures.forEach((tex) => {
        tex.needsUpdate = true
      })
    } catch (err) {
      console.warn('Error loading flavor packaging textures:', err)
    }
  }

  // Respond when active flavor changes
  useEffect(() => {
    updateTexturesForFlavor(currentFlavor)

    // Update oral strip physical material textures and colors
    const newStripTex = createStripTexture(currentFlavor)
    const palette = STRIP_FLAVOR_PALETTES[currentFlavor.id] || STRIP_FLAVOR_PALETTES.orange
    stripMaterialsRef.current.forEach((mat) => {
      mat.map = newStripTex
      mat.color.set(0xffffff)
      mat.emissive.set(palette.base)
      mat.emissiveIntensity = 0.12
      mat.needsUpdate = true
    })

    // Update flavor bounce point light
    if (flavorLightRef.current) {
      flavorLightRef.current.color.set(currentFlavor.lightColor)
    }

    // Play subtle 3D showcase turn when switching flavor
    if (boxMeshRef.current) {
      const startRotY = boxMeshRef.current.rotation.y
      const targetRotY = startRotY + Math.PI * 2
      let startTime = performance.now()
      const spin = (now: number) => {
        const progress = Math.min((now - startTime) / 600, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        if (boxMeshRef.current) {
          boxMeshRef.current.rotation.y = THREE.MathUtils.lerp(startRotY, targetRotY, ease)
        }
        if (progress < 1) {
          requestAnimationFrame(spin)
        } else if (boxMeshRef.current) {
          boxMeshRef.current.rotation.y = 0.34 // Beauty showcase perspective
        }
      }
      requestAnimationFrame(spin)
    }
  }, [currentFlavor.id, currentFlavor.name, currentFlavor.color])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isDisposed = false
    let animationFrameId: number
    let renderer: any = null
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera

    // Mouse / Touch Interaction State
    const mouse = {
      isDragging: false,
      prevX: 0,
      prevY: 0,
      rotX: -0.05,
      rotY: 0.34,
      targetRotX: -0.05,
      targetRotY: 0.34,
      hoverX: 0,
      hoverY: 0
    }

    const initScene = async () => {
      const width = container.clientWidth || window.innerWidth
      const height = container.clientHeight || window.innerHeight

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100)
      camera.position.set(0.05, 0.22, 7.9)

      // --- STUDIO LIGHTING SETUP (Calibrated for Natural Matte Cardboard) ---
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.88)
      scene.add(ambientLight)

      // Warm directional key light (softened from 1.85 to 1.65 for 5% less shiny glare)
      const keyLight = new THREE.DirectionalLight(0xfffaea, 1.65)
      keyLight.position.set(4.5, 7.5, 6)
      scene.add(keyLight)

      // Cool fill light from left (reveals spine details)
      const fillLight = new THREE.DirectionalLight(0xedf4ff, 0.95)
      fillLight.position.set(-6, 2, 4)
      scene.add(fillLight)

      // Subtle rim light from behind (outlines paperboard carton silhouette)
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.85)
      rimLight.position.set(0, -3.5, -4)
      scene.add(rimLight)

      // Chromatic Flavor Bounce Light
      const flavorLight = new THREE.PointLight(
        new THREE.Color(currentFlavor.lightColor).getHex(),
        2.5,
        14
      )
      flavorLight.position.set(1.5, -0.3, 2.2)
      scene.add(flavorLight)
      flavorLightRef.current = flavorLight

      // Dedicated highlight light for floating oral strip (softened to eliminate harsh plastic glare)
      const stripHighlightLight = new THREE.DirectionalLight(0xffffff, 1.2)
      stripHighlightLight.position.set(3.5, 4.0, 5.0)
      scene.add(stripHighlightLight)

      // --- CREATE 6 CANVAS FACES ---
      // Aspect ratios match the exact cropped carton bounding boxes
      const rightCanvas = document.createElement('canvas')
      rightCanvas.width = 512
      rightCanvas.height = 2048

      const spineCanvas = document.createElement('canvas')
      spineCanvas.width = 512
      spineCanvas.height = 2048

      const topCanvas = document.createElement('canvas')
      topCanvas.width = 2048
      topCanvas.height = 512

      const bottomCanvas = document.createElement('canvas')
      bottomCanvas.width = 2048
      bottomCanvas.height = 512

      const frontCanvas = document.createElement('canvas')
      frontCanvas.width = 1040
      frontCanvas.height = 1235

      const backCanvas = document.createElement('canvas')
      backCanvas.width = 1040
      backCanvas.height = 1235

      faceCanvasesRef.current = {
        right: rightCanvas,
        spine: spineCanvas,
        top: topCanvas,
        bottom: bottomCanvas,
        front: frontCanvas,
        back: backCanvas,
      }

      // Create textures from canvases with sRGB color space
      const rightTex = new THREE.CanvasTexture(rightCanvas)
      const spineTex = new THREE.CanvasTexture(spineCanvas)
      const topTex = new THREE.CanvasTexture(topCanvas)
      const bottomTex = new THREE.CanvasTexture(bottomCanvas)
      const frontTex = new THREE.CanvasTexture(frontCanvas)
      const backTex = new THREE.CanvasTexture(backCanvas)

      const textures = [rightTex, spineTex, topTex, bottomTex, frontTex, backTex]
      textures.forEach((tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = 16
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.generateMipmaps = true
      })
      faceTexturesRef.current = textures

      // Load initial textures for current flavor
      updateTexturesForFlavor(currentFlavor)

      // Box Material Array: [Right (+X), Left/Spine (-X), Top (+Y), Bottom (-Y), Front (+Z), Back (-Z)]
      // Surface is 5% less shiny (Roughness 0.75 on front, 0.77 on other faces, Metalness 0.0) for authentic matte packaging
      const boxMaterials = [
        new THREE.MeshStandardMaterial({ map: rightTex, roughness: 0.77, metalness: 0.0 }),
        new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.77, metalness: 0.0 }),
        new THREE.MeshStandardMaterial({ map: topTex, roughness: 0.77, metalness: 0.0 }),
        new THREE.MeshStandardMaterial({ map: bottomTex, roughness: 0.77, metalness: 0.0 }),
        new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.75, metalness: 0.0 }),
        new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.77, metalness: 0.0 }),
      ]

      // --- 3D BOX MESH (With 3% corner roundness on carton edges) ---
      const boxWidth = 2.08
      const boxHeight = 2.42
      const boxDepth = 0.44
      // 3% corner roundness relative to box width (2.08 * 0.03 ≈ 0.0624)
      const cornerRadius = 0.0624
      const boxGeo = new RoundedBoxGeometry(boxWidth, boxHeight, boxDepth, 4, cornerRadius)
      const boxMesh = new THREE.Mesh(boxGeo, boxMaterials)
      boxMesh.position.set(0.08, 0.22, 0)
      boxMesh.rotation.set(mouse.rotX, mouse.rotY, -0.02)
      scene.add(boxMesh)
      boxMeshRef.current = boxMesh

      // --- FLOATING HERO ORAL STRIP BESIDE BOX ---
      // Using natural oral strip geometry with subtle curl, styled light and luminous to pop against background
      const stripGeo = createLayingStripGeometry(0.82, 1.45)
      stripMaterialsRef.current = []

      // Create procedural micro-dot polymer matrix texture for ThinSol™ strip
      const stripTex = createStripTexture(currentFlavor)
      const stripPalette = STRIP_FLAVOR_PALETTES[currentFlavor.id] || STRIP_FLAVOR_PALETTES.orange

      // Physical oral strip material: matte/satin finish (less shiny) with frosted translucent light transmission
      // and pure white base color so the high-contrast texture pores are 100% visible on all flavors
      const stripMat = new THREE.MeshPhysicalMaterial({
        map: stripTex,
        color: new THREE.Color(0xffffff),
        emissive: new THREE.Color(stripPalette.base),
        emissiveIntensity: 0.10,
        roughness: 0.38,
        metalness: 0.0,
        transmission: 0.28,
        transparent: true,
        opacity: 0.96,
        ior: 1.46,
        thickness: 0.60,
        clearcoat: 0.15,
        clearcoatRoughness: 0.45,
        side: THREE.DoubleSide
      })
      stripMaterialsRef.current.push(stripMat)

      const floatingStrip = new THREE.Mesh(stripGeo, stripMat)
      // Positioned BESIDE the box (x: 1.95, y: 0.30, z: 0.12)
      floatingStrip.position.set(1.95, 0.30, 0.12)
      // Fixed presentation angle (does NOT rotate)
      floatingStrip.rotation.set(-0.35, 0.28, -0.15)
      scene.add(floatingStrip)
      floatingStripRef.current = floatingStrip

      // Dynamic floor shadow projected below Floating Strip
      const stripShadowCanvas = document.createElement('canvas')
      stripShadowCanvas.width = 256
      stripShadowCanvas.height = 256
      const s2Ctx = stripShadowCanvas.getContext('2d')!
      const s2Grad = s2Ctx.createRadialGradient(128, 128, 15, 128, 128, 120)
      s2Grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)')
      s2Grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.18)')
      s2Grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      s2Ctx.fillStyle = s2Grad
      s2Ctx.fillRect(0, 0, 256, 256)
      const stripShadowTex = new THREE.CanvasTexture(stripShadowCanvas)
      const stripShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.0),
        new THREE.MeshBasicMaterial({ map: stripShadowTex, transparent: true, opacity: 0.30, depthWrite: false })
      )
      stripShadow.rotation.x = -Math.PI / 2
      stripShadow.position.set(1.95, -1.35, 0.12)
      scene.add(stripShadow)
      floatingShadowRef.current = stripShadow

      // --- MAIN BOX GROUND CONTACT SHADOW PLANE ---
      const shadowCanvas = document.createElement('canvas')
      shadowCanvas.width = 512
      shadowCanvas.height = 512
      const sCtx = shadowCanvas.getContext('2d')!
      const sGrad = sCtx.createRadialGradient(256, 256, 40, 256, 256, 240)
      sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.58)')
      sGrad.addColorStop(0.4, 'rgba(0, 0, 0, 0.28)')
      sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      sCtx.fillStyle = sGrad
      sCtx.fillRect(0, 0, 512, 512)

      const shadowTex = new THREE.CanvasTexture(shadowCanvas)
      const shadowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(6.6, 4.6),
        new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.88, depthWrite: false })
      )
      shadowPlane.rotation.x = -Math.PI / 2
      shadowPlane.position.set(0.35, -1.38, 0.2)
      scene.add(shadowPlane)

      // --- AMBIENT FLOATING FLAVOR PARTICLES ---
      const pCount = 90
      const pGeo = new THREE.BufferGeometry()
      const pPositions = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        pPositions[i * 3] = (Math.random() - 0.5) * 9
        pPositions[i * 3 + 1] = (Math.random() - 0.5) * 6
        pPositions[i * 3 + 2] = (Math.random() - 0.5) * 5
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
      const pMat = new THREE.PointsMaterial({
        color: new THREE.Color(currentFlavor.lightColor),
        size: 0.045,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      })
      const particlesMesh = new THREE.Points(pGeo, pMat)
      scene.add(particlesMesh)

      // --- INITIALIZE RENDERER (WebGPU with WebGL2 fallback) ---
      let usedWebGPU = false
      try {
        const { WebGPURenderer } = await import('three/webgpu')
        const canvas = document.createElement('canvas')
        canvas.style.display = 'block'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.style.touchAction = 'none'
        canvas.style.cursor = 'grab'
        container.appendChild(canvas)

        const gpuRenderer = new WebGPURenderer({
          canvas,
          antialias: true,
          alpha: true
        })
        gpuRenderer.setSize(width, height)
        gpuRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        await gpuRenderer.init()

        renderer = gpuRenderer
        usedWebGPU = true
        setRendererType('WebGPU (TSL)')
      } catch (err) {
        console.warn('WebGPU fallback to WebGL2:', err)
        usedWebGPU = false
        setRendererType('WebGL2')

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.domElement.style.display = 'block'
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
        renderer.domElement.style.touchAction = 'none'
        renderer.domElement.style.cursor = 'grab'
        container.appendChild(renderer.domElement)
      }

      // --- MOUSE & TOUCH EVENT LISTENERS ---
      const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return
        mouse.isDragging = true
        mouse.prevX = e.clientX
        mouse.prevY = e.clientY
        container.style.cursor = 'grabbing'
        document.body.style.cursor = 'grabbing'
      }

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        mouse.hoverX = (e.clientX - rect.left) / rect.width - 0.5
        mouse.hoverY = (e.clientY - rect.top) / rect.height - 0.5

        if (mouse.isDragging) {
          const deltaX = e.clientX - mouse.prevX
          const deltaY = e.clientY - mouse.prevY
          mouse.targetRotY += deltaX * 0.010
          mouse.targetRotX += deltaY * 0.010
          mouse.targetRotX = Math.max(-0.7, Math.min(0.7, mouse.targetRotX))
          mouse.prevX = e.clientX
          mouse.prevY = e.clientY
        }
      }

      const onMouseUp = () => {
        mouse.isDragging = false
        container.style.cursor = 'grab'
        document.body.style.cursor = ''
      }

      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          mouse.isDragging = true
          mouse.prevX = e.touches[0].clientX
          mouse.prevY = e.touches[0].clientY
        }
      }

      const onTouchMove = (e: TouchEvent) => {
        if (mouse.isDragging && e.touches.length === 1) {
          const deltaX = e.touches[0].clientX - mouse.prevX
          const deltaY = e.touches[0].clientY - mouse.prevY
          mouse.targetRotY += deltaX * 0.010
          mouse.targetRotX += deltaY * 0.010
          mouse.targetRotX = Math.max(-0.7, Math.min(0.7, mouse.targetRotX))
          mouse.prevX = e.touches[0].clientX
          mouse.prevY = e.touches[0].clientY
        }
      }

      const onTouchEnd = () => {
        mouse.isDragging = false
      }

      const onResize = () => {
        if (!container || !renderer || !camera) return
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }

      container.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      container.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
      window.addEventListener('touchend', onTouchEnd)
      window.addEventListener('resize', onResize)

      // --- ANIMATION LOOP ---
      let frameCount = 0
      let fpsTimer = performance.now()

      const animate = (currentTime: number) => {
        if (isDisposed) return

        frameCount++
        if (currentTime - fpsTimer >= 1000) {
          setFps(frameCount)
          frameCount = 0
          fpsTimer = currentTime
        }

        // Smooth rotation interpolation
        if (!mouse.isDragging) {
          const idleTiltY = Math.sin(currentTime * 0.001) * 0.05
          const idleTiltX = Math.cos(currentTime * 0.0008) * 0.025
          mouse.rotY += (mouse.targetRotY + idleTiltY + mouse.hoverX * 0.18 - mouse.rotY) * 0.06
          mouse.rotX += (mouse.targetRotX + idleTiltX - mouse.hoverY * 0.12 - mouse.rotX) * 0.06
        } else {
          mouse.rotY += (mouse.targetRotY - mouse.rotY) * 0.15
          mouse.rotX += (mouse.targetRotX - mouse.rotX) * 0.15
        }

        // Box subtle floating bounce
        if (boxMesh) {
          boxMesh.rotation.y = mouse.rotY
          boxMesh.rotation.x = mouse.rotX
          boxMesh.position.y = 0.28 + Math.sin(currentTime * 0.0012) * 0.035
        }

        // --- STRIP 2 GENTLE FLOATING OSCILLATION (DOES NOT ROTATE, BESIDE BOX) ---
        if (floatingStripRef.current) {
          const floatTime = currentTime * 0.0016
          // Weightless vertical hover bobbing only (no rotation, stays beside box)
          floatingStripRef.current.position.y = 0.30 + Math.sin(floatTime) * 0.045
          floatingStripRef.current.position.x = 1.95
          floatingStripRef.current.position.z = 0.12
          // Explicitly NO ROTATION: keep fixed natural presentation angle
          floatingStripRef.current.rotation.set(-0.35, 0.28, -0.15)
        }

        // --- STRIP 2 DYNAMIC FLOOR SHADOW ---
        if (floatingShadowRef.current && floatingStripRef.current) {
          floatingShadowRef.current.position.x = floatingStripRef.current.position.x
          floatingShadowRef.current.position.z = floatingStripRef.current.position.z
          const heightAboveGround = floatingStripRef.current.position.y - (-1.35)
          const shadowScale = 0.95 + (heightAboveGround - 1.63) * 0.2
          floatingShadowRef.current.scale.set(shadowScale, shadowScale, 1)
          const shadowOpacity = Math.max(0.14, 0.32 - (heightAboveGround - 1.63) * 0.15)
            ; (floatingShadowRef.current.material as THREE.MeshBasicMaterial).opacity = shadowOpacity
        }

        // Ambient particles drift
        if (particlesMesh) {
          particlesMesh.rotation.y = currentTime * 0.00015
        }

        if (renderer && scene && camera) {
          if (usedWebGPU && renderer.renderAsync) {
            renderer.renderAsync(scene, camera)
          } else {
            renderer.render(scene, camera)
          }
        }

        animationFrameId = requestAnimationFrame(animate)
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => {
        isDisposed = true
        cancelAnimationFrame(animationFrameId)
        container.removeEventListener('mousedown', onMouseDown)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        container.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        window.removeEventListener('resize', onResize)

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
        if (renderer && renderer.dispose) {
          renderer.dispose()
        }
      }
    }

    const cleanupPromise = initScene()

    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup())
    }
  }, [])

  return (
    <div className="relative w-full h-full min-h-[580px] flex items-center justify-center pointer-events-auto select-none">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Micro Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white/90 shadow-xl transition-all pointer-events-none">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: currentFlavor.color }}
        />
        <span>Click & drag to rotate 3D box · {currentFlavor.shortTitle}</span>
      </div>
    </div>
  )
}
