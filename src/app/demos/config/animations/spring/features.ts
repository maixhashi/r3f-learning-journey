import { FeatureFile } from '../../types'

export const springFeatures: FeatureFile[] = [
  {
    id: 'react-spring-basics',
    name: "React Spring基本",
    description: "react-springを使用した基本的なスプリングアニメーション",
    files: ["src/app/demos/animations/spring/components/SpringAnimation.tsx"],
    codeSections: [
      {
        title: "useSpringフックの基本使用法",
        description: "react-springのuseSpringフックを使用したアニメーション設定",
        fileName: "SpringAnimation.tsx",
        code: `const { scale, position, rotation, color } = useSpring({
  // クリック状態に応じてスケールを変更
  scale: clicked ? [1.5, 1.5, 1.5] : [1, 1, 1],
  
  // ホバー状態に応じて位置を変更
  position: hovered ? [0, 1, 0] : [0, 0, 0],
  
  // クリック状態に応じて回転
  rotation: clicked ? [0, Math.PI, 0] : [0, 0, 0],
  
  // ホバー状態に応じて色を変更
  color: hovered ? '#ff6b6b' : '#4ecdc4',
  
  // アニメーション設定
  config: {
    tension: 300,  // バネの強さ
    friction: 10,  // 摩擦（減衰）
  }
})`,
        highlights: [
          {
            id: "usespring",
            startLine: 1,
            endLine: 1,
            startColumn: 7,
            endColumn: 56,
            tooltip: {
              title: "useSpring",
              description: "react-springの基本フックで、状態の変化に応じて物理ベースのアニメーションを作成します。バネの物理法則に基づいた自然な動きを実現できます。",
              documentationUrl: "https://react-spring.dev/docs/components/use-spring",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-spring/introduction"
            }
          },
          {
            id: "config",
            startLine: 12,
            endLine: 16,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "Spring Config",
              description: "tensionはバネの強さ、frictionは摩擦（減衰）を制御します。値を調整することで、アニメーションの速度や弾み具合を変更できます。",
              documentationUrl: "https://react-spring.dev/docs/advanced/config",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-spring/advanced/config"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'spring-interactions',
    name: "インタラクティブアニメーション",
    description: "ユーザーインタラクションに応じたスプリングアニメーション",
    files: ["src/app/demos/animations/spring/components/SpringAnimation.tsx"],
    codeSections: [
      {
        title: "クリック・ホバーインタラクション",
        description: "マウスイベントに応じてアニメーションを制御",
        fileName: "SpringAnimation.tsx",
        code: `<animated.mesh
  scale={scale}
  position={position.to((x, y, z) => [x, y + floatY.get(), z])}
  rotation={rotation.to((x, y, z) => [x, y + autoRotation.get(), z])}
  onClick={() => setClicked(!clicked)}
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
  castShadow
  receiveShadow
>
  <boxGeometry args={[2, 2, 2]} />
  <animated.meshStandardMaterial color={color} />
</animated.mesh>`,
        highlights: [
          {
            id: "animated-mesh",
            startLine: 1,
            endLine: 1,
            startColumn: 1,
            endColumn: 14,
            tooltip: {
              title: "animated.mesh",
              description: "react-springのanimatedコンポーネントを使用することで、スプリングアニメーションの値を3Dオブジェクトに適用できます。",
              documentationUrl: "https://react-spring.dev/docs/components/animated",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-spring/animated"
            }
          },
          {
            id: "pointer-events",
            startLine: 5,
            endLine: 7,
            startColumn: 2,
            endColumn: 40,
            tooltip: {
              title: "Pointer Events",
              description: "React Three Fiberでは、3Dオブジェクトに直接マウスイベントを設定できます。onPointerOverやonPointerOutでホバー状態を検出できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/events"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-spring-patterns',
    name: "高度なスプリングパターン",
    description: "ループ、遅延、複合アニメーションの実装",
    files: ["src/app/demos/animations/spring/components/SpringAnimation.tsx"],
    codeSections: [
      {
        title: "ループと遅延アニメーション",
        description: "連続的なアニメーションと時間差のある複数オブジェクトの制御",
        fileName: "SpringAnimation.tsx",
        code: `// 自動回転アニメーション
const { autoRotation } = useSpring({
  from: { autoRotation: 0 },
  to: { autoRotation: Math.PI * 2 },
  loop: true,
  config: config.slow,
})

// 浮遊アニメーション
const { floatY } = useSpring({
  from: { floatY: -0.5 },
  to: { floatY: 0.5 },
  loop: { reverse: true },
  config: config.gentle,
})

// 遅延付きの波状アニメーション
const { waveY } = useSpring({
  from: { waveY: 0 },
  to: { waveY: Math.PI * 2 },
  loop: true,
  delay: index * 200, // 各球体に遅延を追加
  config: config.slow,
})`,
        highlights: [
          {
            id: "loop-animation",
            startLine: 2,
            endLine: 6,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "Loop Animation",
              description: "loop: trueで連続的なアニメーション、loop: { reverse: true }で往復アニメーションを作成できます。自然な繰り返し動作を実現します。",
              documentationUrl: "https://react-spring.dev/docs/advanced/loop",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-spring/advanced/loop"
            }
          },
          {
            id: "delay",
            startLine: 18,
            endLine: 18,
            startColumn: 2,
            endColumn: 25,
            tooltip: {
              title: "Animation Delay",
              description: "delayプロパティを使用してアニメーションの開始タイミングを遅らせることができます。複数のオブジェクトで時間差のある動きを作成する際に有効です。",
              documentationUrl: "https://react-spring.dev/docs/advanced/delay",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-spring/advanced/delay"
            }
          },
          {
            id: "config-presets",
            startLine: 6,
            endLine: 6,
            startColumn: 11,
            endColumn: 23,
            tooltip: {
              title: "Config Presets",
              description: "react-springには事前定義された設定（config.slow, config.gentle, config.wobbly等）があり、用途に応じて適切なアニメーション特性を選択できます。",
              documentationUrl: "https://react-spring.dev/docs/advanced/config#presets",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-spring/advanced/config"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'spring-performance',
    name: "パフォーマンス最適化",
    description: "スプリングアニメーションのパフォーマンス最適化テクニック",
    files: ["src/app/demos/animations/spring/components/SpringAnimation.tsx"],
    codeSections: [
      {
        title: "効率的なアニメーション管理",
        description: "複数オブジェクトのアニメーションを効率的に管理する方法",
        fileName: "SpringAnimation.tsx",
        code: `// 複数のスプリング球体コンポーネント
function SpringSpheres() {
  const spheres = Array.from({ length: 5 }, (_, i) => i)
  
  return (
    <group>
      {spheres.map((index) => (
        <SpringSphere key={index} index={index} />
      ))}
    </group>
  )
}

// 個別のスプリング球体
function SpringSphere({ index }: { index: number }) {
  const [active, setActive] = useState(false)
  
  // 各球体の位置を円形に配置
  const angle = (index / 5) * Math.PI * 2
  const radius = 4
  const baseX = Math.cos(angle) * radius
  const baseZ = Math.sin(angle) * radius

  // スプリングアニメーション
  const { scale, positionY, color } = useSpring({
    scale: active ? 1.5 : 1,
    positionY: active ? 1 : 0,
    color: active ? '#ff9ff3' : '#54a0ff',
    config: config.wobbly,
  })
}`,
        highlights: [
          {
            id: "component-separation",
            startLine: 13,
            endLine: 13,
            startColumn: 1,
            endColumn: 50,
            tooltip: {
              title: "Component Separation",
              description: "各アニメーションオブジェクトを個別のコンポーネントに分離することで、状態管理を効率化し、不要な再レンダリングを防ぐことができます。",
              documentationUrl: "https://react.dev/learn/thinking-in-react",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/best-practices"
            }
          },
          {
            id: "mathematical-positioning",
            startLine: 16,
            endLine: 20,
            startColumn: 2,
            endColumn: 35,
            tooltip: {
              title: "Mathematical Positioning",
              description: "三角関数を使用して複数のオブジェクトを規則的に配置することで、美しいパターンを作成できます。計算ベースの配置により、動的な数の調整も容易になります。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math",
              r3fDocumentationUrl: "https://threejs.org/docs/#api/en/math/MathUtils"
            }
          }
        ]
      }
    ]
  }
]
