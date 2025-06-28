import { FeatureFile } from '../../types'

export const dndPositionFeatures: FeatureFile[] = [
  {
    id: 'raycasting-interaction',
    name: "レイキャスティング",
    description: "マウス位置からのレイキャストによるオブジェクト検出",
    files: ["src/app/demos/interactions/dnd-position/components/DndPositionInteraction.tsx"],
    codeSections: [
      {
        title: "レイキャスティングによる当たり判定",
        description: "マウス座標から3D空間のオブジェクトを検出する仕組み",
        fileName: "DndPositionInteraction.tsx",
        code: `// オブジェクトとの交差判定
const getIntersectedObject = () => {
  raycaster.current.setFromCamera(mouse.current, camera)
  const meshes = Object.values(meshRefs.current).filter(Boolean)
  const intersects = raycaster.current.intersectObjects(meshes)
  return intersects.length > 0 ? intersects[0] : null
}

// マウス座標を正規化
const updateMousePosition = (event: MouseEvent) => {
  const rect = gl.domElement.getBoundingClientRect()
  mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}`,
        highlights: [
          {
            id: "raycaster",
            startLine: 2,
            endLine: 2,
            startColumn: 2,
            endColumn: 50,
            tooltip: {
              title: "Raycaster",
              description: "マウス位置から3D空間に向けて光線を飛ばし、交差するオブジェクトを検出するThree.jsの機能です。クリック判定やホバー検出に使用されます。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          },
          {
            id: "mouse-normalization",
            startLine: 9,
            endLine: 11,
            startColumn: 2,
            endColumn: 70,
            tooltip: {
              title: "マウス座標の正規化",
              description: "ブラウザのマウス座標を-1から1の範囲に正規化します。Three.jsのレイキャスティングで使用するために必要な変換です。",
              documentationUrl: "https://threejs.org/docs/#api/en/core/Raycaster",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'drag-drop-logic',
    name: "ドラッグ&ドロップ",
    description: "クリックによるドラッグ開始とドロップによる位置確定",
    files: ["src/app/demos/interactions/dnd-position/components/DndPositionInteraction.tsx"],
    codeSections: [
      {
        title: "ドラッグ&ドロップの状態管理",
        description: "ドラッグ状態の管理とマウス移動による位置更新",
        fileName: "DndPositionInteraction.tsx",
        code: `const [dragState, setDragState] = useState<{
  isDragging: boolean
  dragObjectId: string | null
  dragPlane: THREE.Plane | null
  offset: Vector3
}>({
  isDragging: false,
  dragObjectId: null,
  dragPlane: null,
  offset: new Vector3()
})

// クリックハンドラー
const handleClick = (event: MouseEvent) => {
  updateMousePosition(event)
  const intersect = getIntersectedObject()

  if (dragState.isDragging) {
    // ドロップ処理
    setDragState({
      isDragging: false,
      dragObjectId: null,
      dragPlane: null,
      offset: new Vector3()
    })
  } else if (intersect) {
    // ドラッグ開始
    const objectId = intersect.object.userData.id
    const dragPlane = new THREE.Plane(new Vector3(0, 1, 0), 0)
    
    setDragState({
      isDragging: true,
      dragObjectId: objectId,
      dragPlane,
      offset
    })
  }
}`,
        highlights: [
          {
            id: "drag-state",
            startLine: 1,
            endLine: 10,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "ドラッグ状態管理",
              description: "ドラッグ中のオブジェクト、ドラッグ平面、オフセットなどの情報を管理します。複雑なインタラクションを実現するための状態設計です。",
              documentationUrl: "https://react.dev/reference/react/useState",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          },
          {
            id: "drag-plane",
            startLine: 28,
            endLine: 28,
            startColumn: 4,
            endColumn: 60,
            tooltip: {
              title: "ドラッグ平面",
              description: "3D空間でのドラッグを2D平面に制限するためのPlaneオブジェクトです。Y=0の水平面を作成してオブジェクトを地面に沿って移動させます。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Plane",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'mouse-interaction',
    name: "マウスインタラクション",
    description: "マウス移動によるリアルタイム位置更新とカーソル変更",
    files: ["src/app/demos/interactions/dnd-position/components/DndPositionInteraction.tsx"],
    codeSections: [
      {
        title: "マウス移動とカーソル制御",
        description: "ドラッグ中のオブジェクト移動とユーザビリティ向上のためのカーソル変更",
        fileName: "DndPositionInteraction.tsx",
        code: `// マウス移動ハンドラー
const handleMouseMove = (event: MouseEvent) => {
  if (!dragState.isDragging || !dragState.dragObjectId || !dragState.dragPlane) return

  updateMousePosition(event)
  raycaster.current.setFromCamera(mouse.current, camera)
  
  const intersectPoint = new Vector3()
  if (raycaster.current.ray.intersectPlane(dragState.dragPlane, intersectPoint)) {
    const newPosition = intersectPoint.add(dragState.offset)
    
    setObjects(prev => prev.map(obj => 
      obj.id === dragState.dragObjectId 
        ? { ...obj, position: newPosition.clone() }
        : obj
    ))
  }
}

// カーソルスタイルの更新
useFrame(() => {
  const canvas = gl.domElement
  if (dragState.isDragging) {
    canvas.style.cursor = 'grabbing'
  } else {
    const intersect = getIntersectedObject()
    canvas.style.cursor = intersect ? 'grab' : 'default'
  }
})`,
        highlights: [
          {
            id: "plane-intersection",
            startLine: 7,
            endLine: 8,
            startColumn: 2,
            endColumn: 60,
            tooltip: {
              title: "平面との交点計算",
              description: "レイとドラッグ平面の交点を計算して、3D空間での正確な位置を求めます。これによりマウスの動きを3D座標に変換できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/math/Ray.intersectPlane",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          },
          {
            id: "cursor-feedback",
            startLine: 19,
            endLine: 25,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "カーソルフィードバック",
              description: "ユーザビリティ向上のため、オブジェクトの状態に応じてカーソルを変更します。grab（掴める）、grabbing（掴み中）、default（通常）を使い分けます。",
              documentationUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/cursor",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'visual-feedback',
    name: "視覚的フィードバック",
    description: "ドラッグ状態の視覚的表現とユーザー体験の向上",
    files: ["src/app/demos/interactions/dnd-position/components/DndPositionInteraction.tsx"],
    codeSections: [
      {
        title: "状態に応じた視覚的変化",
        description: "透明度変更とテキスト表示による直感的なフィードバック",
        fileName: "DndPositionInteraction.tsx",
        code: `{objects.map((obj) => (
  <group key={obj.id}>
    {/* ドラッグ可能なオブジェクト */}
    <mesh
      ref={(ref) => {
        if (ref) meshRefs.current[obj.id] = ref
      }}
      position={obj.position}
      userData={{ id: obj.id }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={obj.color}
        opacity={obj.isDragging ? 0.7 : 1}
        transparent
      />
    </mesh>
    
    {/* オブジェクトのラベル */}
    <Text 
      position={[obj.position.x, obj.position.y - 1, obj.position.z]}
      fontSize={0.3}
      color="white"
      anchorX="center"
    >
      {obj.isDragging ? 'Dragging...' : 'Click to Drag'}
    </Text>
  </group>
))}`,
        highlights: [
          {
            id: "opacity-feedback",
            startLine: 15,
            endLine: 16,
            startColumn: 8,
            endColumn: 20,
            tooltip: {
              title: "透明度フィードバック",
              description: "ドラッグ中のオブジェクトを半透明にすることで、現在の状態を視覚的に表現します。ユーザーが直感的に操作状態を理解できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/Material.opacity",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#materials"
            }
          },
          {
            id: "dynamic-text",
            startLine: 26,
            endLine: 26,
            startColumn: 6,
            endColumn: 60,
            tooltip: {
              title: "動的テキスト表示",
              description: "オブジェクトの状態に応じてテキストを動的に変更し、現在の操作モードをユーザーに伝えます。",
              documentationUrl: "https://github.com/pmndrs/drei#text",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/tutorials/events-and-interaction"
            }
          }
        ]
      }
    ]
  }
]