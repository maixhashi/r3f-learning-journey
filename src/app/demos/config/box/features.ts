import { FeatureFile } from '../types'

export const boxFeatures: FeatureFile[] = [
  {
    id: 'basic-box',
    name: "基本的な立方体",
    description: "boxGeometryとmeshStandardMaterialを使用した基本的な立方体の作成",
    files: ["src/app/demos/box/components/BoxShape.tsx"],
    codeSections: [
      {
        title: "立方体の作成",
        description: "Three.jsの基本的なジオメトリとマテリアルを使用",
        fileName: "BoxShape.tsx",
        code: `export function BoxShape() {
  return (
    <group>
      {/* 立方体メッシュ */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Box (立方体)
      </Text>
    </group>
  )
}`,
        highlights: [
          {
            id: "boxgeometry",
            startLine: 6,
            endLine: 6,
            startColumn: 8,
            endColumn: 40,
            tooltip: {
              title: "boxGeometry",
              description: "立方体のジオメトリを作成します。args配列で [幅, 高さ, 奥行き] を指定できます。ジオメトリは3Dオブジェクトの形状を定義する要素です。",
              documentationUrl: "https://threejs.org/docs/#api/en/geometries/BoxGeometry"
            }
          },
          {
            id: "material",
            startLine: 7,
            endLine: 7,
            startColumn: 8,
            endColumn: 50,
            tooltip: {
              title: "meshStandardMaterial",
              description: "物理ベースレンダリング（PBR）対応のマテリアルです。ライティングに反応し、リアルな質感を表現できます。影の描画もサポートしています。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'lighting-setup',
    name: "ライティング設定",
    description: "立方体を照らすための光源設定",
    files: ["src/app/demos/components/common/Lighting.tsx"],
    codeSections: [
      {
        title: "環境光と指向性ライト",
        description: "基本的な照明設定で立体感を演出",
        fileName: "Lighting.tsx",
        code: `export function Lighting() {
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
}`,
        highlights: [
          {
            id: "ambient",
            startLine: 4,
            endLine: 4,
            startColumn: 6,
            endColumn: 40,
            tooltip: {
              title: "ambientLight",
              description: "環境光は全体を均等に照らします。影のコントラストを調整し、暗すぎる部分を明るくする役割があります。",
              documentationUrl: "https://threejs.org/docs/#api/en/lights/AmbientLight"
            }
          },
          {
            id: "directional",
            startLine: 5,
            endLine: 10,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "directionalLight",
              description: "指向性ライトは太陽光のような平行光です。影を生成する主要光源として使用され、position で光の方向を決定します。",
              documentationUrl: "https://threejs.org/docs/#api/en/lights/DirectionalLight"
            }
          },
          {
            id: "point",
            startLine: 11,
            endLine: 12,
            startColumn: 6,
            endColumn: 80,
            tooltip: {
              title: "pointLight",
              description: "ポイントライトは電球のような点光源です。色付きの補助照明として使用し、シーンに色彩豊かな雰囲気を演出できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/lights/PointLight"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'camera-controls',
    name: "カメラとコントロール",
    description: "3Dシーンの表示とインタラクション設定",
    files: ["src/app/demos/components/common/DemoLayout.tsx"],
    codeSections: [
      {
        title: "Canvas設定",
        description: "カメラ位置と影の描画設定",
        fileName: "DemoLayout.tsx",
        code: `<Canvas
  camera={{ 
    position: [3, 3, 3],  // カメラの初期位置
    fov: 60               // 視野角（Field of View）
  }}
  shadows                 // 影の描画を有効化
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
</Canvas>`,
        highlights: [
          {
            id: "camera",
            startLine: 2,
            endLine: 5,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "Camera設定",
              description: "カメラの初期位置[x, y, z]と視野角を設定します。position は3D空間でのカメラの位置、fov は視野の広さを度数で指定します。",
              documentationUrl: "https://threejs.org/docs/#api/en/cameras/PerspectiveCamera"
            }
          },
          {
            id: "controls",
            startLine: 11,
            endLine: 15,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "OrbitControls",
              description: "マウス操作でカメラを制御できます。enablePan（平行移動）、enableZoom（ズーム）、enableRotate（回転）で操作を制限できます。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls"
            }
          }
        ]
      }
    ]
  }
]