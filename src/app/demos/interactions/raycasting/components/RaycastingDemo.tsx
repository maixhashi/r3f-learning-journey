'use client'

import { useRef, useState, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, Raycaster, Vector2, Vector3, BufferGeometry, BufferAttribute } from 'three'
import * as THREE from 'three'

interface Target {
  id: number
  position: [number, number, number]
  color: string
  isHit: boolean
  hitCount: number
}

export function RaycastingDemo() {
  const { camera, gl } = useThree()
  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())
  const rayLineRef = useRef<Mesh>(null)
  
  const [targets] = useState<Target[]>([
    { id: 1, position: [-3, 2, -2], color: '#ff6b6b', isHit: false, hitCount: 0 },
    { id: 2, position: [1, -1, -3], color: '#4ecdc4', isHit: false, hitCount: 0 },
    { id: 3, position: [3, 1, -1], color: '#45b7d1', isHit: false, hitCount: 0 },
    { id: 4, position: [-1, 3, -4], color: '#96ceb4', isHit: false, hitCount: 0 },
    { id: 5, position: [2, -2, -2], color: '#feca57', isHit: false, hitCount: 0 }
  ])
  
  const targetRefs = useRef<{ [key: number]: Mesh }>({})
  
  // レイキャスト情報をrefで管理
  const currentRayRef = useRef<{
    origin: Vector3
    direction: Vector3
    intersectionPoint: Vector3
    distance: number
    hitTarget: string | null
  }>({
    origin: new Vector3(),
    direction: new Vector3(),
    intersectionPoint: new Vector3(),
    distance: 0,
    hitTarget: null
  })
  
  const [score, setScore] = useState(0)
  const [shotsFired, setShotsFired] = useState(0)
  const [displayInfo, setDisplayInfo] = useState<{
    distance: number
    hitTarget: string | null
    origin: Vector3
  } | null>(null)

  // マウス移動でレイを更新
  const handleMouseMove = useCallback((event: any) => {
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // レイキャストを設定
    raycaster.current.setFromCamera(mouse.current, camera)
    
    // レイの情報を更新
    const origin = raycaster.current.ray.origin.clone()
    const direction = raycaster.current.ray.direction.clone()
    
    // ターゲットとの交差判定
    const meshes = Object.values(targetRefs.current).filter(Boolean)
    const intersects = raycaster.current.intersectObjects(meshes)
    
    if (intersects.length > 0) {
      const intersect = intersects[0]
      const mesh = intersect.object as Mesh
      const targetId = mesh.userData.targetId
      
      currentRayRef.current = {
        origin,
        direction,
        intersectionPoint: intersect.point.clone(),
        distance: intersect.distance,
        hitTarget: `Target ${targetId}`
      }
    } else {
      // 何も当たらない場合は遠くまで射線を伸ばす
      const farPoint = origin.clone().add(direction.clone().multiplyScalar(20))
      currentRayRef.current = {
        origin,
        direction,
        intersectionPoint: farPoint,
        distance: 20,
        hitTarget: null
      }
    }

    // 表示用の情報を更新
    setDisplayInfo({
      distance: currentRayRef.current.distance,
      hitTarget: currentRayRef.current.hitTarget,
      origin: currentRayRef.current.origin.clone()
    })
  }, [camera, gl])

  // クリックで射撃
  const handleShoot = useCallback(() => {
    setShotsFired(prev => prev + 1)
    
    if (currentRayRef.current.hitTarget) {
      setScore(prev => prev + 10)
      
      // ヒットエフェクト
      const targetId = parseInt(currentRayRef.current.hitTarget.split(' ')[1])
      const target = targetRefs.current[targetId]
      if (target) {
        // ヒット時のアニメーション
        target.scale.setScalar(1.5)
        setTimeout(() => {
          if (target) target.scale.setScalar(1)
        }, 200)
      }
    }
  }, [])

  // レイライン用のジオメトリを更新
  useFrame(() => {
    if (rayLineRef.current && currentRayRef.current) {
      const geometry = rayLineRef.current.geometry as BufferGeometry
      const positions = new Float32Array([
        currentRayRef.current.origin.x, 
        currentRayRef.current.origin.y, 
        currentRayRef.current.origin.z,
        currentRayRef.current.intersectionPoint.x, 
        currentRayRef.current.intersectionPoint.y, 
        currentRayRef.current.intersectionPoint.z
      ])
      
      // BufferAttributeの正しい更新方法
      const positionAttribute = geometry.getAttribute('position') as BufferAttribute
      if (positionAttribute && positionAttribute.array) {
        // 配列の値を直接更新
        for (let i = 0; i < positions.length; i++) {
          positionAttribute.array[i] = positions[i]
        }
        positionAttribute.needsUpdate = true
      } else {
        // 属性が存在しない場合は新しく作成
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      }
    }
  })

  return (
    <group onPointerMove={handleMouseMove} onClick={handleShoot}>
      {/* ターゲット群 */}
      {targets.map((target) => (
        <group key={target.id} position={target.position}>
          <mesh
            ref={(ref) => {
              if (ref) {
                targetRefs.current[target.id] = ref
                ref.userData.targetId = target.id
              }
            }}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color={target.color}
              emissive={currentRayRef.current?.hitTarget === `Target ${target.id}` ? '#ff0000' : '#000000'}
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* ターゲット番号 */}
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
          >
            {target.id}
          </Text>
        </group>
      ))}

      {/* レイライン（射線）の可視化 */}
      <line ref={rayLineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array(6)} // 初期値
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={currentRayRef.current?.hitTarget ? "#ff0000" : "#00ff00"} 
          opacity={0.8} 
          transparent 
        />
      </line>

      {/* クロスヘア（照準）*/}
      {currentRayRef.current && (
        <group position={currentRayRef.current.intersectionPoint}>
          {/* 十字の照準 */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={4}
                array={new Float32Array([
                  -0.1, 0, 0,  0.1, 0, 0,  // 横線
                  0, -0.1, 0,  0, 0.1, 0   // 縦線
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.9} transparent />
          </line>
          
          {/* 中心点 */}
          <mesh>
            <sphereGeometry args={[0.02]} />
            <meshBasicMaterial 
              color={currentRayRef.current.hitTarget ? "#ff0000" : "#ffffff"} 
            />
          </mesh>
        </group>
      )}

      {/* HUD情報表示 */}
      <group>
        {/* スコア表示 */}
        <Text position={[-4, 4, 0]} fontSize={0.4} color="#00ff00" anchorX="left">
          {`SCORE: ${score}`}
        </Text>
        
        {/* 射撃回数 */}
        <Text position={[-4, 3.5, 0]} fontSize={0.3} color="#ffffff" anchorX="left">
          {`SHOTS: ${shotsFired}`}
        </Text>
        
        {/* 命中率 */}
        <Text position={[-4, 3, 0]} fontSize={0.3} color="#ffff00" anchorX="left">
          {`ACCURACY: ${shotsFired > 0 ? Math.round((score/10/shotsFired) * 100) : 0}%`}
        </Text>

        {/* レイキャスト詳細情報 */}
        {displayInfo && (
          <group>
            <Text position={[2, 4, 0]} fontSize={0.25} color="#cyan" anchorX="left">
              {`RAY ORIGIN: (${displayInfo.origin.x.toFixed(1)}, ${displayInfo.origin.y.toFixed(1)}, ${displayInfo.origin.z.toFixed(1)})`}
            </Text>
            <Text position={[2, 3.6, 0]} fontSize={0.25} color="#cyan" anchorX="left">
              {`DISTANCE: ${displayInfo.distance.toFixed(2)}m`}
            </Text>
            {displayInfo.hitTarget && (
              <Text position={[2, 3.2, 0]} fontSize={0.25} color="#ff0000" anchorX="left">
                {`TARGET LOCKED: ${displayInfo.hitTarget}`}
              </Text>
            )}
          </group>
        )}
      </group>

      {/* 操作説明 */}
      <Text position={[0, -4, 0]} fontSize={0.3} color="white" anchorX="center">
        Move mouse to aim | Click to shoot | Green line = miss, Red line = hit
      </Text>
    </group>
  )
}