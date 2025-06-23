import { FeatureFile } from '../../types'

export const orbitFeatures: FeatureFile[] = [
  {
    id: 'orbit-animation',
    name: "軌道アニメーション",
    description: "複数のオブジェクトが異なる速度で軌道運動するアニメーション",
    files: ["src/app/demos/animations/orbit/components/OrbitAnimation.tsx"],
    codeSections: [
      {
        title: "階層的な軌道システム",
        description: "groupを使用した階層構造で複雑な軌道運動を実現",
        fileName: "OrbitAnimation.tsx",
        code: `export function OrbitAnimation() {
  const orbitGroupRef = useRef<Group>(null)
  const planetRef = useRef<Mesh>(null)
  const moonRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (orbitGroupRef.current && planetRef.current && moonRef.current) {
      // 太陽の周りを公転（軌道運動）
      orbitGroupRef.current.rotation.y += delta * 0.5
      
      // 惑星の自転
      planetRef.current.rotation.y += delta * 2
      
      // 月の公転（惑星の周り）
      moonRef.current.rotation.y += delta * 3
    }
  })

  return (
    <group>
      {/* 太陽（中心） */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffaa00" emissiveIntensity={0.3} />
      </mesh>
      
      {/* 軌道グループ */}
      <group ref={orbitGroupRef}>
        {/* 惑星 */}
        <mesh ref={planetRef} position={[4, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>
        
        {/* 月の軌道 */}
        <group position={[4, 0, 0]} ref={moonRef}>
          <mesh position={[1.5, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
        </group>
      </group>
    </group>
  )
}`,
        highlights: [
          {
            id: "group-hierarchy",
            startLine: 23,
            endLine: 35,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "階層構造",
              description: "groupを入れ子にすることで、親の回転に子が追従する階層的な動きを実現できます。太陽系のような複雑な軌道システムを表現するのに適しています。",
              documentationUrl: "https://threejs.org/docs/#api/en/objects/Group",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#groups"
            }
          },
          {
            id: "orbit-speeds",
            startLine: 8,
            endLine: 14,
            startColumn: 6,
            endColumn: 45,
            tooltip: {
              title: "軌道速度",
              description: "異なる係数を使用することで、各天体の公転・自転速度を個別に制御できます。現実的な天体の動きを模倣できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.rotation",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "position-offset",
            startLine: 26,
            endLine: 26,
            startColumn: 8,
            endColumn: 50,
            tooltip: {
              title: "位置オフセット",
              description: "position属性で軌道半径を設定します。groupの回転中心からの距離が軌道の大きさを決定します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.position",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'visual-guides',
    name: "視覚的ガイド",
    description: "軌道線やエフェクトによる視覚的な補助要素",
    files: ["src/app/demos/animations/orbit/components/OrbitAnimation.tsx"],
    codeSections: [
      {
        title: "軌道線の表示",
        description: "ringGeometryを使用した軌道の可視化",
        fileName: "OrbitAnimation.tsx",
        code: `{/* 軌道線（視覚的ガイド） */}
<mesh rotation={[Math.PI / 2, 0, 0]}>
  <ringGeometry args={[3.9, 4.1, 64]} />
  <meshBasicMaterial color="#444444" transparent opacity={0.3} />
</mesh>

{/* 月の軌道線 */}
<mesh rotation={[Math.PI / 2, 0, 0]}>
  <ringGeometry args={[1.4, 1.6, 32]} />
  <meshBasicMaterial color="#666666" transparent opacity={0.2} />
</mesh>

{/* 発光する太陽 */}
<meshStandardMaterial 
  color="#ffff00" 
  emissive="#ffaa00" 
  emissiveIntensity={0.3} 
/>`,
        highlights: [
          {
            id: "ring-geometry",
            startLine: 2,
            endLine: 4,
            startColumn: 2,
            endColumn: 8,
            tooltip: {
              title: "ringGeometry",
              description: "リング状のジオメトリを作成します。args=[内径, 外径, セグメント数]で軌道線を表現できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/geometries/RingGeometry",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#geometries"
            }
          },
          {
            id: "transparency",
            startLine: 4,
            endLine: 4,
            startColumn: 2,
            endColumn: 70,
            tooltip: {
              title: "透明度",
              description: "transparent=trueとopacityで半透明な軌道線を作成し、メインオブジェクトを邪魔しない視覚的ガイドを提供します。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/Material.transparent",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          },
          {
            id: "emissive",
            startLine: 14,
            endLine: 17,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "発光マテリアル",
              description: "emissiveプロパティで自己発光する効果を作成できます。太陽のような光源オブジェクトの表現に適しています。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.emissive",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'orbit-visualization',
    name: "軌道の可視化",
    description: "軌道線による動きの可視化とユーザビリティの向上",
    files: ["src/app/demos/animations/orbit/components/OrbitAnimation.tsx"],
    codeSections: [
      {
        title: "軌道線の実装",
        description: "固定軌道線と回転軌道線の使い分け",
        fileName: "OrbitAnimation.tsx",
        code: `{/* 地球の軌道線（固定・回転しない） */}
<mesh rotation={[Math.PI / 2, 0, 0]}>
  <ringGeometry args={[3.95, 4.05, 128]} />
  <meshBasicMaterial 
    color="#4a90e2" 
    transparent 
    opacity={0.15}
    side={2} // DoubleSide - 両面描画
  />
</mesh>

{/* 月の軌道線（地球の位置に固定） */}
<mesh position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
  <ringGeometry args={[1.45, 1.55, 64]} />
  <meshBasicMaterial 
    color="#cccccc" 
    transparent 
    opacity={0.12}
    side={2}
  />
</mesh>`,
        highlights: [
          {
            id: "fixed-orbit",
            startLine: 1,
            endLine: 8,
            startColumn: 0,
            endColumn: 8,
            tooltip: {
              title: "固定軌道線",
              description: "回転グループの外に配置することで、軌道線自体は回転せず、軌道の形状のみを表示します。地球の軌道のような大きな軌道に適用します。",
              documentationUrl: "https://threejs.org/docs/#api/en/geometries/RingGeometry",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#geometries"
            }
          },
          {
            id: "relative-orbit",
            startLine: 10,
            endLine: 17,
            startColumn: 0,
            endColumn: 8,
            tooltip: {
              title: "相対軌道線",
              description: "回転グループ内に配置し、親オブジェクトの位置に追従する軌道線です。月の軌道のように、移動する中心点を持つ軌道に使用します。",
              documentationUrl: "https://threejs.org/docs/#api/en/geometries/RingGeometry",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#groups"
            }
          },
          {
            id: "opacity-settings",
            startLine: 4,
            endLine: 6,
            startColumn: 4,
            endColumn: 20,
            tooltip: {
              title: "透明度の調整",
              description: "軌道線は非常に薄い透明度（0.12-0.15）に設定し、メインオブジェクトの視認性を損なわないようにします。side={2}で両面描画を有効にします。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/Material.transparent",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'complex-orbits',
    name: "複雑な軌道パターン",
    description: "楕円軌道や不規則な軌道パターンの実装",
    files: ["src/app/demos/animations/orbit/components/OrbitAnimation.tsx"],
    codeSections: [
      {
        title: "楕円軌道と複雑なパターン",
        description: "数学関数を使用した楕円軌道や螺旋軌道の実装例",
        fileName: "ComplexOrbit.tsx",
        code: `// 楕円軌道の実装例
useFrame((state, delta) => {
  const time = state.clock.elapsedTime
  
  // 楕円軌道（異なる半径のsin/cos）
  const a = 4 // 長軸
  const b = 2 // 短軸
  const angle = time * 0.5
  
  if (planetRef.current) {
    planetRef.current.position.x = Math.cos(angle) * a
    planetRef.current.position.z = Math.sin(angle) * b
  }
  
  // 螺旋軌道
  if (spiralRef.current) {
    const spiralRadius = 2 + Math.sin(time * 0.3) * 0.5
    const spiralAngle = time * 2
    spiralRef.current.position.x = Math.cos(spiralAngle) * spiralRadius
    spiralRef.current.position.z = Math.sin(spiralAngle) * spiralRadius
    spiralRef.current.position.y = Math.sin(time * 0.8) * 1
  }
  
  // 8の字軌道（リサージュ曲線）
  if (figureEightRef.current) {
    const t = time * 0.7
    figureEightRef.current.position.x = Math.sin(t) * 3
    figureEightRef.current.position.z = Math.sin(t * 2) * 1.5
  }
})`,
        highlights: [
          {
            id: "elliptical-orbit",
            startLine: 5,
            endLine: 12,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "楕円軌道",
              description: "異なる半径のsin/cos関数を使用して楕円軌道を作成できます。長軸と短軸の比率で楕円の形状を制御します。",
              documentationUrl: "https://en.wikipedia.org/wiki/Elliptic_orbit",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "spiral-orbit",
            startLine: 14,
            endLine: 20,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "螺旋軌道",
              description: "半径を時間関数で変化させることで螺旋状の軌道を作成できます。Y軸の変化も加えて3次元的な動きを実現します。",
              documentationUrl: "https://en.wikipedia.org/wiki/Spiral",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          },
          {
            id: "lissajous",
            startLine: 22,
            endLine: 27,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "リサージュ曲線",
              description: "異なる周波数のsin関数を組み合わせて8の字やその他の複雑なパターンを作成できます。美しい幾何学的軌道を実現します。",
              documentationUrl: "https://en.wikipedia.org/wiki/Lissajous_curve",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          }
        ]
      }
    ]
  }
]