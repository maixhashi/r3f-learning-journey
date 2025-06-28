export const raycastingFileContents: Record<string, string> = {
  'src/app/demos/interactions/raycasting/page.tsx': `'use client'

import { DemoLayout } from '../../components/common'
import { RaycastingDemo } from './components/RaycastingDemo'
import { raycastingFiles, raycastingFeatures, raycastingFileContents } from '../../config/interactions/raycasting'

export default function RaycastingDemoPage() {
  return (
    <DemoLayout 
      title="Raycasting Demo" 
      description="マウス位置からのレイキャストによる詳細な当たり判定のデモ"
      files={raycastingFiles}
      features={raycastingFeatures}
      fileContents={raycastingFileContents}
    >
      <RaycastingDemo />
    </DemoLayout>
  )
}`,

  'src/app/demos/interactions/raycasting/components/RaycastingDemo.tsx': `'use client'

import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Raycaster, Vector2, Vector3 } from 'three'

interface BoxState {
  id: number
  position: [number, number, number]
  color: string
  isHovered: boolean
  isClicked: boolean
  scale: number
}

export function RaycastingDemo() {
  const { camera, gl, scene } = useThree()
  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const [clickedObject, setClickedObject] = useState<string | null>(null)
  const [raycastInfo, setRaycastInfo] = useState<{
    distance: number
    point: Vector3
    objectName: string
  } | null>(null)

  // 複数のボックスの状態
  const [boxes] = useState<BoxState[]>([
    { id: 1, position: [-2, 0, 0], color: '#ff6b6b', isHovered: false, isClicked: false, scale: 1 },
    { id: 2, position: [0, 0, 0], color: '#4ecdc4', isHovered: false, isClicked: false, scale: 1 },
    { id: 3, position: [2, 0, 0], color: '#45b7d1', isHovered: false, isClicked: false, scale: 1 },
    { id: 4, position: [0, 2, 0], color: '#96ceb4', isHovered: false, isClicked: false, scale: 1 },
    { id: 5, position: [0, -2, 0], color: '#feca57', isHovered: false, isClicked: false, scale: 1 }
  ])

  const boxRefs = useRef<{ [key: number]: Mesh }>({})

  // マウス移動時のレイキャスト処理
  const handleMouseMove = (event: any) => {
    // マウス座標を正規化 (-1 to 1)
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // レイキャストを実行
    raycaster.current.setFromCamera(mouse.current, camera)
    
    // シーン内のメッシュオブジェクトと交差判定
    const meshes = Object.values(boxRefs.current).filter(Boolean)
    const intersects = raycaster.current.intersectObjects(meshes)

    // 全てのホバー状態をリセット
    setHoveredObject(null)
    setRaycastInfo(null)

    if (intersects.length > 0) {
      const intersect = intersects[0]
      const mesh = intersect.object as Mesh
      const boxId = mesh.userData.boxId
      
      setHoveredObject(\`box-\${boxId}\`)
      setRaycastInfo({
        distance: intersect.distance,
        point: intersect.point,
        objectName: \`Box \${boxId}\`
      })
    }
  }

  // クリック時の処理
  const handleClick = (event: any) => {
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.current.setFromCamera(mouse.current, camera)
    const meshes = Object.values(boxRefs.current).filter(Boolean)
    const intersects = raycaster.current.intersectObjects(meshes)

    if (intersects.length > 0) {
      const intersect = intersects[0]
      const mesh = intersect.object as Mesh
      const boxId = mesh.userData.boxId
      
      setClickedObject(\`box-\${boxId}\`)
      
      // 3秒後にクリック状態をリセット
      setTimeout(() => {
        setClickedObject(null)
      }, 3000)
    } else {
      setClickedObject(null)
    }
  }

  // アニメーション処理
  useFrame((state) => {
    boxes.forEach((box) => {
      const mesh = boxRefs.current[box.id]
      if (mesh) {
        const isHovered = hoveredObject === \`box-\${box.id}\`
        const isClicked = clickedObject === \`box-\${box.id}\`
        
        // ホバー時のスケールアニメーション
        const targetScale = isHovered ? 1.2 : (isClicked ? 1.4 : 1)
        mesh.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1)
        
        // クリック時の回転アニメーション
        if (isClicked) {
          mesh.rotation.y += 0.05
        }
        
        // 常時微細な浮遊アニメーション
        mesh.position.y = box.position[1] + Math.sin(state.clock.elapsedTime + box.id) * 0.1
      }
    })
  })

  return (
    <group
      onPointerMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* レイキャスト対象のボックス群 */}
      {boxes.map((box) => {
        const isHovered = hoveredObject === \`box-\${box.id}\`
        const isClicked = clickedObject === \`box-\${box.id}\`
        
        return (
          <mesh
            key={box.id}
            ref={(ref) => {
              if (ref) {
                boxRefs.current[box.id] = ref
                ref.userData.boxId = box.id
              }
            }}
            position={box.position}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={isClicked ? '#ff0000' : (isHovered ? '#ffffff' : box.color)}
              emissive={isHovered ? '#222222' : '#000000'}
            />
          </mesh>
        )
      })}

      {/* レイキャスト情報表示 */}
      {raycastInfo && (
        <group>
          <Text
            position={[0, 3.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
          >
            {\`\${raycastInfo.objectName} - Distance: \${raycastInfo.distance.toFixed(2)}\`}
          </Text>
          <Text
            position={[0, 3, 0]}
            fontSize={0.25}
            color="yellow"
            anchorX="center"
          >
            {\`Point: (\${raycastInfo.point.x.toFixed(1)}, \${raycastInfo.point.y.toFixed(1)}, \${raycastInfo.point.z.toFixed(1)})\`}
          </Text>
        </group>
      )}

      {/* 操作説明 */}
      <Text position={[0, -3.5, 0]} fontSize={0.3} color="white" anchorX="center">
        Hover: Scale Up | Click: Turn Red & Rotate
      </Text>
      
      {/* レイキャストの可視化（オプション） */}
      {raycastInfo && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                camera.position.x, camera.position.y, camera.position.z,
                raycastInfo.point.x, raycastInfo.point.y, raycastInfo.point.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#00ff00" opacity={0.5} transparent />
        </line>
      )}
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
