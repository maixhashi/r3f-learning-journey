import { FeatureFile } from '../../types'

export const rotationFeatures: FeatureFile[] = [
  {
    id: 'useframe-animation',
    name: "useFrameアニメーション",
    description: "useFrameフックを使用した連続的な回転アニメーション",
    files: ["src/app/demos/animations/rotation/components/RotationAnimation.tsx"],
    codeSections: [
      {
        title: "useFrameによる回転アニメーション",
        description: "毎フレーム実行されるuseFrameフックで連続的な回転を実現",
        fileName: "RotationAnimation.tsx",
        code: `export function RotationAnimation() {
  const meshRef = useRef<Mesh>(null)

  // useFrame: 毎フレーム実行されるフック
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Y軸を中心に回転
      meshRef.current.rotation.y += delta
      // X軸も少し回転させて立体的に
      meshRef.current.rotation.x += delta * 0.5
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      <Text position={[0, -2.5, 0]} fontSize={0.5} color="white" anchorX="center">
        Rotating Box
      </Text>
    </group>
  )
}`,
        highlights: [
          {
            id: "useframe",
            startLine: 5,
            endLine: 11,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "useFrame",
              description: "React Three Fiberのフックで、毎フレーム実行される関数を登録できます。アニメーションの実装に必須のフックです。",
              documentationUrl: "https://threejs.org/docs/#manual/en/introduction/Animation-system",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "delta",
            startLine: 5,
            endLine: 5,
            startColumn: 20,
            endColumn: 25,
            tooltip: {
              title: "delta",
              description: "前フレームからの経過時間（秒）です。フレームレートに依存しない滑らかなアニメーションを作成するために使用します。",
              documentationUrl: "https://threejs.org/docs/#manual/en/introduction/Animation-system",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "rotation",
            startLine: 7,
            endLine: 10,
            startColumn: 6,
            endColumn: 45,
            tooltip: {
              title: "rotation",
              description: "3Dオブジェクトの回転を制御するプロパティです。x, y, z軸それぞれの回転角度をラジアン単位で指定します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.rotation",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "ref",
            startLine: 2,
            endLine: 2,
            startColumn: 2,
            endColumn: 35,
            tooltip: {
              title: "useRef",
              description: "Reactのフックで、DOM要素や3Dオブジェクトへの参照を保持します。アニメーションで直接オブジェクトを操作する際に必要です。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene#animating-the-cube"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'animation-concepts',
    name: "アニメーションの概念",
    description: "3Dアニメーションの基本概念とフレームレート",
    files: ["src/app/demos/animations/rotation/components/RotationAnimation.tsx"],
    codeSections: [
      {
        title: "フレームベースアニメーション",
        description: "時間ベースのアニメーションでフレームレートに依存しない動作を実現",
        fileName: "RotationAnimation.tsx",
        code: `// useFrame: 毎フレーム実行されるフック
useFrame((state, delta) => {
  if (meshRef.current) {
    // delta を使用してフレームレートに依存しないアニメーション
    // delta = 前フレームからの経過時間（秒）
    
    // 1秒間に1ラジアン回転（約57.3度）
    meshRef.current.rotation.y += delta
    
    // X軸は半分の速度で回転
    meshRef.current.rotation.x += delta * 0.5
    
    // 固定値を使用した場合（非推奨）
    // meshRef.current.rotation.y += 0.01 // フレームレート依存
  }
})`,
        highlights: [
          {
            id: "time-based",
            startLine: 6,
            endLine: 6,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "時間ベースアニメーション",
              description: "deltaを使用することで、60FPSでも120FPSでも同じ速度でアニメーションが実行されます。これにより、デバイスの性能に関係なく一貫した動作を実現できます。",
              documentationUrl: "https://threejs.org/docs/#manual/en/introduction/Animation-system",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "rotation-speed",
            startLine: 9,
            endLine: 9,
            startColumn: 4,
            endColumn: 45,
            tooltip: {
              title: "回転速度の制御",
              description: "deltaに係数を掛けることで回転速度を調整できます。0.5を掛けると半分の速度、2を掛けると2倍の速度になります。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.rotation",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene#animating-the-cube"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-animations',
    name: "高度なアニメーション",
    description: "数学関数を使用した複雑なアニメーションパターン",
    files: ["src/app/demos/animations/rotation/components/RotationAnimation.tsx"],
    codeSections: [
      {
        title: "数学関数を使ったアニメーション",
        description: "sin/cos関数を使用した波形アニメーションの例",
        fileName: "AdvancedAnimation.tsx",
        code: `// より複雑なアニメーションの例
useFrame((state, delta) => {
  if (meshRef.current) {
    // 時間を取得
    const time = state.clock.elapsedTime
    
    // sin波を使った上下運動
    meshRef.current.position.y = Math.sin(time * 2) * 0.5
    
    // cos波を使った左右運動
    meshRef.current.position.x = Math.cos(time * 1.5) * 1.5
    
    // 時間に基づく回転（一定速度）
    meshRef.current.rotation.y = time
    
    // 振動する回転
    meshRef.current.rotation.z = Math.sin(time * 3) * 0.2
    
    // スケールアニメーション
    const scale = 1 + Math.sin(time * 4) * 0.1
    meshRef.current.scale.setScalar(scale)
  }
})`,
        highlights: [
          {
            id: "elapsed-time",
            startLine: 4,
            endLine: 4,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "elapsedTime",
              description: "アニメーション開始からの経過時間（秒）を取得できます。数学関数と組み合わせて周期的なアニメーションを作成する際に使用します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Clock",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "sin-cos",
            startLine: 6,
            endLine: 9,
            startColumn: 4,
            endColumn: 50,
            tooltip: {
              title: "三角関数アニメーション",
              description: "Math.sin()とMath.cos()を使用して滑らかな周期的動作を作成できます。波の振幅や周波数を調整して様々なパターンを実現できます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "scale-animation",
            startLine: 17,
            endLine: 18,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "スケールアニメーション",
              description: "scale.setScalar()を使用してオブジェクトのサイズを動的に変更できます。呼吸するような効果や強調表現に使用されます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.scale",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#transformations"
            }
          }
        ]
      }
    ]
  }
]