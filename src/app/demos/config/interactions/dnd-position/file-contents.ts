export const dndPositionFileContents: Record<string, string> = {
  'src/app/demos/interactions/dnd-position/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { DndPositionInteraction } from './components/DndPositionInteraction'
import { dndPositionFiles, dndPositionFeatures, dndPositionFileContents } from '../../config/interactions/dnd-position'

export default function DndPositionDemo() {
  return (
    <DemoLayout 
      title="Drag & Drop Position Demo" 
      description="クリック&ドラッグによるオブジェクトの位置変更デモ"
      files={dndPositionFiles}
      features={dndPositionFeatures}
      fileContents={dndPositionFileContents}
    >
      <DndPositionInteraction />
    </DemoLayout>
  )
}`,

  'src/app/demos/interactions/dnd-position/components/DndPositionInteraction.tsx': `'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Vector3, Raycaster, Vector2 } from 'three'
import * as THREE from 'three'

interface DraggableObject {
  id: string
  position: Vector3
  color: string
  isDragging: boolean
}

export function DndPositionInteraction() {
  const { camera, gl, scene } = useThree()
  const [objects, setObjects] = useState<DraggableObject[]>([
    { id: 'box1', position: new Vector3(-2, 0, 0), color: '#ff6b6b', isDragging: false },
    { id: 'box2', position: new Vector3(0, 0, 0), color: '#4ecdc4', isDragging: false },
    { id: 'box3', position: new Vector3(2, 0, 0), color: '#45b7d1', isDragging: false }
  ])
  
  const [dragState, setDragState] = useState<{
    isDragging: boolean
    dragObjectId: string | null
    dragPlane: THREE.Plane | null
    offset: Vector3
  }>({
    isDragging: false,
    dragObjectId: null,
    dragPlane: null,
    offset: new Vector3()
  })

  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())
  const meshRefs = useRef<{ [key: string]: Mesh }>({})

  // マウス座標を正規化
  const updateMousePosition = (event: MouseEvent) => {
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  // オブジェクトとの交差判定
  const getIntersectedObject = () => {
    raycaster.current.setFromCamera(mouse.current, camera)
    const meshes = Object.values(meshRefs.current).filter(Boolean)
    const intersects = raycaster.current.intersectObjects(meshes)
    return intersects.length > 0 ? intersects[0] : null
  }

  // クリックハンドラー
  const handleClick = (event: MouseEvent) => {
    updateMousePosition(event)
    const intersect = getIntersectedObject()

    if (dragState.isDragging) {
      // ドロップ処理
      if (dragState.dragObjectId) {
        setObjects(prev => prev.map(obj => 
          obj.id === dragState.dragObjectId 
            ? { ...obj, isDragging: false }
            : obj
        ))
      }
      setDragState({
        isDragging: false,
        dragObjectId: null,
        dragPlane: null,
        offset: new Vector3()
      })
    } else if (intersect) {
      // ドラッグ開始
      const objectId = intersect.object.userData.id
      if (objectId) {
        // ドラッグ用の平面を作成（Y=0の水平面）
        const dragPlane = new THREE.Plane(new Vector3(0, 1, 0), 0)
        
        // オフセット計算
        const intersectPoint = new Vector3()
        raycaster.current.ray.intersectPlane(dragPlane, intersectPoint)
        const objectPosition = objects.find(obj => obj.id === objectId)?.position || new Vector3()
        const offset = objectPosition.clone().sub(intersectPoint)

        setObjects(prev => prev.map(obj => 
          obj.id === objectId 
            ? { ...obj, isDragging: true }
            : obj
        ))

        setDragState({
          isDragging: true,
          dragObjectId: objectId,
          dragPlane,
          offset
        })
      }
    }
  }

  // マウス移動ハンドラー
  const handleMouseMove = (event: MouseEvent) => {
    if (!dragState.isDragging || !dragState.dragObjectId || !dragState.dragPlane) return

    updateMousePosition(event)
    raycaster.current.setFromCamera(mouse.current, camera)
    
    const intersectPoint = new Vector3()
    if (raycaster.current.ray.intersectPlane(dragState.dragPlane, intersectPoint)) {
      const newPosition = intersectPoint.add(dragState.offset)
      
      setObjects(prev => prev.map(obj => 
        obj.id === dragState.dragObjectId 
          ? { ...obj, position: newPosition.clone() }
          : obj
      ))
    }
  }

  // イベントリスナーの設定
  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [dragState, objects])

  // カーソルスタイルの更新
  useFrame(() => {
    const canvas = gl.domElement
    if (dragState.isDragging) {
      canvas.style.cursor = 'grabbing'
    } else {
      const intersect = getIntersectedObject()
      canvas.style.cursor = intersect ? 'grab' : 'default'
    }
  })

  return (
    <group>
      {objects.map((obj) => (
        <group key={obj.id}>
          {/* ドラッグ可能なオブジェクト */}
          <mesh
            ref={(ref) => {
              if (ref) meshRefs.current[obj.id] = ref
            }}
            position={obj.position}
            userData={{ id: obj.id }}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={obj.color}
              opacity={obj.isDragging ? 0.7 : 1}
              transparent
            />
          </mesh>
          
          {/* オブジェクトのラベル */}
          <Text 
            position={[obj.position.x, obj.position.y - 1, obj.position.z]}
            fontSize={0.3}
            color="white"
            anchorX="center"
          >
            {obj.isDragging ? 'Dragging...' : 'Click to Drag'}
          </Text>
        </group>
      ))}
      
      {/* 説明テキスト */}
      <Text 
        position={[0, 3, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
      >
        Click objects to start dragging, click again to drop
      </Text>
      
      {/* グリッド平面（視覚的な参考用） */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#333333" transparent opacity={0.3} />
      </mesh>
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
              href="/demos/interactions" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              インタラクション一覧に戻る
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