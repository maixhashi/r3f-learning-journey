import { FeatureFile } from '../../types'

export const cannonFeatures: FeatureFile[] = [
  {
    id: 'physics-setup',
    name: "物理エンジンのセットアップ",
    description: "Cannon.jsの基本設定と物理世界の初期化",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "Physics コンポーネントの設定",
        description: "重力や材質の設定を行う物理世界の初期化",
        fileName: "CannonPhysics.tsx",
        code: `<Physics
  gravity={[0, -9.81, 0]} // 重力設定（地球の重力加速度）
  defaultContactMaterial={{
    friction: 0.4,      // 摩擦係数
    restitution: 0.3,   // 反発係数
  }}
>
  {/* 物理オブジェクトをここに配置 */}
</Physics>`,
        highlights: [
          {
            id: "gravity",
            startLine: 2,
            endLine: 2,
            startColumn: 2,
            endColumn: 25,
            tooltip: {
              title: "重力設定",
              description: "3軸の重力ベクトルを設定します。[x, y, z]の順で、通常はY軸負方向に重力を設定します。-9.81は地球の重力加速度です。",
              documentationUrl: "https://cannon.js.org/docs/classes/World.html#gravity",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#physics"
            }
          },
          {
            id: "contact-material",
            startLine: 3,
            endLine: 6,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "接触材質",
              description: "オブジェクト同士が接触した際の物理的性質を定義します。friction（摩擦）とrestitution（反発）が主要なパラメータです。",
              documentationUrl: "https://cannon.js.org/docs/classes/ContactMaterial.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#physics"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'rigid-bodies',
    name: "剛体オブジェクト",
    description: "球体、立方体、平面などの物理オブジェクトの作成",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "球体の物理オブジェクト",
        description: "useSphereフックを使用した球体の物理シミュレーション",
        fileName: "CannonPhysics.tsx",
        code: `function FallingBall({ position }: { position: [number, number, number] }) {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,                    // 質量
    position,                   // 初期位置
    material: {
      friction: 0.4,            // 摩擦係数
      restitution: 0.8,         // 反発係数（弾性）
    },
  }))

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color="#4ecdc4" />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "use-sphere",
            startLine: 2,
            endLine: 8,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "useSphere フック",
              description: "球体の物理オブジェクトを作成します。質量、位置、材質などの物理的性質を設定できます。",
              documentationUrl: "https://cannon.js.org/docs/classes/Sphere.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#usesphere"
            }
          },
          {
            id: "mass",
            startLine: 3,
            endLine: 3,
            startColumn: 4,
            endColumn: 12,
            tooltip: {
              title: "質量（mass）",
              description: "オブジェクトの質量を設定します。質量が大きいほど重く、他のオブジェクトとの衝突時により大きな力を持ちます。0に設定すると静的オブジェクトになります。",
              documentationUrl: "https://cannon.js.org/docs/classes/Body.html#mass",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
            }
          },
          {
            id: "restitution",
            startLine: 6,
            endLine: 6,
            startColumn: 6,
            endColumn: 23,
            tooltip: {
              title: "反発係数（restitution）",
              description: "オブジェクトの弾性を表します。0は完全非弾性衝突、1は完全弾性衝突を意味します。値が高いほどよく跳ね返ります。",
              documentationUrl: "https://cannon.js.org/docs/classes/Material.html#restitution",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
            }
          }
        ]
      },
      {
        title: "立方体の物理オブジェクト",
        description: "useBoxフックを使用した立方体の物理シミュレーション",
        fileName: "CannonPhysics.tsx",
        code: `function FallingBox({ position }: { position: [number, number, number] }) {
  const [ref, api] = useBox<Mesh>(() => ({
    mass: 2,                    // 球体より重い質量
    position,
    material: {
      friction: 0.6,            // 高い摩擦係数
      restitution: 0.3,         // 低い反発係数（あまり跳ねない）
    },
  }))

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "use-box",
            startLine: 2,
            endLine: 8,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "useBox フック",
              description: "立方体の物理オブジェクトを作成します。球体と異なり、角があるため回転や衝突の挙動が複雑になります。",
              documentationUrl: "https://cannon.js.org/docs/classes/Box.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#usebox"
            }
          },
          {
            id: "friction",
            startLine: 5,
            endLine: 5,
            startColumn: 6,
            endColumn: 18,
            tooltip: {
              title: "摩擦係数（friction）",
              description: "表面の滑りやすさを表します。0は完全に滑らか、1以上は非常に粗い表面を意味します。値が高いほど滑りにくくなります。",
              documentationUrl: "https://cannon.js.org/docs/classes/Material.html#friction",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'static-objects',
    name: "静的オブジェクト",
    description: "動かない地面や壁などの静的な物理オブジェクト",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "地面の作成",
        description: "usePlaneフックを使用した静的な地面オブジェクト",
        fileName: "CannonPhysics.tsx",
        code: `function Ground() {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],  // 水平に回転
    position: [0, -5, 0],            // Y軸-5の位置
    material: {
      friction: 0.8,                 // 高い摩擦（滑りにくい）
      restitution: 0.2,              // 低い反発（跳ねにくい）
    },
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#95a5a6" />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "use-plane",
            startLine: 2,
            endLine: 8,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "usePlane フック",
              description: "無限平面の物理オブジェクトを作成します。質量を指定しないため自動的に静的オブジェクト（mass: 0）になります。",
              documentationUrl: "https://cannon.js.org/docs/classes/Plane.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#useplane"
            }
          },
          {
            id: "rotation",
            startLine: 3,
            endLine: 3,
            startColumn: 4,
            endColumn: 35,
            tooltip: {
              title: "回転設定",
              description: "平面をX軸周りに-90度回転させて水平にします。デフォルトでは平面は垂直（YZ平面）に配置されます。",
              documentationUrl: "https://cannon.js.org/docs/classes/Body.html#quaternion",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
            }
          }
        ]
      },
      {
        title: "静的な壁の作成",
        description: "type: 'Static'を指定した動かない壁オブジェクト",
        fileName: "CannonPhysics.tsx",
        code: `function Wall({ position, rotation }: { 
  position: [number, number, number]
  rotation?: [number, number, number] 
}) {
  const [ref] = useBox<Mesh>(() => ({
    position,
    rotation,
    type: 'Static',              // 静的オブジェクト指定
    args: [0.5, 10, 10],         // 薄い壁の形状
  }))

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.5, 10, 10]} />
      <meshStandardMaterial color="#34495e" transparent opacity={0.3} />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "static-type",
            startLine: 7,
            endLine: 7,
            startColumn: 4,
            endColumn: 19,
            tooltip: {
              title: "静的タイプ",
              description: "type: 'Static'を指定すると、オブジェクトは物理的な力を受けても動きません。地面や壁などの固定オブジェクトに使用します。",
              documentationUrl: "https://cannon.js.org/docs/classes/Body.html#type",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
            }
          },
          {
            id: "args",
            startLine: 8,
            endLine: 8,
            startColumn: 4,
            endColumn: 24,
            tooltip: {
              title: "形状引数",
              description: "立方体の寸法を[幅, 高さ, 奥行き]で指定します。薄い壁を作るため幅を小さく設定しています。",
              documentationUrl: "https://cannon.js.org/docs/classes/Box.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#usebox"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'forces-impulses',
    name: "力とインパルス",
    description: "オブジェクトに力を加えるインタラクティブな操作",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "インパルスの適用",
        description: "クリックイベントでオブジェクトに瞬間的な力を加える",
        fileName: "CannonPhysics.tsx",
        code: `function InteractiveBall() {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [0, 2, 0],
    material: {
      friction: 0.3,
      restitution: 0.9,
    },
  }))

  const handleClick = () => {
    // ランダムな方向に力を加える
    const force = new Vector3(
      (Math.random() - 0.5) * 10,    // X方向の力
      Math.random() * 5 + 5,         // Y方向の力（上向き）
      (Math.random() - 0.5) * 10     // Z方向の力
    )
    
    // インパルス（瞬間的な力）を適用
    api.applyImpulse([force.x, force.y, force.z], [0, 0, 0])
  }

  return (
    <mesh ref={ref} castShadow onClick={handleClick}>
      <sphereGeometry args={[0.6]} />
      <meshStandardMaterial color="#e74c3c" />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "apply-impulse",
            startLine: 19,
            endLine: 19,
            startColumn: 4,
            endColumn: 65,
            tooltip: {
                title: "applyImpulse",
                description: "瞬間的な力（インパルス）をオブジェクトに適用します。第一引数は力のベクトル、第二引数は力を加える位置（ローカル座標）です。クリックやキー入力などの一回限りの力の適用に適しています。",
                documentationUrl: "https://cannon.js.org/docs/classes/Body.html#applyImpulse",
                r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
              }
            },
            {
              id: "force-vector",
              startLine: 12,
              endLine: 16,
              startColumn: 4,
              endColumn: 35,
              tooltip: {
                title: "力ベクトルの生成",
                description: "3D空間での力の方向と大きさをVector3で表現します。X・Z方向はランダム、Y方向は上向きに設定することで、自然な跳躍動作を実現しています。",
                documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/physics#forces"
              }
            },
            {
              id: "click-interaction",
              startLine: 22,
              endLine: 22,
              startColumn: 4,
              endColumn: 50,
              tooltip: {
                title: "クリックインタラクション",
                description: "React Three FiberのonClickイベントを使用して、3Dオブジェクトに直接クリックイベントを設定できます。物理オブジェクトとUIインタラクションの連携が可能です。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'position-reset',
      name: "位置リセット機能",
      description: "オブジェクトが範囲外に出た時の自動復帰システム",
      files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
      codeSections: [
        {
          title: "自動位置リセット",
          description: "オブジェクトが範囲外に出た時に元の位置に戻す機能",
          fileName: "CannonPhysics.tsx",
          code: `function FallingBall({ 
    position, 
    onPositionReset 
  }: { 
    position: [number, number, number]
    onPositionReset: (api: any, originalPosition: [number, number, number]) => void
  }) {
    const [ref, api] = useSphere<Mesh>(() => ({
      mass: 1,
      position,
      material: {
        friction: 0.4,
        restitution: 0.8,
      },
    }))
  
    const originalPosition = useRef(position)
  
    // 位置を監視して範囲外に出たら通知
    useFrame(() => {
      if (ref.current) {
        const pos = ref.current.position
        // Y座標が-20以下、またはXZ座標が±15を超えた場合
        if (pos.y < -20 || Math.abs(pos.x) > 15 || Math.abs(pos.z) > 15) {
          onPositionReset(api, originalPosition.current)
        }
      }
    })
  
    return (
      <mesh ref={ref} castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
    )
  }`,
          highlights: [
            {
              id: "position-monitoring",
              startLine: 18,
              endLine: 25,
              startColumn: 2,
              endColumn: 4,
              tooltip: {
                title: "位置監視システム",
                description: "useFrameを使用してオブジェクトの位置を毎フレーム監視し、設定した境界を超えた場合に自動的にリセット処理を実行します。",
                documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.position",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
              }
            },
            {
              id: "boundary-check",
              startLine: 22,
              endLine: 22,
              startColumn: 6,
              endColumn: 70,
              tooltip: {
                title: "境界チェック",
                description: "Y座標（高さ）が-20以下、またはX・Z座標（水平面）が±15を超えた場合に範囲外と判定します。これにより無限に落下するオブジェクトを防げます。",
                documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene"
              }
            },
            {
              id: "original-position",
              startLine: 16,
              endLine: 16,
              startColumn: 2,
              endColumn: 40,
              tooltip: {
                title: "元の位置の保存",
                description: "useRefを使用してオブジェクトの初期位置を保存します。リセット時にこの位置に戻すことで、一貫した復帰動作を実現できます。",
                documentationUrl: "https://react.dev/reference/react/useRef",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/your-first-scene"
              }
            }
          ]
        },
        {
          title: "物理状態のリセット",
          description: "位置、速度、角速度を含む完全な物理状態のリセット",
          fileName: "CannonPhysics.tsx",
          code: `// オブジェクトの位置をリセットする関数
  const handlePositionReset = (api: any, originalPosition: [number, number, number]) => {
    // 位置をリセット
    api.position.set(...originalPosition)
    // 速度をリセット
    api.velocity.set(0, 0, 0)
    // 角速度をリセット
    api.angularVelocity.set(0, 0, 0)
  }
  
  // 手動リセット機能（Hキー）
  if (keys['h'] && (!lastKeyPress['h'] || now - lastKeyPress['h'] > debounceTime)) {
    setResetTrigger(prev => prev + 1)
    setLastKeyPress(prev => ({ ...prev, h: now }))
  }
  
  // resetTriggerを使用してコンポーネントを強制再マウント
  {Array.from({ length: ballCount }, (_, i) => (
    <FallingBall 
      key={\`ball-\${i}-\${resetTrigger}\`} // resetTriggerを追加してキーを変更
      position={[
        (Math.random() - 0.5) * 6,
        5 + i * 0.5,
        (Math.random() - 0.5) * 6
      ]} 
      onPositionReset={handlePositionReset}
    />
  ))}`,
          highlights: [
            {
              id: "physics-reset",
              startLine: 3,
              endLine: 8,
              startColumn: 2,
              endColumn: 30,
              tooltip: {
                title: "物理状態のリセット",
                description: "位置だけでなく、速度と角速度もリセットすることで、オブジェクトが元の位置で静止状態から再開されます。これにより自然な復帰動作を実現できます。",
                documentationUrl: "https://cannon.js.org/docs/classes/Body.html",
                r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
              }
            },
            {
              id: "manual-reset",
              startLine: 11,
              endLine: 14,
              startColumn: 2,
              endColumn: 2,
              tooltip: {
                title: "手動リセット機能",
                description: "Hキーを押すことで、すべてのオブジェクトを手動で元の位置にリセットできます。デバウンス機能により連続入力を防止しています。",
                documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
              }
            },
            {
              id: "force-remount",
              startLine: 19,
              endLine: 19,
              startColumn: 4,
              endColumn: 50,
              tooltip: {
                title: "強制再マウント",
                description: "resetTriggerをkeyに含めることで、Reactコンポーネントを強制的に再マウントし、物理オブジェクトを完全にリセットできます。",
                documentationUrl: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/physics"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'physics-materials',
      name: "物理マテリアル",
      description: "摩擦・反発係数による物理的性質の制御",
      files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
      codeSections: [
        {
          title: "マテリアルプロパティ",
          description: "異なる物理的性質を持つマテリアルの設定",
          fileName: "CannonPhysics.tsx",
          code: `// ボールの物理マテリアル（高反発）
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position,
    material: {
      friction: 0.4,      // 摩擦係数
      restitution: 0.8,   // 反発係数（高い = よく跳ねる）
    },
  }))
  
  // ボックスの物理マテリアル（低反発）
  const [ref, api] = useBox<Mesh>(() => ({
    mass: 2,              // より重い
    position,
    material: {
      friction: 0.6,      // より高い摩擦
      restitution: 0.3,   // 低い反発係数
    },
  }))
  
  // 地面の物理マテリアル
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -5, 0],
    material: {
      friction: 0.8,      // 高摩擦（滑りにくい）
      restitution: 0.2,   // 低反発（跳ねにくい）
    },
  }))`,
          highlights: [
            {
              id: "friction",
              startLine: 6,
              endLine: 6,
              startColumn: 4,
              endColumn: 20,
              tooltip: {
                title: "摩擦係数 (friction)",
                description: "オブジェクト間の摩擦の強さを0.0〜1.0で設定します。値が高いほど滑りにくくなり、転がりや滑りが抑制されます。",
                documentationUrl: "https://cannon.js.org/docs/classes/Material.html#friction",
                r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#materials"
              }
            },
            {
              id: "restitution",
              startLine: 7,
              endLine: 7,
              startColumn: 4,
              endColumn: 25,
              tooltip: {
                title: "反発係数 (restitution)",
                description: "衝突時の跳ね返りの強さを0.0〜1.0で設定します。0.0は完全非弾性衝突（跳ねない）、1.0は完全弾性衝突（エネルギー損失なし）を表します。",
                documentationUrl: "https://cannon.js.org/docs/classes/Material.html#restitution",
                r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#materials"
              }
            },
            {
              id: "mass-difference",
              startLine: 12,
              endLine: 12,
              startColumn: 2,
              endColumn: 10,
              tooltip: {
                title: "質量の違い",
                description: "質量が大きいほど慣性が大きくなり、同じ力でも加速度が小さくなります。また、衝突時により大きな影響を与えます。",
                documentationUrl: "https://cannon.js.org/docs/classes/Body.html#mass",
                r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'keyboard-controls',
      name: "キーボードコントロール",
      description: "キーボード入力によるリアルタイムオブジェクト制御",
      files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
      codeSections: [
        {
          title: "キーボード入力の管理",
          description: "カスタムフックを使用したキーボード状態の管理",
          fileName: "CannonPhysics.tsx",
          code: `// キーボード入力を管理するカスタムフック
  function useKeyboard() {
    const [keys, setKeys] = useState<Record<string, boolean>>({})
  
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        setKeys(prev => ({ ...prev, [event.key.toLowerCase()]: true }))
      }
  
      const handleKeyUp = (event: KeyboardEvent) => {
        setKeys(prev => ({ ...prev, [event.key.toLowerCase()]: false }))
      }
  
      window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keys
}`,
        highlights: [
          {
            id: "keyboard-state",
            startLine: 3,
            endLine: 3,
            startColumn: 2,
            endColumn: 60,
            tooltip: {
              title: "キーボード状態管理",
              description: "押されているキーの状態をオブジェクトで管理します。キー名をキーとして、押下状態をbooleanで保存します。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          },
          {
            id: "event-listeners",
            startLine: 14,
            endLine: 15,
            startColumn: 4,
            endColumn: 50,
            tooltip: {
              title: "イベントリスナーの登録",
              description: "keydownとkeyupイベントをwindowオブジェクトに登録して、グローバルなキーボード入力を監視します。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          },
          {
            id: "cleanup",
            startLine: 17,
            endLine: 20,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "クリーンアップ処理",
              description: "useEffectのクリーンアップ関数でイベントリスナーを削除し、メモリリークを防止します。",
              documentationUrl: "https://react.dev/reference/react/useEffect#cleanup-function",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          }
        ]
      },
      {
        title: "デバウンス付きキー処理",
        description: "連続入力を防ぐデバウンス機能付きのキー処理",
        fileName: "CannonPhysics.tsx",
        code: `const [lastKeyPress, setLastKeyPress] = useState<Record<string, number>>({})

useEffect(() => {
  const now = Date.now()
  const debounceTime = 200  // 200ms のデバウンス時間

  // ボール追加（Bキー）
  if (keys['b'] && (!lastKeyPress['b'] || now - lastKeyPress['b'] > debounceTime)) {
    setBallCount(prev => prev + 1)
    setLastKeyPress(prev => ({ ...prev, b: now }))
  }
  
  // ボックス追加（Xキー）
  if (keys['x'] && (!lastKeyPress['x'] || now - lastKeyPress['x'] > debounceTime)) {
    setBoxCount(prev => prev + 1)
    setLastKeyPress(prev => ({ ...prev, x: now }))
  }
  
  // 全リセット（Rキー）
  if (keys['r'] && (!lastKeyPress['r'] || now - lastKeyPress['r'] > debounceTime)) {
    setBallCount(0)
    setBoxCount(0)
    setResetTrigger(prev => prev + 1)
    setLastKeyPress(prev => ({ ...prev, r: now }))
  }

  // 位置リセット（Hキー）
  if (keys['h'] && (!lastKeyPress['h'] || now - lastKeyPress['h'] > debounceTime)) {
    setResetTrigger(prev => prev + 1)
    setLastKeyPress(prev => ({ ...prev, h: now }))
  }
}, [keys, lastKeyPress])`,
        highlights: [
          {
            id: "debounce-logic",
            startLine: 7,
            endLine: 7,
            startColumn: 2,
            endColumn: 80,
            tooltip: {
              title: "デバウンス処理",
              description: "前回のキー入力から一定時間（200ms）経過している場合のみ処理を実行します。これにより連続入力や意図しない重複処理を防げます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Date/now",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          },
          {
            id: "timestamp-tracking",
            startLine: 9,
            endLine: 9,
            startColumn: 4,
            endColumn: 50,
            tooltip: {
              title: "タイムスタンプ記録",
              description: "各キーの最後の入力時刻を記録することで、次回の入力時にデバウンス時間をチェックできます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          },
          {
            id: "reset-trigger",
            startLine: 21,
            endLine: 21,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "リセットトリガー",
              description: "resetTriggerの値を変更することで、Reactコンポーネントの再レンダリングを強制し、物理オブジェクトの完全なリセットを実現します。",
              documentationUrl: "https://react.dev/learn/state-a-components-memory",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/physics"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'performance-optimization',
    name: "パフォーマンス最適化",
    description: "物理シミュレーションのパフォーマンス向上テクニック",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "効率的なオブジェクト管理",
        description: "動的オブジェクト生成とメモリ管理の最適化",
        fileName: "CannonPhysics.tsx",
        code: `// 効率的な配列生成とキー管理
{Array.from({ length: ballCount }, (_, i) => (
  <FallingBall 
    key={\`ball-\${i}-\${resetTrigger}\`} // 一意なキーでReactの最適化を活用
    position={[
      (Math.random() - 0.5) * 6,
      5 + i * 0.5,                    // 重複を避ける位置調整
      (Math.random() - 0.5) * 6
    ]} 
    onPositionReset={handlePositionReset}
  />
))}

// 物理プロパティの最適化
const [ref, api] = useSphere<Mesh>(() => ({
  mass: 1,
  position,
  material: {
    friction: 0.4,
    restitution: 0.8,
  },
  // 不要な計算を避けるための設定
  allowSleep: true,        // 静止時のスリープモード
  sleepSpeedLimit: 0.1,    // スリープ判定の速度閾値
  sleepTimeLimit: 1,       // スリープまでの時間
}))`,
        highlights: [
          {
            id: "unique-keys",
            startLine: 3,
            endLine: 3,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "一意なキー生成",
              description: "resetTriggerを含む一意なキーを生成することで、Reactの仮想DOM最適化を活用し、不要な再レンダリングを防ぎます。",
              documentationUrl: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/performance"
            }
          },
          {
            id: "position-optimization",
            startLine: 6,
            endLine: 6,
            startColumn: 6,
            endColumn: 20,
            tooltip: {
              title: "位置の最適化",
              description: "オブジェクト同士の重複を避けるため、インデックスに基づいて高さを調整します。これにより初期衝突を減らし、安定したシミュレーションを実現できます。",
              documentationUrl: "https://cannon.js.org/docs/classes/Body.html#position",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#api"
            }
          },
          {
            id: "sleep-optimization",
            startLine: 19,
            endLine: 21,
            startColumn: 2,
            endColumn: 25,
            tooltip: {
              title: "スリープ最適化",
              description: "静止したオブジェクトをスリープ状態にすることで、不要な物理計算を削減し、パフォーマンスを向上させます。",
              documentationUrl: "https://cannon.js.org/docs/classes/Body.html#allowSleep",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#performance"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'ui-integration',
    name: "UI統合",
    description: "3D物理シミュレーションとUIコンポーネントの統合",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "3Dテキストによる情報表示",
        description: "物理世界内でのリアルタイム情報表示",
        fileName: "CannonPhysics.tsx",
        code: `{/* UI テキスト */}
<Text position={[0, 8, 0]} fontSize={0.8} color="white" anchorX="center">
  Cannon.js Physics Demo
</Text>
<Text position={[0, 7, 0]} fontSize={0.4} color="#bdc3c7" anchorX="center">
  赤いボールをクリックして力を加えてみてください
</Text>

{/* コントロールパネル */}
<group position={[-6, 6, 0]}>
  <Text position={[0, 0, 0]} fontSize={0.3} color="white" anchorX="left">
    Controls:
  </Text>
  <Text position={[0, -0.5, 0]} fontSize={0.25} color="#ecf0f1" anchorX="left">
    B: Add Ball ({ballCount})
  </Text>
  <Text position={[0, -0.8, 0]} fontSize={0.25} color="#ecf0f1" anchorX="left">
    X: Add Box ({boxCount})
  </Text>
  <Text position={[0, -1.1, 0]} fontSize={0.25} color="#ecf0f1" anchorX="left">
    R: Reset All
  </Text>
  <Text position={[0, -1.4, 0]} fontSize={0.25} color="#f39c12" anchorX="left">
    H: Reset Positions
  </Text>
</group>

{/* 範囲外警告 */}
<group position={[6, 6, 0]}>
  <Text position={[0, 0, 0]} fontSize={0.3} color="#e74c3c" anchorX="left">
    Auto Reset:
  </Text>
  <Text position={[0, -0.3, 0]} fontSize={0.2} color="#ecf0f1" anchorX="left">
    Objects return when
  </Text>
  <Text position={[0, -0.5, 0]} fontSize={0.2} color="#ecf0f1" anchorX="left">
    they go out of bounds
  </Text>
  <Text position={[0, -0.8, 0]} fontSize={0.2} color="#95a5a6" anchorX="left">
    Y &lt; -20 or |X|,|Z| &gt; 15
  </Text>
</group>`,
        highlights: [
          {
            id: "3d-text",
            startLine: 2,
            endLine: 4,
            startColumn: 0,
            endColumn: 50,
            tooltip: {
              title: "3Dテキスト表示",
              description: "React Three DreiのTextコンポーネントを使用して、3D空間内に直接テキストを配置できます。anchorXで水平方向の基準点を設定できます。",
              documentationUrl: "https://github.com/pmndrs/drei#text",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/text-and-fonts"
            }
          },
          {
            id: "dynamic-content",
            startLine: 13,
            endLine: 13,
            startColumn: 4,
            endColumn: 30,
            tooltip: {
              title: "動的コンテンツ",
              description: "Reactの状態をテキストに埋め込むことで、リアルタイムで変化する情報を3D空間内に表示できます。",
              documentationUrl: "https://react.dev/learn/state-a-components-memory",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/text-and-fonts"
            }
          },
          {
            id: "grouped-ui",
            startLine: 8,
            endLine: 21,
            startColumn: 0,
            endColumn: 8,
            tooltip: {
              title: "グループ化されたUI",
              description: "groupコンポーネントを使用してUI要素をまとめ、一括で位置調整できます。これにより整理されたレイアウトを実現できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/objects/Group",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#group"
            }
          }
        ]
      },
      {
        title: "統計情報の表示",
        description: "物理シミュレーションの統計情報をリアルタイム表示",
        fileName: "CannonPhysics.tsx",
        code: `// 統計情報コンポーネント
function PhysicsStats({ 
  ballCount, 
  boxCount, 
  resetCount 
}: { 
  ballCount: number
  boxCount: number
  resetCount: number
}) {
  return (
    <Html position={[8, 8, 0]}>
      <div className="bg-black bg-opacity-75 text-white p-4 rounded-lg text-sm">
        <h3 className="font-bold mb-2">Physics Stats</h3>
        <div className="space-y-1">
          <div>Balls: {ballCount}</div>
          <div>Boxes: {boxCount}</div>
          <div>Total Objects: {ballCount + boxCount + 1}</div>
          <div>Resets: {resetCount}</div>
        </div>
      </div>
    </Html>
  )
}

// メインコンポーネント内での使用
<PhysicsStats 
  ballCount={ballCount}
  boxCount={boxCount}
  resetCount={resetCount}
/>`,
        highlights: [
          {
            id: "html-overlay",
            startLine: 12,
            endLine: 22,
            startColumn: 4,
            endColumn: 12,
            tooltip: {
              title: "HTMLオーバーレイ",
              description: "React Three DreiのHtmlコンポーネントを使用して、3D空間内にHTML要素を配置できます。CSSスタイリングも通常通り適用されます。",
              documentationUrl: "https://github.com/pmndrs/drei#html",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/html-annotations"
            }
          },
          {
            id: "real-time-stats",
            startLine: 16,
            endLine: 20,
            startColumn: 8,
            endColumn: 12,
            tooltip: {
              title: "リアルタイム統計",
              description: "Reactの状態管理を活用して、物理シミュレーションの統計情報をリアルタイムで更新・表示します。",
              documentationUrl: "https://react.dev/learn/state-a-components-memory",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/html-annotations"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-physics',
    name: "高度な物理機能",
    description: "制約、ジョイント、複合形状などの高度な物理機能",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "複合形状オブジェクト",
        description: "複数の形状を組み合わせた複雑な物理オブジェクト",
        fileName: "CannonPhysics.tsx",
        code: `// 複合形状（ダンベル型）オブジェクト
function CompoundObject({ position }: { position: [number, number, number] }) {
  const [ref, api] = useCompoundBody<Group>(() => ({
    mass: 3,
    position,
    shapes: [
      // 左の球体
      { type: 'Sphere', position: [-1, 0, 0], args: [0.5] },
      // 右の球体  
      { type: 'Sphere', position: [1, 0, 0], args: [0.5] },
      // 中央の棒
      { type: 'Box', position: [0, 0, 0], args: [1, 0.1, 0.1] },
    ],
    material: {
      friction: 0.5,
      restitution: 0.4,
    },
  }))

  return (
    <group ref={ref}>
      {/* 左の球体 */}
      <mesh position={[-1, 0, 0]} castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      
      {/* 右の球体 */}
      <mesh position={[1, 0, 0]} castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      
      {/* 中央の棒 */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.2, 0.2]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  )
}`,
        highlights: [
          {
            id: "compound-body",
            startLine: 3,
            endLine: 15,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "複合物体",
              description: "useCompoundBodyを使用して、複数の基本形状を組み合わせた複雑な物理オブジェクトを作成できます。各形状は独立した位置と引数を持ちます。",
              documentationUrl: "https://cannon.js.org/docs/classes/Body.html#addShape",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#usecompoundbody"
            }
          },
          {
            id: "shapes-array",
            startLine: 6,
            endLine: 11,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "形状配列",
              description: "shapes配列で複数の形状を定義します。各形状はtype、position、argsを指定して、複合オブジェクトの一部として機能します。",
              documentationUrl: "https://cannon.js.org/docs/classes/Shape.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#usecompoundbody"
            }
          }
        ]
      },
      {
        title: "制約とジョイント",
        description: "オブジェクト間の物理的制約の実装",
        fileName: "CannonPhysics.tsx",
        code: `// 振り子システム
function PendulumSystem() {
  const [anchorRef, anchorApi] = useBox<Mesh>(() => ({
    type: 'Static',
    position: [0, 8, 0],
    args: [0.2, 0.2, 0.2],
  }))

  const [ballRef, ballApi] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [0, 5, 0],
    args: [0.3],
  }))

  // ポイント制約（振り子の紐）
  usePointToPointConstraint(anchorRef, ballRef, {
    pivotA: [0, -0.1, 0],  // アンカー側の接続点
    pivotB: [0, 0.3, 0],   // ボール側の接続点
  })

  return (
    <>
      {/* アンカーポイント */}
      <mesh ref={anchorRef}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* 振り子のボール */}
      <mesh ref={ballRef} castShadow>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#f39c12" />
      </mesh>
      
      {/* 視覚的な紐の表現 */}
      <Line
        points={[[0, 8, 0], [0, 5, 0]]}
        color="#8e44ad"
        lineWidth={2}
      />
    </>
  )
}`,
        highlights: [
          {
            id: "point-constraint",
            startLine: 15,
            endLine: 18,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "ポイント制約",
              description: "usePointToPointConstraintで2つのオブジェクトを特定の点で接続します。振り子、チェーン、ロープなどの実装に使用されます。",
              documentationUrl: "https://cannon.js.org/docs/classes/PointToPointConstraint.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#constraints"
            }
          },
          {
            id: "pivot-points",
            startLine: 16,
            endLine: 17,
            startColumn: 4,
            endColumn: 25,
            tooltip: {
              title: "ピボットポイント",
              description: "pivotAとpivotBで各オブジェクトの接続点をローカル座標で指定します。これにより制約の正確な位置を制御できます。",
              documentationUrl: "https://cannon.js.org/docs/classes/PointToPointConstraint.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#constraints"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'collision-detection',
    name: "衝突検出",
    description: "衝突イベントの検出と処理",
    files: ["src/app/demos/library-integration/cannon/components/CannonPhysics.tsx"],
    codeSections: [
      {
        title: "衝突イベントの処理",
        description: "オブジェクト間の衝突を検出してイベントを発火",
        fileName: "CannonPhysics.tsx",
        code: `function CollisionBall({ position }: { position: [number, number, number] }) {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position,
    args: [0.5],
    onCollide: (e) => {
      // 衝突イベントの処理
      console.log('Collision detected:', e)
      
      // 衝突の強さを計算
      const impactVelocity = e.contact.getImpactVelocityAlongNormal()
      
      // 強い衝突の場合は色を変更
      if (impactVelocity > 5) {
        // 一時的に色を変更するロジック
        setCollisionEffect(true)
        setTimeout(() => setCollisionEffect(false), 200)
      }
    },
  }))

  const [collisionEffect, setCollisionEffect] = useState(false)

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial 
        color={collisionEffect ? "#e74c3c" : "#3498db"} 
        emissive={collisionEffect ? "#c0392b" : "#000000"}
      />
    </mesh>
  )
}`,
        highlights: [
          {
            id: "collision-callback",
            startLine: 6,
            endLine: 16,
            startColumn: 4,
            endColumn: 6,
            tooltip: {
              title: "衝突コールバック",
              description: "onCollideコールバックで衝突イベントを検出できます。衝突情報、接触点、衝突の強さなどの詳細情報を取得できます。",
              documentationUrl: "https://cannon.js.org/docs/classes/Body.html#event:collide",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#collision-events"
            }
          },
          {
            id: "impact-velocity",
            startLine: 10,
            endLine: 10,
            startColumn: 6,
            endColumn: 70,
            tooltip: {
              title: "衝撃速度",
              description: "getImpactVelocityAlongNormal()で衝突の強さを数値として取得できます。この値を使って音響効果や視覚効果の強度を調整できます。",
              documentationUrl: "https://cannon.js.org/docs/classes/ContactEquation.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/use-cannon#collision-events"
            }
          },
          {
            id: "visual-feedback",
            startLine: 25,
            endLine: 28,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "視覚的フィードバック",
              description: "衝突時に色や発光を変更することで、物理イベントを視覚的に表現できます。ユーザーに分かりやすいフィードバックを提供します。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/materials"
            }
          }
        ]
      }
    ]
  }
]
