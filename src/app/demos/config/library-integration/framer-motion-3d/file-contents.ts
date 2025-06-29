export const framerMotion3DFileContents: Record<string, string> = {
    'src/app/demos/library-integration/framer-motion-3d/page.tsx': `'use client'
  
  import { DemoLayout } from '../../components/common'
  import { FramerMotion3DDemo } from './components/FramerMotion3DDemo'
  import { framerMotion3DFiles, framerMotion3DFeatures, framerMotion3DFileContents } from '../../config/library-integration/framer-motion-3d'
  
  export default function FramerMotion3DPage() {
    return (
      <DemoLayout 
        title="Framer Motion 3D vs Traditional R3F Comparison" 
        description="従来のReact Three FiberとFramer Motion 3Dの実装方法を比較"
        files={framerMotion3DFiles}
        features={framerMotion3DFeatures}
        fileContents={framerMotion3DFileContents}
      >
        <FramerMotion3DDemo />
      </DemoLayout>
    )
  }`,
  
    'src/app/demos/library-integration/framer-motion-3d/components/FramerMotion3DDemo.tsx': `'use client'
  
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
  
        // ホバー時の色変更（手動でマテリアルを操作）
        if (meshRef.current.material && 'color' in meshRef.current.material) {
          const material = meshRef.current.material as any
          const targetColor = isDragging ? 0xff4757 : isHovered ? 0x5352ed : 0x2ed573
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
  
    // ドラッグイベントの処理（簡易実装）
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
  
    return (
      <motion.mesh
        position={[3, 0, 0]}
        castShadow
        receiveShadow
        // 状態に基づくアニメーション
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotateY: isHovered ? Math.PI / 4 : 0,
        }}
        // ドラッグ時のアニメーション
        whileDrag={{
          scale: 1.3,
          rotateX: 0.2,
          rotateZ: 0.1,
        }}
        // タップ時のアニメーション
        whileTap={{
          scale: 0.9,
        }}
        // ホバー時のアニメーション（whileHoverが優先される）
        whileHover={{
          scale: 1.2,
          rotateY: Math.PI / 4,
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
      // イベントハンドラー
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={isDragging ? "#ff4757" : isHovered ? "#5352ed" : "#2ed573"} 
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
        {'\n'}~80 lines of code
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
        {'\n'}~35 lines of code
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

      {/* 比較ポイントの説明 */}
      <Text 
        position={[0, 3.5, 0]} 
        fontSize={0.25} 
        color="#a4b0be" 
        anchorX="center"
        anchorY="middle"
      >
        Same functionality, different implementation approaches
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
              href="/demos/library-integration" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              ライブラリ統合デモ一覧に戻る
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
                  position: [0, 0, 8],  // 比較しやすい位置に調整
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

          {/* 比較表 */}
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">実装方法比較表</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3 text-gray-300">項目</th>
                    <th className="text-center p-3 text-orange-400">Traditional R3F</th>
                    <th className="text-center p-3 text-cyan-400">Framer Motion 3D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">コード量</td>
                    <td className="p-3 text-center">~80行</td>
                    <td className="p-3 text-center">~35行</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">学習コスト</td>
                    <td className="p-3 text-center">高い</td>
                    <td className="p-3 text-center">低い</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">パフォーマンス</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">開発速度</td>
                    <td className="p-3 text-center">⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">カスタマイズ性</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">バンドルサイズ</td>
                    <td className="p-3 text-center">小</td>
                    <td className="p-3 text-center">中</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">保守性</td>
                    <td className="p-3 text-center">⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">推奨用途</td>
                    <td className="p-3 text-center text-xs">ゲーム、大量データ、<br/>高パフォーマンス要求</td>
                    <td className="p-3 text-center text-xs">プロトタイプ、UI/UX、<br/>短期開発</td>
                  </tr>
                </tbody>
              </table>
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
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={0.3} />
      <pointLight position={[10, -10, -10]} color="#0000ff" intensity={0.3} />
    </>
  )
}`,

  'src/app/demos/components/common/index.ts': `export { DemoLayout } from './DemoLayout'
export { Lighting } from './Lighting'`
}
