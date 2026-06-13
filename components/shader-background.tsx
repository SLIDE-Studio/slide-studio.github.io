"use client"

import { useEffect, useRef } from "react"
import { Renderer, Triangle, Program, Mesh, Vec2 } from "ogl"

/**
 * Subtle WebGL gradient background (OGL).
 * Renders slow-moving, organic color fields in the SLIDE palette over a
 * warm cream base. Reacts gently to pointer + scroll. Degrades gracefully:
 * if WebGL is unavailable or reduced motion is preferred, it renders nothing
 * (the cream <html> background shows through).
 */
const vertex = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uScroll;

  // Palette (linear-ish sRGB approximations of the brand colors)
  const vec3 cream  = vec3(0.976, 0.965, 0.925);
  const vec3 blue   = vec3(0.275, 0.353, 0.835);
  const vec3 teal   = vec3(0.180, 0.620, 0.560);
  const vec3 gold   = vec3(0.925, 0.706, 0.235);
  const vec3 coral  = vec3(0.886, 0.435, 0.486);

  // Smooth value noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv;
    p.x *= aspect;

    float t = uTime * 0.04;
    vec2 mouse = uMouse;
    mouse.x *= aspect;

    // Flowing domain warp
    vec2 q = vec2(
      fbm(p * 1.4 + vec2(0.0, t)),
      fbm(p * 1.4 + vec2(5.2, -t))
    );
    float n = fbm(p * 1.8 + q * 1.6 + vec2(t * 0.5, uScroll * 0.6));

    // Pointer influence — a soft warm bloom near the cursor
    float md = distance(p, mouse);
    float bloom = smoothstep(0.6, 0.0, md);

    // Build color: start cream, layer translucent fields
    vec3 col = cream;
    col = mix(col, blue, smoothstep(0.35, 0.95, n) * 0.16);
    col = mix(col, teal, smoothstep(0.45, 0.05, n) * 0.14);
    col = mix(col, gold, smoothstep(0.55, 0.85, q.x + 0.5) * 0.10);
    col = mix(col, coral, bloom * 0.10);

    // Gentle vignette toward cream at the edges so content stays readable
    float vig = smoothstep(1.2, 0.2, length(uv - 0.5));
    col = mix(cream, col, 0.45 + vig * 0.25);

    gl_FragColor = vec4(col, 1.0);
  }
`

export function ShaderBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = ref.current
    if (!mount) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let renderer: Renderer
    try {
      renderer = new Renderer({
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 1.5),
      })
    } catch {
      return
    }

    const gl = renderer.gl
    gl.clearColor(0.976, 0.965, 0.925, 1)
    mount.appendChild(gl.canvas)
    gl.canvas.style.width = "100%"
    gl.canvas.style.height = "100%"
    gl.canvas.style.display = "block"

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uScroll: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      program.uniforms.uResolution.value.set(w, h)
    }
    resize()
    window.addEventListener("resize", resize)

    // Smoothed pointer
    const targetMouse = new Vec2(0.5, 0.5)
    const onPointer = (e: PointerEvent) => {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }
    window.addEventListener("pointermove", onPointer)

    let scrollNorm = 0
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollNorm = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    let raf = 0
    const start = performance.now()
    const loop = () => {
      const now = performance.now()
      program.uniforms.uTime.value = (now - start) / 1000
      const m = program.uniforms.uMouse.value as Vec2
      m.x += (targetMouse.x - m.x) * 0.05
      m.y += (targetMouse.y - m.y) * 0.05
      const s = program.uniforms.uScroll.value as number
      program.uniforms.uScroll.value = s + (scrollNorm - s) * 0.05
      renderer.render({ scene: mesh })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("scroll", onScroll)
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas)
      const ext = gl.getExtension("WEBGL_lose_context")
      if (ext) ext.loseContext()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  )
}
