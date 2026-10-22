import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function useDotTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.45)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

function Particles({ count, pointer, color, spread }) {
  const ref = useRef()
  const texture = useDotTexture()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread[0]
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1]
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread[2]
      speeds[i] = 0.08 + Math.random() * 0.22
    }
    return { positions, speeds }
  }, [count, spread])

  useFrame((_, delta) => {
    const points = ref.current
    if (!points) return
    const attr = points.geometry.attributes.position
    const half = spread[1] / 2
    const dt = Math.min(delta, 0.05)
    for (let i = 0; i < count; i++) {
      let y = attr.array[i * 3 + 1] + speeds[i] * dt
      if (y > half) y = -half
      attr.array[i * 3 + 1] = y
    }
    attr.needsUpdate = true
    const px = pointer?.x.get() ?? 0
    const py = pointer?.y.get() ?? 0
    points.rotation.y += (px * 0.35 - points.rotation.y) * 0.04
    points.rotation.x += (py * 0.18 - points.rotation.x) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={color}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  )
}

function Turntable({ pointer }) {
  const root = useRef()
  const group = useRef()
  const inner = useRef()

  useFrame((_, delta) => {
    if (!root.current) return
    const dt = Math.min(delta, 0.05)
    group.current.rotation.z += dt * 0.12
    inner.current.rotation.z -= dt * 0.2
    const px = pointer?.x.get() ?? 0
    const py = pointer?.y.get() ?? 0
    const targetX = -Math.PI / 2 + py * 0.15
    const targetY = px * 0.4
    root.current.rotation.x += (targetX - root.current.rotation.x) * 0.05
    root.current.rotation.y += (targetY - root.current.rotation.y) * 0.05
  })

  return (
    <group ref={root} position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[3.4, 0.008, 8, 160]} />
          <meshBasicMaterial color="#c8102e" transparent opacity={0.6} />
        </mesh>
        <mesh>
          <torusGeometry args={[4.3, 0.005, 8, 160, Math.PI * 1.3]} />
          <meshBasicMaterial color="#4a5675" transparent opacity={0.5} />
        </mesh>
      </group>
      <group ref={inner}>
        <mesh>
          <torusGeometry args={[2.7, 0.012, 8, 160, Math.PI * 0.6]} />
          <meshBasicMaterial color="#ef2b35" transparent opacity={0.8} />
        </mesh>
      </group>
      <gridHelper args={[16, 32, '#1e2a48', '#1e2a48']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

/**
 * Lightweight ambient WebGL layer. `variant="showcase"` adds a turntable + floor grid.
 * `active` pauses the render loop entirely when the section is off-screen.
 */
export default function AmbientScene({ variant = 'hero', pointer, active = true }) {
  const showcase = variant === 'showcase'
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={showcase ? { position: [0, 2.6, 7], rotation: [-0.36, 0, 0], fov: 50 } : { position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
    >
      {showcase && <fog attach="fog" args={['#111a30', 6, 14]} />}
      <Particles
        count={showcase ? 220 : 320}
        pointer={pointer}
        color={showcase ? '#c8102e' : '#ef2b35'}
        spread={showcase ? [14, 8, 6] : [16, 10, 8]}
      />
      {showcase && <Turntable pointer={pointer} />}
    </Canvas>
  )
}
