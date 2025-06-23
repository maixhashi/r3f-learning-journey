'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, BoxGeometry, SphereGeometry, ConeGeometry, CylinderGeometry } from 'three'

export function MorphingAnimation() {
  const meshRef = useRef<Mesh>(null)
  const [currentShape, setCurrentShape] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const timeRef = useRef(0)

  // 形状の配列
  const shapes = [
    { geometry: new BoxGeometry(2, 2, 2), name: 'Box' },
    { geometry: new SphereGeometry(1.2, 32, 32), name: 'Sphere' },
    { geometry: new ConeGeometry(1.2, 2.5, 32), name: 'Cone' },
    { geometry: new CylinderGeometry(1, 1, 2.5, 32), name: 'Cylinder' }
  ]

  useFrame((state, delta) => {
    timeRef.current += delta

    if (meshRef.current) {
      // 回転アニメーション
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.2

      // 形状変化のタイミング制御（3秒ごと）
      const shapeChangeInterval = 3
      const currentTime = timeRef.current % (shapeChangeInterval * shapes.length)
      const newShapeIndex = Math.floor(currentTime / shapeChangeInterval)
      
      if (newShapeIndex !== currentShape) {
        setCurrentShape(newShapeIndex)
        meshRef.current.geometry = shapes[newShapeIndex].geometry
      }

      // スケールアニメーション（形状変化時の強調効果）
      const localTime = currentTime % shapeChangeInterval
      if (localTime < 0.5) {
        // 変化直後に少し大きくする
        const scale = 1 + Math.sin(localTime * Math.PI * 4) * 0.1
        meshRef.current.scale.setScalar(scale)
      } else {
        meshRef.current.scale.setScalar(1)
      }

      // 色の変化
      const hue = (timeRef.current * 0.1) % 1
      const color = `hsl(${hue * 360}, 70%, 60%)`
      if (meshRef.current.material && 'color' in meshRef.current.material) {
        meshRef.current.material.color.setStyle(color)
      }
    }
  })

  return (
    <group>
      {/* モーフィングする3Dオブジェクト */}
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]} 
        castShadow 
        receiveShadow
        geometry={shapes[currentShape].geometry}
      >
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      {/* 現在の形状名を表示 */}
      <Text position={[0, -2.5, 0]} fontSize={0.5} color="white" anchorX="center">
        {shapes[currentShape].name}
      </Text>
      
      {/* 進行状況インジケーター */}
      <group position={[0, -3.5, 0]}>
        {shapes.map((_, index) => (
          <mesh key={index} position={[(index - 1.5) * 0.8, 0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color={index === currentShape ? "#00ff00" : "#666666"} 
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}