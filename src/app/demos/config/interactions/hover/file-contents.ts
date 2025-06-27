export const hoverFileContents: Record<string, string> = {
  'src/app/demos/interactions/hover/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { HoverInteraction } from './components/HoverInteraction'
import { hoverFiles, hoverFeatures, hoverFileContents } from '../../config/interactions/hover'

export default function HoverDemo() {
  return (
    <DemoLayout 
      title="Hover Interaction Demo" 
      description="マウスホバーイベントを使ったインタラクティブな3Dオブジェクト"
      files={hoverFiles}
      features={hoverFeatures}
      fileContents={hoverFileContents}
    >
      <HoverInteraction />
    </DemoLayout>
  )
}`,

  'src/app/demos/interactions/hover/components/HoverInteraction.tsx': `'use client'

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
        {/* 
          boxGeometry: 立方体のジオメトリを作成
          args: [width, height, depth] - 幅、高さ、奥行き
        */}
        <boxGeometry args={[2, 2, 2]} />
        
        {/* 
          meshStandardMaterial: 物理ベースレンダリング対応マテリアル
          - 状態に応じて色や質感を動的に変更
          - roughness: 表面の粗さ（0=鏡面、1=完全拡散）
          - metalness: 金属性（0=非金属、1=金属）
        */}
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
                  position: [3, 3, 3],  // カメラの初期位置
                  fov: 60               // 視野角（Field of View）
                }}
                shadows                 // 影の描画を有効化
                className="w-full h-full"
              >
                <Lighting />
                {children}
                
                {/* 
                  OrbitControls: マウス操作でカメラを制御
                  - enablePan: パン（平行移動）
                  - enableZoom: ズーム
                  - enableRotate: 回転
                */}
                <OrbitControls 
                  enablePan={true} 
                  enableZoom={true} 
                  enableRotate={true} 
                />
                
                {/* gridHelper: グリッド表示（位置関係の把握用） */}
                <gridHelper args={[10, 10]} />
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