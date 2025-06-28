export const reactSpringFileContents: Record<string, string> = {
  'src/app/demos/library-integration/react-spring/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { ReactSpringDemo } from './components/ReactSpringDemo'
import { reactSpringFiles, reactSpringFeatures, reactSpringFileContents } from '../../config/library-integration/react-spring'

export default function ReactSpringPage() {
  return (
    <DemoLayout 
      title="React Spring Integration Demo" 
      description="React Springを使用したスムーズなアニメーションと通常のイベント処理との比較"
      files={reactSpringFiles}
      features={reactSpringFeatures}
      fileContents={reactSpringFileContents}
    >
      <ReactSpringDemo />
    </DemoLayout>
  )
}`,

  'src/app/demos/library-integration/react-spring/components/ReactSpringDemo.tsx': `'use client'

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

      {/* インタラクティブな球体（React Spring使用） */}
      <InteractiveSphere />
    </group>
  )
}

// インタラクティブな球体コンポーネント
function InteractiveSphere() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  const { scale, color, position } = useSpring({
    scale: active ? 1.5 : hovered ? 1.2 : 1,
    color: active ? '#e74c3c' : hovered ? '#f39c12' : '#9b59b6',
    position: active ? [0, 2.5, 0] : [0, 2, 0],
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
    }
  })

  return (
    <AnimatedMesh
      position={position}
      scale={scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => setActive(!active)}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[0.8, 32, 32]} />
      <animated.meshStandardMaterial color={color} />
    </AnimatedMesh>
  )
}`,

  'package.json (dependencies)': `{
  "dependencies": {
    "@react-spring/three": "^9.7.3",
    "@react-spring/core": "^9.7.3",
    "@react-three/fiber": "^8.15.11",
    "@react-three/drei": "^9.88.13",
    "three": "^0.158.0"
  }
}`,

  'Installation.md': `# React Spring Installation

## パッケージのインストール

\`\`\`bash
npm install @react-spring/three @react-spring/core
\`\`\`

## 基本的な使用方法

\`\`\`tsx
import { useSpring, animated } from '@react-spring/three'

const AnimatedMesh = animated('mesh')

function MyComponent() {
  const springs = useSpring({
    scale: active ? 2 : 1,
    config: { tension: 300, friction: 10 }
  })

  return (
    <AnimatedMesh scale={springs.scale}>
      <boxGeometry />
      <meshStandardMaterial />
    </AnimatedMesh>
  )
}
\`\`\`

## 主な特徴

- 物理ベースのアニメーション
- 宣言的なAPI
- 高いパフォーマンス
- TypeScript完全対応
- React Three Fiber完全統合`
}
