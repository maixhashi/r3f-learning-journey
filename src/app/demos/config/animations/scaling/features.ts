import { FeatureFile } from '../../types'

export const scalingFeatures: FeatureFile[] = [
  {
    id: 'scaling-animation',
    name: "スケーリングアニメーション",
    description: "sin波を使用した呼吸するようなスケーリングアニメーション",
    files: ["src/app/demos/animations/scaling/components/ScalingAnimation.tsx"],
    codeSections: [
      {
        title: "sin波によるスケーリング",
        description: "Math.sin()を使用して滑らかなスケーリングアニメーションを実現",
        fileName: "ScalingAnimation.tsx",
        code: `export function ScalingAnimation() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // sin波を使った呼吸するようなスケーリング
      const scale = 1 + Math.sin(time * 2) * 0.3
      meshRef.current.scale.setScalar(scale)
      
      // 軽い回転も追加して動きを分かりやすく
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      {/* 参考用の固定サイズの枠 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  )
}`,
        highlights: [
          {
            id: "sin-scaling",
            startLine: 7,
            endLine: 8,
            startColumn: 6,
            endColumn: 40,
            tooltip: {
              title: "sin波スケーリング",
              description: "Math.sin()を使用して-1から1の値を生成し、それをスケール値に変換します。係数0.3により、0.7倍から1.3倍の範囲でスケーリングします。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          },
          {
            id: "setscalar",
            startLine: 8,
            endLine: 8,
            startColumn: 6,
            endColumn: 45,
            tooltip: {
              title: "setScalar",
              description: "scale.setScalar()は、x、y、z軸すべてに同じスケール値を適用します。均等なスケーリングを行う際に便利です。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3.setScalar",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          },
          {
            id: "elapsed-time",
            startLine: 5,
            endLine: 5,
            startColumn: 6,
            endColumn: 40,
            tooltip: {
              title: "elapsedTime",
              description: "アニメーション開始からの経過時間を取得します。時間ベースのアニメーションで一定の周期を作る際に使用します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Clock",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'scaling-patterns',
    name: "スケーリングパターン",
    description: "様々なスケーリングアニメーションのパターン",
    files: ["src/app/demos/animations/scaling/components/ScalingAnimation.tsx"],
    codeSections: [
      {
        title: "多様なスケーリングパターン",
        description: "異なる数学関数を使用したスケーリングアニメーションの例",
        fileName: "ScalingPatterns.tsx",
        code: `// 様々なスケーリングパターンの例
useFrame((state, delta) => {
  const time = state.clock.elapsedTime
  
  // パターン1: 基本的なsin波スケーリング
  const basicScale = 1 + Math.sin(time * 2) * 0.3
  
  // パターン2: 脈動するスケーリング（常に正の値）
  const pulseScale = 0.5 + Math.abs(Math.sin(time * 3)) * 0.8
  
  // パターン3: 段階的なスケーリング
  const stepScale = 1 + Math.floor(Math.sin(time) * 3) * 0.2
  
  // パターン4: 軸別スケーリング
  if (meshRef.current) {
    meshRef.current.scale.set(
      1 + Math.sin(time * 2) * 0.3,     // X軸
      1 + Math.cos(time * 1.5) * 0.4,   // Y軸
      1 + Math.sin(time * 2.5) * 0.2    // Z軸
    )
  }
  
  // パターン5: イージング関数を使用
  const easeInOut = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }
  const easedScale = 1 + easeInOut(Math.sin(time) * 0.5 + 0.5) * 0.5
})`,
        highlights: [
          {
            id: "pulse-pattern",
            startLine: 7,
            endLine: 7,
            startColumn: 2,
            endColumn: 55,
            tooltip: {
              title: "脈動パターン",
              description: "Math.abs()を使用してsin波の負の値を正に変換し、常に拡大方向の脈動を作成します。心拍のような効果を演出できます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          },
          {
            id: "axis-scaling",
            startLine: 13,
            endLine: 17,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "軸別スケーリング",
              description: "scale.set()を使用してx、y、z軸それぞれに異なるスケール値を適用できます。非均等なスケーリングで面白い変形効果を作れます。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3.set",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          },
          {
            id: "easing-function",
            startLine: 20,
            endLine: 24,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "イージング関数",
              description: "カスタムイージング関数を使用して、より自然で滑らかなアニメーションカーブを作成できます。ease-in-outは開始と終了が緩やかになります。",
              documentationUrl: "https://easings.net/",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'wireframe-reference',
    name: "ワイヤーフレーム参照",
    description: "アニメーションの範囲を視覚化するワイヤーフレーム",
    files: ["src/app/demos/animations/scaling/components/ScalingAnimation.tsx"],
    codeSections: [
      {
        title: "参照用ワイヤーフレーム",
        description: "スケーリングの範囲を示すワイヤーフレームの実装",
        fileName: "ScalingAnimation.tsx",
        code: `return (
  <group>
    {/* メインのスケーリングオブジェクト */}
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4ecdc4" />
    </mesh>
    
    {/* 参考用の固定サイズの枠 */}
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.3, 16, 16]} />
      <meshBasicMaterial 
        color="#ffffff" 
        wireframe 
        opacity={0.3} 
        transparent 
      />
    </mesh>
  </group>
)`,
        highlights: [
          {
            id: "wireframe",
            startLine: 12,
            endLine: 17,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "ワイヤーフレーム表示",
              description: "wireframe=trueでオブジェクトを線だけで表示できます。透明度と組み合わせて参照用のガイドとして使用できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshBasicMaterial.wireframe",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/materials"
            }
          },
          {
            id: "transparency",
            startLine: 14,
            endLine: 15,
            startColumn: 8,
            endColumn: 20,
            tooltip: {
              title: "透明度設定",
              description: "opacity（不透明度）とtransparent=trueを組み合わせて半透明表示を実現します。参照用オブジェクトを目立たなくする際に使用します。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/Material.opacity",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/materials"
            }
          },
          {
            id: "mesh-basic-material",
            startLine: 11,
            endLine: 11,
            startColumn: 6,
            endColumn: 25,
            tooltip: {
              title: "meshBasicMaterial",
              description: "ライティングの影響を受けない基本的なマテリアルです。ワイヤーフレームや参照用オブジェクトに適しています。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshBasicMaterial",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/materials"
            }
          }
        ]
      }
    ]
  }
]
