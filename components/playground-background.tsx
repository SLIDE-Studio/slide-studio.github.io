"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Lightformer } from "@react-three/drei"
import type { Group, Mesh } from "three"

/**
 * Playful "playground" background, now rendered as a real 3D scene (R3F).
 * Glassy floating bubbles + glossy clay-toy shapes drift in 3D space, lit for a
 * realistic, refractive look while keeping the bubbly, hand-made aesthetic and
 * the SLIDE brand palette. Reacts to the pointer with gentle parallax.
 * Decorative only. Respects prefers-reduced-motion and lightens up on mobile.
 */

const TEAL = "#1b9e6f"
const BLUE = "#38a5e0"
const GOLD = "#eab422"
const CORAL = "#e47a9f"
const ORANGE = "#e8823a"

type ShapeKind = "sphere" | "torus" | "capsule" | "gem" | "cone" | "donutKnot"

type ShapeConfig = {
  position: [number, number, number]
  scale: number
  color: string
  /** glassy refractive bubble vs. glossy solid clay toy */
  variant: "bubble" | "clay"
  kind: ShapeKind
  floatSpeed: number
  rotIntensity: number
  floatIntensity: number
}

// Hand-placed arrangement spread across depth for parallax.
const SHAPES: ShapeConfig[] = [
  { position: [-4.6, 2.4, -2], scale: 1.15, color: GOLD, variant: "clay", kind: "sphere", floatSpeed: 1.1, rotIntensity: 0.6, floatIntensity: 1.4 },
  { position: [4.5, 1.8, -1.5], scale: 1.3, color: BLUE, variant: "bubble", kind: "sphere", floatSpeed: 0.9, rotIntensity: 0.4, floatIntensity: 1.2 },
  { position: [3.2, -2.2, -1], scale: 0.95, color: CORAL, variant: "clay", kind: "torus", floatSpeed: 1.3, rotIntensity: 1.1, floatIntensity: 1.5 },
  { position: [-3.6, -2.1, -1.5], scale: 1.0, color: TEAL, variant: "clay", kind: "donutKnot", floatSpeed: 1.0, rotIntensity: 1.2, floatIntensity: 1.3 },
  { position: [-1.4, 3.1, -2.5], scale: 0.7, color: CORAL, variant: "bubble", kind: "sphere", floatSpeed: 1.4, rotIntensity: 0.5, floatIntensity: 1.6 },
  { position: [1.8, 2.6, -1], scale: 0.8, color: TEAL, variant: "clay", kind: "gem", floatSpeed: 1.2, rotIntensity: 1.4, floatIntensity: 1.4 },
  { position: [-2.2, 0.2, 0.5], scale: 0.85, color: ORANGE, variant: "clay", kind: "capsule", floatSpeed: 1.1, rotIntensity: 1.0, floatIntensity: 1.2 },
  { position: [2.4, 0.1, 0], scale: 0.75, color: GOLD, variant: "bubble", kind: "sphere", floatSpeed: 1.0, rotIntensity: 0.4, floatIntensity: 1.3 },
  { position: [0.4, -3.0, -0.5], scale: 0.7, color: BLUE, variant: "clay", kind: "cone", floatSpeed: 1.5, rotIntensity: 1.3, floatIntensity: 1.5 },
  { position: [4.7, -0.6, -2.5], scale: 0.6, color: ORANGE, variant: "bubble", kind: "sphere", floatSpeed: 1.6, rotIntensity: 0.3, floatIntensity: 1.7 },
  { position: [-4.8, -0.4, -1], scale: 0.55, color: CORAL, variant: "clay", kind: "gem", floatSpeed: 1.3, rotIntensity: 1.5, floatIntensity: 1.4 },
  { position: [0.2, 1.0, 1], scale: 0.5, color: TEAL, variant: "bubble", kind: "sphere", floatSpeed: 1.7, rotIntensity: 0.3, floatIntensity: 1.8 },
]

function ShapeGeometry({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case "torus":
      return <torusGeometry args={[0.7, 0.28, 32, 64]} />
    case "capsule":
      return <capsuleGeometry args={[0.45, 0.8, 12, 24]} />
    case "gem":
      return <icosahedronGeometry args={[0.95, 0]} />
    case "cone":
      return <coneGeometry args={[0.7, 1.3, 32]} />
    case "donutKnot":
      return <torusKnotGeometry args={[0.55, 0.2, 128, 24]} />
    case "sphere":
    default:
      return <sphereGeometry args={[0.8, 48, 48]} />
  }
}

function Shape({ config, lite }: { config: ShapeConfig; lite: boolean }) {
  const meshRef = useRef<Mesh>(null)

  // Bubbles use transmission (glass). On lite/mobile we drop the transmission
  // pass and use a translucent glossy material to stay performant.
  const isGlass = config.variant === "bubble" && !lite

  return (
    <Float
      speed={config.floatSpeed}
      rotationIntensity={config.rotIntensity}
      floatIntensity={config.floatIntensity}
    >
      <mesh ref={meshRef} position={config.position} scale={config.scale}>
        <ShapeGeometry kind={config.kind} />
        {isGlass ? (
          <meshPhysicalMaterial
            color={config.color}
            transmission={1}
            thickness={0.9}
            roughness={0.06}
            ior={1.33}
            metalness={0}
            attenuationColor={config.color}
            attenuationDistance={1.6}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.4}
          />
        ) : config.variant === "bubble" ? (
          <meshPhysicalMaterial
            color={config.color}
            roughness={0.15}
            metalness={0}
            transparent
            opacity={0.55}
            clearcoat={1}
            clearcoatRoughness={0.2}
            envMapIntensity={1.2}
          />
        ) : (
          <meshPhysicalMaterial
            color={config.color}
            roughness={0.45}
            metalness={0}
            clearcoat={0.7}
            clearcoatRoughness={0.35}
            sheen={0.4}
            sheenColor="#ffffff"
            envMapIntensity={0.7}
          />
        )}
      </mesh>
    </Float>
  )
}

function Scene({ motion, lite }: { motion: boolean; lite: boolean }) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current || !motion) return
    // Gentle pointer parallax.
    const targetY = state.pointer.x * 0.35
    const targetX = -state.pointer.y * 0.25
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
  })

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} />
      <pointLight position={[-6, -2, 4]} intensity={30} color={CORAL} />
      <pointLight position={[6, 4, 2]} intensity={24} color={BLUE} />

      <group ref={groupRef}>
        {SHAPES.map((config, i) => (
          <Shape key={i} config={config} lite={lite} />
        ))}
      </group>

      {/* Lightformer-based environment: realistic reflections, no network. */}
      <Environment resolution={lite ? 128 : 256}>
        <Lightformer form="circle" intensity={2} position={[0, 5, -4]} scale={6} color="#fff7e8" />
        <Lightformer form="circle" intensity={1.4} position={[-5, 1, 1]} scale={4} color={GOLD} />
        <Lightformer form="circle" intensity={1.4} position={[5, -1, 1]} scale={4} color={BLUE} />
        <Lightformer form="rect" intensity={1.2} position={[0, -5, 2]} scale={8} color={TEAL} />
      </Environment>
    </>
  )
}

export function PlaygroundBackground() {
  const [motion, setMotion] = useState(true)
  const [lite, setLite] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    setMotion(!reduced)
    setLite(isMobile)
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, lite ? 1.25 : 1.6]}
        gl={{ alpha: true, antialias: !lite, powerPreference: "high-performance" }}
        frameloop={motion ? "always" : "demand"}
        style={{ background: "transparent" }}
      >
        <Scene motion={motion} lite={lite} />
      </Canvas>
    </div>
  )
}
