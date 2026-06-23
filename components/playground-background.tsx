"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, Lightformer } from "@react-three/drei"
import type { Group, Mesh } from "three"

/**
 * Playful "playground" background, rendered as a real 3D scene (R3F).
 * Glassy floating bubbles, glossy clay-toy shapes, and low-poly props
 * (trees, mushrooms, and little animals) drift in 3D space, lit for a
 * realistic look while keeping the bubbly, hand-made aesthetic and the
 * SLIDE brand palette. Reacts to the pointer with gentle parallax.
 * Decorative only. Respects prefers-reduced-motion and lightens up on mobile.
 */

const TEAL = "#1b9e6f"
const BLUE = "#38a5e0"
const GOLD = "#eab422"
const CORAL = "#e47a9f"
const ORANGE = "#e8823a"
const LEAF = "#3aa66a"
const TRUNK = "#a9743f"
const CREAM = "#f7ead2"

type ShapeKind =
  | "sphere"
  | "torus"
  | "capsule"
  | "gem"
  | "cone"
  | "donutKnot"
  | "tree"
  | "mushroom"
  | "bird"
  | "fish"
  | "bunny"

type ShapeConfig = {
  position: [number, number, number]
  scale: number
  color: string
  /** glassy refractive bubble vs. glossy solid clay toy vs. low-poly prop */
  variant: "bubble" | "clay" | "prop"
  kind: ShapeKind
  floatSpeed: number
  rotIntensity: number
  floatIntensity: number
}

// Hand-placed arrangement spread across depth for parallax.
// Scales are intentionally small so objects feel like little toys.
const SHAPES: ShapeConfig[] = [
  { position: [-4.6, 2.4, -2], scale: 0.62, color: GOLD, variant: "clay", kind: "sphere", floatSpeed: 1.1, rotIntensity: 0.6, floatIntensity: 1.4 },
  { position: [4.5, 1.8, -1.5], scale: 0.7, color: BLUE, variant: "bubble", kind: "sphere", floatSpeed: 0.9, rotIntensity: 0.4, floatIntensity: 1.2 },
  { position: [3.2, -2.2, -1], scale: 0.5, color: CORAL, variant: "clay", kind: "torus", floatSpeed: 1.3, rotIntensity: 1.1, floatIntensity: 1.5 },
  { position: [-3.6, -2.1, -1.5], scale: 0.52, color: TEAL, variant: "clay", kind: "donutKnot", floatSpeed: 1.0, rotIntensity: 1.2, floatIntensity: 1.3 },
  { position: [-1.4, 3.1, -2.5], scale: 0.4, color: CORAL, variant: "bubble", kind: "sphere", floatSpeed: 1.4, rotIntensity: 0.5, floatIntensity: 1.6 },
  { position: [1.8, 2.6, -1], scale: 0.45, color: TEAL, variant: "clay", kind: "gem", floatSpeed: 1.2, rotIntensity: 1.4, floatIntensity: 1.4 },
  { position: [2.4, 0.1, 0], scale: 0.4, color: GOLD, variant: "bubble", kind: "sphere", floatSpeed: 1.0, rotIntensity: 0.4, floatIntensity: 1.3 },
  { position: [4.7, -0.6, -2.5], scale: 0.34, color: ORANGE, variant: "bubble", kind: "sphere", floatSpeed: 1.6, rotIntensity: 0.3, floatIntensity: 1.7 },
  { position: [-4.8, -0.4, -1], scale: 0.3, color: CORAL, variant: "clay", kind: "gem", floatSpeed: 1.3, rotIntensity: 1.5, floatIntensity: 1.4 },
  { position: [0.2, 1.0, 1], scale: 0.28, color: TEAL, variant: "bubble", kind: "sphere", floatSpeed: 1.7, rotIntensity: 0.3, floatIntensity: 1.8 },
  // Low-poly props
  { position: [-2.4, -1.2, 0.4], scale: 0.6, color: LEAF, variant: "prop", kind: "tree", floatSpeed: 0.8, rotIntensity: 0.5, floatIntensity: 1.0 },
  { position: [3.7, 2.5, -1.2], scale: 0.5, color: LEAF, variant: "prop", kind: "tree", floatSpeed: 0.9, rotIntensity: 0.5, floatIntensity: 1.1 },
  { position: [1.2, -2.8, 0.2], scale: 0.55, color: CORAL, variant: "prop", kind: "mushroom", floatSpeed: 1.2, rotIntensity: 0.7, floatIntensity: 1.3 },
  { position: [-3.9, 1.0, 0.6], scale: 0.5, color: BLUE, variant: "prop", kind: "bird", floatSpeed: 1.3, rotIntensity: 0.8, floatIntensity: 1.5 },
  { position: [4.2, -2.4, 0.3], scale: 0.5, color: ORANGE, variant: "prop", kind: "fish", floatSpeed: 1.4, rotIntensity: 0.9, floatIntensity: 1.5 },
  { position: [-0.8, 2.7, 0.5], scale: 0.5, color: GOLD, variant: "prop", kind: "bunny", floatSpeed: 1.1, rotIntensity: 0.7, floatIntensity: 1.3 },
]

