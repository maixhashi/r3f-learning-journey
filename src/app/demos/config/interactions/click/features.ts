import { FeatureFile } from '../../types'

export const clickFeatures: FeatureFile[] = [
  {
    id: 'click-events',
    name: "クリックイベント",
    description: "3Dオブジェクトのクリックイベントハンドリング",
    files: ["src/app/demos/interactions/click/components/ClickInteraction.tsx"],
    codeSections: [
      {
        title: "基本的なクリックイベント",
        description: "onClickプロパティを使用した3Dオブジェクトのクリック検出",
        fileName: "ClickInteraction.tsx",
        code: `// クリックハンドラー
const handleClick = (event: any) => {
  event.stopPropagation()
  setIsClicked(true)
  setClickCount(prev => prev + 1)
  setAnimationProgress(1) // アニメーション開始
  
  // 1秒後にクリック状態をリセット
  setTimeout(() => {
    setIsClicked(false)
  }, 1000)
}

return (
  <mesh 
    onClick={handleClick}
    onPointerEnter={() => setHovered(true)}
    onPointerLeave={() => setHovered(false)}
    onPointerOver={() => document.body.style.cursor = 'pointer'}
    onPointerOut={() => document.body.style.cursor = 'auto'}
  >
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial 
      color={isClicked ? '#00ff00' : hovered ? '#ffaa00' : '#ff6b6b'}
      emissive={isClicked ? '#004400' : hovered ? '#442200' : '#000000'}
    />
  </mesh>
)`,
        highlights: [
          {
            id: "onclick",
            startLine: 14,
            endLine: 14,
            startColumn: 4,
            endColumn: 25,
            tooltip: {
              title: "onClick",
              description: "3Dオブジェクトがクリックされた時に実行される関数を指定します。React Three Fiberでは通常のReactと同様にonClickイベントを使用できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/events"
            }
          },
          {
            id: "pointer-events",
            startLine: 15,
            endLine: 18,
            startColumn: 4,
            endColumn: 60,
            tooltip: {
              title: "ポインターイベント",
              description: "onPointerEnter/Leaveでホバー状態を検出し、onPointerOver/Outでカーソルスタイルを変更できます。これによりユーザーにインタラクティブな要素であることを示せます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/events"
            }
          },
          {
            id: "stop-propagation",
            startLine: 3,
            endLine: 3,
            startColumn: 2,
            endColumn: 25,
            tooltip: {
              title: "stopPropagation",
              description: "イベントの伝播を停止します。複数のオブジェクトが重なっている場合に、背景のオブジェクトにもイベントが伝わることを防ぎます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/events"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'visual-feedback',
    name: "ビジュアルフィードバック",
    description: "クリック時の色変更とアニメーション効果",
    files: ["src/app/demos/interactions/click/components/ClickInteraction.tsx"],
    codeSections: [
      {
        title: "状態に応じた色変更",
        description: "クリック状態とホバー状態に応じてマテリアルの色を動的に変更",
        fileName: "ClickInteraction.tsx",
        code: `const [isClicked, setIsClicked] = useState(false)
const [hovered, setHovered] = useState(false)

// マテリアルの色を状態に応じて変更
<meshStandardMaterial 
  color={isClicked ? '#00ff00' : hovered ? '#ffaa00' : '#ff6b6b'}
  emissive={isClicked ? '#004400' : hovered ? '#442200' : '#000000'}
/>

// アニメーションフレームでのスケール変更
useFrame((state, delta) => {
  if (meshRef.current) {
    // クリック時のアニメーション
    if (animationProgress > 0) {
      // スケールアニメーション（バウンス効果）
      const bounce = Math.sin(animationProgress * Math.PI * 4) * 0.2 + 1
      meshRef.current.scale.setScalar(bounce)
      
      // アニメーション進行
      setAnimationProgress(prev => Math.max(0, prev - delta * 2))
    }
  }
})`,
        highlights: [
          {
            id: "conditional-color",
            startLine: 5,
            endLine: 7,
            startColumn: 2,
            endColumn: 3,
            tooltip: {
              title: "条件付き色変更",
              description: "三項演算子を使用して状態に応じて色を動的に変更します。colorは基本色、emissiveは発光色を設定し、よりリッチな視覚効果を実現できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          },
          {
            id: "bounce-animation",
            startLine: 15,
            endLine: 16,
            startColumn: 6,
            endColumn: 50,
            tooltip: {
              title: "バウンスアニメーション",
              description: "Math.sin関数を使用してバウンス効果を作成します。animationProgressが1から0に減少する間、オブジェクトが弾むようなスケール変化を実現します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.scale",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'multiple-interactions',
    name: "複数オブジェクトのインタラクション",
    description: "複数の3Dオブジェクトそれぞれに異なるクリック動作を実装",
    files: ["src/app/demos/interactions/click/components/ClickInteraction.tsx"],
    codeSections: [
      {
        title: "再利用可能なインタラクティブコンポーネント",
        description: "独立したクリック動作を持つ球体コンポーネント",
        fileName: "ClickInteraction.tsx",
        code: `function InteractiveSphere({ position }: { position: [number, number, number] }) {
  const sphereRef = useRef<Mesh>(null)
  const [clicked, setClicked] = useState(false)
  const [color, setColor] = useState('#6b6bff')

  const handleSphereClick = (event: any) => {
    event.stopPropagation()
    setClicked(true)
    
    // ランダムな色に変更
    const colors = ['#ff6b6b', '#6bff6b', '#6b6bff', '#ffff6b', '#ff6bff', '#6bffff']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)
    
    setTimeout(() => setClicked(false), 500)
  }

  return (
    <mesh 
      ref={sphereRef}
      position={position}
      onClick={handleSphereClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color={color}
        emissive={clicked ? new THREE.Color(color).multiplyScalar(0.2) : '#000000'}
      />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "component-props",
            startLine: 1,
            endLine: 1,
            startColumn: 1,
            endColumn: 80,
            tooltip: {
              title: "コンポーネントのプロパティ",
              description: "position propsを受け取ることで、同じコンポーネントを異なる位置に配置できます。これにより再利用可能なインタラクティブコンポーネントを作成できます。",
              documentationUrl: "https://react.dev/learn/passing-props-to-a-component",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene"
            }
          },
          {
            id: "random-color",
            startLine: 9,
            endLine: 11,
            startColumn: 4,
            endColumn: 25,
            tooltip: {
              title: "ランダム色変更",
              description: "配列から Math.floor(Math.random()) を使用してランダムに色を選択します。クリックするたびに異なる色に変化し、インタラクティブな体験を提供します。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          },
          {
            id: "color-multiply",
            startLine: 26,
            endLine: 26,
            startColumn: 18,
            endColumn: 70,
            tooltip: {
              title: "色の計算",
              description: "THREE.Color.multiplyScalar()を使用して色の明度を調整します。クリック時に発光色として元の色を暗くした色を使用し、より自然な発光効果を実現します。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Color.multiplyScalar",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          }
        ]
      }
    ]
  }
]