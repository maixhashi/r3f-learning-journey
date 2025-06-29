import { FeatureFile } from '../../types'

export const framerMotion3DFeatures: FeatureFile[] = [
  {
    id: 'implementation-comparison',
    name: "実装方法の比較",
    description: "従来のReact Three FiberとFramer Motion 3Dの実装方法を比較",
    files: ["src/app/demos/library-integration/framer-motion-3d/components/FramerMotion3DDemo.tsx"],
    codeSections: [
      {
        title: "従来のReact Three Fiber実装",
        description: "useFrameと手動補間を使用した従来のアニメーション実装",
        fileName: "FramerMotion3DDemo.tsx",
        code: `function TraditionalR3FBox() {
  const meshRef = useRef<Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const targetScale = useRef(1)
  const currentScale = useRef(1)

  // 手動でアニメーションを実装
  useFrame((state, delta) => {
    if (meshRef.current) {
      // スケールのスムーズな補間
      const scaleDiff = targetScale.current - currentScale.current
      if (Math.abs(scaleDiff) > 0.01) {
        currentScale.current += scaleDiff * delta * 8
        meshRef.current.scale.setScalar(currentScale.current)
      }
      
      // マテリアルの色変更
      if (meshRef.current.material && 'color' in meshRef.current.material) {
        const material = meshRef.current.material as any
        const targetColor = isHovered ? 0x5352ed : 0x2ed573
        material.color.setHex(targetColor)
      }
    }
  })

  const handlePointerEnter = () => {
    setIsHovered(true)
    targetScale.current = 1.2
  }

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => {
        setIsHovered(false)
        targetScale.current = 1
      }}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "manual-interpolation",
            startLine: 8,
            endLine: 14,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "手動補間",
              description: "useFrameで毎フレーム実行し、手動で線形補間（lerp）を実装する必要があります。アニメーションの滑らかさや速度を自分で制御する必要があります。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3.lerp",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "manual-state-management",
            startLine: 4,
            endLine: 5,
            startColumn: 2,
            endColumn: 30,
            tooltip: {
              title: "手動状態管理",
              description: "アニメーションの現在値と目標値を手動で管理する必要があります。複雑なアニメーションでは状態管理が煩雑になります。",
              documentationUrl: "https://reactjs.org/docs/hooks-reference.html#useref",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene"
            }
          },
          {
            id: "manual-color-change",
            startLine: 16,
            endLine: 21,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "手動マテリアル操作",
              description: "マテリアルの色変更も手動で実装する必要があります。型安全性の確保やプロパティアクセスが複雑になります。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#materials"
            }
          }
        ]
      },
      {
        title: "Framer Motion 3D実装",
        description: "宣言的なアニメーション記述による簡潔な実装",
        fileName: "FramerMotion3DDemo.tsx",
        code: `function FramerMotion3DBox() {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.mesh
      position={[3, 0, 0]}
      castShadow
      receiveShadow
      // 状態に基づくアニメーション
      animate={{
        scale: isHovered ? 1.2 : 1,
        rotateY: isHovered ? Math.PI / 4 : 0,
      }}
      // ドラッグ時のアニメーション
      whileDrag={{
        scale: 1.3,
        rotateX: 0.2,
        rotateZ: 0.1,
      }}
      // アニメーション設定
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      // ドラッグ設定
      drag
      dragConstraints={{
        left: -2, right: 2, top: 2, bottom: -2,
      }}
      // イベントハンドラー
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={isDragging ? "#ff4757" : isHovered ? "#5352ed" : "#2ed573"} 
      />
    </motion.mesh>
  )
}`,
        highlights: [
          {
            id: "declarative-animation",
            startLine: 10,
            endLine: 14,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "宣言的アニメーション",
              description: "目標値を宣言するだけで、補間やタイミングは自動で処理されます。コードが簡潔で理解しやすくなります。",
              documentationUrl: "https://www.framer.com/motion/animation/",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          },
          {
            id: "built-in-gestures",
            startLine: 15,
            endLine: 20,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "組み込みジェスチャー",
              description: "whileDrag、whileHover、whileTapなどの組み込みジェスチャーが用意されており、複雑なイベント処理を簡単に実装できます。",
              documentationUrl: "https://www.framer.com/motion/gestures/",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          },
          {
            id: "spring-physics",
            startLine: 21,
            endLine: 25,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "物理ベースアニメーション",
              description: "スプリング物理演算が組み込まれており、自然で滑らかなアニメーションを簡単に実現できます。",
              documentationUrl: "https://www.framer.com/motion/transition/#spring",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          },
          {
            id: "drag-constraints",
            startLine: 26,
            endLine: 31,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "ドラッグ制約",
              description: "ドラッグ可能範囲の制限や弾性効果を簡単に設定できます。複雑な境界処理が不要になります。",
              documentationUrl: "https://www.framer.com/motion/gestures/#drag",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'code-complexity-comparison',
    name: "コード複雑度の比較",
    description: "同じ機能を実装する際のコード量と複雑度の違い",
    files: ["src/app/demos/library-integration/framer-motion-3d/components/FramerMotion3DDemo.tsx"],
    codeSections: [
      {
        title: "コード量の比較",
        description: "同じアニメーション機能を実装するのに必要なコード量の違い",
        fileName: "CodeComplexityComparison.tsx",
        code: `// 従来のReact Three Fiber実装
// 約80行のコード + 複雑な状態管理

function TraditionalR3FBox() {
  // 状態管理（8行）
  const meshRef = useRef<Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const targetScale = useRef(1)
  const targetRotationY = useRef(0)
  const currentScale = useRef(1)
  const currentRotationY = useRef(0)
  const [position, setPosition] = useState<[number, number, number]>([-3, 0, 0])

  // アニメーションループ（25行）
  useFrame((state, delta) => {
    if (meshRef.current) {
      // スケール補間
      const scaleDiff = targetScale.current - currentScale.current
      if (Math.abs(scaleDiff) > 0.01) {
        currentScale.current += scaleDiff * delta * 8
        meshRef.current.scale.setScalar(currentScale.current)
      }
      
      // 回転補間
      const rotationDiff = targetRotationY.current - currentRotationY.current
      if (Math.abs(rotationDiff) > 0.01) {
        currentRotationY.current += rotationDiff * delta * 6
        meshRef.current.rotation.y = currentRotationY.current
      }
      
      // 色変更
      if (meshRef.current.material && 'color' in meshRef.current.material) {
        const material = meshRef.current.material as any
        const targetColor = isDragging ? 0xff4757 : isHovered ? 0x5352ed : 0x2ed573
        material.color.setHex(targetColor)
      }
    }
  })

  // イベントハンドラー（30行）
  const handlePointerEnter = () => {
    setIsHovered(true)
    targetScale.current = 1.2
    targetRotationY.current = Math.PI / 4
  }
  
  const handlePointerLeave = () => {
    setIsHovered(false)
    if (!isDragging) {
      targetScale.current = 1
      targetRotationY.current = 0
    }
  }
  
  const handlePointerDown = (event: any) => {
    setIsDragging(true)
    targetScale.current = 1.3
    // ドラッグ処理の実装...
  }
  
  // レンダリング（10行）
  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial />
    </mesh>
  )
}

// ===================================

// Framer Motion 3D実装
// 約35行のコード + シンプルな宣言的記述

function FramerMotion3DBox() {
  // 状態管理（2行）
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // レンダリング + アニメーション設定（30行）
  return (
    <motion.mesh
      position={[3, 0, 0]}
      animate={{
        scale: isHovered ? 1.2 : 1,
        rotateY: isHovered ? Math.PI / 4 : 0,
      }}
      whileDrag={{ scale: 1.3, rotateX: 0.2, rotateZ: 0.1 }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.2, rotateY: Math.PI / 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      drag
      dragConstraints={{ left: -2, right: 2, top: 2, bottom: -2 }}
      dragElastic={0.1}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={isDragging ? "#ff4757" : isHovered ? "#5352ed" : "#2ed573"} 
      />
    </motion.mesh>
  )
}`,
        highlights: [
          {
            id: "code-reduction",
            startLine: 60,
            endLine: 65,
            startColumn: 0,
            endColumn: 50,
            tooltip: {
              title: "コード量の削減",
              description: "Framer Motion 3Dを使用することで、同じ機能を約半分のコード量で実装できます。保守性と可読性が大幅に向上します。",
              documentationUrl: "https://www.framer.com/motion/",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          },
          {
            id: "declarative-vs-imperative",
            startLine: 70,
            endLine: 75,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "宣言的 vs 命令的",
              description: "従来の命令的なアニメーション実装に対し、Framer Motion 3Dは宣言的なアプローチを提供します。「何をするか」に集中でき、「どうやるか」の詳細は抽象化されます。",
              documentationUrl: "https://www.framer.com/motion/animation/",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          },
          {
            id: "built-in-features",
            startLine: 76,
            endLine: 80,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "組み込み機能",
              description: "ドラッグ制約、弾性効果、スプリング物理演算などが組み込まれており、手動実装が不要になります。",
              documentationUrl: "https://www.framer.com/motion/gestures/",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'performance-considerations',
    name: "パフォーマンスの考慮",
    description: "両実装方法のパフォーマンス特性と最適化のポイント",
    files: ["src/app/demos/library-integration/framer-motion-3d/components/FramerMotion3DDemo.tsx"],
    codeSections: [
      {
        title: "パフォーマンス比較",
        description: "実行時パフォーマンスとメモリ使用量の違い",
        fileName: "PerformanceComparison.tsx",
        code: `// パフォーマンス特性の比較

// 従来のReact Three Fiber
// ✅ 利点:
// - 直接的なThree.jsオブジェクト操作で高速
// - メモリ使用量が少ない
// - 細かい最適化が可能

// ❌ 欠点:
// - 毎フレーム実行されるuseFrameでCPU使用率が高い
// - 手動補間の計算コスト
// - 複雑な状態管理によるメモリリーク リスク

useFrame((state, delta) => {
  // 毎フレーム実行される処理
  // 60FPS = 1秒間に60回実行
  if (meshRef.current) {
    // 補間計算（CPU負荷）
    const scaleDiff = targetScale.current - currentScale.current
    currentScale.current += scaleDiff * delta * 8
    
    // Three.jsオブジェクトの直接操作（高速）
    meshRef.current.scale.setScalar(currentScale.current)
  }
})

// ===================================

// Framer Motion 3D
// ✅ 利点:
// - 最適化されたアニメーションエンジン
// - 必要時のみアニメーション実行
// - 自動的なパフォーマンス最適化
// - メモリ管理の自動化

// ❌ 欠点:
// - ライブラリのオーバーヘッド
// - 抽象化による制御の制限
// - バンドルサイズの増加

<motion.mesh
  animate={{ scale: isHovered ? 1.2 : 1 }}
  transition={{ 
    type: "spring", 
    stiffness: 300, 
    damping: 20 
  }}
>
  {/* 
    内部的に最適化されたアニメーション実行
    - 値が変更された時のみアニメーション開始
    - 完了時は自動的にアニメーション停止
    - GPU加速の活用
  */}
</motion.mesh>

// 最適化のベストプラクティス

// 1. 条件付きアニメーション
const shouldAnimate = useMemo(() => 
  isHovered || isDragging, [isHovered, isDragging]
)

// 2. アニメーション値のメモ化
const animateValues = useMemo(() => ({
  scale: isHovered ? 1.2 : 1,
  rotateY: isHovered ? Math.PI / 4 : 0,
}), [isHovered])

// 3. トランジション設定の最適化
const springConfig = useMemo(() => ({
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
}), [])`,
        highlights: [
          {
            id: "frame-based-performance",
            startLine: 10,
            endLine: 18,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "フレームベース処理",
              description: "useFrameは毎フレーム実行されるため、複雑な処理や多数のオブジェクトがある場合はパフォーマンスに影響します。必要最小限の処理に留めることが重要です。",
              documentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls"
            }
          },
          {
            id: "optimized-animation-engine",
            startLine: 35,
            endLine: 45,
            startColumn: 0,
            endColumn: 10,
            tooltip: {
              title: "最適化されたアニメーションエンジン",
              description: "Framer Motion 3Dは内部的に最適化されており、必要時のみアニメーションを実行し、完了時は自動的に停止します。GPU加速も活用されます。",
              documentationUrl: "https://www.framer.com/motion/guide-reduce-bundle-size/",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          },
          {
            id: "memoization-optimization",
            startLine: 48,
            endLine: 65,
            startColumn: 0,
            endColumn: 5,
            tooltip: {
              title: "メモ化による最適化",
              description: "useMemoを使用してアニメーション値やトランジション設定をメモ化することで、不要な再計算を防ぎパフォーマンスを向上させることができます。",
              documentationUrl: "https://reactjs.org/docs/hooks-reference.html#usememo",
              r3fDocumentationUrl: "https://www.framer.com/motion/guide-reduce-bundle-size/"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'use-cases-and-recommendations',
    name: "使用場面と推奨事項",
    description: "どちらの実装方法をいつ使うべきかのガイドライン",
    files: ["src/app/demos/library-integration/framer-motion-3d/components/FramerMotion3DDemo.tsx"],
    codeSections: [
      {
        title: "使用場面の判断基準",
        description: "プロジェクトの要件に応じた実装方法の選択指針",
        fileName: "UseCaseGuidelines.tsx",
        code: `// 従来のReact Three Fiberを選ぶべき場面

// 1. 高いパフォーマンスが要求される場合
function HighPerformanceScene() {
  // 数百〜数千のオブジェクトを扱う場合
  // ゲームやリアルタイムシミュレーション
  // 60FPS以上の高フレームレートが必要
  
  useFrame((state, delta) => {
    // 直接的なThree.jsオブジェクト操作
    // 最小限のオーバーヘッド
    objects.forEach(obj => {
      obj.rotation.y += delta * obj.speed
    })
  })
}

// 2. 細かい制御が必要な場合
function PreciseControl() {
  useFrame((state, delta) => {
    // カスタムイージング関数
    // 複雑な物理演算
    // フレーム単位での精密な制御
    const customEasing = (t: number) => t * t * (3 - 2 * t)
    const progress = customEasing(animationProgress)
    mesh.position.lerp(targetPosition, progress)
  })
}

// 3. バンドルサイズを最小化したい場合
// - 追加ライブラリの依存を避けたい
// - モバイル向けの軽量アプリケーション
// - 既存のThree.jsコードベースとの統合

// ===================================

// Framer Motion 3Dを選ぶべき場面

// 1. 開発速度を重視する場合
function RapidPrototyping() {
  return (
    <motion.mesh
      // 短時間でプロトタイプを作成
      // 複雑なアニメーションロジックが不要
      animate={{ rotateY: Math.PI * 2 }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <boxGeometry />
      <meshStandardMaterial />
    </motion.mesh>
  )
}

// 2. UI/UXに重点を置く場合
function InteractiveUI() {
  return (
    <motion.group>
      {/* ユーザーインタラクションが豊富 */}
      {/* 直感的なジェスチャー操作 */}
      {/* 滑らかなトランジション */}
      <motion.mesh
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        drag
        dragConstraints={{ left: -100, right: 100 }}
      />
    </motion.group>
  )
}

// 3. チーム開発での保守性を重視する場合
function MaintainableCode() {
  // 宣言的で読みやすいコード
  // アニメーションの意図が明確
  // バグの発生しにくい実装
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, rotateY: 10 }
  }
  
  return (
    <motion.mesh
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    />
  )
}

// ハイブリッドアプローチ
function HybridImplementation() {
  // 両方の利点を活用
  
  // パフォーマンスが重要な部分は従来の方法
  useFrame((state, delta) => {
    // 大量のパーティクルシステム
    particles.forEach(particle => {
      particle.position.add(particle.velocity.clone().multiplyScalar(delta))
    })
  })
  
  // UI要素はFramer Motion 3D
  return (
    <group>
      {/* パフォーマンス重視の要素 */}
      <ParticleSystem />
      
      {/* インタラクション重視の要素 */}
      <motion.mesh
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <sphereGeometry />
        <meshStandardMaterial />
      </motion.mesh>
    </group>
  )
}

// 推奨事項まとめ

/*
従来のReact Three Fiber:
✅ ゲーム開発
✅ データビジュアライゼーション（大量データ）
✅ リアルタイムシミュレーション
✅ モバイル向け軽量アプリ
✅ 既存Three.jsコードベースの移植

Framer Motion 3D:
✅ プロトタイピング
✅ マーケティングサイト
✅ インタラクティブな製品紹介
✅ 教育コンテンツ
✅ アートプロジェクト
✅ 短期間での開発

ハイブリッド:
✅ 複雑なWebアプリケーション
✅ 段階的な移行プロジェクト
✅ パフォーマンスとUXの両立が必要
*/`,
        highlights: [
          {
            id: "performance-critical",
            startLine: 3,
            endLine: 12,
            startColumn: 0,
            endColumn: 4,
            tooltip: {
              title: "パフォーマンス重視の場面",
              description: "大量のオブジェクト、高フレームレート、リアルタイム処理が必要な場合は従来のReact Three Fiberが適しています。",
              documentationUrl: "https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/performance-pitfalls"
            }
          },
          {
            id: "rapid-development",
            startLine: 45,
            endLine: 55,
            startColumn: 0,
            endColumn: 4,
            tooltip: {
              title: "開発速度重視の場面",
              description: "プロトタイピングや短期間での開発、UI/UXに重点を置く場合はFramer Motion 3Dが効率的です。",
              documentationUrl: "https://www.framer.com/motion/",
              r3fDocumentationUrl: "https://www.framer.com/motion/three-introduction/"
            }
          },
          {
            id: "hybrid-approach",
            startLine: 85,
            endLine: 105,
            startColumn: 0,
            endColumn: 4,
            tooltip: {
              title: "ハイブリッドアプローチ",
              description: "パフォーマンスが重要な部分は従来の方法、UI要素はFramer Motion 3Dを使用することで、両方の利点を活用できます。",
              documentationUrl: "https://www.framer.com/motion/guide-reduce-bundle-size/",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance"
            }
          }
        ]
      }
    ]
  }
]
