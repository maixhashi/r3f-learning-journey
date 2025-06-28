'use client'

import { useRef, useState, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'

interface DragState {
  isDragging: boolean
  startPosition: Vector3
  startScale: Vector3
  object: Mesh | null
}

export function DndScaleInteraction() {
  const boxRef = useRef<Mesh>(null)
  const sphereRef = useRef<Mesh>(null)
  const cylinderRef = useRef<Mesh>(null)
  
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startPosition: new Vector3(),
    startScale: new Vector3(),
    object: null
  })
  
  const [hoveredObject, setHoveredObject] = useState<string | null>(null)
  const { gl } = useThree()

  // マウス位置から正規化座標を計算
  const getMousePosition = useCallback((event: any) => {
    const rect = gl.domElement.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    return new Vector3(x, y, 0)
  }, [gl])

  // オブジェクトクリック時の処理
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
  }, [dragState, getMousePosition])

  // 背景クリック時の処理（ドラッグモード時はカメラ操作を無効化）
  const handleBackgroundClick = useCallback((event: any) => {
    if (dragState.isDragging) {
      // ドラッグモード中は背景クリックでドロップ
      setDragState({
        isDragging: false,
        startPosition: new Vector3(),
        startScale: new Vector3(),
        object: null
      })
    }
  }, [dragState.isDragging])

  return (
    <group>
      {/* 背景用の大きな平面（ドラッグモード時のドロップ検出用） */}
      <mesh
        position={[0, 0, -5]}
        onClick={handleBackgroundClick}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* 立方体 */}
      <mesh
        ref={boxRef}
        position={[-3, 0, 0]}
        castShadow
        receiveShadow
        onClick={(e) => handleObjectClick(e, boxRef, 'box')}
        onPointerOver={() => setHoveredObject('box')}
        onPointerOut={() => setHoveredObject(null)}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hoveredObject === 'box' ? '#ff8888' : '#ff6b6b'}
          emissive={dragState.object === boxRef.current ? '#440000' : '#000000'}
        />
      </mesh>

      {/* 球体 */}
      <mesh
        ref={sphereRef}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        onClick={(e) => handleObjectClick(e, sphereRef, 'sphere')}
        onPointerOver={() => setHoveredObject('sphere')}
        onPointerOut={() => setHoveredObject(null)}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color={hoveredObject === 'sphere' ? '#88ff88' : '#6bff6b'}
          emissive={dragState.object === sphereRef.current ? '#004400' : '#000000'}
        />
      </mesh>

      {/* 円柱 */}
      <mesh
        ref={cylinderRef}
        position={[3, 0, 0]}
        castShadow
        receiveShadow
        onClick={(e) => handleObjectClick(e, cylinderRef, 'cylinder')}
        onPointerOver={() => setHoveredObject('cylinder')}
        onPointerOut={() => setHoveredObject(null)}
        onPointerMove={dragState.isDragging ? handlePointerMove : undefined}
      >
        <cylinderGeometry args={[0.6, 0.6, 1.5, 32]} />
        <meshStandardMaterial 
          color={hoveredObject === 'cylinder' ? '#8888ff' : '#6b6bff'}
          emissive={dragState.object === cylinderRef.current ? '#000044' : '#000000'}
        />
      </mesh>

      {/* 説明テキスト */}
      <Text position={[0, -3, 0]} fontSize={0.4} color="white" anchorX="center">
        {dragState.isDragging 
          ? "ドラッグして寸法変更 | クリックでドロップ"
          : "オブジェクトをクリックしてドラッグモード開始"
        }
      </Text>

      {/* 操作説明 */}
      <Text position={[0, -4, 0]} fontSize={0.25} color="gray" anchorX="center">
        クリック → ドラッグで寸法変更 → クリックで確定
      </Text>

      {/* ドラッグ状態インジケーター */}
      {dragState.isDragging && (
        <Text position={[0, 3, 0]} fontSize={0.3} color="yellow" anchorX="center">
          🎯 ドラッグモード中
        </Text>
      )}
    </group>
  )
}