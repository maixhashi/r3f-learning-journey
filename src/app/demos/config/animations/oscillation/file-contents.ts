export const oscillationFileContents: Record<string, string> = {
  'src/app/demos/animations/oscillation/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { OscillationAnimation } from './components/OscillationAnimation'
import { oscillationFiles, oscillationFeatures, oscillationFileContents } from '../../config/animations/oscillation'

export default function OscillationDemo() {
  return (
    <DemoLayout 
      title="Oscillation Animation Demo" 
      description="sin/cos関数を使った振動アニメーションのデモ"
      files={oscillationFiles}
      features={oscillationFeatures}
      fileContents={oscillationFileContents}
    >
      <OscillationAnimation />
    </DemoLayout>
  )
}`,

  'src/app/demos/animations/oscillation/components/OscillationAnimation.tsx': `'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Group } from 'three'

export function OscillationAnimation() {
  const sphereRef = useRef<Mesh>(null)
  const cubeRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (sphereRef.current) {
      // 球体: 上下振動（sin波）
      // Math.sin(time * 2): 周波数2で振動
      // * 1.5: 振幅1.5の上下運動
      sphereRef.current.position.y = Math.sin(time * 2) * 1.5
      
      // 左右振動も追加（位相差あり）
      sphereRef.current.position.x = Math.cos(time * 1.5) * 0.5
    }

    if (cubeRef.current) {
      // 立方体: 左右振動（cos波）
      // 異なる周波数で独立した動作
      cubeRef.current.position.x = Math.cos(time * 1.8) * 2
      
      // 回転も追加してより動的に
      cubeRef.current.rotation.y = time * 0.5
      cubeRef.current.rotation.x = Math.sin(time * 3) * 0.3
    }

    if (groupRef.current) {
      // グループ全体をゆっくり回転
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* 振動する球体 */}
      <mesh ref={sphereRef} position={[-3, 0, 0]} castShadow receiveShadow>
        {/* 
          sphereGeometry: 球体のジオメトリ
          args: [radius, widthSegments, heightSegments]
        */}
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      {/* 振動する立方体 */}
      <mesh ref={cubeRef} position={[3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* 中央の参照線（細い縦線） */}
      <mesh position={[0, 0, 0]}>
        {/* 
          cylinderGeometry: 円柱のジオメトリ（細い線として使用）
          args: [radiusTop, radiusBottom, height, radialSegments]
          半径0.02の細い線で参照用
        */}
        <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      
      {/* ラベルテキスト */}
      <Text position={[-3, -2.5, 0]} fontSize={0.4} color="white" anchorX="center">
        Sine Wave
      </Text>
      <Text position={[3, -2.5, 0]} fontSize={0.4} color="white" anchorX="center">
        Cosine Wave
      </Text>
      <Text position={[0, -2.5, 0]} fontSize={0.4} color="white" anchorX="center">
        Reference
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
                  position: [5, 3, 5],  // 振動が見やすい位置
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
