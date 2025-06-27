export const clickFileContents: Record<string, string> = {
  'src/app/demos/interactions/click/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { ClickInteraction } from './components/ClickInteraction'
import { clickFiles, clickFeatures, clickFileContents } from '../../config/interactions/click'

export default function ClickDemo() {
  return (
    <DemoLayout 
      title="Click Interaction Demo" 
      description="3Dオブジェクトのクリックイベントを使ったインタラクションのデモ"
      files={clickFiles}
      features={clickFeatures}
      fileContents={clickFileContents}
    >
      <ClickInteraction />
    </DemoLayout>
  )
}`,

  'src/app/demos/interactions/click/components/ClickInteraction.tsx': `'use client'

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
                  position: [3, 3, 3],  // カメラの初期位置
                  fov: 60               // 視野角（Field of View）
                }}
                shadows                 // 影の描画を有効化
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
}`,

  'src/app/demos/components/common/index.ts': `export { DemoLayout } from './DemoLayout'
export { Lighting } from './Lighting'`
}