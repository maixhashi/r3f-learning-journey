'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Group } from 'three'

export function OscillationAnimation() {
  const sphereRef = useRef<Mesh>(null)
  const cubeRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (sphereRef.current) {
      // 球体: 上下振動（sin波）
      sphereRef.current.position.y = Math.sin(time * 2) * 1.5
      // 左右振動も追加
      sphereRef.current.position.x = Math.cos(time * 1.5) * 0.5
    }

    if (cubeRef.current) {
      // 立方体: 左右振動（cos波）
      cubeRef.current.position.x = Math.cos(time * 1.8) * 2
      // 回転も追加
      cubeRef.current.rotation.y = time * 0.5
      cubeRef.current.rotation.x = Math.sin(time * 3) * 0.3
    }

    if (groupRef.current) {
      // グループ全体をゆっくり回転
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* 振動する球体 */}
      <mesh ref={sphereRef} position={[-3, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      {/* 振動する立方体 */}
      <mesh ref={cubeRef} position={[3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* 中央の参照線（細い縦線） */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      
      {/* ラベルテキスト */}
      <Text position={[-3, -2.5, 0]} fontSize={0.4} color="white" anchorX="center">
        Sine Wave
      </Text>
      <Text position={[3, -2.5, 0]} fontSize={0.4} color="white" anchorX="center">
        Cosine Wave
      </Text>
      <Text position={[0, -2.5, 0]} fontSize={0.4} color="white" anchorX="center">
        Reference
      </Text>
    </group>
  )
}