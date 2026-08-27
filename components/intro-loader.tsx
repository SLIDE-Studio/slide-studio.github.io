"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, PerspectiveCamera } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import * as THREE from "three"

const balls = [
  { color: "#ff4d4d", x: -1.15, z: 0.1, delay: 0.1, scale: 0.16 },
  { color: "#ffd84d", x: -0.62, z: -0.1, delay: 0.28, scale: 0.22 },
  { color: "#45d6c2", x: -0.08, z: 0.05, delay: 0.45, scale: 0.13 },
  { color: "#6d7cff", x: 0.48, z: -0.04, delay: 0.62, scale: 0.19 },
  { color: "#f58cff", x: 1.02, z: 0.08, delay: 0.79, scale: 0.15 },
]

function FallingBall({ color, x, z, delay, scale }: (typeof balls)[number]) {
  const mesh = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    elapsed.current += delta
    if (!mesh.current) return
    const progress = Math.max(0, Math.min(1, (elapsed.current - delay) / 1.5))
    const eased = 1 - (1 - progress) ** 3
    mesh.current.position.y = 2.3 - eased * 4.2
    mesh.current.rotation.x += delta * 1.4
    mesh.current.rotation.y += delta * 1.1
  })

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.12}>
      <mesh ref={mesh} position={[x, 2.3, z]} scale={scale}>
        <sphereGeometry args={[1, 32, 20]} />
        <meshStandardMaterial color={color} roughness={0.24} metalness={0.12} />
      </mesh>
    </Float>
  )
}

function BallScene() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={38} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} />
      <pointLight position={[-3, -2, 2]} color="#ffffff" intensity={7} distance={8} />
      {balls.map((ball) => <FallingBall key={ball.color} {...ball} />)}
    </Canvas>
  )
}

export function IntroLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const [reduced, setReduced] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReduced(prefersReduced)
    if (prefersReduced) {
      setDone(true)
      return
    }

    document.body.style.overflow = "hidden"
    const timeline = gsap.timeline({
      onComplete: () => {
        setDone(true)
        document.body.style.overflow = ""
      },
    })

    timeline
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" })
      .fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 }, "-=0.25")
      .to({}, { duration: 1.55 })
      .to(sceneRef.current, { opacity: 0.1, duration: 0.75, ease: "power2.inOut" })
      .to(labelRef.current, { opacity: 0, duration: 0.3 }, "-=0.5")
      .to(lineRef.current, { scaleX: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.15")
      .to(overlayRef.current, { opacity: 0, duration: 0.45, ease: "power2.out" })

    return () => {
      timeline.kill()
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <>
      {!done && !reduced && (
        <div ref={overlayRef} className="fixed inset-0 z-[9999] overflow-hidden bg-black" aria-hidden="true">
          <div ref={sceneRef} className="absolute inset-0 opacity-100 transition-opacity">
            <BallScene />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_45%,rgba(255,255,255,0.96)_100%)]" />
          </div>
          <div className="absolute inset-x-0 bottom-[18%] mx-auto flex w-[min(22rem,72vw)] flex-col gap-4">
            <div className="relative h-px overflow-hidden bg-white/25">
              <div ref={lineRef} className="absolute inset-0 origin-left bg-white" />
            </div>
            <div ref={labelRef} className="flex justify-between text-[10px] uppercase tracking-[0.28em] text-white/65">
              <span>Slide Studio</span>
              <span>Loading</span>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}
