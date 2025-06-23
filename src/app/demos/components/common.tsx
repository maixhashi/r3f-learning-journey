'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { FileExplorer, FeatureSelector, CodeViewer, FileNode, FeatureFile, CodeSection } from './file-system'

// 共通ライティング設定
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
}

// ファイル内容を取得する関数
function getFileContent(fileName: string, fileContents: Record<string, string>): string {
  return fileContents[fileName] || '// File content not available'
}

// 共通レイアウト
export function DemoLayout({ 
  title, 
  description, 
  children,
  files,
  features,
  fileContents
}: { 
  title: string
  description: string
  children: ReactNode
  files: FileNode[]
  features: FeatureFile[]
  fileContents: Record<string, string>
}) {
  const [showCode, setShowCode] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<FeatureFile | null>(null)
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'files' | 'features'>('features')

  const handleFeatureSelect = (feature: FeatureFile) => {
    setSelectedFeature(feature)
    setSelectedSectionIndex(0) // 最初のセクションを選択
    setSelectedFile(`feature:${feature.id}`)
  }

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName)
    setSelectedFeature(null)
    setSelectedSectionIndex(0)
  }

  const handleTabChange = (tab: 'files' | 'features') => {
    setActiveTab(tab)
    setSelectedFile(null)
    setSelectedFeature(null)
    setSelectedSectionIndex(0)
  }

  const handleCodeToggle = () => {
    const newShowCode = !showCode
    setShowCode(newShowCode)
    
    if (!newShowCode) {
      setSelectedFile(null)
      setSelectedFeature(null)
      setSelectedSectionIndex(0)
      setActiveTab('features')
    }
  }

  const handleSectionSelect = (index: number) => {
    setSelectedSectionIndex(index)
  }

  // 表示するコンテンツを決定
  const getDisplayContent = () => {
    if (!selectedFile) {
      return {
        content: `Select a ${activeTab === 'features' ? 'feature' : 'file'} to view code`,
        fileName: null,
        highlightLines: undefined,
        description: undefined,
        sections: undefined,
        selectedSection: undefined
      }
    }

    // 機能特化のコードスニペットを表示
    if (selectedFile.startsWith('feature:') && selectedFeature) {
      // 複数のコードセクションがある場合
      if (selectedFeature.codeSections && selectedFeature.codeSections.length > 0) {
        const currentSection = selectedFeature.codeSections[selectedSectionIndex]
        return {
          content: currentSection.code,
          fileName: `${selectedFeature.name} - ${currentSection.title}`,
          highlightLines: currentSection.highlightLines,
          description: currentSection.description,
          sections: selectedFeature.codeSections,
          selectedSection: selectedSectionIndex
        }
      }
      
      // 単一のコードスニペットの場合（後方互換性）
      return {
        content: selectedFeature.codeSnippet || 'No code snippet available',
        fileName: `${selectedFeature.name} - Code Example`,
        highlightLines: selectedFeature.highlightLines,
        description: undefined,
        sections: undefined,
        selectedSection: undefined
      }
    }

    // 通常のファイル内容を表示
    return {
      content: getFileContent(selectedFile, fileContents),
      fileName: selectedFile,
      highlightLines: undefined,
      description: undefined,
      sections: undefined,
      selectedSection: undefined
    }
  }

  const displayContent = getDisplayContent()

  return (
    <main className="w-full h-screen bg-gradient-to-br from-gray-900 to-black relative flex">
      {/* メインコントロールパネル */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm p-4 rounded-lg text-white shadow-lg">
        <Link 
          href="/demos" 
          className="text-blue-400 hover:text-blue-300 text-sm mb-2 block transition-colors"
        >
          ← Back to Demos
        </Link>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-300 mb-2">
          {description}
        </p>
        <p className="text-xs text-gray-400 mb-3">
          マウスで回転・ズーム可能
        </p>
        <button
          onClick={handleCodeToggle}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          {showCode ? 'Hide Code' : 'Show Code'}
        </button>
      </div>

      {/* 3Dビューエリア */}
      <div className={`transition-all duration-300 ${showCode ? 'w-1/2' : 'w-full'} h-full`}>
        <Canvas
          camera={{ position: [3, 3, 3], fov: 60 }}
          shadows
          className="w-full h-full"
        >
          <Lighting />
          {children}
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <gridHelper args={[10, 10]} />
        </Canvas>
      </div>

      {/* コードパネル */}
      {showCode && (
        <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-900 border-l border-gray-700 z-20 flex flex-col">
          
          {/* パネルヘッダー */}
          <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
            <h3 className="text-white font-bold">Code Explorer</h3>
            <button
              onClick={handleCodeToggle}
              className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* タブ */}
          <div className="flex bg-gray-800 border-b border-gray-700">
            <button
              onClick={() => handleTabChange('features')}
              className={`px-4 py-2 text-sm transition-colors ${
                activeTab === 'features' 
                  ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => handleTabChange('files')}
              className={`px-4 py-2 text-sm transition-colors ${
                activeTab === 'files' 
                  ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Files
            </button>
          </div>

          {/* コンテンツエリア */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* サイドバー */}
            <div className="h-1/3 border-b border-gray-700 overflow-hidden">
              {activeTab === 'features' && (
                <FeatureSelector 
                  features={features}
                  onFeatureSelect={handleFeatureSelect}
                  selectedFeature={selectedFeature?.id}
                />
              )}
              {activeTab === 'files' && (
                <FileExplorer 
                  files={files}
                  selectedFile={selectedFile?.startsWith('feature:') ? null : selectedFile}
                  onFileSelect={handleFileSelect}
                />
              )}
            </div>

            {/* コードビューア */}
            <div className="flex-1">
              <CodeViewer 
                fileName={displayContent.fileName}
                content={displayContent.content}
                highlightLines={displayContent.highlightLines}
                description={displayContent.description}
                sections={displayContent.sections}
                selectedSection={displayContent.selectedSection}
                onSectionSelect={displayContent.sections ? handleSectionSelect : undefined}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
