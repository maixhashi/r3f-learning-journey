import { FeatureFile } from '../types'

export const boxFeatures: FeatureFile[] = [
  {
    id: 'box-geometry',
    name: 'Box Geometry',
    description: '立方体の3Dジオメトリ実装',
    files: ['src/app/demos/box/components/BoxShape.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/box/components/BoxShape.tsx',
        title: 'Box Implementation',
        description: 'boxGeometry と meshStandardMaterial を使用した立方体の実装',
        code: `// Box形状コンポーネント
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
      
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Box (立方体)
      </Text>
    </group>
  )
}`,
        highlightPatterns: [
          '/^\\s*<boxGeometry/',
          '/^\\s*<meshStandardMaterial/',
          '/castShadow(?!.*\\/\\*)/',
          '/receiveShadow(?!.*\\/\\*)/'
        ]
      }
    ]
  },
  {
    id: 'lighting',
    name: 'Lighting System',
    description: 'アンビエント・ディレクショナル・ポイントライト',
    files: ['src/app/demos/components/common/Lighting.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/components/common/Lighting.tsx',
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
          '/^\\s*<ambientLight/',
          '/^\\s*<directionalLight/',
          '/^\\s*<pointLight/',
          '/intensity=\\{[0-9.]+\\}/',
          '/position=\\{\\[/',
          '/color="#[a-fA-F0-9]+"/'
        ]
      }
    ]
  },
  {
    id: 'camera-controls',
    name: 'Camera & Controls',
    description: 'カメラ設定とOrbitControls',
    files: ['src/app/demos/components/common/DemoLayout.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/components/common/DemoLayout.tsx',
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
          '/^\\s*<Canvas/',
          '/camera=\\{\\{/',
          '/position:\\s*\\[/',
          '/fov:\\s*\\d+/',
          '/shadows(?!.*\\/\\*)(?!.*\\/\\/)/',
          '/^\\s*<OrbitControls/',
          '/enablePan=\\{true\\}/',
          '/enableZoom=\\{true\\}/',
          '/enableRotate=\\{true\\}/',
          '/^\\s*<gridHelper/'
        ]
      }
    ]
  },
  {
    id: 'materials',
    name: 'Materials',
    description: 'meshStandardMaterial設定',
    files: ['src/app/demos/box/components/BoxShape.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/box/components/BoxShape.tsx',
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
          '/^\\s*<meshStandardMaterial/',
          '/color=/',
          '/metalness=/',
          '/roughness=/',
          '/transparent=/',
          '/opacity=/',
          '/emissive=/',
          '/emissiveIntensity=/'
        ]
      }
    ]
  },
  {
    id: 'shadows',
    name: 'Shadow System',
    description: '影の描画設定（複数ファイル）',
    files: ['src/app/demos/components/common/DemoLayout.tsx', 'src/app/demos/box/components/BoxShape.tsx'],
    codeSections: [
      {
        fileName: 'src/app/demos/components/common/DemoLayout.tsx',
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
          '/^\\s*shadows\\s*\\/\\/',
          '/^\\s*castShadow(?!.*\\/\\*)/',
          '/^\\s*shadow-mapSize-width/',
          '/^\\s*shadow-mapSize-height/'
        ]
      },
      {
        fileName: 'src/app/demos/box/components/BoxShape.tsx',
        title: 'Mesh Shadow Settings',
        description: 'メッシュで影の投影・受影を設定',
        code: `// メッシュで影の投影・受影を設定
export function BoxShape() {
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
}`,
        highlightPatterns: [
          '/^\\s*castShadow(?=\\s*\\/\\/)/',
          '/^\\s*receiveShadow(?=\\s*\\/\\/)/'
        ]
      }
    ]
  }
]