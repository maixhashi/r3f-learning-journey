'use client'

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
      {/* 背景色を確実に適用するためのラッパー */}
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
}