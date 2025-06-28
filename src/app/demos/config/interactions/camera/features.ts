import { FeatureFile } from '../../types'

export const cameraFeatures: FeatureFile[] = [
  {
    id: 'orbit-controls',
    name: "OrbitControls",
    description: "マウス操作によるカメラ制御の実装",
    files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
    codeSections: [
      {
        title: "OrbitControlsの基本設定",
        description: "マウスでカメラを操作するためのコントロール設定",
        fileName: "CameraInteraction.tsx",
        code: `<OrbitControls
  ref={controlsRef}
  enablePan={true}        // パン（平行移動）を有効
  enableZoom={true}       // ズームを有効
  enableRotate={true}     // 回転を有効
  minDistance={2}         // 最小ズーム距離
  maxDistance={20}        // 最大ズーム距離
  minPolarAngle={0}       // 最小垂直角度
  maxPolarAngle={Math.PI} // 最大垂直角度
/>`,
        highlights: [
          {
            id: "orbit-controls",
            startLine: 1,
            endLine: 9,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "OrbitControls",
              description: "Three.jsのOrbitControlsをReact Three Fiberで使用するためのコンポーネントです。マウス操作でカメラを直感的に制御できます。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls",
              r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
            }
          },
          {
            id: "distance-limits",
            startLine: 5,
            endLine: 6,
            startColumn: 2,
            endColumn: 25,
            tooltip: {
              title: "距離制限",
              description: "minDistanceとmaxDistanceでズームの範囲を制限できます。オブジェクトに近づきすぎたり、遠ざかりすぎたりするのを防げます。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls",
              r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
            }
          },
          {
            id: "angle-limits",
            startLine: 7,
            endLine: 8,
            startColumn: 2,
            endColumn: 30,
            tooltip: {
              title: "角度制限",
              description: "minPolarAngleとmaxPolarAngleで垂直方向の回転角度を制限できます。地面の下から見上げるような不自然な角度を防げます。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls",
              r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'camera-control',
    name: "プログラムによるカメラ制御",
    description: "コードでカメラ位置を動的に変更する方法",
    files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
    codeSections: [
      {
        title: "カメラ位置の動的制御",
        description: "プリセットビューやアニメーション付きカメラ移動の実装",
        fileName: "CameraInteraction.tsx",
        code: `const { camera } = useThree()
const controlsRef = useRef<any>(null)

// カメラを特定の位置に移動
const moveCameraTo = (position: [number, number, number], target: [number, number, number] = [0, 0, 0]) => {
  if (controlsRef.current) {
    // カメラ位置をアニメーション付きで移動
    camera.position.set(...position)
    controlsRef.current.target.set(...target)
    controlsRef.current.update()
  }
}

// プリセットビューの例
onClick={() => moveCameraTo([5, 5, 5], [0, 0, 0])}  // Front View
onClick={() => moveCameraTo([0, 8, 0], [0, 0, 0])}  // Top View
onClick={() => moveCameraTo([8, 0, 0], [0, 0, 0])}  // Side View`,
        highlights: [
          {
            id: "use-three",
            startLine: 1,
            endLine: 1,
            startColumn: 0,
            endColumn: 30,
            tooltip: {
              title: "useThree",
              description: "React Three Fiberのフックで、Three.jsのカメラ、シーン、レンダラーなどにアクセスできます。",
              documentationUrl: "https://threejs.org/docs/#api/en/cameras/Camera",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree"
            }
          },
          {
            id: "camera-position",
            startLine: 7,
            endLine: 7,
            startColumn: 4,
            endColumn: 40,
            tooltip: {
              title: "camera.position.set",
              description: "カメラの位置を直接設定します。x, y, z座標を指定してカメラを移動させることができます。",
              documentationUrl: "https://threejs.org/docs/#api/en/cameras/Camera.position",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree"
            }
          },
          {
            id: "controls-target",
            startLine: 8,
            endLine: 9,
            startColumn: 4,
            endColumn: 30,
            tooltip: {
              title: "controls.target",
              description: "OrbitControlsの注視点（ターゲット）を設定します。カメラがどの点を中心に回転するかを決定します。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls.target",
              r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'camera-info',
    name: "カメラ情報の取得",
    description: "リアルタイムでカメラの位置と向きを監視する方法",
    files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
    codeSections: [
      {
        title: "カメラ状態の監視",
        description: "useFrameを使用してカメラの位置情報をリアルタイムで取得",
        fileName: "CameraInteraction.tsx",
        code: `const [cameraInfo, setCameraInfo] = useState({
  position: new Vector3(),
  target: new Vector3()
})

// カメラ情報を毎フレーム更新
useFrame(() => {
  if (controlsRef.current) {
    setCameraInfo({
      position: camera.position.clone(),
      target: controlsRef.current.target.clone()
    })
  }
})

// UI表示
<Text 
  position={[0, -3, 0]} 
  fontSize={0.3} 
  color="white" 
  anchorX="center"
>
  {\`Camera: (\${cameraInfo.position.x.toFixed(1)}, \${cameraInfo.position.y.toFixed(1)}, \${cameraInfo.position.z.toFixed(1)})\`}
</Text>`,
        highlights: [
          {
            id: "camera-monitoring",
            startLine: 6,
            endLine: 13,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "カメラ監視",
              description: "useFrameを使用してカメラの位置と注視点をリアルタイムで監視し、状態を更新します。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe"
            }
          },
          {
            id: "vector3-clone",
            startLine: 9,
            endLine: 10,
            startColumn: 6,
            endColumn: 45,
            tooltip: {
              title: "Vector3.clone()",
              description: "Vector3オブジェクトのコピーを作成します。元のオブジェクトへの参照ではなく、独立したコピーを作成するために使用します。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3.clone",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'interactive-objects',
    name: "インタラクティブオブジェクト",
    description: "3D空間内でクリック可能なオブジェクトの実装",
    files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
    codeSections: [
      {
        title: "クリック可能な3Dボタン",
        description: "3D空間内にインタラクティブなボタンを配置する方法",
        fileName: "CameraInteraction.tsx",
        code: `<mesh 
  position={[-2, 0, 0]} 
  onClick={() => moveCameraTo([5, 5, 5], [0, 0, 0])}
  onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
  onPointerOut={(e) => (document.body.style.cursor = 'default')}
>
  <boxGeometry args={[1, 0.3, 0.1]} />
  <meshStandardMaterial color="#374151" />
</mesh>
<Text position={[-2, 0, 0.1]} fontSize={0.15} color="white" anchorX="center">
  Front View
</Text>`,
        highlights: [
          {
            id: "click-events",
            startLine: 3,
            endLine: 3,
            startColumn: 2,
            endColumn: 50,
            tooltip: {
              title: "onClick",
              description: "3Dオブジェクトにクリックイベントを追加できます。React Three Fiberが自動的にレイキャスティングを行い、クリック判定を処理します。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events"
            }
          },
          {
            id: "pointer-events",
            startLine: 4,
            endLine: 5,
            startColumn: 2,
            endColumn: 70,
            tooltip: {
              title: "ポインターイベント",
              description: "onPointerOverとonPointerOutでマウスホバー時の動作を制御できます。カーソルの変更などのUI反応を実装できます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-camera-controls',
    name: "高度なカメラ制御",
    description: "アニメーション付きカメラ移動と制限設定",
    files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
    codeSections: [
      {
        title: "カメラ制限とアニメーション",
        description: "カメラの動作範囲を制限し、滑らかな移動を実現する方法",
        fileName: "AdvancedCameraControls.tsx",
        code: `// より高度なOrbitControlsの設定
<OrbitControls
  ref={controlsRef}
  // 基本操作の有効/無効
  enablePan={true}
  enableZoom={true}
  enableRotate={true}
  
  // 距離制限
  minDistance={2}
  maxDistance={20}
  
  // 角度制限（ラジアン）
  minPolarAngle={0}                    // 最小垂直角度（真上）
  maxPolarAngle={Math.PI}              // 最大垂直角度（真下）
  minAzimuthAngle={-Math.PI / 2}       // 最小水平角度
  maxAzimuthAngle={Math.PI / 2}        // 最大水平角度
  
  // ダンピング（慣性）
  enableDamping={true}
  dampingFactor={0.05}
  
  // ズーム設定
  zoomSpeed={1.0}
  
  // パン設定
  panSpeed={1.0}
  screenSpacePanning={false}           // スクリーン空間でのパン
  
  // 回転設定
  rotateSpeed={1.0}
  autoRotate={false}                   // 自動回転
  autoRotateSpeed={2.0}                // 自動回転速度
/>`,
        highlights: [
          {
            id: "damping",
            startLine: 16,
            endLine: 17,
            startColumn: 2,
            endColumn: 25,
            tooltip: {
              title: "ダンピング",
              description: "enableDampingとdampingFactorで慣性のある滑らかなカメラ操作を実現できます。操作を止めた後も少しずつ減速して停止します。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls.enableDamping",
              r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
            }
          },
          {
            id: "azimuth-angle",
            startLine: 12,
            endLine: 13,
            startColumn: 2,
            endColumn: 35,
            tooltip: {
                title: "水平角度制限",
                description: "minAzimuthAngleとmaxAzimuthAngleで水平方向の回転角度を制限できます。特定の方向からの視点のみを許可したい場合に使用します。",
                documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls.minAzimuthAngle",
                r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
              }
            },
            {
              id: "auto-rotate",
              startLine: 26,
              endLine: 27,
              startColumn: 2,
              endColumn: 30,
              tooltip: {
                title: "自動回転",
                description: "autoRotateを有効にすると、カメラが自動的にオブジェクトの周りを回転します。プレゼンテーションやデモに効果的です。",
                documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls.autoRotate",
                r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'smooth-camera-transitions',
      name: "滑らかなカメラ遷移",
      description: "gsapやreact-springを使用したアニメーション付きカメラ移動",
      files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
      codeSections: [
        {
          title: "アニメーション付きカメラ移動",
          description: "ライブラリを使用した滑らかなカメラ遷移の実装",
          fileName: "SmoothCameraTransition.tsx",
          code: `import { useSpring, animated } from '@react-spring/three'
  import gsap from 'gsap'
  
  // React Springを使用したアニメーション
  const AnimatedCamera = () => {
    const [{ position }, api] = useSpring(() => ({
      position: [3, 3, 3],
      config: { mass: 1, tension: 280, friction: 60 }
    }))
  
    const moveToPosition = (newPosition: [number, number, number]) => {
      api.start({ position: newPosition })
    }
  
    return (
      <animated.perspectiveCamera position={position} />
    )
  }
  
  // GSAPを使用したアニメーション
  const smoothCameraTransition = (
    camera: Camera, 
    controls: OrbitControls, 
    targetPosition: Vector3, 
    targetLookAt: Vector3,
    duration: number = 2
  ) => {
    // カメラ位置のアニメーション
    gsap.to(camera.position, {
      duration,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      ease: "power2.inOut"
    })
  
    // 注視点のアニメーション
    gsap.to(controls.target, {
      duration,
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      ease: "power2.inOut",
      onUpdate: () => controls.update()
    })
  }
  
  // 使用例
  const handleViewChange = () => {
    const newPosition = new Vector3(5, 5, 5)
    const newTarget = new Vector3(0, 0, 0)
    smoothCameraTransition(camera, controlsRef.current, newPosition, newTarget, 1.5)
  }`,
          highlights: [
            {
              id: "react-spring",
              startLine: 4,
              endLine: 8,
              startColumn: 2,
              endColumn: 4,
              tooltip: {
                title: "React Spring",
                description: "React Springを使用してReactのstate管理と連携したアニメーションを作成できます。物理ベースのアニメーションが特徴です。",
                documentationUrl: "https://react-spring.dev/",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures#animating-with-react-spring"
              }
            },
            {
              id: "gsap-animation",
              startLine: 20,
              endLine: 40,
              startColumn: 0,
              endColumn: 2,
              tooltip: {
                title: "GSAP アニメーション",
                description: "GSAPを使用して高性能なアニメーションを作成できます。イージング関数や複雑なタイムラインを簡単に実装できます。",
                documentationUrl: "https://greensock.com/gsap/",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures#animating-with-gsap"
              }
            },
            {
              id: "easing",
              startLine: 28,
              endLine: 28,
              startColumn: 4,
              endColumn: 25,
              tooltip: {
                title: "イージング",
                description: "ease: 'power2.inOut'でアニメーションの加速・減速カーブを制御できます。自然で心地よい動きを作成できます。",
                documentationUrl: "https://greensock.com/ease-visualizer/",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures#animating-with-gsap"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'camera-types',
      name: "カメラの種類と特性",
      description: "PerspectiveCameraとOrthographicCameraの違いと使い分け",
      files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
      codeSections: [
        {
          title: "カメラタイプの比較",
          description: "透視投影カメラと正射影カメラの特徴と使用場面",
          fileName: "CameraTypes.tsx",
          code: `// 透視投影カメラ（PerspectiveCamera）- デフォルト
  <Canvas
    camera={{
      fov: 60,                    // 視野角（Field of View）
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,                  // 近クリップ面
      far: 1000,                  // 遠クリップ面
      position: [0, 0, 5]
    }}
  >
  
  // 正射影カメラ（OrthographicCamera）
  <Canvas
    orthographic
    camera={{
      zoom: 100,                  // ズーム倍率
      left: -window.innerWidth / 2,
      right: window.innerWidth / 2,
      top: window.innerHeight / 2,
      bottom: -window.innerHeight / 2,
      near: 0.1,
      far: 1000,
      position: [0, 0, 5]
    }}
  >
  
  // カメラの動的切り替え
  const CameraSwitcher = () => {
    const [orthographic, setOrthographic] = useState(false)
    
    return (
      <Canvas
        orthographic={orthographic}
        camera={{
          fov: orthographic ? undefined : 60,
          zoom: orthographic ? 100 : undefined,
          position: [5, 5, 5]
        }}
      >
        {/* シーンコンテンツ */}
      </Canvas>
    )
  }
  
  // カメラ設定の詳細制御
  const DetailedCameraSetup = () => {
    const { camera, size } = useThree()
    
    useEffect(() => {
      if (camera instanceof PerspectiveCamera) {
        camera.fov = 45
        camera.updateProjectionMatrix()
      } else if (camera instanceof OrthographicCamera) {
        camera.left = -size.width / 2
        camera.right = size.width / 2
        camera.top = size.height / 2
        camera.bottom = -size.height / 2
        camera.updateProjectionMatrix()
      }
    }, [camera, size])
  }`,
          highlights: [
            {
              id: "perspective-camera",
              startLine: 1,
              endLine: 9,
              startColumn: 0,
              endColumn: 2,
              tooltip: {
                title: "透視投影カメラ",
                description: "人間の目に近い見え方で、遠くのものは小さく見えます。3Dゲームや建築ビジュアライゼーションに適しています。",
                documentationUrl: "https://threejs.org/docs/#api/en/cameras/PerspectiveCamera",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/canvas#camera"
              }
            },
            {
              id: "orthographic-camera",
              startLine: 11,
              endLine: 22,
              startColumn: 0,
              endColumn: 2,
              tooltip: {
                title: "正射影カメラ",
                description: "距離に関係なく同じサイズで表示されます。CADソフトや2D風の3Dゲーム、技術図面に適しています。",
                documentationUrl: "https://threejs.org/docs/#api/en/cameras/OrthographicCamera",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/canvas#camera"
              }
            },
            {
              id: "update-projection",
              startLine: 45,
              endLine: 45,
              startColumn: 6,
              endColumn: 40,
              tooltip: {
                title: "updateProjectionMatrix",
                description: "カメラの設定を変更した後は、updateProjectionMatrix()を呼び出して投影行列を更新する必要があります。",
                documentationUrl: "https://threejs.org/docs/#api/en/cameras/Camera.updateProjectionMatrix",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'camera-events',
      name: "カメライベントの処理",
      description: "カメラの移動や変更を検知してリアクションする方法",
      files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
      codeSections: [
        {
          title: "カメライベントリスナー",
          description: "カメラの状態変化を監視し、適切に反応する実装",
          fileName: "CameraEvents.tsx",
          code: `const CameraEventHandler = () => {
    const { camera } = useThree()
    const controlsRef = useRef<OrbitControls>(null)
    const [cameraState, setCameraState] = useState({
      position: new Vector3(),
      target: new Vector3(),
      zoom: 1,
      isMoving: false
    })
  
    // カメラ移動開始時のイベント
    const handleControlStart = () => {
      setCameraState(prev => ({ ...prev, isMoving: true }))
      console.log('Camera movement started')
    }
  
    // カメラ移動中のイベント
    const handleControlChange = () => {
      if (controlsRef.current) {
        setCameraState(prev => ({
          ...prev,
          position: camera.position.clone(),
          target: controlsRef.current!.target.clone(),
          zoom: camera.zoom
        }))
      }
    }
  
    // カメラ移動終了時のイベント
    const handleControlEnd = () => {
      setCameraState(prev => ({ ...prev, isMoving: false }))
      console.log('Camera movement ended')
      
      // カメラ位置を保存（例：localStorage）
      localStorage.setItem('cameraPosition', JSON.stringify({
        position: camera.position.toArray(),
        target: controlsRef.current?.target.toArray()
      }))
    }
  
    // 保存されたカメラ位置を復元
    useEffect(() => {
      const savedPosition = localStorage.getItem('cameraPosition')
      if (savedPosition && controlsRef.current) {
        const { position, target } = JSON.parse(savedPosition)
        camera.position.fromArray(position)
        controlsRef.current.target.fromArray(target)
        controlsRef.current.update()
      }
    }, [camera])
  
    return (
      <OrbitControls
        ref={controlsRef}
        onStart={handleControlStart}
        onChange={handleControlChange}
        onEnd={handleControlEnd}
      />
    )
  }
  
  // カメラ位置に基づく動的な処理
  const CameraBasedEffects = () => {
    const { camera } = useThree()
    const [lodLevel, setLodLevel] = useState(0)
  
    useFrame(() => {
      // カメラ距離に基づくLOD（Level of Detail）
      const distance = camera.position.length()
      if (distance < 5) {
        setLodLevel(2) // 高詳細
      } else if (distance < 15) {
        setLodLevel(1) // 中詳細
      } else {
        setLodLevel(0) // 低詳細
      }
    })
  
    return (
      <mesh>
        {lodLevel === 2 && <sphereGeometry args={[1, 32, 32]} />}
        {lodLevel === 1 && <sphereGeometry args={[1, 16, 16]} />}
        {lodLevel === 0 && <sphereGeometry args={[1, 8, 8]} />}
        <meshStandardMaterial color="orange" />
      </mesh>
    )
  }`,
          highlights: [
            {
              id: "control-events",
              startLine: 47,
              endLine: 51,
              startColumn: 4,
              endColumn: 30,
              tooltip: {
                title: "コントロールイベント",
                description: "OrbitControlsのonStart、onChange、onEndイベントでカメラ操作の開始、変更、終了を検知できます。",
                documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls",
                r3fDocumentationUrl: "https://github.com/pmndrs/drei#orbitcontrols"
              }
            },
            {
              id: "camera-persistence",
              startLine: 29,
              endLine: 35,
              startColumn: 4,
              endColumn: 6,
              tooltip: {
                title: "カメラ状態の永続化",
                description: "localStorageを使用してカメラの位置と向きを保存し、次回アクセス時に復元できます。ユーザーの視点を記憶する機能に使用します。",
                documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree"
              }
            },
            {
              id: "lod-system",
              startLine: 58,
              endLine: 68,
              startColumn: 4,
              endColumn: 6,
              tooltip: {
                title: "LODシステム",
                description: "カメラからの距離に応じてオブジェクトの詳細度を変更するLevel of Detail（LOD）システムです。パフォーマンス最適化に重要です。",
                documentationUrl: "https://threejs.org/docs/#api/en/objects/LOD",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/performance-pitfalls#level-of-detail"
              }
            },
            {
              id: "vector3-methods",
              startLine: 18,
              endLine: 23,
              startColumn: 8,
              endColumn: 10,
              tooltip: {
                title: "Vector3メソッド",
                description: "clone()で独立したコピーを作成、toArray()で配列に変換、fromArray()で配列から復元できます。データの保存と復元に便利です。",
                documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree"
              }
            }
          ]
        }
      ]
    },
    {
      id: 'camera-performance',
      name: "カメラパフォーマンス最適化",
      description: "カメラ操作時のパフォーマンス向上テクニック",
      files: ["src/app/demos/interactions/camera/components/CameraInteraction.tsx"],
      codeSections: [
        {
          title: "パフォーマンス最適化",
          description: "カメラ操作時のレンダリング負荷を軽減する方法",
          fileName: "CameraPerformance.tsx",
          code: `const OptimizedCameraControls = () => {
    const { invalidate } = useThree()
    const controlsRef = useRef<OrbitControls>(null)
    const [isMoving, setIsMoving] = useState(false)
  
    // フレームループの制御
    useFrame((state) => {
      // カメラが動いている時のみレンダリング
      if (isMoving) {
        invalidate() // 手動でレンダリングをトリガー
      }
    })
  
    return (
      <Canvas
        frameloop="demand" // オンデマンドレンダリング
        camera={{ position: [3, 3, 3] }}
      >
        <OrbitControls
          ref={controlsRef}
          onStart={() => {
            setIsMoving(true)
            invalidate()
          }}
          onChange={() => {
            invalidate() // 変更時のみレンダリング
          }}
          onEnd={() => {
            setIsMoving(false)
            invalidate()
          }}
          enableDamping={true}
          dampingFactor={0.05}
        />
        
        {/* 距離に基づく条件付きレンダリング */}
        <ConditionalRender />
      </Canvas>
    )
  }
  
  const ConditionalRender = () => {
    const { camera } = useThree()
    const [showDetails, setShowDetails] = useState(true)
  
    useFrame(() => {
      const distance = camera.position.length()
      setShowDetails(distance < 10)
    })
  
    return (
      <group>
        {/* 基本オブジェクト（常に表示） */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="blue" />
        </mesh>
        
        {/* 詳細オブジェクト（近距離のみ） */}
        {showDetails && (
          <group>
            <mesh position={[2, 0, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="red" />
            </mesh>
            <mesh position={[-2, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
              <meshStandardMaterial color="green" />
            </mesh>
          </group>
        )}
      </group>
    )
  }
  
  // メモ化によるパフォーマンス向上
  const MemoizedCameraInfo = React.memo(({ position, target }: {
    position: Vector3
    target: Vector3
  }) => {
    return (
      <Text position={[0, -3, 0]} fontSize={0.3} color="white">
        {\`Pos: (\${position.x.toFixed(1)}, \${position.y.toFixed(1)}, \${position.z.toFixed(1)})\`}
      </Text>
    )
  })
  
  // カメラ操作の最適化設定
  const OptimizedOrbitControls = () => {
    return (
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        
        // パフォーマンス設定
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        
        // 更新頻度の制御
        minDistance={1}
        maxDistance={50}
        
        // スムーズな操作感
        zoomSpeed={0.6}
        panSpeed={0.8}
        rotateSpeed={0.4}
        
        // 自動回転の最適化
        autoRotate={false}
        autoRotateSpeed={1.0}
        
        // タッチデバイス対応
        enableKeys={true}
        keys={{
          LEFT: 'ArrowLeft',
          UP: 'ArrowUp', 
          RIGHT: 'ArrowRight',
          BOTTOM: 'ArrowDown'
        }}
      />
    )
  }`,
          highlights: [
            {
              id: "frameloop-demand",
              startLine: 14,
              endLine: 14,
              startColumn: 6,
              endColumn: 30,
              tooltip: {
                title: "オンデマンドレンダリング",
                description: "frameloop='demand'により、変更があった時のみレンダリングを実行します。静的なシーンでのパフォーマンスが大幅に向上します。",
                documentationUrl: "https://threejs.org/docs/#manual/en/introduction/How-to-update-things",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/canvas#frameloop"
              }
            },
            {
              id: "invalidate",
              startLine: 9,
              endLine: 9,
              startColumn: 6,
              endColumn: 17,
              tooltip: {
                title: "invalidate",
                description: "手動でレンダリングをトリガーする関数です。オンデマンドレンダリング時に、シーンの更新が必要な時に呼び出します。",
                documentationUrl: "https://threejs.org/docs/#api/en/renderers/WebGLRenderer.render",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree"
              }
            },
            {
              id: "conditional-rendering",
              startLine: 48,
              endLine: 62,
              startColumn: 6,
              endColumn: 8,
              tooltip: {
                title: "条件付きレンダリング",
                description: "カメラの距離や角度に基づいて、表示するオブジェクトを動的に制御します。不要なオブジェクトを非表示にしてパフォーマンスを向上させます。",
                documentationUrl: "https://react.dev/learn/conditional-rendering",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/performance-pitfalls#conditional-rendering"
              }
            },
            {
              id: "memoization",
              startLine: 66,
              endLine: 73,
              startColumn: 0,
              endColumn: 2,
              tooltip: {
                title: "React.memo",
                description: "React.memoを使用してコンポーネントの不要な再レンダリングを防ぎます。プロパティが変更されない限り、前回の結果を再利用します。",
                documentationUrl: "https://react.dev/reference/react/memo",
                r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/performance-pitfalls#memoization"
              }
            }
          ]
        }
      ]
    }
  ]
    