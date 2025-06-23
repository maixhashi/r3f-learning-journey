'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Group } from 'three'

export function OrbitAnimation() {
  const orbitGroupRef = useRef<Group>(null)
  const planetRef = useRef<Mesh>(null)
  const moonRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (orbitGroupRef.current && planetRef.current && moonRef.current) {
      // 太陽の周りを公転（軌道運動）
      orbitGroupRef.current.rotation.y += delta * 0.5
      
      // 惑星の自転
      planetRef.current.rotation.y += delta * 2
      
      // 月の公転（惑星の周り）
      moonRef.current.rotation.y += delta * 3
    }
  })

  return (
    <group>
      {/* 太陽（中心） */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffaa00" emissiveIntensity={0.3} />
      </mesh>
      
      {/* 地球の軌道線（固定） */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.95, 4.05, 128]} />
        <meshBasicMaterial 
          color="#4a90e2" 
          transparent 
          opacity={0.15}
          side={2} // DoubleSide
        />
      </mesh>
      
      {/* 軌道グループ - 太陽の周りを回転 */}
      <group ref={orbitGroupRef}>
        {/* 地球 */}
        <mesh ref={planetRef} position={[4, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>
        
        {/* 月の軌道線（地球の位置に固定） */}
        <mesh position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.45, 1.55, 64]} />
          <meshBasicMaterial 
            color="#cccccc" 
            transparent 
            opacity={0.12}
            side={2} // DoubleSide
          />
        </mesh>
        
        {/* 月の軌道グループ - 地球の位置を基準に回転 */}
        <group position={[4, 0, 0]} ref={moonRef}>
          {/* 月 */}
          <mesh position={[1.5, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
        </group>
      </group>
      
      {/* ラベルテキスト */}
      <Text position={[0, -1.5, 0]} fontSize={0.3} color="yellow" anchorX="center">
        Sun
      </Text>
      <Text position={[0, -6, 0]} fontSize={0.4} color="white" anchorX="center">
        Solar System Orbit
      </Text>
      
      {/* 軌道の説明ラベル */}
      <Text position={[-6, 3, 0]} fontSize={0.25} color="#4a90e2" anchorX="center">
        Earth's Orbit
      </Text>
      <Text position={[6, 1, 0]} fontSize={0.2} color="#cccccc" anchorX="center">
        Moon's Orbit
      </Text>
    </group>
  )
}