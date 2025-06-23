'use client'

import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useSpring, animated, config } from '@react-spring/three'
import { Mesh } from 'three'

export function SpringAnimation() {
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<Mesh>(null)

  // スプリングアニメーション設定
  const { scale, position, rotation, color } = useSpring({
    // クリック状態に応じてスケールを変更
    scale: clicked ? [1.5, 1.5, 1.5] : [1, 1, 1],
    
    // ホバー状態に応じて位置を変更
    position: hovered ? [0, 1, 0] : [0, 0, 0],
    
    // クリック状態に応じて回転
    rotation: clicked ? [0, Math.PI, 0] : [0, 0, 0],
    
    // ホバー状態に応じて色を変更
    color: hovered ? '#ff6b6b' : '#4ecdc4',
    
    // アニメーション設定
    config: {
      tension: 300,  // バネの強さ
      friction: 10,  // 摩擦（減衰）
    }
  })

  // 自動回転アニメーション
  const { autoRotation } = useSpring({
    from: { autoRotation: 0 },
    to: { autoRotation: Math.PI * 2 },
    loop: true,
    config: config.slow,
  })

  // 浮遊アニメーション
  const { floatY } = useSpring({
    from: { floatY: -0.5 },
    to: { floatY: 0.5 },
    loop: { reverse: true },
    config: config.gentle,
  })

  return (
    <group>
      {/* メインの立方体 */}
      <animated.mesh
        ref={meshRef}
        scale={scale}
        position={position.to((x, y, z) => [x, y + floatY.get(), z])}
        rotation={rotation.to((x, y, z) => [x, y + autoRotation.get(), z])}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 2, 2]} />
        <animated.meshStandardMaterial color={color} />
      </animated.mesh>

      {/* 複数のスプリング球体 */}
      <SpringSpheres />
      
      {/* インタラクションガイド */}
      <Text position={[0, -3, 0]} fontSize={0.4} color="white" anchorX="center">
        Click to scale • Hover to lift
      </Text>
      
      <Text position={[0, -3.6, 0]} fontSize={0.3} color="gray" anchorX="center">
        Spring-based animations with react-spring
      </Text>
    </group>
  )
}

// 複数のスプリング球体コンポーネント
function SpringSpheres() {
  const spheres = Array.from({ length: 5 }, (_, i) => i)
  
  return (
    <group>
      {spheres.map((index) => (
        <SpringSphere key={index} index={index} />
      ))}
    </group>
  )
}

// 個別のスプリング球体
function SpringSphere({ index }: { index: number }) {
  const [active, setActive] = useState(false)
  
  // 各球体の位置を円形に配置
  const angle = (index / 5) * Math.PI * 2
  const radius = 4
  const baseX = Math.cos(angle) * radius
  const baseZ = Math.sin(angle) * radius

  // スプリングアニメーション
  const { scale, positionY, color } = useSpring({
    scale: active ? 1.5 : 1,
    positionY: active ? 1 : 0,
    color: active ? '#ff9ff3' : '#54a0ff',
    config: config.wobbly,
  })

  // 遅延付きの波状アニメーション
  const { waveY } = useSpring({
    from: { waveY: 0 },
    to: { waveY: Math.PI * 2 },
    loop: true,
    delay: index * 200, // 各球体に遅延を追加
    config: config.slow,
  })

  return (
    <animated.mesh
      position={[
        baseX,
        waveY.to(y => Math.sin(y) * 0.5 + positionY.get()),
        baseZ
      ]}
      scale={scale}
      onClick={() => setActive(!active)}
      castShadow
    >
      <sphereGeometry args={[0.5, 16, 16]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
}