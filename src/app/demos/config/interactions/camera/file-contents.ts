export const cameraFileContents: Record<string, string> = {
  'src/app/demos/interactions/camera/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { CameraInteraction } from './components/CameraInteraction'
import { cameraFiles, cameraFeatures, cameraFileContents } from '../../config/interactions/camera'

export default function CameraDemo() {
  return (
    <DemoLayout 
      title="Camera Interaction Demo" 
      description="OrbitControlsとカメラ操作のインタラクションデモ"
      files={cameraFiles}
      features={cameraFeatures}
      fileContents={cameraFileContents}
    >
      <CameraInteraction />
    </DemoLayout>
  )
}`,

  'src/app/demos/interactions/camera/components/CameraInteraction.tsx': `'use client'

import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Cone } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'
import * as THREE from 'three'

export function CameraInteraction() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const [cameraInfo, setCameraInfo] = useState({
    position: new Vector3(),
    target: new Vector3()
  })

  // カメラ情報を毎フレーム更新
  useFrame(() => {
    if (controlsRef.current) {
      setCameraInfo({
        position: camera.position.clone(),
        target: controlsRef.current.target.clone()
      })
    }
  })

  // カメラを特定の位置に移動
  const moveCameraTo = (position: [number, number, number], target: [number, number, number] = [0, 0, 0]) => {
    if (controlsRef.current) {
      // カメラ位置をアニメーション付きで移動
      camera.position.set(...position)
      controlsRef.current.target.set(...target)
      controlsRef.current.update()
    }
  }

  return (
    <group>
      {/* 
        OrbitControls: マウス操作によるカメラ制御
        - enablePan: パン（平行移動）の有効/無効
        - enableZoom: ズームの有効/無効
        - enableRotate: 回転の有効/無効
        - minDistance/maxDistance: ズーム範囲の制限
        - minPolarAngle/maxPolarAngle: 垂直角度の制限
      */}
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />

      {/* 中央のメインオブジェクト */}
      <Box position={[0, 0, 0]} args={[1, 1, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#4f46e5" />
      </Box>

      {/* 周囲のオブジェクト群 - 空間の把握を助ける */}
      <Sphere position={[3, 0, 0]} args={[0.5]} castShadow receiveShadow>
        <meshStandardMaterial color="#ef4444" />
      </Sphere>

      <Cone position={[-3, 0, 0]} args={[0.5, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#10b981" />
      </Cone>

      <Box position={[0, 0, 3]} args={[0.8, 0.8, 0.8]} castShadow receiveShadow>
        <meshStandardMaterial color="#f59e0b" />
      </Box>

      <Sphere position={[0, 0, -3]} args={[0.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#8b5cf6" />
      </Sphere>

      <Box position={[0, 2, 0]} args={[0.6, 0.6, 0.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#ec4899" />
      </Box>

      {/* カメラ情報のリアルタイム表示 */}
      <Text 
        position={[0, -3, 0]} 
        fontSize={0.3} 
        color="white" 
        anchorX="center"
        anchorY="middle"
      >
        {\`Camera: (\${cameraInfo.position.x.toFixed(1)}, \${cameraInfo.position.y.toFixed(1)}, \${cameraInfo.position.z.toFixed(1)})\`}
      </Text>

      <Text 
        position={[0, -3.5, 0]} 
        fontSize={0.3} 
        color="white" 
        anchorX="center"
        anchorY="middle"
      >
        {\`Target: (\${cameraInfo.target.x.toFixed(1)}, \${cameraInfo.target.y.toFixed(1)}, \${cameraInfo.target.z.toFixed(1)})\`}
      </Text>

      {/* 
        プリセットビューボタン（3D空間内）
        - onClick: カメラ位置を変更
        - onPointerOver/Out: マウスホバー時のカーソル変更
      */}
      <group position={[0, -4.5, 0]}>
        <mesh 
          position={[-2, 0, 0]} 
          onClick={() => moveCameraTo([5, 5, 5], [0, 0, 0])}
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
          onPointerOut={(e) => (document.body.style.cursor = 'default')}
        >
          <boxGeometry args={[1, 0.3, 0.1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <Text position={[-2, 0, 0.1]} fontSize={0.15} color="white" anchorX="center">
          Front View
        </Text>

        <mesh 
          position={[0, 0, 0]} 
          onClick={() => moveCameraTo([0, 8, 0], [0, 0, 0])}
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
          onPointerOut={(e) => (document.body.style.cursor = 'default')}
        >
          <boxGeometry args={[1, 0.3, 0.1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.15} color="white" anchorX="center">
          Top View
        </Text>

        <mesh 
          position={[2, 0, 0]} 
          onClick={() => moveCameraTo([8, 0, 0], [0, 0, 0])}
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
          onPointerOut={(e) => (document.body.style.cursor = 'default')}
        >
          <boxGeometry args={[1, 0.3, 0.1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <Text position={[2, 0, 0.1]} fontSize={0.15} color="white" anchorX="center">
          Side View
        </Text>
      </group>

      {/* 操作説明テキスト */}
      <Text 
        position={[0, -5.5, 0]} 
        fontSize={0.2} 
        color="#9ca3af" 
        anchorX="center"
        anchorY="middle"
      >
        マウス: 回転 | ホイール: ズーム | 右クリック+ドラッグ: パン
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