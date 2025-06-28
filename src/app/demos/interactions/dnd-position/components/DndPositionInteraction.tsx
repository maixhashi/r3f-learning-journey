'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Vector3, Raycaster, Vector2 } from 'three'
import * as THREE from 'three'

interface DraggableObject {
  id: string
  position: Vector3
  color: string
  isDragging: boolean
}

export function DndPositionInteraction() {
  const { camera, gl } = useThree()
  const [objects, setObjects] = useState<DraggableObject[]>([
    { id: 'box1', position: new Vector3(-2, 0, 0), color: '#ff6b6b', isDragging: false },
    { id: 'box2', position: new Vector3(0, 0, 0), color: '#4ecdc4', isDragging: false },
    { id: 'box3', position: new Vector3(2, 0, 0), color: '#45b7d1', isDragging: false }
  ])
  
  const [dragState, setDragState] = useState<{
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

  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())
  const meshRefs = useRef<{ [key: string]: Mesh }>({})

  // マウス座標を正規化
  const updateMousePosition = (event: MouseEvent) => {
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  // オブジェクトとの交差判定
  const getIntersectedObject = () => {
    raycaster.current.setFromCamera(mouse.current, camera)
    const meshes = Object.values(meshRefs.current).filter(Boolean)
    const intersects = raycaster.current.intersectObjects(meshes)
    return intersects.length > 0 ? intersects[0] : null
  }

  // クリックハンドラー
  const handleClick = (event: MouseEvent) => {
    updateMousePosition(event)
    const intersect = getIntersectedObject()

    if (dragState.isDragging) {
      // ドロップ処理
      if (dragState.dragObjectId) {
        setObjects(prev => prev.map(obj => 
          obj.id === dragState.dragObjectId 
            ? { ...obj, isDragging: false }
            : obj
        ))
      }
      setDragState({
        isDragging: false,
        dragObjectId: null,
        dragPlane: null,
        offset: new Vector3()
      })
    } else if (intersect) {
      // ドラッグ開始
      const objectId = intersect.object.userData.id
      if (objectId) {
        // ドラッグ用の平面を作成（Y=0の水平面）
        const dragPlane = new THREE.Plane(new Vector3(0, 1, 0), 0)
        
        // オフセット計算
        const intersectPoint = new Vector3()
        raycaster.current.ray.intersectPlane(dragPlane, intersectPoint)
        const objectPosition = objects.find(obj => obj.id === objectId)?.position || new Vector3()
        const offset = objectPosition.clone().sub(intersectPoint)

        setObjects(prev => prev.map(obj => 
          obj.id === objectId 
            ? { ...obj, isDragging: true }
            : obj
        ))

        setDragState({
          isDragging: true,
          dragObjectId: objectId,
          dragPlane,
          offset
        })
      }
    }
  }

  // マウス移動ハンドラー
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

  // イベントリスナーの設定
  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [dragState, objects, gl.domElement])

  // カーソルスタイルの更新
  useFrame(() => {
    const canvas = gl.domElement
    if (dragState.isDragging) {
      canvas.style.cursor = 'grabbing'
    } else {
      const intersect = getIntersectedObject()
      canvas.style.cursor = intersect ? 'grab' : 'default'
    }
  })

  return (
    <group>
      {objects.map((obj) => (
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
      ))}
      
      {/* 説明テキスト */}
      <Text 
        position={[0, 3, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
      >
        Click objects to start dragging, click again to drop
      </Text>
      
      {/* グリッド平面（視覚的な参考用） */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#333333" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}