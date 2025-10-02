import React, { useRef, useEffect, Suspense, useMemo, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { usePerformanceManager, useAdaptiveQuality, useVisibilityOptimization } from '../hooks/usePerformance'

// Fallback component - More visible and elegant
function FallbackModel() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]} scale={3}>
      {/* Main crystal shape */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
          transparent={false}
          opacity={1.0}
        />
      </mesh>
      {/* Inner glow */}
      <mesh scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent={true}
          opacity={0.6}
        />
      </mesh>
      {/* Outer ring for visibility */}
      <mesh scale={1.2}>
        <torusGeometry args={[1, 0.1, 8, 16]} />
        <meshBasicMaterial 
          color="#D4AF37" 
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

function Model() {
  const meshRef = useRef()
  const { currentQuality, settings, performanceGrade } = useAdaptiveQuality('medium')
  const { isVisible } = useVisibilityOptimization(meshRef)
  
  // Load model with error handling and fallback
  let gltf
  try {
    gltf = useLoader(GLTFLoader, '/base.glb')
    console.log('3D Model loaded successfully:', gltf)
    
    // If no scene in gltf, use fallback
    if (!gltf || !gltf.scene) {
      console.warn('No scene found in GLTF, using fallback')
      return <FallbackModel />
    }
  } catch (error) {
    console.warn('Failed to load 3D model, using fallback:', error)
    return <FallbackModel />
  }

  // Optimize animation based on performance settings
  const animationSpeed = useMemo(() => {
    if (!settings) return 0.005
    return 0.005 * settings.animationSpeed
  }, [settings])

  useFrame((state) => {
    if (meshRef.current && isVisible && settings) {
      // Adaptive animation based on performance
      meshRef.current.rotation.y += animationSpeed
      
      // Reduce complex animations based on performance grade
      if (performanceGrade !== 'poor' && performanceGrade !== 'low') {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      }
    }
  })

  // Optimized model setup with memoization
  const optimizedScene = useMemo(() => {
    if (!gltf.scene || !settings) return null

    const scene = gltf.scene.clone()
    scene.scale.setScalar(3.5) // Further increased scale for maximum visibility
    scene.position.set(0, 0, 0) // Centered position
    scene.rotation.set(0, 0, 0) // Reset rotation

    // Optimize materials and geometry based on quality settings
    scene.traverse((child) => {
      if (child.isMesh) {
        // Dynamic shadow quality based on settings
        child.castShadow = settings.enableShadows
        child.receiveShadow = settings.enableShadows
        
        // Optimize geometry based on LOD setting
        if (child.geometry) {
          child.geometry.computeBoundingBox()
          child.geometry.computeBoundingSphere()
          
          // Reduce geometry complexity for lower quality settings
          if (settings.geometryLOD === 'lowest' || settings.geometryLOD === 'low') {
            // Simplify geometry if needed (placeholder for actual LOD implementation)
            child.frustumCulled = true
          }
        }

        // Optimize materials based on quality
        if (child.material) {
          // Make material much more visible with strong emissive glow
          child.material.emissive = new THREE.Color(0xD4AF37) // Gold emissive
          child.material.emissiveIntensity = 0.6 // Strong glow for visibility
          
          // Ensure the material has a visible color
          if (child.material.color) {
            child.material.color.set(0xFFD700) // Gold color
          } else {
            child.material.color = new THREE.Color(0xFFD700)
          }
          
          // Make material highly reflective for luxury look
          child.material.metalness = 0.9
          child.material.roughness = 0.1
          
          // Ensure material is not transparent
          child.material.transparent = false
          child.material.opacity = 1.0
          
          // Add wireframe for debugging (remove in production)
          if (process.env.NODE_ENV === 'development') {
            child.material.wireframe = false // Set to true for debugging
          }
          
          // Force material update
          child.material.needsUpdate = true
        }
        
        // Ensure geometry is visible
        if (child.geometry) {
          child.geometry.computeBoundingBox()
          child.geometry.computeBoundingSphere()
          child.visible = true
        }
        
        // Make sure the mesh is visible
        child.visible = true
      }
    })

    return scene
  }, [gltf.scene, settings, currentQuality])

  // Intersection observer for visibility optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const container = meshRef.current?.parent
    if (container) {
      observer.observe(container)
    }

    return () => observer.disconnect()
  }, [])

  if (!optimizedScene) return <FallbackModel />

  return (
    <primitive 
      ref={meshRef} 
      object={optimizedScene} 
      position={[0, 0, 0]}
    />
  )
}

