export const cannonFileContents: Record<string, string> = {
  'src/app/demos/library-integration/cannon/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { CannonPhysics } from './components/CannonPhysics'
import { cannonFiles, cannonFeatures, cannonFileContents } from '../../config/library-integration/cannon'

export default function CannonDemo() {
  return (
    <DemoLayout 
      title="Cannon.js Physics Demo" 
      description="Cannon.jsを使用した物理エンジンによる重力・摩擦シミュレーション"
      files={cannonFiles}
      features={cannonFeatures}
      fileContents={cannonFileContents}
    >
      <CannonPhysics />
    </DemoLayout>
  )
}`,

  'src/app/demos/library-integration/cannon/components/CannonPhysics.tsx': `'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Box, Plane } from '@react-three/drei'
import { Physics, useBox, usePlane, useSphere, CannonPublicApi } from '@react-three/cannon'
import { Mesh, Vector3 } from 'three'

// 落下するボール
function FallingBall({ position }: { position: [number, number, number] }) {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position,
    material: {
      friction: 0.4,
      restitution: 0.8, // 反発係数
    },
  }))

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color="#4ecdc4" />
    </mesh>
  )
}

// 落下するボックス
function FallingBox({ position }: { position: [number, number, number] }) {
  const [ref, api] = useBox<Mesh>(() => ({
    mass: 2,
    position,
    material: {
      friction: 0.6,
      restitution: 0.3,
    },
  }))

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )
}

// 地面
function Ground() {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -5, 0],
    material: {
      friction: 0.8,
      restitution: 0.2,
    },
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#95a5a6" />
    </mesh>
  )
}

// 壁
function Wall({ position, rotation }: { 
  position: [number, number, number]
  rotation?: [number, number, number] 
}) {
  const [ref] = useBox<Mesh>(() => ({
    position,
    rotation,
    type: 'Static', // 静的オブジェクト（動かない）
    args: [0.5, 10, 10],
  }))

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.5, 10, 10]} />
      <meshStandardMaterial color="#34495e" transparent opacity={0.3} />
    </mesh>
  )
}

// インタラクティブなボール（クリックで力を加える）
function InteractiveBall() {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [0, 2, 0],
    material: {
      friction: 0.3,
      restitution: 0.9,
    },
  }))

  const handleClick = () => {
    // ランダムな方向に力を加える
    const force = new Vector3(
      (Math.random() - 0.5) * 10,
      Math.random() * 5 + 5,
      (Math.random() - 0.5) * 10
    )
    api.applyImpulse([force.x, force.y, force.z], [0, 0, 0])
  }

  return (
    <mesh ref={ref} castShadow onClick={handleClick}>
      <sphereGeometry args={[0.6]} />
      <meshStandardMaterial color="#e74c3c" />
    </mesh>
  )
}

export function CannonPhysics() {
  const [ballCount, setBallCount] = useState(0)
  const [boxCount, setBoxCount] = useState(0)

  const addBall = () => {
    setBallCount(prev => prev + 1)
  }

  const addBox = () => {
    setBoxCount(prev => prev + 1)
  }

  const reset = () => {
    setBallCount(0)
    setBoxCount(0)
  }

  return (
    <group>
      {/* 物理エンジンのセットアップ */}
      <Physics
        gravity={[0, -9.81, 0]} // 重力設定
        defaultContactMaterial={{
          friction: 0.4,
          restitution: 0.3,
        }}
      >
        {/* 地面 */}
        <Ground />
        
        {/* 壁 */}
        <Wall position={[-8, 0, 0]} />
        <Wall position={[8, 0, 0]} />
        <Wall position={[0, 0, -8]} rotation={[0, Math.PI / 2, 0]} />
        <Wall position={[0, 0, 8]} rotation={[0, Math.PI / 2, 0]} />
        
        {/* インタラクティブなボール */}
        <InteractiveBall />
        
        {/* 動的に生成されるボール */}
        {Array.from({ length: ballCount }, (_, i) => (
          <FallingBall 
            key={\`ball-\${i}\`} 
            position={[
              (Math.random() - 0.5) * 6,
              5 + i * 0.5,
              (Math.random() - 0.5) * 6
            ]} 
          />
        ))}
        
        {/* 動的に生成されるボックス */}
        {Array.from({ length: boxCount }, (_, i) => (
          <FallingBox 
            key={\`box-\${i}\`} 
            position={[
              (Math.random() - 0.5) * 6,
              6 + i * 0.5,
              (Math.random() - 0.5) * 6
            ]} 
          />
        ))}
      </Physics>
      
      {/* UI テキスト */}
      <Text position={[0, 8, 0]} fontSize={0.8} color="white" anchorX="center">
        Cannon.js Physics Demo
      </Text>
      <Text position={[0, 7, 0]} fontSize={0.4} color="#bdc3c7" anchorX="center">
        赤いボールをクリックして力を加えてみてください
      </Text>
      
      {/* コントロールパネル */}
      <group position={[-6, 6, 0]}>
        <Text position={[0, 0, 0]} fontSize={0.3} color="white" anchorX="left">
          Controls:
        </Text>
        <Text position={[0, -0.5, 0]} fontSize={0.25} color="#ecf0f1" anchorX="left">
          B: Add Ball ({ballCount})
        </Text>
        <Text position={[0, -0.8, 0]} fontSize={0.25} color="#ecf0f1" anchorX="left">
          X: Add Box ({boxCount})
        </Text>
        <Text position={[0, -1.1, 0]} fontSize={0.25} color="#ecf0f1" anchorX="left">
          R: Reset
        </Text>
      </group>
    </group>
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

  // ファイルが選択された時の処理
  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName)
    
    // 選択されたファイルに関連する機能を検索
    const relatedFeature = features.find(feature => 
      feature.files.some(file => file.includes(fileName) || fileName.includes(file))
    )
    
    if (relatedFeature) {
      setSelectedFeature(relatedFeature)
    }
  }

  // 機能が選択された時の処理
  const handleFeatureSelect = (feature: FeatureFile) => {
    setSelectedFeature(feature)
    // 機能の最初のファイルを選択
    if (feature.files.length > 0) {
      setSelectedFile(feature.files[0])
    }
  }

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
                  position: [3, 3, 3],
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
                
                <gridHelper args={[10, 10]} />
              </Canvas>
            </div>
            
            {/* Code Panel */}
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col min-h-[500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FileExplorer 
                  files={files} 
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                />
                <FeatureSelector 
                  features={features} 
                  selectedFeature={selectedFeature}
                  onFeatureSelect={handleFeatureSelect}
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
}`
}