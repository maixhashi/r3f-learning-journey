'use client'

import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Mesh } from 'three'

// アニメーション付きメッシュコンポーネント
const AnimatedMesh = animated('mesh')

export function ReactSpringDemo() {
  // 状態管理
  const [springHovered, setSpringHovered] = useState(false)
  const [springClicked, setSpringClicked] = useState(false)
  const [normalHovered, setNormalHovered] = useState(false)
  const [normalClicked, setNormalClicked] = useState(false)

  // 通常のアニメーション用ref
  const normalMeshRef = useRef<Mesh>(null)

  // React Spring アニメーション設定
  const springAnimation = useSpring({
    scale: springClicked ? [1.5, 1.5, 1.5] : springHovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    position: springClicked ? [0, 1, 0] : [0, 0, 0],
    rotation: springClicked ? [0, Math.PI, 0] : [0, 0, 0],
    color: springClicked ? '#ff4757' : springHovered ? '#ffa502' : '#3742fa',
    config: {
      tension: 300,
      friction: 10,
    }
  })

  // 通常のアニメーション（useFrameを使用）
  useFrame((state, delta) => {
    if (normalMeshRef.current) {
      // ホバー時のスケールアニメーション
      const targetScale = normalClicked ? 1.5 : normalHovered ? 1.2 : 1
      const currentScale = normalMeshRef.current.scale.x
      const newScale = currentScale + (targetScale - currentScale) * delta * 5
      normalMeshRef.current.scale.setScalar(newScale)

      // クリック時の位置アニメーション
      const targetY = normalClicked ? 1 : 0
      const currentY = normalMeshRef.current.position.y
      const newY = currentY + (targetY - currentY) * delta * 5
      normalMeshRef.current.position.y = newY

      // クリック時の回転アニメーション
      const targetRotationY = normalClicked ? Math.PI : 0
      const currentRotationY = normalMeshRef.current.rotation.y
      const newRotationY = currentRotationY + (targetRotationY - currentRotationY) * delta * 5
      normalMeshRef.current.rotation.y = newRotationY
    }
  })

  return (
    <group>
      {/* React Spring を使用したキューブ */}
      <AnimatedMesh
        position={springAnimation.position.to((x, y, z) => [-2.5, y, z])}
        scale={springAnimation.scale}
        rotation={springAnimation.rotation}
        onPointerEnter={() => setSpringHovered(true)}
        onPointerLeave={() => setSpringHovered(false)}
        onClick={() => setSpringClicked(!springClicked)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <animated.meshStandardMaterial color={springAnimation.color} />
      </AnimatedMesh>

      {/* 通常のイベント処理を使用したキューブ */}
      <mesh
        ref={normalMeshRef}
        position={[2.5, 0, 0]}
        onPointerEnter={() => setNormalHovered(true)}
        onPointerLeave={() => setNormalHovered(false)}
        onClick={() => setNormalClicked(!normalClicked)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color={normalClicked ? '#ff4757' : normalHovered ? '#ffa502' : '#2ed573'} 
        />
      </mesh>

      {/* ラベル */}
      <Text position={[-2.5, -2, 0]} fontSize={0.3} color="white" anchorX="center">
        React Spring
        {'\n'}(Smooth Animation)
      </Text>
      
      <Text position={[2.5, -2, 0]} fontSize={0.3} color="white" anchorX="center">
        useFrame
        {'\n'}(Manual Animation)
      </Text>

      {/* 説明テキスト */}
      <Text position={[0, -3.5, 0]} fontSize={0.25} color="#888" anchorX="center">
        Click and hover to compare animation styles
      </Text>
    </group>
  )
}