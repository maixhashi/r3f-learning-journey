import { FeatureFile } from '../../types'

export const oscillationFeatures: FeatureFile[] = [
  {
    id: 'sine-cosine-animation',
    name: "Sin/Cos波アニメーション",
    description: "三角関数を使用した滑らかな振動アニメーション",
    files: ["src/app/demos/animations/oscillation/components/OscillationAnimation.tsx"],
    codeSections: [
      {
        title: "三角関数による振動アニメーション",
        description: "Math.sin()とMath.cos()を使用した周期的な動作",
        fileName: "OscillationAnimation.tsx",
        code: `export function OscillationAnimation() {
  const sphereRef = useRef<Mesh>(null)
  const cubeRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (sphereRef.current) {
      // 球体: 上下振動（sin波）
      sphereRef.current.position.y = Math.sin(time * 2) * 1.5
      // 左右振動も追加
      sphereRef.current.position.x = Math.cos(time * 1.5) * 0.5
    }

    if (cubeRef.current) {
      // 立方体: 左右振動（cos波）
      cubeRef.current.position.x = Math.cos(time * 1.8) * 2
      // 回転も追加
      cubeRef.current.rotation.y = time * 0.5
      cubeRef.current.rotation.x = Math.sin(time * 3) * 0.3
    }
  })

  return (
    <group>
      <mesh ref={sphereRef} position={[-3, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      <mesh ref={cubeRef} position={[3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
    </group>
  )
}`,
        highlights: [
          {
            id: "sine-wave",
            startLine: 8,
            endLine: 8,
            startColumn: 6,
            endColumn: 55,
            tooltip: {
              title: "Sin波による上下振動",
              description: "Math.sin()関数を使用して滑らかな上下運動を作成します。time * 2で周波数を、* 1.5で振幅を制御しています。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "cosine-wave",
            startLine: 10,
            endLine: 10,
            startColumn: 6,
            endColumn: 55,
            tooltip: {
              title: "Cos波による左右振動",
              description: "Math.cos()関数を使用して左右運動を作成します。sinと90度位相がずれているため、異なるタイミングで動作します。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "frequency-amplitude",
            startLine: 15,
            endLine: 15,
            startColumn: 6,
            endColumn: 50,
            tooltip: {
              title: "周波数と振幅の制御",
              description: "time * 1.8で振動の速度（周波数）を、* 2で振動の幅（振幅）を制御できます。数値を変更して動作の違いを確認してみてください。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          },
          {
            id: "elapsed-time",
            startLine: 5,
            endLine: 5,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "経過時間の取得",
              description: "state.clock.elapsedTimeでアニメーション開始からの経過時間を取得し、三角関数の引数として使用します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Clock",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'wave-patterns',
    name: "波形パターン",
    description: "異なる波形パターンと組み合わせ効果",
    files: ["src/app/demos/animations/oscillation/components/OscillationAnimation.tsx"],
    codeSections: [
      {
        title: "複合波形アニメーション",
        description: "複数の三角関数を組み合わせた複雑な動作パターン",
        fileName: "ComplexOscillation.tsx",
        code: `// 複数の波を組み合わせた複雑なアニメーション
useFrame((state) => {
  const time = state.clock.elapsedTime

  if (meshRef.current) {
    // 基本波 + 高調波の組み合わせ
    const wave1 = Math.sin(time * 2) * 1.0      // 基本波
    const wave2 = Math.sin(time * 4) * 0.3      // 2倍高調波
    const wave3 = Math.sin(time * 6) * 0.1      // 3倍高調波
    
    // 複合波形
    meshRef.current.position.y = wave1 + wave2 + wave3
    
    // 位相差のある左右運動
    meshRef.current.position.x = Math.cos(time * 1.5 + Math.PI/4) * 2
    
    // 減衰振動（時間と共に振幅が小さくなる）
    const decay = Math.exp(-time * 0.1)
    meshRef.current.position.z = Math.sin(time * 3) * decay * 1.5
    
    // 振動するスケール
    const scaleOscillation = 1 + Math.sin(time * 5) * 0.2
    meshRef.current.scale.setScalar(scaleOscillation)
  }
})`,
        highlights: [
          {
            id: "harmonic-waves",
            startLine: 5,
            endLine: 7,
            startColumn: 4,
            endColumn: 50,
            tooltip: {
              title: "高調波の組み合わせ",
              description: "基本波に高調波を重ね合わせることで、より複雑で自然な動作を作成できます。音楽の和音のような効果が得られます。",
              documentationUrl: "https://en.wikipedia.org/wiki/Harmonic",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "phase-shift",
            startLine: 13,
            endLine: 13,
            startColumn: 4,
            endColumn: 65,
            tooltip: {
              title: "位相差",
              description: "Math.PI/4を加えることで波形に位相差を与えます。これにより異なるタイミングで動作する複雑なパターンを作成できます。",
              documentationUrl: "https://en.wikipedia.org/wiki/Phase_(waves)",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          },
          {
            id: "decay-oscillation",
            startLine: 15,
            endLine: 17,
            startColumn: 4,
            endColumn: 55,
            tooltip: {
              title: "減衰振動",
              description: "Math.exp()を使用して時間と共に振幅が減少する減衰振動を作成できます。物理的にリアルな動作を表現できます。",
              documentationUrl: "https://en.wikipedia.org/wiki/Damping",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          },
          {
            id: "scale-oscillation",
            startLine: 19,
            endLine: 21,
            startColumn: 4,
            endColumn: 50,
            tooltip: {
              title: "スケール振動",
              description: "オブジェクトのサイズを振動させることで、呼吸するような効果や心拍のような表現を作成できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.scale",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'physics-simulation',
    name: "物理シミュレーション",
    description: "物理法則に基づいた振動アニメーション",
    files: ["src/app/demos/animations/oscillation/components/OscillationAnimation.tsx"],
    codeSections: [
      {
        title: "物理ベースの振動",
        description: "バネ振動や重力を考慮したリアルな動作",
        fileName: "PhysicsOscillation.tsx",
        code: `// 物理法則に基づいた振動アニメーション
useFrame((state, delta) => {
  const time = state.clock.elapsedTime

  if (pendulumRef.current) {
    // 振り子の動作（重力を考慮）
    const pendulumAngle = Math.sin(time * 1.5) * Math.PI / 6  // 30度まで振動
    pendulumRef.current.rotation.z = pendulumAngle
    
    // 振り子の先端位置を計算
    const length = 2
    const x = Math.sin(pendulumAngle) * length
    const y = -Math.cos(pendulumAngle) * length
    pendulumRef.current.position.set(x, y, 0)
  }

  if (springRef.current) {
    // バネ振動（フックの法則）
    const springForce = -0.1  // バネ定数
    const displacement = Math.sin(time * 3) * 1.5
    
    // バネの圧縮/伸張を表現
    springRef.current.position.y = displacement
    springRef.current.scale.y = 1 + displacement * 0.2
  }

  if (waveRef.current) {
    // 波の伝播（正弦波）
    const waveLength = 4
    const frequency = 2
    const amplitude = 0.5
    
    // 複数のオブジェクトで波を表現
    for (let i = 0; i < 10; i++) {
      const x = (i - 5) * 0.5
      const phase = (x / waveLength) * 2 * Math.PI
      const y = amplitude * Math.sin(frequency * time + phase)
      
      // 各セグメントの位置を更新
      if (waveRef.current.children[i]) {
        waveRef.current.children[i].position.y = y
      }
    }
  }
})`,
        highlights: [
          {
            id: "pendulum-physics",
            startLine: 5,
            endLine: 12,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "振り子の物理",
              description: "実際の振り子の動作を数学的にシミュレートします。角度から位置を計算し、重力の影響を考慮した自然な動作を実現します。",
              documentationUrl: "https://en.wikipedia.org/wiki/Pendulum",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/getting-started/your-first-scene#animating-the-cube"
            }
          },
          {
            id: "spring-physics",
            startLine: 14,
            endLine: 21,
            startColumn: 4,
            endColumn: 45,
            tooltip: {
              title: "バネ振動",
              description: "フックの法則に基づいたバネの動作をシミュレートします。変位に比例した復元力により自然な振動を表現します。",
              documentationUrl: "https://en.wikipedia.org/wiki/Hooke%27s_law",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/objects#transformations"
            }
          },
          {
            id: "wave-propagation",
            startLine: 23,
            endLine: 35,
            startColumn: 4,
            endColumn: 50,
            tooltip: {
              title: "波の伝播",
              description: "正弦波の伝播をシミュレートします。位相差により波が空間を伝わる様子を視覚化できます。",
              documentationUrl: "https://en.wikipedia.org/wiki/Wave_propagation",
              r3fDocumentationUrl: "https://r3f.docs.pmnd.rs/api/hooks#useframe"
            }
          }
        ]
      }
    ]
  }
]
