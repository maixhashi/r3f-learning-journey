export const morphingFileContents: Record<string, string> = {
  'src/app/demos/animations/morphing/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { MorphingAnimation } from './components/MorphingAnimation'
import { morphingFiles, morphingFeatures, morphingFileContents } from '../../config/animations/morphing'

export default function MorphingDemo() {
  return (
    <DemoLayout 
      title="Morphing Animation Demo" 
      description="ジオメトリ形状変化アニメーションのデモ"
      files={morphingFiles}
      features={morphingFeatures}
      fileContents={morphingFileContents}
    >
      <MorphingAnimation />
    </DemoLayout>
  )
}`,

  'src/app/demos/animations/morphing/components/MorphingAnimation.tsx': `'use client'

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
      const color = \`hsl(\${hue * 360}, 70%, 60%)\`
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