export const postprocessingFileContents: Record<string, string> = {
  'src/app/demos/library-integration/postprocessing/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { PostprocessingDemo } from './components/PostprocessingDemo'
import { postprocessingFiles, postprocessingFeatures, postprocessingFileContents } from '../../config/library-integration/postprocessing'

export default function PostprocessingDemoPage() {
  return (
    <DemoLayout 
      title="Postprocessing Effects Demo" 
      description="@react-three/postprocessingを使ったブルーム・グロー効果のデモ"
      files={postprocessingFiles}
      features={postprocessingFeatures}
      fileContents={postprocessingFileContents}
    >
      <PostprocessingDemo />
    </DemoLayout>
  )
}`,

  'src/app/demos/library-integration/postprocessing/components/PostprocessingDemo.tsx': `'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Box, Torus } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Mesh } from 'three'

export function PostprocessingDemo() {
  const sphereRef = useRef<Mesh>(null)
  const boxRef = useRef<Mesh>(null)
  const torusRef = useRef<Mesh>(null)
  
  // エフェクトの強度を制御する状態
  const [bloomIntensity, setBloomIntensity] = useState(1.5)
  const [chromaticAberrationOffset, setChromaticAberrationOffset] = useState(0.002)

  // アニメーション
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.5
      sphereRef.current.rotation.y += delta * 0.3
      sphereRef.current.position.y = Math.sin(time * 2) * 0.5
    }

    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 0.8
      boxRef.current.rotation.z += delta * 0.4
      boxRef.current.position.x = Math.cos(time * 1.5) * 2
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.6
      torusRef.current.rotation.y += delta * 0.9
      torusRef.current.position.z = Math.sin(time * 1.8) * 1.5
    }
  })

  return (
    <>
      {/* 3Dオブジェクト */}
      <group>
        {/* 発光する球体 */}
        <Sphere ref={sphereRef} args={[0.8]} position={[-2, 0, 0]}>
          <meshStandardMaterial 
            color="#ff6b6b" 
            emissive="#ff6b6b" 
            emissiveIntensity={0.5}
          />
        </Sphere>

        {/* 発光する立方体 */}
        <Box ref={boxRef} args={[1.2, 1.2, 1.2]} position={[2, 0, 0]}>
          <meshStandardMaterial 
            color="#4ecdc4" 
            emissive="#4ecdc4" 
            emissiveIntensity={0.3}
          />
        </Box>

        {/* 発光するトーラス */}
        <Torus ref={torusRef} args={[0.8, 0.3, 16, 32]} position={[0, 2, 0]}>
          <meshStandardMaterial 
            color="#ffe66d" 
            emissive="#ffe66d" 
            emissiveIntensity={0.4}
          />
        </Torus>

        {/* 背景の非発光オブジェクト */}
        <Sphere args={[0.5]} position={[0, -2, -2]}>
          <meshStandardMaterial color="#666666" />
        </Sphere>

        {/* ラベルテキスト */}
        <Text 
          position={[0, -3.5, 0]} 
          fontSize={0.4} 
          color="white" 
          anchorX="center"
        >
          Postprocessing Effects Demo
        </Text>
      </group>

      {/* ポストプロセッシングエフェクト */}
      <EffectComposer>
        {/* ブルーム効果 - 発光オブジェクトを光らせる */}
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
          blendFunction={BlendFunction.ADD}
        />
        
        {/* 色収差効果 - レンズの歪みを模擬 */}
        <ChromaticAberration
          offset={[chromaticAberrationOffset, chromaticAberrationOffset]}
          blendFunction={BlendFunction.NORMAL}
        />
        
        {/* ビネット効果 - 画面端を暗くする */}
        <Vignette
          eskil={false}
          offset={0.1}
          darkness={0.5}
          blendFunction={BlendFunction.MULTIPLY}
        />
      </EffectComposer>
    </>
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
