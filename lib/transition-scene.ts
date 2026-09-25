import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three"

const POINT_COUNT = 2400

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float wave = sin(p.y * 4.0 + uTime * 1.6 + aSeed * 6.2831) * 0.5 + 0.5;
    float ripple = sin(p.x * 3.0 - uTime * 1.1) * cos(p.z * 3.0 + uTime * 0.9);
    p *= 1.0 + wave * 0.14 + ripple * 0.06;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float depth = clamp((-mv.z - 2.2) / 2.2, 0.0, 1.0);
    vAlpha = mix(1.0, 0.18, depth);
    gl_PointSize = (2.2 + wave * 1.6) * uPixelRatio * (3.2 / -mv.z);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.2, d);
    gl_FragColor = vec4(uColor, edge * vAlpha * uOpacity);
  }
`

function fibonacciSphere(count: number) {
  const positions = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = Math.sin(theta) * r
    seeds[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1
  }
  return { positions, seeds }
}

export type TransitionScene = {
  dispose: () => void
}

export function createTransitionScene(canvas: HTMLCanvasElement, color: string): TransitionScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" })
  const pixelRatio = Math.min(window.devicePixelRatio, 2)
  renderer.setPixelRatio(pixelRatio)
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(40, 1, 0.1, 50)
  camera.position.set(0, 0, 4.2)

  const { positions, seeds } = fibonacciSphere(POINT_COUNT)
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new BufferAttribute(positions, 3))
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1))

  const isDarkInk = new Color(color).getHSL({ h: 0, s: 0, l: 0 }).l < 0.5
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: isDarkInk ? NormalBlending : AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uColor: { value: new Color(color) },
      uOpacity: { value: 0 },
    },
  })

  const points = new Points(geometry, material)
  points.rotation.x = 0.35
  scene.add(points)

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)

  let frame = 0
  const start = performance.now()
  const tick = (now: number) => {
    const t = (now - start) / 1000
    material.uniforms.uTime.value = t
    material.uniforms.uOpacity.value = Math.min(1, t / 0.35)
    points.rotation.y = t * 0.55
    points.rotation.z = Math.sin(t * 0.4) * 0.12
    const scale = 0.82 + Math.min(1, t / 0.6) * 0.18
    points.scale.setScalar(scale)
    renderer.render(scene, camera)
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)

  return {
    dispose() {
      cancelAnimationFrame(frame)
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
