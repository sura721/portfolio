"use client"

import React, { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, useTexture, OrbitControls, Float, Plane } from "@react-three/drei"
import { MathUtils, Color } from "three"
import { useTheme } from "next-themes"
import { motion } from "framer-motion-3d"

// Separate the 3D scene into its own component
function HeroScene() {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  // Load the profile image as a texture
  const texture = useTexture(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/surafel.jpg-Ww9kZXcg3ijWdJaRb4HKiyVmM6XaUr.jpeg",
  )

  // Generate random positions for floating shapes
  const [shapePositions] = useState(() => {
    return Array(10)
      .fill(0)
      .map(() => ({
        position: [MathUtils.randFloatSpread(10), MathUtils.randFloatSpread(10), MathUtils.randFloatSpread(5) - 5],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.2 + 0.1,
      }))
  })

  return (
    <>
      {/* Environment lighting */}
      <Environment preset={isDarkMode ? "night" : "sunset"} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Floating geometric shapes */}
      {shapePositions.map((props, index) => (
        <motion.mesh
          key={index}
          position={props.position}
          rotation={props.rotation}
          initial={{ scale: 0 }}
          animate={{ scale: props.scale }}
          transition={{ duration: 1, delay: index * 0.1 }}
        >
          {/* Randomly choose between different geometric shapes */}
          {index % 3 === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : index % 3 === 1 ? (
            <sphereGeometry args={[0.7, 16, 16]} />
          ) : (
            <torusGeometry args={[0.5, 0.2, 16, 32]} />
          )}
          <meshStandardMaterial
            color={new Color().setHSL(index * 0.1, 0.8, isDarkMode ? 0.5 : 0.7)}
            opacity={0.7}
            transparent
          />
        </motion.mesh>
      ))}

      {/* Profile image */}
      <motion.group
        position={[0, 0, -2]}
        initial={{ opacity: 0, z: -10 }}
        animate={{ opacity: 1, z: -2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <Plane args={[3, 4.5]} position={[0, 0, 0]}>
          <meshBasicMaterial map={texture} transparent />
        </Plane>

        {/* Glowing outline effect */}
        <Plane args={[3.1, 4.6]} position={[0, 0, -0.1]}>
          <meshBasicMaterial color={isDarkMode ? "#4f46e5" : "#3b82f6"} opacity={0.5} transparent />
        </Plane>
      </motion.group>

      {/* Colorful light trails */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Plane args={[15, 15]} rotation={[0, 0, Math.PI / 4]} position={[0, 0, -5]}>
          <meshBasicMaterial color={isDarkMode ? "#4f46e5" : "#3b82f6"} opacity={0.1} transparent />
        </Plane>
      </Float>

      {/* Camera controls */}
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

// Simple fallback component for loading state
function Fallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="text-primary animate-pulse">Loading 3D scene...</div>
    </div>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-background">
          <div className="text-destructive">
            <p>Something went wrong with the 3D scene.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Main canvas component with error handling
export function HeroCanvas() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<Fallback />}>
        <ErrorBoundary>
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

