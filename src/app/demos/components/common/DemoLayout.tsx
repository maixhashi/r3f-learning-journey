'use client'

import { useState } from 'react'
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-300">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* 3D Canvas */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
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
          <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FileExplorer files={files} />
              <FeatureSelector 
                features={features} 
                onFeatureSelect={setSelectedFeature}
              />
            </div>
            <div className="flex-1">
              <CodeViewer 
                features={features} 
                fileContents={fileContents} 
                selectedFeature={selectedFeature}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}