function Model3D({ className = "" }) {
  const containerRef = useRef(null)
  const { currentQuality, settings, deviceInfo } = useAdaptiveQuality('medium')
  const { isVisible } = useVisibilityOptimization(containerRef)

  // Adaptive canvas settings based on performance
  const canvasSettings = useMemo(() => {
    if (!settings) return { shadows: false, antialias: false, alpha: true, powerPreference: 'low-power' }
    
    const isLowPerf = currentQuality === 'potato' || currentQuality === 'low'
    
    return {
      shadows: settings.enableShadows,
      antialias: settings.antialias,
      alpha: true,
      powerPreference: isLowPerf ? 'low-power' : 'high-performance',
      stencil: false,
      depth: true,
      pixelRatio: settings.pixelRatio
    }
  }, [settings, currentQuality])

  // Adaptive lighting based on performance settings
  const LightingSetup = useMemo(() => {
    if (!settings) return <ambientLight intensity={0.6} />
    
    const isLowPerf = currentQuality === 'potato' || currentQuality === 'low'
    
    if (isLowPerf || !settings.enableComplexLighting) {
      // Simplified but bright lighting for low-end devices
      return (
        <>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <pointLight position={[0, 5, 0]} intensity={0.8} color="#FFD700" />
        </>
      )
    }
    
    // Full lighting for high-end devices
    return (
      <>
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={2.0}
          castShadow={settings.enableShadows}
          shadow-mapSize-width={settings.shadowQuality}
          shadow-mapSize-height={settings.shadowQuality}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, 5]} intensity={1.2} color="#D4AF37" />
        <pointLight position={[5, -5, 5]} intensity={1.0} color="#FFD700" />
        <pointLight position={[0, 10, -5]} intensity={0.8} color="#B87333" />
        <pointLight position={[0, 0, 10]} intensity={1.0} color="#FFFFFF" />
      </>
    )
  }, [settings, currentQuality])

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <Canvas
        shadows={canvasSettings.shadows}
        camera={{ position: [0, 0, 6], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{
          antialias: canvasSettings.antialias,
          alpha: canvasSettings.alpha,
          powerPreference: canvasSettings.powerPreference,
          stencil: canvasSettings.stencil,
          depth: canvasSettings.depth,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        dpr={canvasSettings.pixelRatio}
        performance={{
          current: 1,
          min: 0.2,
          max: 1,
          debounce: 200
        }}
        frameloop={isVisible ? "always" : "never"} // Only render when visible
      >
        {LightingSetup}
        
        {/* Model with Suspense and Error Boundary */}
        <Suspense fallback={<FallbackModel />}>
          <ErrorBoundary fallback={<FallbackModel />}>
            <Model />
          </ErrorBoundary>
        </Suspense>
        
        {/* Minimal controls for performance */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={false}
          enableDamping={false}
        />
      </Canvas>
      
      {/* Advanced Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && deviceInfo && (
        <div className="absolute top-2 right-2 text-xs text-white bg-black/75 px-3 py-2 rounded-lg space-y-1">
          <div>Device: {deviceInfo.capability}</div>
          <div>Quality: {currentQuality}</div>
          <div>Battery: {Math.round(deviceInfo.battery.level * 100)}%</div>
          <div>Throttled: {deviceInfo.thermal.isThrottled ? 'Yes' : 'No'}</div>
          {settings && (
            <>
              <div>Particles: {settings.particleCount}</div>
              <div>Shadows: {settings.enableShadows ? 'On' : 'Off'}</div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Error Boundary for 3D model
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('3D Model Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default Model3D
