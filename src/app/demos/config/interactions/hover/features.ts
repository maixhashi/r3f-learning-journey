import { FeatureFile } from '../../types'

export const hoverFeatures: FeatureFile[] = [
  {
    id: 'hover-events',
    name: "ホバーイベント",
    description: "マウスポインターの入退場を検知するイベントハンドリング",
    files: ["src/app/demos/interactions/hover/components/HoverInteraction.tsx"],
    codeSections: [
      {
        title: "ポインターイベントハンドリング",
        description: "onPointerEnter/Leaveを使用したホバー状態の管理",
        fileName: "HoverInteraction.tsx",
        code: `<mesh 
  ref={meshRef} 
  position={[0, 0, 0]} 
  castShadow 
  receiveShadow
  onPointerEnter={(e) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }}
  onPointerLeave={(e) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = 'auto'
  }}
  onPointerDown={(e) => {
    e.stopPropagation()
    setClicked(true)
  }}
  onPointerUp={(e) => {
    e.stopPropagation()
    setClicked(false)
  }}
>`,
        highlights: [
          {
            id: "pointer-enter",
            startLine: 5,
            endLine: 9,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "onPointerEnter",
              description: "マウスポインターがオブジェクトに入った時に発火するイベントです。ホバー状態の開始を検知します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/events"
            }
          },
          {
            id: "pointer-leave",
            startLine: 10,
            endLine: 14,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "onPointerLeave",
              description: "マウスポインターがオブジェクトから離れた時に発火するイベントです。ホバー状態の終了を検知します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/events"
            }
          },
          {
            id: "cursor-change",
            startLine: 8,
            endLine: 8,
            startColumn: 4,
            endColumn: 45,
            tooltip: {
              title: "カーソル変更",
              description: "document.body.style.cursorでマウスカーソルの見た目を変更できます。ユーザーにインタラクティブ要素であることを示します。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/cursor",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/events"
            }
          },
          {
            id: "stop-propagation",
            startLine: 6,
            endLine: 6,
            startColumn: 4,
            endColumn: 25,
            tooltip: {
              title: "stopPropagation",
              description: "イベントの伝播を停止します。複数のオブジェクトが重なっている場合に、意図しないイベント発火を防ぎます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/events"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'interactive-animations',
    name: "インタラクティブアニメーション",
    description: "ユーザーの操作に応じた動的なアニメーション効果",
    files: ["src/app/demos/interactions/hover/components/HoverInteraction.tsx"],
    codeSections: [
      {
        title: "状態に応じたアニメーション",
        description: "ホバー状態やクリック状態に基づく滑らかなアニメーション",
        fileName: "HoverInteraction.tsx",
        code: `const [hovered, setHovered] = useState(false)
const [clicked, setClicked] = useState(false)

// アニメーション用の状態
useFrame((state, delta) => {
  if (meshRef.current) {
    // ホバー時のスケールアニメーション
    const targetScale = hovered ? 1.2 : clicked ? 0.9 : 1.0
    meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, delta * 5)
    
    // ホバー時の回転アニメーション
    if (hovered) {
      meshRef.current.rotation.y += delta * 2
    }
  }
})`,
        highlights: [
          {
            id: "state-management",
            startLine: 1,
            endLine: 2,
            startColumn: 0,
            endColumn: 40,
            tooltip: {
              title: "状態管理",
              description: "useStateを使用してホバーやクリックの状態を管理します。この状態に基づいてアニメーションや見た目を変更できます。",
              documentationUrl: "https://react.dev/reference/react/useState",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene"
            }
          },
          {
            id: "lerp-animation",
            startLine: 8,
            endLine: 8,
            startColumn: 4,
            endColumn: 95,
            tooltip: {
              title: "lerp（線形補間）",
              description: "lerpを使用して現在の値から目標値へ滑らかに変化させます。第2引数で補間の速度を調整できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3.lerp",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "conditional-animation",
            startLine: 10,
            endLine: 13,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "条件付きアニメーション",
              description: "状態に応じて異なるアニメーションを実行します。ホバー時のみ回転アニメーションを適用しています。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.rotation",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'material-properties',
    name: "マテリアルプロパティ",
    description: "状態に応じたマテリアルの動的変更",
    files: ["src/app/demos/interactions/hover/components/HoverInteraction.tsx"],
    codeSections: [
      {
        title: "動的マテリアル変更",
        description: "ホバー状態に応じて色や質感を動的に変更",
        fileName: "HoverInteraction.tsx",
        code: `<meshStandardMaterial 
  color={hovered ? "#4ecdc4" : clicked ? "#ff6b6b" : "#45b7d1"} 
  roughness={hovered ? 0.1 : 0.5}
  metalness={hovered ? 0.8 : 0.2}
/>

{/* 状態表示テキスト */}
<Text position={[0, -2.5, 0]} fontSize={0.5} color="white" anchorX="center">
  {hovered ? "Hovering!" : clicked ? "Clicked!" : "Hover me!"}
</Text>`,
        highlights: [
          {
            id: "dynamic-color",
            startLine: 2,
            endLine: 2,
            startColumn: 2,
            endColumn: 70,
            tooltip: {
              title: "動的カラー変更",
              description: "三項演算子を使用して状態に応じて色を変更します。視覚的なフィードバックをユーザーに提供できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.color",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          },
          {
            id: "roughness-metalness",
            startLine: 3,
            endLine: 4,
            startColumn: 2,
            endColumn: 35,
            tooltip: {
              title: "粗さと金属性",
              description: "roughness（粗さ）とmetalness（金属性）を調整することで、光の反射具合を変更できます。ホバー時により光沢のある見た目にしています。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          },
          {
            id: "dynamic-text",
            startLine: 8,
            endLine: 10,
            startColumn: 2,
            endColumn: 8,
            tooltip: {
              title: "動的テキスト表示",
              description: "状態に応じてテキスト内容を変更することで、現在の状態をユーザーに分かりやすく伝えることができます。",
              documentationUrl: "https://github.com/pmndrs/drei#text",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/introduction"
            }
          }
        ]
      }
    ]
  }
]
