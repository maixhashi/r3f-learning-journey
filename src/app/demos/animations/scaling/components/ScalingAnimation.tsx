'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh } from 'three'

export function ScalingAnimation() {
  const meshRef = useRef<Mesh>(null)

  // useFrame: 毎フレーム実行されるフック
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // sin波を使った呼吸するようなスケーリング
      const scale = 1 + Math.sin(time * 2) * 0.3
      meshRef.current.scale.setScalar(scale)
      
      // 軽い回転も追加して動きを分かりやすく
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      {/* スケーリングする球体 */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      {/* 参考用の固定サイズの枠 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.3} transparent />
      </mesh>
      
      {/* ラベルテキスト */}
      <Text position={[0, -2.5, 0]} fontSize={0.5} color="white" anchorX="center">
        Scaling Sphere
      </Text>
    </group>
  )
}