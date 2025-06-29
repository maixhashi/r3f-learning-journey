'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { Text } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'

// 従来のReact Three Fiberによる実装
function TraditionalR3FBox() {
  const meshRef = useRef<Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [dragStart, setDragStart] = useState<Vector3 | null>(null)
  const [position, setPosition] = useState<[number, number, number]>([-3, 0, 0])
  
  // 目標値の管理
  const targetScale = useRef(1)
  const targetRotationY = useRef(0)
  const currentScale = useRef(1)
  const currentRotationY = useRef(0)

  // 手動でアニメーションを実装
  useFrame((state, delta) => {
    if (meshRef.current) {
      // スケールのスムーズな補間
      const scaleDiff = targetScale.current - currentScale.current
      if (Math.abs(scaleDiff) > 0.01) {
        currentScale.current += scaleDiff * delta * 8 // 8は補間速度
        meshRef.current.scale.setScalar(currentScale.current)
      }

      // 回転のスムーズな補間
      const rotationDiff = targetRotationY.current - currentRotationY.current
      if (Math.abs(rotationDiff) > 0.01) {
        currentRotationY.current += rotationDiff * delta * 6
        meshRef.current.rotation.y = currentRotationY.current
      }

      // 状態に応じた色変更（手動でマテリアルを操作）
      if (meshRef.current.material && 'color' in meshRef.current.material) {
        const material = meshRef.current.material as any
        let targetColor = 0x2ed573 // デフォルト（緑）
        
        if (isClicked) {
          targetColor = 0xff3742 // クリック時（赤）
        } else if (isDragging) {
          targetColor = 0xff4757 // ドラッグ時（濃い赤）
        } else if (isHovered) {
          targetColor = 0x5352ed // ホバー時（青）
        }
        
        const currentColor = material.color.getHex()
        if (currentColor !== targetColor) {
          material.color.setHex(targetColor)
        }
      }
    }
  })

  // ホバーイベントの処理
  const handlePointerEnter = () => {
    setIsHovered(true)
    targetScale.current = 1.2
    targetRotationY.current = Math.PI / 4
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    if (!isDragging) {
      targetScale.current = 1
      targetRotationY.current = 0
    }
  }

  // クリックイベントの処理
  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  // ドラッグイベントの処理
  const handlePointerDown = (event: any) => {
    setIsDragging(true)
    targetScale.current = 1.3
    setDragStart(new Vector3(event.point.x, event.point.y, event.point.z))
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    targetScale.current = isHovered ? 1.2 : 1
    targetRotationY.current = isHovered ? Math.PI / 4 : 0
    setDragStart(null)
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
      receiveShadow
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  )
}

// Framer Motion 3Dによる実装
function FramerMotion3DBox() {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // 状態に応じた色の決定（Traditional R3Fと同じロジック）
  const getColor = () => {
    if (isClicked) return "#ff3742"      // クリック時（赤）
    if (isDragging) return "#ff4757"     // ドラッグ時（濃い赤）
    if (isHovered) return "#5352ed"      // ホバー時（青）
    return "#2ed573"                     // デフォルト（緑）
  }

  // デバッグ用：現在の状態をログ出力
  console.log('Framer Motion 3D Box State:', {
    isHovered,
    isDragging,
    isClicked,
    color: getColor()
  })

  return (
    <motion.mesh
      position={[3, 0, 0]}
      castShadow
      receiveShadow
      // 状態に基づくアニメーション
      animate={{
        scale: isDragging ? 1.3 : isHovered ? 1.2 : 1,
        rotateY: isHovered ? Math.PI / 4 : 0,
        rotateX: isDragging ? 0.2 : 0,
        rotateZ: isDragging ? 0.1 : 0,
      }}
      // アニメーション設定
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      // ドラッグ設定
      drag
      dragConstraints={{
        left: -2,
        right: 2,
        top: 2,
        bottom: -2,
      }}
      dragElastic={0.1}
      // イベントハンドラー（状態管理を明示的に行う）
      onPointerEnter={() => {
        console.log('Framer Motion: Pointer Enter')
        setIsHovered(true)
      }}
      onPointerLeave={() => {
        console.log('Framer Motion: Pointer Leave')
        setIsHovered(false)
      }}
      onDragStart={() => {
        console.log('Framer Motion: Drag Start')
        setIsDragging(true)
      }}
      onDragEnd={() => {
        console.log('Framer Motion: Drag End')
        setIsDragging(false)
      }}
      onClick={() => {
        console.log('Framer Motion: Click')
        setIsClicked(!isClicked)
      }}
      // Framer Motionの組み込みイベントは使用せず、手動で状態管理
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={getColor()} 
      />
    </motion.mesh>
  )
}

export function FramerMotion3DDemo() {
  return (
    <group>
      {/* 従来のReact Three Fiber実装 */}
      <TraditionalR3FBox />
      
      {/* Framer Motion 3D実装 */}
      <FramerMotion3DBox />

      {/* 説明テキスト */}
      <Text 
        position={[-3, -3, 0]} 
        fontSize={0.3} 
        color="#ff9f43" 
        anchorX="center"
        anchorY="middle"
      >
        Traditional R3F
        {'\n'}(Manual Animation)
        {'\n'}~90 lines of code
      </Text>

      <Text 
        position={[3, -3, 0]} 
        fontSize={0.3} 
        color="#00d2d3" 
        anchorX="center"
        anchorY="middle"
      >
        Framer Motion 3D
        {'\n'}(Declarative Animation)
        {'\n'}~50 lines of code
      </Text>

      <Text 
        position={[0, -4.5, 0]} 
        fontSize={0.4} 
        color="white" 
        anchorX="center"
        anchorY="middle"
      >
        Hover, Click, and Drag both boxes to compare!
      </Text>

      {/* 色の状態説明 */}
      <Text 
        position={[0, 4, 0]} 
        fontSize={0.2} 
        color="#a4b0be" 
        anchorX="center"
        anchorY="middle"
      >
        🟢 Default  🔵 Hover  🔴 Click  🔴 Drag
      </Text>

      {/* 操作説明 */}
      <Text 
        position={[0, 3.5, 0]} 
        fontSize={0.25} 
        color="#a4b0be" 
        anchorX="center"
        anchorY="middle"
      >
        Both boxes should behave identically
      </Text>

      {/* パフォーマンス指標表示 */}
      <Text 
        position={[-3, -4, 0]} 
        fontSize={0.2} 
        color="#ff9f43" 
        anchorX="center"
        anchorY="middle"
      >
        ✅ High Performance
        {'\n'}❌ More Code
        {'\n'}❌ Complex State
      </Text>

      <Text 
        position={[3, -4, 0]} 
        fontSize={0.2} 
        color="#00d2d3" 
        anchorX="center"
        anchorY="middle"
      >
        ✅ Less Code
        {'\n'}✅ Declarative
        {'\n'}❌ Bundle Size
      </Text>
    </group>
  )
}