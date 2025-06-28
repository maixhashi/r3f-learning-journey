import { FeatureFile } from '../../../types'

export const levaFeatures: FeatureFile[] = [
  {
    id: 'leva-basic-controls',
    name: "Leva基本コントロール",
    description: "Levaライブラリを使用した基本的なGUIコントロールの実装",
    files: ["src/app/demos/library-integration/leva/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "useControlsフックの基本使用法",
        description: "Levaのメインフックを使用してGUIコントロールを作成",
        fileName: "LevaControlDemo.tsx",
        code: `import { useControls, folder } from 'leva'

export function LevaControlDemo() {
  // Leva GUI Controls
  const {
    objectType,
    position,
    rotation,
    scale,
    color,
    wireframe,
    enableAnimation,
    rotationSpeed,
  } = useControls({
    // オブジェクト設定
    'Object Settings': folder({
      objectType: {
        value: 'box',
        options: ['box', 'sphere', 'cone']
      },
      position: {
        value: [0, 0, 0],
        step: 0.1
      },
      scale: {
        value: 1,
        min: 0.1,
        max: 3,
        step: 0.1
      },
      color: '#ff6b6b',
      wireframe: false,
    }),
    
    // アニメーション設定
    'Animation Settings': folder({
      enableAnimation: true,
      rotationSpeed: {
        value: 1,
        min: 0,
        max: 5,
        step: 0.1
      },
    })
  })`,
        highlights: [
          {
            id: "usecontrols",
            startLine: 4,
            endLine: 4,
            startColumn: 2,
            endColumn: 15,
            tooltip: {
              title: "useControls",
              description: "Levaのメインフックで、GUIコントロールを作成し、リアルタイムで値を取得できます。",
              documentationUrl: "https://github.com/pmndrs/leva#usecontrols",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/getting-started"
            }
          },
          {
            id: "folder",
            startLine: 13,
            endLine: 13,
            startColumn: 6,
            endColumn: 12,
            tooltip: {
              title: "folder",
              description: "関連するコントロールをグループ化して整理するためのLeva機能です。",
              documentationUrl: "https://github.com/pmndrs/leva#folder",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/advanced/folders"
            }
          },
          {
            id: "options",
            startLine: 16,
            endLine: 16,
            startColumn: 8,
            endColumn: 40,
            tooltip: {
              title: "options",
              description: "ドロップダウンメニューを作成するためのLeva設定です。配列で選択肢を指定します。",
              documentationUrl: "https://github.com/pmndrs/leva#select",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/inputs#select"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'leva-input-types',
    name: "Leva入力タイプ",
    description: "様々な種類のLeva入力コントロールの使用方法",
    files: ["src/app/demos/library-integration/leva/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "多様な入力タイプの実装",
        description: "数値、ベクター、色、ブール値など様々な入力タイプの設定",
        fileName: "LevaControlDemo.tsx",
        code: `const controls = useControls({
  // 数値入力（範囲指定）
  scale: {
    value: 1,
    min: 0.1,
    max: 3,
    step: 0.1
  },
  
  // ベクター入力（3D座標）
  position: {
    value: [0, 0, 0],
    step: 0.1
  },
  
  // 色選択
  color: '#ff6b6b',
  
  // ブール値（チェックボックス）
  wireframe: false,
  enableAnimation: true,
  
  // 選択肢（ドロップダウン）
  objectType: {
    value: 'box',
    options: ['box', 'sphere', 'cone']
  },
  
  // 範囲付き数値（スライダー）
  rotationSpeed: {
    value: 1,
    min: 0,
    max: 5,
    step: 0.1
  },
  
  // 配列入力（ライト位置など）
  directionalPosition: {
    value: [10, 10, 5],
    step: 1
  }
})`,
        highlights: [
          {
            id: "number-input",
            startLine: 2,
            endLine: 7,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "数値入力",
              description: "min、max、stepを指定して数値の範囲と刻み幅を制御できます。スライダーとして表示されます。",
              documentationUrl: "https://github.com/pmndrs/leva#number",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/inputs#number"
            }
          },
          {
            id: "vector-input",
            startLine: 9,
            endLine: 13,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "ベクター入力",
              description: "配列形式で3D座標やRGB値などの複数値を一度に制御できます。",
              documentationUrl: "https://github.com/pmndrs/leva#vector",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/inputs#vector"
            }
          },
          {
            id: "color-input",
            startLine: 15,
            endLine: 16,
            startColumn: 2,
            endColumn: 20,
            tooltip: {
              title: "色入力",
              description: "カラーピッカーを表示して色を選択できます。HEX、RGB、HSL形式をサポートします。",
              documentationUrl: "https://github.com/pmndrs/leva#color",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/inputs#color"
            }
          },
          {
            id: "boolean-input",
            startLine: 18,
            endLine: 20,
            startColumn: 2,
            endColumn: 25,
            tooltip: {
              title: "ブール値入力",
              description: "チェックボックスとして表示され、true/falseの切り替えができます。",
              documentationUrl: "https://github.com/pmndrs/leva#boolean",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/inputs#boolean"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'leva-realtime-control',
    name: "リアルタイム制御",
    description: "Levaコントロールと3Dオブジェクトのリアルタイム連携",
    files: ["src/app/demos/library-integration/leva/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "3Dオブジェクトのリアルタイム制御",
        description: "Levaの値変更を即座に3Dシーンに反映する方法",
        fileName: "LevaControlDemo.tsx",
        code: `// useFrameでアニメーション制御
useFrame((state, delta) => {
  if (!enableAnimation) return

  const time = state.clock.elapsedTime
  let currentMesh: Mesh | null = null
  
  // オブジェクトタイプに応じて対象を切り替え
  if (objectType === 'box' && boxRef.current) currentMesh = boxRef.current
  if (objectType === 'sphere' && sphereRef.current) currentMesh = sphereRef.current
  if (objectType === 'cone' && coneRef.current) currentMesh = coneRef.current

  if (currentMesh) {
    // Levaの値を使用した回転アニメーション
    currentMesh.rotation.x += delta * rotationSpeed
    currentMesh.rotation.y += delta * rotationSpeed * 0.7
    
    // バウンスアニメーション
    const bounceOffset = Math.sin(time * bounceSpeed) * bounceHeight
    currentMesh.position.y = position[1] + bounceOffset
  }
})

// JSX内でLevaの値を直接使用
return (
  <group>
    {/* 動的ライティング */}
    <ambientLight intensity={ambientIntensity} />
    <directionalLight 
      position={directionalPosition as [number, number, number]} 
      intensity={directionalIntensity}
    />

    {/* オブジェクトの動的切り替え */}
    {objectType === 'box' && (
      <Box
        position={[position[0], position[1], position[2]]}
        rotation={[rotation[0], rotation[1], rotation[2]]}
        scale={scale}
      >
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe}
        />
      </Box>
    )}
  </group>
)`,
        highlights: [
          {
            id: "realtime-animation",
            startLine: 12,
            endLine: 19,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "リアルタイムアニメーション",
              description: "Levaの値（rotationSpeed、bounceSpeed等）を使用してアニメーションをリアルタイムで制御できます。",
              documentationUrl: "https://threejs.org/docs/#manual/en/introduction/Animation-system",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "dynamic-properties",
            startLine: 25,
            endLine: 35,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "動的プロパティ",
              description: "Levaの値をJSXのプロパティに直接バインドすることで、GUIの変更が即座に3Dオブジェクトに反映されます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects"
            }
          },
          {
            id: "conditional-rendering",
            startLine: 37,
            endLine: 47,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "条件付きレンダリング",
              description: "Levaの選択値に基づいて異なる3Dオブジェクトを動的に表示・非表示できます。",
              documentationUrl: "https://react.dev/learn/conditional-rendering",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'leva-advanced-features',
    name: "Leva高度な機能",
    description: "フォルダ、監視、カスタム入力などの高度なLeva機能",
    files: ["src/app/demos/library-integration/leva/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "フォルダとグループ化",
        description: "関連するコントロールをフォルダでグループ化して整理",
        fileName: "LevaControlDemo.tsx",
        code: `const controls = useControls({
  // オブジェクト設定フォルダ
  'Object Settings': folder({
    objectType: {
      value: 'box',
      options: ['box', 'sphere', 'cone']
    },
    position: { value: [0, 0, 0], step: 0.1 },
    rotation: { value: [0, 0, 0], step: 0.1 },
    scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    color: '#ff6b6b',
    wireframe: false,
  }),
  
  // アニメーション設定フォルダ
  'Animation Settings': folder({
    enableAnimation: true,
    rotationSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
    bounceHeight: { value: 1, min: 0, max: 3, step: 0.1 },
    bounceSpeed: { value: 2, min: 0.1, max: 5, step: 0.1 },
  }),
  
  // ライティング設定フォルダ
  'Lighting Settings': folder({
    ambientIntensity: { value: 0.4, min: 0, max: 2, step: 0.1 },
    directionalIntensity: { value: 1, min: 0, max: 3, step: 0.1 },
    directionalPosition: { value: [10, 10, 5], step: 1 },
  }),
  
  // カメラ設定フォルダ
  'Camera Settings': folder({
    autoRotateCamera: false,
    cameraSpeed: { value: 0.5, min: 0.1, max: 2, step: 0.1 },
  })
})`,
        highlights: [
          {
            id: "folder-organization",
            startLine: 2,
            endLine: 12,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "フォルダ組織化",
              description: "folder()を使用して関連するコントロールをグループ化し、UIを整理できます。フォルダは折りたたみ可能です。",
              documentationUrl: "https://github.com/pmndrs/leva#folder",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/advanced/folders"
            }
          },
          {
            id: "nested-structure",
            startLine: 14,
            endLine: 30,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "ネストした構造",
              description: "複数のフォルダを使用して階層的なGUI構造を作成し、複雑な設定を管理しやすくできます。",
              documentationUrl: "https://github.com/pmndrs/leva#nested-folders",
              r3fDocumentationUrl: "https://docs.pmnd.rs/leva/advanced/folders"
            }
          }
        ]
      }
    ]
  }
]
