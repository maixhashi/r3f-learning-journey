import { FeatureFile } from '../../types'

export const dndScaleFeatures: FeatureFile[] = [
  {
    id: 'drag-scale-interaction',
    name: "ドラッグ&ドロップによる寸法変更",
    description: "マウスドラッグによるオブジェクトのスケール変更機能",
    files: ["src/app/demos/interactions/dnd-scale/components/DndScaleInteractionWithControls.tsx"],
    codeSections: [
      {
        title: "ドラッグ状態管理",
        description: "ドラッグ操作の状態を管理するためのstate設計",
        fileName: "DndScaleInteractionWithControls.tsx",
        code: `interface DragState {
  isDragging: boolean
  startPosition: Vector3
  startScale: Vector3
  object: Mesh | null
}

const [dragState, setDragState] = useState<DragState>({
  isDragging: false,
  startPosition: new Vector3(),
  startScale: new Vector3(),
  object: null
})

// ドラッグ状態が変わったときにカメラ操作を制御
useEffect(() => {
  setEnableControls(!dragState.isDragging)
}, [dragState.isDragging, setEnableControls])`,
        highlights: [
          {
            id: "drag-state",
            startLine: 1,
            endLine: 6,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "DragState インターフェース",
              description: "ドラッグ操作に必要な状態を定義します。isDragging（ドラッグ中かどうか）、startPosition（開始位置）、startScale（開始時のスケール）、object（対象オブジェクト）を管理します。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events"
            }
          },
          {
            id: "camera-control",
            startLine: 14,
            endLine: 16,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "カメラ操作の制御",
              description: "ドラッグ中はOrbitControlsを無効化して、オブジェクト操作とカメラ操作の競合を防ぎます。useCameraControlコンテキストを使用して制御します。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#event-data"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mouse-position-calculation',
    name: "マウス位置の計算",
    description: "スクリーン座標から3D空間の正規化座標への変換",
    files: ["src/app/demos/interactions/dnd-scale/components/DndScaleInteractionWithControls.tsx"],
    codeSections: [
      {
        title: "座標変換処理",
        description: "マウスのスクリーン座標を3D空間で使用可能な正規化座標に変換",
        fileName: "DndScaleInteractionWithControls.tsx",
        code: `// マウス位置から正規化座標を計算
const getMousePosition = useCallback((event: any) => {
  const rect = gl.domElement.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  return new Vector3(x, y, 0)
}, [gl])

// マウス移動時の処理
const handlePointerMove = useCallback((event: any) => {
  if (!dragState.isDragging || !dragState.object) return

  event.stopPropagation()
  
  const currentMousePos = getMousePosition(event)
  const deltaX = currentMousePos.x - dragState.startPosition.x
  const deltaY = currentMousePos.y - dragState.startPosition.y
  
  // 距離に基づいてスケールを計算
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const scaleFactor = Math.max(0.1, 1 + distance * 2) // 最小スケール0.1
  
  // 均等にスケール変更
  dragState.object.scale.setScalar(scaleFactor)
}, [dragState, getMousePosition])`,
        highlights: [
          {
            id: "coordinate-conversion",
            startLine: 3,
            endLine: 5,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "座標変換",
              description: "スクリーン座標（ピクセル）を正規化デバイス座標（-1から1の範囲）に変換します。この変換により、画面サイズに依存しない一貫した操作が可能になります。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Vector3",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#event-data"
            }
          },
          {
            id: "distance-calculation",
            startLine: 17,
            endLine: 18,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "距離計算とスケール変更",
              description: "開始位置からの距離を計算し、その距離に基づいてスケールファクターを決定します。Math.max()で最小スケールを制限し、オブジェクトが消失することを防ぎます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D.scale",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#transformations"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'event-handling',
    name: "イベントハンドリング",
    description: "クリック、ホバー、ドラッグイベントの処理",
    files: ["src/app/demos/interactions/dnd-scale/components/DndScaleInteractionWithControls.tsx"],
    codeSections: [
      {
        title: "オブジェクトイベント処理",
        description: "3Dオブジェクトのクリック、ホバー、ドラッグイベントの実装",
        fileName: "DndScaleInteractionWithControls.tsx",
        code: `// オブジェクトクリック時の処理
const handleObjectClick = useCallback((event: any, objectRef: React.RefObject<Mesh>, objectName: string) => {
  event.stopPropagation()
  
  if (!objectRef.current) return

  if (dragState.isDragging && dragState.object === objectRef.current) {
    // ドロップ処理
    setDragState({
      isDragging: false,
      startPosition: new Vector3(),
      startScale: new Vector3(),
      object: null
    })
  } else {
    // ドラッグ開始処理
    const mousePos = getMousePosition(event)
    setDragState({
      isDragging: true,
      startPosition: mousePos.clone(),
      startScale: objectRef.current.scale.clone(),
      object: objectRef.current
    })
  }
}, [dragState, getMousePosition])

// JSX内でのイベント設定
<mesh
  ref={boxRef}
  position={[-3, 0, 0]}
  castShadow
  receiveShadow
  onClick={(e) => handleObjectClick(e, boxRef, 'box')}
  onPointerOver={() => setHoveredObject('box')}
  onPointerOut={() => setHoveredObject(null)}
  onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
>`,
        highlights: [
          {
            id: "event-propagation",
            startLine: 3,
            endLine: 3,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "イベント伝播の制御",
              description: "event.stopPropagation()でイベントの伝播を停止し、背景要素への意図しないイベント発火を防ぎます。これにより、オブジェクト操作とカメラ操作の競合を回避できます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events#event-data"
            }
          },
          {
            id: "conditional-events",
            startLine: 34,
            endLine: 34,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "条件付きイベント設定",
              description: "ドラッグ中のみonPointerMoveイベントを有効にすることで、不要な処理を削減し、パフォーマンスを向上させます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Object3D",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/events"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'camera-control-context',
    name: "カメラ制御コンテキスト",
    description: "React Contextを使用したカメラ操作の制御",
    files: ["src/app/demos/components/common/DemoLayoutWithControls.tsx"],
    codeSections: [
      {
        title: "コンテキストによる状態管理",
        description: "React Contextでカメラ操作の有効/無効を管理",
        fileName: "DemoLayoutWithControls.tsx",
        code: `// カメラ操作の制御用コンテキスト
const CameraControlContext = createContext<{
  enableControls: boolean
  setEnableControls: (enable: boolean) => void
}>({
  enableControls: true,
  setEnableControls: () => {}
})

export const useCameraControl = () => useContext(CameraControlContext)

// プロバイダーでの状態管理
const [enableControls, setEnableControls] = useState(true)

return (
  <CameraControlContext.Provider value={{ enableControls, setEnableControls }}>
    {/* Canvas内でOrbitControlsの制御 */}
    <OrbitControls 
      enabled={enableControls}
      enablePan={enableControls} 
      enableZoom={enableControls} 
      enableRotate={enableControls} 
    />
  </CameraControlContext.Provider>
)`,
        highlights: [
          {
            id: "context-definition",
            startLine: 2,
            endLine: 8,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "Context定義",
              description: "React Contextを使用してカメラ操作の状態を管理します。これにより、深い階層のコンポーネント間でpropsを渡すことなく状態を共有できます。",
              documentationUrl: "https://react.dev/reference/react/createContext",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/basic-animations"
            }
          },
          {
            id: "orbit-controls",
            startLine: 18,
            endLine: 22,
            startColumn: 1,
            endColumn: 1,
            tooltip: {
              title: "OrbitControls制御",
              description: "enabledプロパティでOrbitControls全体を制御し、個別のenable*プロパティで細かい操作を制御します。ドラッグ中は全ての操作を無効化します。",
              documentationUrl: "https://threejs.org/docs/#examples/en/controls/OrbitControls",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#orbitcontrols"
            }
          }
        ]
      }
    ]
  }
]