export const springFileContents: Record<string, string> = {
  'src/app/demos/animations/spring/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { SpringAnimation } from './components/SpringAnimation'
import { springFiles, springFeatures, springFileContents } from '../../config/animations/spring'

export default function SpringDemo() {
  return (
    <DemoLayout 
      title="Spring Animation Demo" 
      description="react-springを使った物理ベースのスプリングアニメーションのデモ"
      files={springFiles}
      features={springFeatures}
      fileContents={springFileContents}
    >
      <SpringAnimation />
    </DemoLayout>
  )
}`,

  'src/app/demos/animations/spring/components/SpringAnimation.tsx': `'use client'

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
}`,

  'src/app/demos/components/common/DemoLayout.tsx': `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Lighting } from './Lighting'
import { FileExplorer, FeatureSelector, CodeViewer } from '../file-system'
import { FileNode, FeatureFile } from '../../config/types'

interface DemoLayoutProps {
  title: string
  description: string
  files: FileNode[]
  features: FeatureFile[]
  fileContents: Record<string, string>
  children: React.ReactNode
}

export function DemoLayout({ 
  title, 
  description, 
  files, 
  features, 
  fileContents, 
  children 
}: DemoLayoutProps) {
  const [selectedFeature, setSelectedFeature] = useState<FeatureFile | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-900 min-h-full">
        <div className="container mx-auto px-4 py-8">
          {/* ナビゲーション */}
          <div className="mb-6">
            <Link 
              href="/demos" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              デモ一覧に戻る
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-300">{description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
            {/* 3D Canvas */}
            <div className="bg-gray-800 rounded-lg overflow-hidden min-h-[500px]">
              <Canvas
                camera={{ 
                  position: [5, 5, 5],  // スプリングアニメーション用に少し遠めに設定
                  fov: 60
                }}
                shadows
                className="w-full h-full"
              >
                <Lighting />
                {children}
                
                <OrbitControls 
                  enablePan={true} 
                  enableZoom={true} 
                  enableRotate={true} 
                />
                
                <gridHelper args={[20, 20]} />
              </Canvas>
            </div>
            
            {/* Code Panel */}
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-h-[500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FileExplorer 
                  files={files} 
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                />
                <FeatureSelector 
                  features={features} 
                  selectedFeature={selectedFeature}
                  onFeatureSelect={setSelectedFeature}
                />
              </div>
              <div className="flex-1">
                <CodeViewer 
                  features={features} 
                  fileContents={fileContents} 
                  selectedFeature={selectedFeature}
                  selectedFile={selectedFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`,

  'src/app/demos/components/common/Lighting.tsx': `'use client'

export function Lighting() {
  return (
    <>
      {/* 
        ambientLight: 環境光
        - 全体を均等に照らす
        - 影のコントラストを調整
      */}
      <ambientLight intensity={0.4} />
      
      {/* 
        directionalLight: 指向性ライト（太陽光のような平行光）
        - 影を生成する主要光源
        - position: ライトの方向を決定
      */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* 
        pointLight: ポイントライト（電球のような点光源）
        - 色付きの補助照明として使用
      */}
      <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={0.3} />
      <pointLight position={[10, -10, -10]} color="#0000ff" intensity={0.3} />
    </>
  )
}`,

  'src/app/demos/components/common/index.ts': `export { DemoLayout } from './DemoLayout'
export { Lighting } from './Lighting'`
}
