import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles, OrbitControls } from '@react-three/drei'
import { useTheme } from '../context/ThemeContext'

function CenterpieceShape() {
  const meshRef = useRef(null)

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
      meshRef.current.rotation.x += delta * 0.04
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={meshRef} scale={1.7}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#C158F0"
          emissive="#5B8DFF"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.6}
          distort={0.38}
          speed={1.8}
        />
      </mesh>
    </Float>
  )
}

function OrbitingRing({ radius, color, tilt, speed }) {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <group rotation={[tilt, 0, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.012, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Scene() {
  const { isDark } = useTheme()
  const fog = useMemo(() => (isDark ? '#0B0A14' : '#F7F2E9'), [isDark])

  return (
    <>
      <color attach="background" args={[fog]} />
      <fog attach="fog" args={[fog, 5, 11]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color="#E8B563" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#5B8DFF" />
      <CenterpieceShape />
      <OrbitingRing radius={2.4} color="#E8B563" tilt={0.4} speed={0.25} />
      <OrbitingRing radius={2.9} color="#5B8DFF" tilt={-0.55} speed={-0.18} />
      <Sparkles count={60} scale={6} size={2.2} speed={0.35} color="#F2D29B" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.6}
      />
    </>
  )
}

function Hero3D() {
  return (
    <div className="h-[360px] w-full sm:h-[440px] lg:h-[520px]" data-cursor-hover>
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Hero3D
