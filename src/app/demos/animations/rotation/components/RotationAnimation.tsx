'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh } from 'three'

export function RotationAnimation() {
  const meshRef = useRef<Mesh>(null)

  // useFrame: 毎フレーム実行されるフック
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Y軸を中心に回転
      meshRef.current.rotation.y += delta
      // X軸も少し回転させて立体的に
      meshRef.current.rotation.x += delta * 0.5
    }
  })

  return (
    <group>
      {/* 回転する立方体 */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      {/* ラベルテキスト */}
      <Text position={[0, -2.5, 0]} fontSize={0.5} color="white" anchorX="center">
        Rotating Box
      </Text>
    </group>
  )
}