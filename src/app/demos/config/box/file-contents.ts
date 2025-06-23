export const boxFileContents: Record<string, string> = {
  'src/app/demos/box/page.tsx': `'use client'

import { DemoLayout } from '../components/common'
import { BoxShape } from './components/BoxShape'
import { boxFiles, boxFeatures, boxFileContents } from '../config/box'

export default function BoxDemo() {
  return (
    <DemoLayout 
      title="Box Demo" 
      description="立方体の3D表示デモ"
      files={boxFiles}
      features={boxFeatures}
      fileContents={boxFileContents}
    >
      <BoxShape />
    </DemoLayout>
  )
}`,

  'src/app/demos/box/components/BoxShape.tsx': `'use client'

import { Text } from '@react-three/drei'

export function BoxShape() {
  return (
    <group>
      {/* 立方体メッシュ */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        {/* 
          boxGeometry: 立方体のジオメトリを作成
          args: [width, height, depth] - 幅、高さ、奥行き
        */}
        <boxGeometry args={[2, 2, 2]} />
        
        {/* 
          meshStandardMaterial: 物理ベースレンダリング対応マテリアル
          - ライティングに反応する
          - 影の描画をサポート
        */}
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      {/* ラベルテキスト */}
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Box (立方体)
      </Text>
    </group>
  )
}`,

  'src/app/demos/components/common/DemoLayout.tsx': `'use client'

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
              <FeatureSelector features={features} />
            </div>
            <div className="flex-1">
              <CodeViewer 
                features={features} 
                fileContents={fileContents} 
              />
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