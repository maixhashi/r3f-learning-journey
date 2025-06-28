import { FeatureFile } from '../../types'

export const reactSpringFeatures: FeatureFile[] = [
  {
    id: 'react-spring-basics',
    name: "React Spring 基本機能",
    description: "useSpringフックを使用したスムーズなアニメーション",
    files: ["src/app/demos/library-integration/react-spring/components/ReactSpringDemo.tsx"],
    codeSections: [
      {
        title: "useSpringによるアニメーション",
        description: "React Springのコア機能であるuseSpringフックの使用方法",
        fileName: "ReactSpringDemo.tsx",
        code: `// React Spring アニメーション設定
const springAnimation = useSpring({
  scale: springClicked ? [1.5, 1.5, 1.5] : springHovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
  position: springClicked ? [0, 1, 0] : [0, 0, 0],
  rotation: springClicked ? [0, Math.PI, 0] : [0, 0, 0],
  color: springClicked ? '#ff4757' : springHovered ? '#ffa502' : '#3742fa',
  config: {
    tension: 300,    // バネの張力（高いほど速い）
    friction: 10,    // 摩擦（高いほど早く停止）
  }
})

// アニメーション付きメッシュで使用
<AnimatedMesh
  position={springAnimation.position.to((x, y, z) => [-2.5, y, z])}
  scale={springAnimation.scale}
  rotation={springAnimation.rotation}
>
  <animated.meshStandardMaterial color={springAnimation.color} />
</AnimatedMesh>`,
        highlights: [
          {
            id: "usespring",
            startLine: 2,
            endLine: 10,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "useSpring",
              description: "React Springのメインフック。状態の変化に応じて値を滑らかにアニメーションさせます。物理ベースのアニメーションで自然な動きを実現できます。",
              documentationUrl: "https://react-spring.dev/docs/components/use-spring",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures"
            }
          },
          {
            id: "config",
            startLine: 6,
            endLine: 9,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "アニメーション設定",
              description: "tensionは弾性（高いほど速く動く）、frictionは摩擦（高いほど早く停止）を制御します。物理的な挙動をシミュレートしています。",
              documentationUrl: "https://react-spring.dev/docs/advanced/config",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'spring-vs-manual',
    name: "React Spring vs 手動アニメーション",
    description: "React Springと従来のuseFrameを使った手動アニメーションの比較",
    files: ["src/app/demos/library-integration/react-spring/components/ReactSpringDemo.tsx"],
    codeSections: [
      {
        title: "手動アニメーション（useFrame）",
        description: "従来のuseFrameを使用した手動でのアニメーション実装",
        fileName: "ReactSpringDemo.tsx",
        code: `// 通常のアニメーション（useFrameを使用）
useFrame((state, delta) => {
  if (normalMeshRef.current) {
    // ホバー時のスケールアニメーション
    const targetScale = normalClicked ? 1.5 : normalHovered ? 1.2 : 1
    const currentScale = normalMeshRef.current.scale.x
    const newScale = currentScale + (targetScale - currentScale) * delta * 5
    normalMeshRef.current.scale.setScalar(newScale)

    // クリック時の位置アニメーション
    const targetY = normalClicked ? 1 : 0
    const currentY = normalMeshRef.current.position.y
    const newY = currentY + (targetY - currentY) * delta * 5
    normalMeshRef.current.position.y = newY

    // クリック時の回転アニメーション
    const targetRotationY = normalClicked ? Math.PI : 0
    const currentRotationY = normalMeshRef.current.rotation.y
    const newRotationY = currentRotationY + (targetRotationY - currentRotationY) * delta * 5
    normalMeshRef.current.rotation.y = newRotationY
  }
})`,
        highlights: [
          {
            id: "manual-interpolation",
            startLine: 5,
            endLine: 7,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "手動補間",
              description: "現在値と目標値の差分にdeltaと係数を掛けて線形補間を行います。シンプルですが、物理的な自然さに欠ける場合があります。",
              documentationUrl: "https://threejs.org/docs/#manual/en/introduction/Animation-system",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "manual-complexity",
            startLine: 9,
            endLine: 18,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "複雑性の増加",
              description: "複数のプロパティをアニメーションする場合、それぞれに対して補間計算を書く必要があり、コードが冗長になります。React Springを使用すると、この複雑さを大幅に軽減できます。",
              documentationUrl: "https://threejs.org/docs/#manual/en/introduction/Animation-system",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          }
        ]
      },
      {
        title: "React Spring vs 手動アニメーションの比較",
        description: "両方のアプローチの利点と欠点を比較",
        fileName: "Comparison.tsx",
        code: `// React Spring の利点:
// ✅ 物理ベースの自然なアニメーション
// ✅ 宣言的な書き方
// ✅ 複数プロパティの同期が簡単
// ✅ イージング関数が豊富
// ✅ パフォーマンスが最適化されている

const springAnimation = useSpring({
  scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
  position: active ? [0, 1, 0] : [0, 0, 0],
  color: active ? '#ff4757' : '#3742fa',
  config: { tension: 300, friction: 10 }
})

// 手動アニメーション（useFrame）の特徴:
// ✅ 完全な制御が可能
// ✅ カスタムロジックを組み込みやすい
// ✅ 外部ライブラリに依存しない
// ❌ コードが冗長になりがち
// ❌ 物理的な自然さを実現するのが困難

useFrame((state, delta) => {
  // 各プロパティごとに手動で補間計算
  const targetScale = active ? 1.5 : 1
  const currentScale = meshRef.current.scale.x
  const newScale = currentScale + (targetScale - currentScale) * delta * 5
  meshRef.current.scale.setScalar(newScale)
  // ... 他のプロパティも同様に処理
})`,
        highlights: [
          {
            id: "declarative-vs-imperative",
            startLine: 7,
            endLine: 12,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "宣言的 vs 命令的",
              description: "React Springは宣言的（何をしたいかを記述）、useFrameは命令的（どうやって実現するかを記述）なアプローチです。宣言的な方が読みやすく保守しやすいコードになります。",
              documentationUrl: "https://react-spring.dev/docs/concepts/declarative-programming",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-spring-features',
    name: "高度なSpring機能",
    description: "React Springの高度な機能とカスタマイズ",
    files: ["src/app/demos/library-integration/react-spring/components/ReactSpringDemo.tsx"],
    codeSections: [
      {
        title: "物理パラメータのカスタマイズ",
        description: "mass、tension、frictionを使った物理的挙動の調整",
        fileName: "ReactSpringDemo.tsx",
        code: `// 異なる物理パラメータの例
const { scale, color, position } = useSpring({
  scale: active ? 1.5 : hovered ? 1.2 : 1,
  color: active ? '#e74c3c' : hovered ? '#f39c12' : '#9b59b6',
  position: active ? [0, 2.5, 0] : [0, 2, 0],
  config: {
    mass: 1,        // 質量（重いほど動きが遅い）
    tension: 280,   // 張力（高いほど速く動く）
    friction: 60,   // 摩擦（高いほど早く停止）
  }
})

// プリセット設定の使用
import { config } from '@react-spring/core'

const fastAnimation = useSpring({
  scale: active ? 2 : 1,
  config: config.fast  // 素早いアニメーション
})

const slowAnimation = useSpring({
  scale: active ? 2 : 1,
  config: config.slow  // ゆっくりしたアニメーション
})

const wobblyAnimation = useSpring({
  scale: active ? 2 : 1,
  config: config.wobbly  // 弾むようなアニメーション
})`,
        highlights: [
          {
            id: "physics-params",
            startLine: 5,
            endLine: 9,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "物理パラメータ",
              description: "mass（質量）、tension（張力）、friction（摩擦）を調整することで、様々な物理的挙動を再現できます。現実世界の物理法則に基づいた自然なアニメーションが可能です。",
              documentationUrl: "https://react-spring.dev/docs/advanced/config",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures"
            }
          },
          {
            id: "presets",
            startLine: 12,
            endLine: 25,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "プリセット設定",
              description: "React Springには事前定義された設定（fast、slow、wobbly等）があり、一般的なアニメーションパターンを簡単に適用できます。",
              documentationUrl: "https://react-spring.dev/docs/advanced/config#presets",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'performance-comparison',
    name: "パフォーマンス比較",
    description: "React SpringとuseFrameのパフォーマンス特性",
    files: ["src/app/demos/library-integration/react-spring/components/ReactSpringDemo.tsx"],
    codeSections: [
      {
        title: "パフォーマンス最適化",
        description: "React Springの内部最適化とパフォーマンス特性",
        fileName: "Performance.tsx",
        code: `// React Spring の最適化機能:

// 1. 自動的な最適化
// - 不要な再レンダリングを防ぐ
// - ネイティブアニメーションの活用
// - GPU加速の自動適用

const optimizedSpring = useSpring({
  scale: active ? 2 : 1,
  // React Springが自動的に最適化
  config: { tension: 300, friction: 30 }
})

// 2. 条件付きアニメーション
const conditionalSpring = useSpring({
  scale: shouldAnimate ? (active ? 2 : 1) : 1,
  immediate: !shouldAnimate, // アニメーションを無効化
})

// 3. useFrameとの使い分け
// React Spring: UI的なインタラクション、状態変化
// useFrame: 連続的なアニメーション、ゲームロジック

// React Spring - 適している場面
const uiAnimation = useSpring({
  scale: hovered ? 1.1 : 1,
  color: clicked ? '#ff0000' : '#0000ff'
})

// useFrame - 適している場面
useFrame((state) => {
  // 連続的な回転
  meshRef.current.rotation.y = state.clock.elapsedTime
  // 波のような動き
  meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 2
})`,
        highlights: [
          {
            id: "auto-optimization",
            startLine: 3,
            endLine: 6,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "自動最適化",
              description: "React Springは内部で多くの最適化を行います。不要な再レンダリングの防止、ネイティブアニメーションの活用、GPU加速の自動適用などにより、高いパフォーマンスを実現します。",
              documentationUrl: "https://react-spring.dev/docs/advanced/performance",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/advanced/performance"
            }
          },
          {
            id: "use-cases",
            startLine: 18,
            endLine: 30,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "適切な使い分け",
              description: "React SpringはUI的なインタラクションや状態変化に、useFrameは連続的なアニメーションやゲームロジックに適しています。適切に使い分けることで最適なパフォーマンスを得られます。",
              documentationUrl: "https://react-spring.dev/docs/getting-started",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          }
        ]
      }
    ]
  }
]
