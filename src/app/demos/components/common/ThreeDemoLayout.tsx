'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FileExplorer, FeatureSelector, CodeViewer } from '../file-system'
import { FileNode, FeatureFile } from '../../config/types'

export type ThreeSceneFactory = (canvas: HTMLCanvasElement) => () => void

interface ThreeDemoLayoutProps {
  title: string
  description: string
  files: FileNode[]
  features: FeatureFile[]
  fileContents: Record<string, string>
  createScene: ThreeSceneFactory
}

export function ThreeDemoLayout({
  title,
  description,
  files,
  features,
  fileContents,
  createScene,
}: ThreeDemoLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedFeature, setSelectedFeature] = useState<FeatureFile | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dispose = createScene(canvas)
    return () => {
      dispose()
    }
  }, [createScene])

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName)

    const relatedFeature = features.find((feature) =>
      feature.files.some((file) => file.includes(fileName) || fileName.includes(file))
    )

    if (relatedFeature) {
      setSelectedFeature(relatedFeature)
    }
  }

  const handleFeatureSelect = (feature: FeatureFile) => {
    setSelectedFeature(feature)
    if (feature.files.length > 0) {
      setSelectedFile(feature.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-900 min-h-full">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              href="/demos/three-fundamentals"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Three.js Fundamentals に戻る
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-300">{description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
            <div className="bg-gray-800 rounded-lg overflow-hidden min-h-[500px]">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

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
