'use client'

import { Text } from '@react-three/drei'
import { DemoLayout } from '../components/common'
import { FileNode, FeatureFile } from '../components/file-system'

function BoxShape() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Box (立方体)
      </Text>
    </group>
  )
}

// ファイル構造
const files: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'app',
        type: 'folder',
        children: [
          {
            name: 'demos',
            type: 'folder',
            children: [
              {
                name: 'box',
                type: 'folder',
                children: [
                  { name: 'page.tsx', type: 'file' }
                ]
              },
              {
                name: 'components',
                type: 'folder',
                children: [
                  { name: 'common.tsx', type: 'file' },
                  { name: 'file-system.tsx', type: 'file' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

// 機能一覧
const features: FeatureFile[] = [
  {
    id: 'box-geometry',
    name: 'Box Geometry',
    description: '立方体の3Dジオメトリ実装',
    files: ['src/app/demos/box/page.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/box/page.tsx',
        title: 'Box Implementation',
        description: 'boxGeometry と meshStandardMaterial を使用した立方体の実装',
        code: `// Box形状コンポーネント
function BoxShape() {
  return (
    <group>
      {/* 立方体メッシュ */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        {/* 
          boxGeometry: 立方体のジオメトリを作成
          args: [width, height, depth] - 幅、高さ、奥行き
        */
        <boxGeometry args={[2, 2, 2]} />
        
        {/* 
          meshStandardMaterial: 物理ベースレンダリング対応マテリアル
          - ライティングに反応する
          - 影の描画をサポート
        */}
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Box (立方体)
      </Text>
    </group>
  )
}`,
        highlightPatterns: [
          // JSXタグの開始を正確にマッチ
          '/^\\s*<boxGeometry/',           // 行頭のboxGeometry
          '/^\\s*<meshStandardMaterial/', // 行頭のmeshStandardMaterial
          '/castShadow(?!.*\\/\\*)/',     // コメント以外のcastShadow
          '/receiveShadow(?!.*\\/\\*)/'   // コメント以外のreceiveShadow
        ]
      }
    ]
  },
  {
    id: 'lighting',
    name: 'Lighting System',
    description: 'アンビエント・ディレクショナル・ポイントライト',
    files: ['src/app/demos/components/common.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/components/common.tsx',
        title: 'Lighting Configuration',
        description: '3種類のライト（環境光、指向性ライト、ポイントライト）の設定',
        code: `// ライティング設定
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
        highlightPatterns: [
          // ライティング関連のみ（影の設定は除外）
          '/^\\s*<ambientLight/',              // 環境光
          '/^\\s*<directionalLight/',          // 指向性ライト
          '/^\\s*<pointLight/',                // ポイントライト
          
          // ライトの基本属性のみ
          '/intensity=\\{[0-9.]+\\}/',         // intensity属性
          '/position=\\{\\[/',                 // position属性
          '/color="#[a-fA-F0-9]+"/'            // color属性
        ]
      }
    ]
  },
  {
    id: 'camera-controls',
    name: 'Camera & Controls',
    description: 'カメラ設定とOrbitControls',
    files: ['src/app/demos/components/common.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/components/common.tsx',
        title: 'Camera & Controls Setup',
        description: 'Canvas のカメラ設定と OrbitControls による操作設定',
        code: `// Canvas設定とカメラコントロール
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
</Canvas>`,
        highlightPatterns: [
          // Canvas タグとその重要な属性
          '/^\\s*<Canvas/',                    // Canvas開始タグ
          '/camera=\\{\\{/',                   // camera属性の開始
          '/position:\\s*\\[/',                // position配列
          '/fov:\\s*\\d+/',                    // fov数値
          '/shadows(?!.*\\/\\*)(?!.*\\/\\/)/', // コメント以外のshadows
          
          // OrbitControls とその属性
          '/^\\s*<OrbitControls/',             // OrbitControls開始タグ
          '/enablePan=\\{true\\}/',            // enablePan属性
          '/enableZoom=\\{true\\}/',           // enableZoom属性
          '/enableRotate=\\{true\\}/',         // enableRotate属性
          
          // gridHelper
          '/^\\s*<gridHelper/'                 // gridHelper開始タグ
        ]
      }
    ]
  },
  {
    id: 'materials',
    name: 'Materials',
    description: 'meshStandardMaterial設定',
    files: ['src/app/demos/box/page.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/box/page.tsx',
        title: 'Material Properties',
        description: 'meshStandardMaterial の各種プロパティ設定',
        code: `// meshStandardMaterial の設定例
<meshStandardMaterial 
  color="#ff6b6b"           // 基本色
  metalness={0.0}           // 金属感 (0.0 = 非金属, 1.0 = 金属)
  roughness={0.5}           // 表面の粗さ (0.0 = 鏡面, 1.0 = 完全拡散)
  transparent={false}       // 透明度の有効化
  opacity={1.0}             // 不透明度 (0.0 = 透明, 1.0 = 不透明)
  emissive="#000000"        // 発光色
  emissiveIntensity={0.0}   // 発光強度
/>

// 実際の使用例
<mesh position={[0, 0, 0]} castShadow receiveShadow>
  <boxGeometry args={[2, 2, 2]} />
  <meshStandardMaterial color="#ff6b6b" />
</mesh>`,
        highlightPatterns: [
          '/^\\s*<meshStandardMaterial/',      // meshStandardMaterial開始タグ
          '/color=/',                          // color属性
          '/metalness=/',                      // metalness属性
          '/roughness=/',                      // roughness属性
          '/transparent=/',                    // transparent属性
          '/opacity=/',                        // opacity属性
          '/emissive=/',                       // emissive属性
          '/emissiveIntensity=/'               // emissiveIntensity属性
        ]
      }
    ]
  },
  {
    id: 'shadows',
    name: 'Shadow System',
    description: '影の描画設定（複数ファイル）',
    files: ['src/app/demos/components/common.tsx', 'src/app/demos/box/page.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/components/common.tsx',
        title: 'Canvas & Light Shadow Setup',
        description: 'Canvas で影を有効化し、ライトで影を投影する設定',
        code: `// Canvas で影を有効化
<Canvas
  camera={{ position: [3, 3, 3], fov: 60 }}
  shadows  // 影の描画を有効化
  className="w-full h-full"
>
  <Lighting />
  {children}
  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
  <gridHelper args={[10, 10]} />
</Canvas>

// ライトで影を投影
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow                    // 影を投影
        shadow-mapSize-width={2048}   // 影の解像度（幅）
        shadow-mapSize-height={2048}  // 影の解像度（高さ）
      />
      <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={0.3} />
      <pointLight position={[10, -10, -10]} color="#0000ff" intensity={0.3} />
    </>
  )
}`,
        highlightPatterns: [
          // Canvas の影設定
          '/^\\s*shadows\\s*\\/\\/',               // Canvas のshadows属性
          
          // ライトの影関連属性のみ
          '/^\\s*castShadow(?!.*\\/\\*)/',         // castShadow属性行
          '/^\\s*shadow-mapSize-width/',           // shadow-mapSize-width属性行
          '/^\\s*shadow-mapSize-height/'           // shadow-mapSize-height属性行
        ]
      },
      {
        fileName: 'src/app/demos/box/page.tsx',
        title: 'Mesh Shadow Settings',
        description: 'メッシュで影の投影・受影を設定',
        code: `// メッシュで影の投影・受影を設定
function BoxShape() {
  return (
    <group>
      <mesh 
        position={[0, 0, 0]} 
        castShadow      // このメッシュが影を投影する
        receiveShadow   // このメッシュが影を受ける
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Box (立方体)
      </Text>
    </group>
  )
}

// 地面などで影を受ける場合の例
<mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
  <planeGeometry args={[10, 10]} />
  <meshStandardMaterial 
    color="#cccccc" 
    receiveShadow  // 地面が影を受ける
  />
</mesh>`,
        highlightPatterns: [
          // mesh タグの影関連属性のみ
          '/^\\s*castShadow(?=\\s*\\/\\/)/',       // castShadow属性（コメント付き）
          '/^\\s*receiveShadow(?=\\s*\\/\\/)/',    // receiveShadow属性（コメント付き）
          '/receiveShadow(?=\\s*\\/\\/.*地面)/'    // 地面のreceiveShadow
        ]
      }
    ]
  }
]

// ファイル内容
const fileContents: Record<string, string> = {
  'src/app/demos/box/page.tsx': `'use client'

import { Text } from '@react-three/drei'
import { DemoLayout } from '../components/common'

// Box形状コンポーネント
function BoxShape() {
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
}

export default function BoxDemo() {
  return (
    <DemoLayout 
      title="Box Demo" 
      description="立方体の3D表示デモ"
      files={files}
      features={features}
      fileContents={fileContents}
    >
      <BoxShape />
    </DemoLayout>
  )
}`,

  'src/app/demos/components/common.tsx': `'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// ライティング設定
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
}

// Canvas設定とカメラコントロール
export function DemoCanvas({ children }) {
  return (
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
  )
}`,

  'src/app/demos/components/file-system.tsx': `'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface FileNode {
  name: string
  type: 'file' | 'folder'
  content?: string
  language?: string
  children?: FileNode[]
}

export interface CodeSection {
  fileName: string
  title: string
  description: string
  code: string
  highlightPatterns?: string[]
  highlightLines?: number[]
}

export interface FeatureFile {
  id: string
  name: string
  description: string
  files: string[]
  codeSections?: CodeSection[]
  codeSnippet?: string
  highlightLines?: number[]
}

// ファイルエクスプローラー、機能選択、コードビューアの実装
// （実装内容は上記のfile-system.tsxと同じ）
...`
}

export default function BoxDemo() {
  return (
    <DemoLayout 
      title="Box Demo" 
      description="立方体の3D表示デモ"
      files={files}
      features={features}
      fileContents={fileContents}
    >
      <BoxShape />
    </DemoLayout>
  )
}

