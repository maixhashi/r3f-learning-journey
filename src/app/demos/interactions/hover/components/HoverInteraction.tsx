'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh } from 'three'

export function HoverInteraction() {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // アニメーション用の状態
  useFrame((state, delta) => {
    if (meshRef.current) {
      // ホバー時のスケールアニメーション
      const targetScale = hovered ? 1.2 : clicked ? 0.9 : 1.0
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, delta * 5)
      
      // ホバー時の回転アニメーション
      if (hovered) {
        meshRef.current.rotation.y += delta * 2
      }
    }
  })

  return (
    <group>
      {/* インタラクティブな立方体 */}
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]} 
        castShadow 
        receiveShadow
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onPointerDown={(e) => {
          e.stopPropagation()
          setClicked(true)
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          setClicked(false)
        }}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={hovered ? "#4ecdc4" : clicked ? "#ff6b6b" : "#45b7d1"} 
          roughness={hovered ? 0.1 : 0.5}
          metalness={hovered ? 0.8 : 0.2}
        />
      </mesh>
      
      {/* 状態表示テキスト */}
      <Text position={[0, -2.5, 0]} fontSize={0.5} color="white" anchorX="center">
        {hovered ? "Hovering!" : clicked ? "Clicked!" : "Hover me!"}
      </Text>
      
      {/* 説明テキスト */}
      <Text position={[0, -3.2, 0]} fontSize={0.3} color="#888" anchorX="center">
        {hovered ? "Mouse over - Rotating & Glowing" : "Move mouse over the cube"}
      </Text>
    </group>
  )
}