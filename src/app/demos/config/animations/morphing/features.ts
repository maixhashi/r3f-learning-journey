import { FeatureFile } from '../../types'

export const morphingFeatures: FeatureFile[] = [
  {
    id: 'geometry-morphing',
    name: "ジオメトリモーフィング",
    description: "異なる3D形状間での動的な変化アニメーション",
    files: ["src/app/demos/animations/morphing/components/MorphingAnimation.tsx"],
    codeSections: [
      {
        title: "形状変化の実装",
        description: "時間ベースで異なるジオメトリに切り替える基本的なモーフィング",
        fileName: "MorphingAnimation.tsx",
        code: `export function MorphingAnimation() {
  const meshRef = useRef<Mesh>(null)
  const [currentShape, setCurrentShape] = useState(0)
  const timeRef = useRef(0)

  // 形状の配列
  const shapes = [
    { geometry: new BoxGeometry(2, 2, 2), name: 'Box' },
    { geometry: new SphereGeometry(1.2, 32, 32), name: 'Sphere' },
    { geometry: new ConeGeometry(1.2, 2.5, 32), name: 'Cone' },
    { geometry: new CylinderGeometry(1, 1, 2.5, 32), name: 'Cylinder' }
  ]

  useFrame((state, delta) => {
    timeRef.current += delta

    if (meshRef.current) {
      // 形状変化のタイミング制御（3秒ごと）
      const shapeChangeInterval = 3
      const currentTime = timeRef.current % (shapeChangeInterval * shapes.length)
      const newShapeIndex = Math.floor(currentTime / shapeChangeInterval)
      
      if (newShapeIndex !== currentShape) {
        setCurrentShape(newShapeIndex)
        meshRef.current.geometry = shapes[newShapeIndex].geometry
      }
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      geometry={shapes[currentShape].geometry}
    >
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "geometry-array",
            startLine: 6,
            endLine: 11,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "ジオメトリ配列",
              description: "異なる3D形状のジオメトリを配列で管理します。BoxGeometry、SphereGeometry、ConeGeometry、CylinderGeometryなど様々な形状を使用できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/geometries/BoxGeometry",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#geometries"
            }
          },
          {
            id: "shape-switching",
            startLine: 18,
            endLine: 23,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "形状切り替えロジック",
              description: "時間ベースで形状のインデックスを計算し、条件に応じてジオメトリを動的に変更します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/BufferGeometry",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#geometries"
            }
          },
          {
            id: "geometry-assignment",
            startLine: 22,
            endLine: 22,
            startColumn: 8,
            endColumn: 65,
            tooltip: {
              title: "ジオメトリの動的割り当て",
              description: "meshRef.current.geometryに新しいジオメトリを割り当てることで、実行時に3D形状を変更できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/objects/Mesh.geometry",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#meshes"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'transition-effects',
    name: "トランジション効果",
    description: "形状変化時の視覚的効果とアニメーション",
    files: ["src/app/demos/animations/morphing/components/MorphingAnimation.tsx"],
    codeSections: [
      {
        title: "スケールとカラーアニメーション",
        description: "形状変化時の強調効果と連続的な色変化",
        fileName: "MorphingAnimation.tsx",
        code: `useFrame((state, delta) => {
  timeRef.current += delta

  if (meshRef.current) {
    // スケールアニメーション（形状変化時の強調効果）
    const localTime = currentTime % shapeChangeInterval
    if (localTime < 0.5) {
      // 変化直後に少し大きくする
      const scale = 1 + Math.sin(localTime * Math.PI * 4) * 0.1
      meshRef.current.scale.setScalar(scale)
    } else {
      meshRef.current.scale.setScalar(1)
    }

    // 色の変化
    const hue = (timeRef.current * 0.1) % 1
    const color = \`hsl(\${hue * 360}, 70%, 60%)\`
    if (meshRef.current.material && 'color' in meshRef.current.material) {
      meshRef.current.material.color.setStyle(color)
    }
  }
})`,
        highlights: [
          {
            id: "scale-effect",
            startLine: 6,
            endLine: 12,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "スケール効果",
              description: "形状変化直後に一時的にオブジェクトを拡大することで、変化を視覚的に強調します。sin関数を使用して滑らかな拡大縮小を実現します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.scale",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          },
          {
            id: "color-animation",
            startLine: 15,
            endLine: 19,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "カラーアニメーション",
              description: "HSL色空間を使用して色相を連続的に変化させます。時間に基づいて虹色のグラデーション効果を作成できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Color",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-morphing',
    name: "高度なモーフィング",
    description: "頂点レベルでの滑らかな形状変化",
    files: ["src/app/demos/animations/morphing/components/MorphingAnimation.tsx"],
    codeSections: [
      {
        title: "頂点モーフィング（概念）",
        description: "より高度な頂点レベルでの滑らかな形状変化の実装例",
        fileName: "AdvancedMorphing.tsx",
        code: `// より高度なモーフィング（頂点レベル）の例
function AdvancedMorphing() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current && meshRef.current.geometry) {
      const geometry = meshRef.current.geometry
      const positions = geometry.attributes.position
      
      // 頂点を個別に操作してウェーブ効果
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)
        
        // 時間ベースでZ座標を変更
        const newZ = z + Math.sin(state.clock.elapsedTime + x + y) * 0.1
        positions.setZ(i, newZ)
      }
      
      // 変更を反映
      positions.needsUpdate = true
      geometry.computeVertexNormals()
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <meshStandardMaterial color="#00ff88" wireframe />
    </mesh>
  )
}

// Morph Targets を使用した高度なモーフィング
function MorphTargetExample() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.morphTargetInfluences) {
      // モーフターゲットの影響度を時間で制御
      const time = state.clock.elapsedTime
      meshRef.current.morphTargetInfluences[0] = Math.sin(time) * 0.5 + 0.5
      meshRef.current.morphTargetInfluences[1] = Math.cos(time * 1.5) * 0.5 + 0.5
    }
  })
  
  return (
    <mesh ref={meshRef}>
      {/* モーフターゲットを持つジオメトリ */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "vertex-manipulation",
            startLine: 10,
            endLine: 18,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "頂点操作",
              description: "ジオメトリの各頂点に直接アクセスして位置を変更することで、より細かい形状変化を実現できます。リアルタイムでウェーブやノイズ効果を作成できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/BufferAttribute",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#geometries"
            }
          },
          {
            id: "morph-targets",
            startLine: 35,
            endLine: 40,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "モーフターゲット",
              description: "事前に定義された形状間で滑らかに補間するThree.jsの機能です。morphTargetInfluencesで各ターゲットの影響度を制御できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/objects/Mesh.morphTargetInfluences",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#meshes"
            }
          },
          {
            id: "geometry-update",
            startLine: 20,
            endLine: 22,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "ジオメトリ更新",
              description: "頂点位置を変更した後は、needsUpdateをtrueに設定し、computeVertexNormals()で法線を再計算する必要があります。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/BufferGeometry.computeVertexNormals",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#geometries"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'ui-indicators',
    name: "UIインジケーター",
    description: "現在の状態を表示するユーザーインターフェース要素",
    files: ["src/app/demos/animations/morphing/components/MorphingAnimation.tsx"],
    codeSections: [
      {
        title: "進行状況の可視化",
        description: "現在の形状と進行状況を表示するUI要素",
        fileName: "MorphingAnimation.tsx",
        code: `return (
  <group>
    {/* モーフィングする3Dオブジェクト */}
    <mesh 
      ref={meshRef} 
      position={[0, 0, 0]} 
      castShadow 
      receiveShadow
      geometry={shapes[currentShape].geometry}
    >
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
    
    {/* 現在の形状名を表示 */}
    <Text position={[0, -2.5, 0]} fontSize={0.5} color="white" anchorX="center">
      {shapes[currentShape].name}
    </Text>
    
    {/* 進行状況インジケーター */}
    <group position={[0, -3.5, 0]}>
      {shapes.map((_, index) => (
        <mesh key={index} position={[(index - 1.5) * 0.8, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={index === currentShape ? "#00ff00" : "#666666"} 
          />
        </mesh>
      ))}
    </group>
  </group>
)`,
        highlights: [
          {
            id: "text-display",
            startLine: 14,
            endLine: 16,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "テキスト表示",
              description: "@react-three/dreiのTextコンポーネントを使用して、3D空間内にテキストを表示できます。現在の状態やラベルの表示に便利です。",
              documentationUrl: "https://github.com/pmndrs/drei#text",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/introduction"
            }
          },
          {
            id: "progress-indicator",
            startLine: 19,
            endLine: 27,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
                title: "進行状況インジケーター",
                description: "小さな球体を配列で表示し、現在のアクティブな状態を色で区別することで、進行状況を視覚的に表現します。",
                documentationUrl: "https://threejs.org/docs/#api/en/geometries/SphereGeometry",
                r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#geometries"
              }
            },
            {
              id: "conditional-styling",
              startLine: 23,
              endLine: 25,
              startColumn: 10,
              endColumn: 12,
              tooltip: {
                title: "条件付きスタイリング",
                description: "現在のインデックスと比較して、アクティブな要素には異なる色を適用することで、状態の変化を明確に表示します。",
                documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial",
                r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#materials"
              }
            }
          ]
        }
      ]
    }
  ]
  