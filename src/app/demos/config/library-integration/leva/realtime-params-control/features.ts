import { FeatureFile } from '../../../../types'

export const levaFeatures: FeatureFile[] = [
  {
    id: 'leva-basic-controls',
    name: "基本的なLevaコントロール",
    description: "useControlsフックを使用した基本的なGUIコントロールの実装",
    files: ["src/app/demos/library-integration/leva/realtime-params-control/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "useControlsの基本使用法",
        description: "Levaのメインフックを使用してGUIコントロールを作成",
        fileName: "LevaControlDemo.tsx",
        code: `import { useControls, folder } from 'leva'

const {
  color,
  scale,
  wireframe
} = useControls({
  color: '#ff6b6b',
  scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
  wireframe: false
})`,
        highlights: [
          {
            id: "usecontrols",
            startLine: 3,
            endLine: 11,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "useControls",
              description: "Levaのメインフックです。オブジェクトを渡すことで自動的にGUIコントロールが生成されます。",
              documentationUrl: "https://github.com/pmndrs/leva#usecontrols",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/using-with-react-spring"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'leva-folder-organization',
    name: "フォルダによる整理",
    description: "folderを使用してコントロールを論理的にグループ化",
    files: ["src/app/demos/library-integration/leva/realtime-params-control/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "フォルダによるコントロール整理",
        description: "関連するコントロールをフォルダでグループ化して整理",
        fileName: "LevaControlDemo.tsx",
        code: `const controls = useControls({
  // 基本設定フォルダ
  ...folder('基本設定', {
    color: '#ff6b6b',
    scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    wireframe: false
  }),
  
  // 位置制御フォルダ
  ...folder('位置制御', {
    positionX: { value: 0, min: -5, max: 5, step: 0.1 },
    positionY: { value: 0, min: -5, max: 5, step: 0.1 },
    positionZ: { value: 0, min: -5, max: 5, step: 0.1 }
  }),
  
  // マテリアル設定フォルダ
  ...folder('マテリアル', {
    metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 }
  })
})`,
        highlights: [
          {
            id: "folder",
            startLine: 3,
            endLine: 7,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "folder",
              description: "関連するコントロールをグループ化してUIを整理できます。スプレッド演算子と組み合わせて使用します。",
              documentationUrl: "https://github.com/pmndrs/leva#folder",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/using-with-react-spring"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'leva-input-types',
    name: "多様な入力タイプ",
    description: "Levaがサポートする様々な入力コントロールタイプ",
    files: ["src/app/demos/library-integration/leva/realtime-params-control/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "入力タイプの設定",
        description: "数値、色、ブール値など様々な入力タイプの設定方法",
        fileName: "LevaControlDemo.tsx",
        code: `const controls = useControls({
  // 数値スライダー（範囲指定）
  scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
  
  // 色ピッカー
  color: '#ff6b6b',
  
  // ブール値（チェックボックス）
  wireframe: false,
  
  // 数値入力（範囲なし）
  intensity: 1.0,
  
  // 選択肢（ドロップダウン）
  shape: { options: ['box', 'sphere', 'cylinder'] },
  
  // ベクター（3D座標）
  position: { value: [0, 0, 0], step: 0.1 },
  
  // 文字列入力
  label: 'My Object'
})`,
        highlights: [
          {
            id: "range-input",
            startLine: 2,
            endLine: 2,
            startColumn: 2,
            endColumn: 50,
            tooltip: {
              title: "範囲付き数値入力",
              description: "min、max、stepを指定することでスライダー形式の数値入力が作成されます。",
              documentationUrl: "https://github.com/pmndrs/leva#number",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/using-with-react-spring"
            }
          },
          {
            id: "color-input",
            startLine: 5,
            endLine: 5,
            startColumn: 2,
            endColumn: 20,
            tooltip: {
              title: "色入力",
              description: "16進数カラーコードを指定すると自動的に色ピッカーが表示されます。",
              documentationUrl: "https://github.com/pmndrs/leva#color",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/using-with-react-spring"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'leva-realtime-updates',
    name: "リアルタイム更新",
    description: "Levaコントロールの値変更を3Dオブジェクトにリアルタイム反映",
    files: ["src/app/demos/library-integration/leva/realtime-params-control/components/LevaControlDemo.tsx"],
    codeSections: [
      {
        title: "3Dオブジェクトへの値の反映",
        description: "Levaで変更された値を直接3Dオブジェクトのプロパティに適用",
        fileName: "LevaControlDemo.tsx",
        code: `export function LevaControlDemo() {
  const meshRef = useRef<Mesh>(null)
  
  const { color, scale, positionX, positionY, positionZ } = useControls({
    color: '#ff6b6b',
    scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    positionX: { value: 0, min: -5, max: 5, step: 0.1 },
    positionY: { value: 0, min: -5, max: 5, step: 0.1 },
    positionZ: { value: 0, min: -5, max: 5, step: 0.1 }
  })

  return (
    <mesh
      ref={meshRef}
      position={[positionX, positionY, positionZ]}
      scale={[scale, scale, scale]}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "realtime-props",
            startLine: 13,
            endLine: 16,
            startColumn: 6,
            endColumn: 40,
            tooltip: {
              title: "リアルタイム反映",
              description: "Levaで取得した値を直接JSXのpropsに渡すことで、GUIでの変更が即座に3Dオブジェクトに反映されます。",
              documentationUrl: "https://github.com/pmndrs/leva",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/using-with-react-spring"
            }
          }
        ]
      }
    ]
  }
]