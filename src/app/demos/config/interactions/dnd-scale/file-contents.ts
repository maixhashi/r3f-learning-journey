export const dndScaleFileContents: Record<string, string> = {
  'src/app/demos/interactions/dnd-scale/page.tsx': `'use client'

import { DemoLayoutWithControls } from '../../components/common/DemoLayoutWithControls'
import { DndScaleInteractionWithControls } from './components/DndScaleInteractionWithControls'
import { dndScaleFiles, dndScaleFeatures, dndScaleFileContents } from '../../config/interactions/dnd-scale'

export default function DndScaleDemo() {
  return (
    <DemoLayoutWithControls 
      title="Drag & Drop Scale Demo" 
      description="ドラッグアンドドロップによるオブジェクトの寸法変更デモ"
      files={dndScaleFiles}
      features={dndScaleFeatures}
      fileContents={dndScaleFileContents}
      backLink="/demos/interactions"
      backLinkText="インタラクション一覧に戻る"
    >
      <DndScaleInteractionWithControls />
    </DemoLayoutWithControls>
  )
}`,

  'src/app/demos/interactions/dnd-scale/components/DndScaleInteractionWithControls.tsx': `'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'
import { useCameraControl } from '../../../components/common/DemoLayoutWithControls'

interface DragState {
  isDragging: boolean
  startPosition: Vector3
  startScale: Vector3
  object: Mesh | null
}

export function DndScaleInteractionWithControls() {
  const boxRef = useRef<Mesh>(null)
  const sphereRef = useRef<Mesh>(null)
  const cylinderRef = useRef<Mesh>(null)
  
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startPosition: new Vector3(),
    startScale: new Vector3(),
    object: null
  })
  
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const { gl } = useThree()
  const { setEnableControls } = useCameraControl()

  // ドラッグ状態が変わったときにカメラ操作を制御
  useEffect(() => {
    setEnableControls(!dragState.isDragging)
  }, [dragState.isDragging, setEnableControls])

  // マウス位置から正規化座標を計算
  const getMousePosition = useCallback((event: any) => {
    const rect = gl.domElement.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    return new Vector3(x, y, 0)
  }, [gl])

  // オブジェクトクリック時の処理
  const handleObjectClick = useCallback((event: any, objectRef: React.RefObject<Mesh>, objectName: string) => {
    event.stopPropagation()
    
    if (!objectRef.current) return

    if (dragState.isDragging && dragState.object === objectRef.current) {
      // ドロップ処理
      setDragState({
        isDragging: false,
        startPosition: new Vector3(),
        startScale: new Vector3(),
        object: null
      })
    } else {
      // ドラッグ開始処理
      const mousePos = getMousePosition(event)
      setDragState({
        isDragging: true,
        startPosition: mousePos.clone(),
        startScale: objectRef.current.scale.clone(),
        object: objectRef.current
      })
    }
  }, [dragState, getMousePosition])

  // マウス移動時の処理
  const handlePointerMove = useCallback((event: any) => {
    if (!dragState.isDragging || !dragState.object) return

    event.stopPropagation()
    
    const currentMousePos = getMousePosition(event)
    const deltaX = currentMousePos.x - dragState.startPosition.x
    const deltaY = currentMousePos.y - dragState.startPosition.y
    
    // 距離に基づいてスケールを計算
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const scaleFactor = Math.max(0.1, 1 + distance * 2) // 最小スケール0.1
    
    // 均等にスケール変更
    dragState.object.scale.setScalar(scaleFactor)
  }, [dragState, getMousePosition])

  // 背景クリック時の処理
  const handleBackgroundClick = useCallback((event: any) => {
    if (dragState.isDragging) {
      // ドラッグモード中は背景クリックでドロップ
      setDragState({
        isDragging: false,
        startPosition: new Vector3(),
        startScale: new Vector3(),
        object: null
      })
    }
  }, [dragState.isDragging])

  return (
    <group>
      {/* 背景用の大きな平面（ドラッグモード時のドロップ検出用） */}
      <mesh
        position={[0, 0, -5]}
        onClick={handleBackgroundClick}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 立方体 */}
      <mesh
        ref={boxRef}
        position={[-3, 0, 0]}
        castShadow
        receiveShadow
        onClick={(e) => handleObjectClick(e, boxRef, 'box')}
        onPointerOver={() => setHoveredObject('box')}
        onPointerOut={() => setHoveredObject(null)}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hoveredObject === 'box' ? '#ff8888' : '#ff6b6b'}
          emissive={dragState.object === boxRef.current ? '#440000' : '#000000'}
        />
      </mesh>

      {/* 球体 */}
      <mesh
        ref={sphereRef}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        onClick={(e) => handleObjectClick(e, sphereRef, 'sphere')}
        onPointerOver={() => setHoveredObject('sphere')}
        onPointerOut={() => setHoveredObject(null)}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color={hoveredObject === 'sphere' ? '#88ff88' : '#6bff6b'}
          emissive={dragState.object === sphereRef.current ? '#004400' : '#000000'}
        />
      </mesh>

      {/* 円柱 */}
      <mesh
        ref={cylinderRef}
        position={[3, 0, 0]}
        castShadow
        receiveShadow
        onClick={(e) => handleObjectClick(e, cylinderRef, 'cylinder')}
        onPointerOver={() => setHoveredObject('cylinder')}
        onPointerOut={() => setHoveredObject(null)}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <cylinderGeometry args={[0.6, 0.6, 1.5, 32]} />
        <meshStandardMaterial 
          color={hoveredObject === 'cylinder' ? '#8888ff' : '#6b6bff'}
          emissive={dragState.object === cylinderRef.current ? '#000044' : '#000000'}
        />
      </mesh>

      {/* 説明テキスト */}
      <Text position={[0, -3, 0]} fontSize={0.4} color="white" anchorX="center">
        {dragState.isDragging 
          ? "ドラッグして寸法変更 | クリックでドロップ"
          : "オブジェクトをクリックしてドラッグモード開始"
        }
      </Text>

      {/* 操作説明 */}
      <Text position={[0, -4, 0]} fontSize={0.25} color="gray" anchorX="center">
        クリック → ドラッグで寸法変更 → クリックで確定
      </Text>

      {/* ドラッグ状態インジケーター */}
      {dragState.isDragging && (
        <Text position={[0, 3, 0]} fontSize={0.3} color="yellow" anchorX="center">
          🎯 ドラッグモード中 (カメラ操作無効)
        </Text>
      )}
    </group>
  )
}`,

  'src/app/demos/components/common/DemoLayoutWithControls.tsx': `'use client'

import { useState, createContext, useContext } from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Lighting } from './Lighting'
import { FileExplorer, FeatureSelector, CodeViewer } from '../file-system'
import { FileNode, FeatureFile } from '../../config/types'

// カメラ操作の制御用コンテキスト
const CameraControlContext = createContext<{
  enableControls: boolean
  setEnableControls: (enable: boolean) => void
}>({
  enableControls: true,
  setEnableControls: () => {}
})

export const useCameraControl = () => useContext(CameraControlContext)

interface DemoLayoutWithControlsProps {
  title: string
  description: string
  files: FileNode[]
  features: FeatureFile[]
  fileContents: Record<string, string>
  children: React.ReactNode
  backLink?: string
  backLinkText?: string
}

export function DemoLayoutWithControls({ 
  title, 
  description, 
  files, 
  features, 
  fileContents, 
  children,
  backLink = "/demos",
  backLinkText = "デモ一覧に戻る"
}: DemoLayoutWithControlsProps) {
  const [selectedFeature, setSelectedFeature] = useState<FeatureFile | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [enableControls, setEnableControls] = useState(true)

  return (
    <CameraControlContext.Provider value={{ enableControls, setEnableControls }}>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-900 min-h-full">
          <div className="container mx-auto px-4 py-8">
            {/* ナビゲーション */}
            <div className="mb-6">
              <Link 
                href={backLink}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {backLinkText}
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
                    enabled={enableControls}
                    enablePan={enableControls} 
                    enableZoom={enableControls} 
                    enableRotate={enableControls} 
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
    </CameraControlContext.Provider>
  )
}`
}