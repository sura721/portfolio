"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus } from "@react-three/drei"
import { useTheme } from "next-themes"
import * as THREE from "three"

// Simple component for creating a floating shape
function FloatingShape({ position, color, shape, speed = 1, distort = 0.2 }) {
  const meshRef = useRef()
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const [randomRotation] = useState(() => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.015 * speed
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002
    }
  })

  // Choose geometry based on shape prop
  const Geometry = () => {
    switch (shape) {
      case "box":
        return <Box args={[1, 1, 1]} />
      case "sphere":
        return <Sphere args={[0.7, 32, 32]} />
      case "torus":
        return <Torus args={[0.5, 0.2, 16, 32]} />
      default:
        return <Sphere args={[0.7, 32, 32]} />
    }
  }

  return (
    <mesh ref={meshRef} position={position} rotation={randomRotation}>
      <Geometry />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={distort}
        opacity={isDarkMode ? 0.8 : 0.9} // Higher opacity in light mode
        transparent
      />
    </mesh>
  )
}

// Light trail component
function LightTrail({ position, color, rotation = [0, 0, 0] }) {
  const meshRef = useRef()
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[15, 15]} />
      <meshBasicMaterial
        color={color}
        opacity={isDarkMode ? 0.1 : 0.2} // Higher opacity in light mode
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Main scene component
function Scene() {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"
  const directionalLightRef = useRef()

  // Generate random positions for shapes
  const [shapes] = useState(() => {
    return Array(15)
      .fill()
      .map(() => ({
        position: [
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(10),
          THREE.MathUtils.randFloatSpread(10) - 5,
        ],
        color: new THREE.Color()
          .setHSL(
            Math.random(),
            0.8,
            isDarkMode ? 0.5 : 0.4, // Darker colors in light mode for better contrast
          )
          .getStyle(),
        shape: ["box", "sphere", "torus"][Math.floor(Math.random() * 3)],
        speed: Math.random() * 0.5 + 0.5,
        distort: Math.random() * 0.3 + 0.1,
      }))
  })

  return (
    <>
      {/* Environment and lighting */}
      <Environment preset={isDarkMode ? "night" : "sunset"} />
      <ambientLight intensity={0.5} />
      <directionalLight ref={directionalLightRef} position={[5, 5, 5]} intensity={1} castShadow />

      {/* Floating shapes */}
      {shapes.map((shape, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={2}>
          <FloatingShape {...shape} />
        </Float>
      ))}

      {/* Light trails */}
      <LightTrail position={[0, 0, -10]} color={isDarkMode ? "#4f46e5" : "#1e40af"} rotation={[0, 0, Math.PI / 4]} />
      <LightTrail position={[0, 0, -8]} color={isDarkMode ? "#8b5cf6" : "#4338ca"} rotation={[0, 0, -Math.PI / 6]} />
      <LightTrail position={[0, 0, -6]} color={isDarkMode ? "#ec4899" : "#be185d"} rotation={[0, 0, Math.PI / 3]} />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

// Main export component with error handling
export default function Scene3D() {
  const [hasError, setHasError] = useState(false)

  // Reset error state if needed
  useEffect(() => {
    return () => setHasError(false)
  }, [])

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-destructive text-center p-4">
          <p>Something went wrong with the 3D scene.</p>
          <button onClick={() => setHasError(false)} className="mt-4 px-4 py-2 bg-primary text-white rounded-md">
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 50 }} onError={() => setHasError(true)}>
        <Scene />
      </Canvas>
    </div>
  )
}

