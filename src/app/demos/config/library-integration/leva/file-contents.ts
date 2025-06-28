export const levaFileContents: Record<string, string> = {
  'src/app/demos/library-integration/leva/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { LevaControlDemo } from './components/LevaControlDemo'
import { levaFiles, levaFeatures, levaFileContents } from '../../config/library-integration/leva'

export default function LevaDemo() {
  return (
    <DemoLayout 
      title="Leva GUI Control Demo" 
      description="Levaライブラリを使用したリアルタイムGUIコントロールのデモ"
      files={levaFiles}
      features={levaFeatures}
      fileContents={levaFileContents}
    >
      <LevaControlDemo />
    </DemoLayout>
  )
}`,

  'src/app/demos/library-integration/leva/components/LevaControlDemo.tsx': `'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box, Sphere, Cone } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'
import { useControls, folder } from 'leva'

export function LevaControlDemo() {
  const boxRef = useRef<Mesh>(null)
  const sphereRef = useRef<Mesh>(null)
  const coneRef = useRef<Mesh>(null)

  // Leva GUI Controls - 包括的なパラメータ制御
  const {
    // オブジェクト制御
    objectType,
    position,
    rotation,
    scale,
    color,
    wireframe,
    
    // アニメーション制御
    enableAnimation,
    rotationSpeed,
    bounceHeight,
    bounceSpeed,
    
    // ライティング制御
    ambientIntensity,
    directionalIntensity,
    directionalPosition,
    
    // カメラ制御
    autoRotateCamera,
    cameraSpeed,
  } = useControls({
    // オブジェクト設定フォルダ
    'Object Settings': folder({
      objectType: {
        value: 'box',
        options: ['box', 'sphere', 'cone']
      },
      position: {
        value: [0, 0, 0],
        step: 0.1
      },
      rotation: {
        value: [0, 0, 0],
        step: 0.1
      },
      scale: {
        value: 1,
        min: 0.1,
        max: 3,
        step: 0.1
      },
      color: '#ff6b6b',
      wireframe: false,
    }),
    
    // アニメーション設定フォルダ
    'Animation Settings': folder({
      enableAnimation: true,
      rotationSpeed: {
        value: 1,
        min: 0,
        max: 5,
        step: 0.1
      },
      bounceHeight: {
        value: 1,
        min: 0,
        max: 3,
        step: 0.1
      },
      bounceSpeed: {
        value: 2,
        min: 0.1,
        max: 5,
        step: 0.1
      },
    }),
    
    // ライティング設定フォルダ
    'Lighting Settings': folder({
      ambientIntensity: {
        value: 0.4,
        min: 0,
        max: 2,
        step: 0.1
      },
      directionalIntensity: {
        value: 1,
        min: 0,
        max: 3,
        step: 0.1
      },
      directionalPosition: {
        value: [10, 10, 5],
        step: 1
      },
    }),
    
    // カメラ設定フォルダ
    'Camera Settings': folder({
      autoRotateCamera: false,
      cameraSpeed: {
        value: 0.5,
        min: 0.1,
        max: 2,
        step: 0.1
      },
    })
  })

  // アニメーションループ - Levaの値を使用したリアルタイム制御
  useFrame((state, delta) => {
    if (!enableAnimation) return

    const time = state.clock.elapsedTime

    // 現在アクティブなオブジェクトを取得
    let currentMesh: Mesh | null = null
    if (objectType === 'box' && boxRef.current) currentMesh = boxRef.current
    if (objectType === 'sphere' && sphereRef.current) currentMesh = sphereRef.current
    if (objectType === 'cone' && coneRef.current) currentMesh = coneRef.current

    if (currentMesh) {
      // 回転アニメーション（Levaの rotationSpeed を使用）
      currentMesh.rotation.x += delta * rotationSpeed
      currentMesh.rotation.y += delta * rotationSpeed * 0.7
      
      // バウンスアニメーション（Levaの bounceHeight と bounceSpeed を使用）
      const bounceOffset = Math.sin(time * bounceSpeed) * bounceHeight
      currentMesh.position.y = position[1] + bounceOffset
    }

    // カメラの自動回転（Levaの autoRotateCamera と cameraSpeed を使用）
    if (autoRotateCamera) {
      state.camera.position.x = Math.cos(time * cameraSpeed) * 5
      state.camera.position.z = Math.sin(time * cameraSpeed) * 5
      state.camera.lookAt(0, 0, 0)
    }
  })

  return (
    <group>
      {/* 動的ライティング - Levaの値で制御 */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight 
        position={directionalPosition as [number, number, number]} 
        intensity={directionalIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Box - Levaの objectType で条件付きレンダリング */}
      {objectType === 'box' && (
        <Box
          ref={boxRef}
          position={[position[0], position[1], position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
          scale={scale}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial 
            color={color} 
            wireframe={wireframe}
          />
        </Box>
      )}

      {/* Sphere - Levaの objectType で条件付きレンダリング */}
      {objectType === 'sphere' && (
        <Sphere
          ref={sphereRef}
          position={[position[0], position[1], position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
          scale={scale}
          args={[1, 32, 32]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial 
            color={color} 
            wireframe={wireframe}
          />
        </Sphere>
      )}

      {/* Cone - Levaの objectType で条件付きレンダリング */}
      {objectType === 'cone' && (
        <Cone
          ref={coneRef}
          position={[position[0], position[1], position[2]]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
          scale={scale}
          args={[1, 2, 8]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial 
            color={color} 
            wireframe={wireframe}
          />
        </Cone>
      )}

      {/* Ground plane - 影を受ける地面 */}
      <mesh 
        position={[0, -2, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Label - 動的テキスト */}
      <Text 
        position={[0, -3.5, 0]} 
        fontSize={0.5} 
        color="white" 
        anchorX="center"
      >
        {\`\${objectType.charAt(0).toUpperCase() + objectType.slice(1)} with Leva Controls\`}
      </Text>
    </group>
  )
}`,

  'src/app/demos/components/common/DemoLayout.tsx': `'use client'

import { useState } from 'react'
import Link from 'next.js'
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
}`
}