const FLAT = { roughness: 0.55, metalness: 0, clearcoat: 0.4, clearcoatRoughness: 0.4 }

/** Low-poly tree: trunk + two stacked foliage cones (few radial segments). */
function Tree() {
  return (
    <group>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.7, 6]} />
        <meshPhysicalMaterial color={TRUNK} {...FLAT} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <coneGeometry args={[0.7, 0.9, 7]} />
        <meshPhysicalMaterial color={LEAF} {...FLAT} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.55, 0.8, 7]} />
        <meshPhysicalMaterial color={TEAL} {...FLAT} />
      </mesh>
    </group>
  )
}

/** Low-poly mushroom: stem + faceted cap. */
function Mushroom({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.22, 0.26, 0.6, 8]} />
        <meshPhysicalMaterial color={CREAM} {...FLAT} />
      </mesh>
      <mesh position={[0, 0.05, 0]} scale={[1, 0.7, 1]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial color={color} {...FLAT} />
      </mesh>
    </group>
  )
}

/** Low-poly bird: faceted body + beak + wing + tail. */
function Bird({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial color={color} {...FLAT} />
      </mesh>
      <mesh position={[0.5, 0.1, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.14, 0.34, 5]} />
        <meshPhysicalMaterial color={GOLD} {...FLAT} />
      </mesh>
      <mesh position={[-0.45, 0.15, 0]} rotation={[0, 0, 0.6]}>
        <coneGeometry args={[0.18, 0.5, 4]} />
        <meshPhysicalMaterial color={TEAL} {...FLAT} />
      </mesh>
      <mesh position={[0.18, 0.45, 0.1]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshPhysicalMaterial color="#2a2a2a" roughness={0.3} />
      </mesh>
    </group>
  )
}

/** Low-poly fish: stretched faceted body + tail fin. */
function Fish({ color }: { color: string }) {
  return (
    <group>
      <mesh scale={[1.3, 0.9, 0.7]}>
        <octahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial color={color} {...FLAT} />
      </mesh>
      <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.5, 4]} />
        <meshPhysicalMaterial color={CORAL} {...FLAT} />
      </mesh>
      <mesh position={[0.55, 0.18, 0.2]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshPhysicalMaterial color="#2a2a2a" roughness={0.3} />
      </mesh>
    </group>
  )
}

/** Low-poly bunny: body + head + two ears. */
function Bunny({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, -0.25, 0]}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshPhysicalMaterial color={color} {...FLAT} />
      </mesh>
      <mesh position={[0, 0.3, 0.05]} scale={0.7}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshPhysicalMaterial color={color} {...FLAT} />
      </mesh>
      <mesh position={[-0.16, 0.75, 0]} rotation={[0, 0, 0.18]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
        <meshPhysicalMaterial color={color} {...FLAT} />
      </mesh>
      <mesh position={[0.16, 0.75, 0]} rotation={[0, 0, -0.18]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
        <meshPhysicalMaterial color={color} {...FLAT} />
      </mesh>
    </group>
  )
}

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

/** Composite low-poly props that are built from multiple meshes. */
function PropShape({ kind, color }: { kind: ShapeKind; color: string }) {
  switch (kind) {
    case "tree":
      return <Tree />
    case "mushroom":
      return <Mushroom color={color} />
    case "bird":
      return <Bird color={color} />
    case "fish":
      return <Fish color={color} />
    case "bunny":
      return <Bunny color={color} />
    default:
      return null
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
      {config.variant === "prop" ? (
        <group position={config.position} scale={config.scale}>
          <PropShape kind={config.kind} color={config.color} />
        </group>
      ) : (
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
      )}
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
