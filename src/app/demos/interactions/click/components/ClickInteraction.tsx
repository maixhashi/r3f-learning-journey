'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh } from 'three'
import * as THREE from 'three'

export function ClickInteraction() {
  const meshRef = useRef<Mesh>(null)
  const [isClicked, setIsClicked] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [hovered, setHovered] = useState(false)

  // クリック時のアニメーション用の状態
  const [animationProgress, setAnimationProgress] = useState(0)

  // クリックハンドラー
  const handleClick = (event: any) => {
    event.stopPropagation()
    setIsClicked(true)
    setClickCount(prev => prev + 1)
    setAnimationProgress(1) // アニメーション開始
    
    // 1秒後にクリック状態をリセット
    setTimeout(() => {
      setIsClicked(false)
    }, 1000)
  }

  // アニメーションフレーム
  useFrame((state, delta) => {
    if (meshRef.current) {
      // 通常の回転
      meshRef.current.rotation.y += delta * 0.5
      
      // クリック時のアニメーション
      if (animationProgress > 0) {
        // スケールアニメーション（バウンス効果）
        const bounce = Math.sin(animationProgress * Math.PI * 4) * 0.2 + 1
        meshRef.current.scale.setScalar(bounce)
        
        // アニメーション進行
        setAnimationProgress(prev => Math.max(0, prev - delta * 2))
      } else {
        // 通常のスケールに戻す
        meshRef.current.scale.setScalar(1)
      }
      
      // ホバー時の浮遊効果
      if (hovered) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 0.2
      } else {
        meshRef.current.position.y = 0
      }
    }
  })

  return (
    <group>
      {/* クリック可能な立方体 */}
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]} 
        castShadow 
        receiveShadow
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        // カーソルスタイルの変更
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color={isClicked ? '#00ff00' : hovered ? '#ffaa00' : '#ff6b6b'}
          emissive={isClicked ? '#004400' : hovered ? '#442200' : '#000000'}
        />
      </mesh>
      
      {/* クリック回数表示 */}
      <Text 
        position={[0, -2.5, 0]} 
        fontSize={0.5} 
        color="white" 
        anchorX="center"
      >
        Clicks: {clickCount}
      </Text>
      
      {/* 操作説明 */}
      <Text 
        position={[0, -3.2, 0]} 
        fontSize={0.3} 
        color="gray" 
        anchorX="center"
      >
        {hovered ? 'Click me!' : 'Hover to interact'}
      </Text>
      
      {/* 追加のインタラクティブオブジェクト */}
      <InteractiveSphere position={[-3, 0, 0]} />
      <InteractiveSphere position={[3, 0, 0]} />
    </group>
  )
}

// 追加のインタラクティブ球体コンポーネント
function InteractiveSphere({ position }: { position: [number, number, number] }) {
  const sphereRef = useRef<Mesh>(null)
  const [clicked, setClicked] = useState(false)
  const [color, setColor] = useState('#6b6bff')

  const handleSphereClick = (event: any) => {
    event.stopPropagation()
    setClicked(true)
    
    // ランダムな色に変更
    const colors = ['#ff6b6b', '#6bff6b', '#6b6bff', '#ffff6b', '#ff6bff', '#6bffff']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)
    
    setTimeout(() => setClicked(false), 500)
  }

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta
      sphereRef.current.rotation.z += delta * 0.5
      
      if (clicked) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1
        sphereRef.current.scale.setScalar(scale)
      } else {
        sphereRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <mesh 
      ref={sphereRef}
      position={position}
      onClick={handleSphereClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color={color}
        emissive={clicked ? new THREE.Color(color).multiplyScalar(0.2) : '#000000'}
      />
    </mesh>
  )
}