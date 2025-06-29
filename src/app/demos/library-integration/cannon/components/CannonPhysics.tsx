'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon'
import { Mesh, Vector3 } from 'three'

// キーボード入力を管理するカスタムフック
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
}

// 落下するボール（位置リセット機能付き）
function FallingBall({ 
  position, 
  onPositionReset,
  isInteractive = false
}: { 
  position: [number, number, number]
  onPositionReset: (api: any, originalPosition: [number, number, number]) => void
  isInteractive?: boolean
}) {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position,
    material: {
      friction: isInteractive ? 0.3 : 0.4,
      restitution: isInteractive ? 0.9 : 0.8,
    },
  }))

  const originalPosition = useRef(position)

  const handleClick = () => {
    if (isInteractive) {
      const force = new Vector3(
        (Math.random() - 0.5) * 10,
        Math.random() * 5 + 5,
        (Math.random() - 0.5) * 10
      )
      api.applyImpulse([force.x, force.y, force.z], [0, 0, 0])
    }
  }

  // 位置を監視して範囲外に出たら通知
  useFrame(() => {
    if (ref.current) {
      const pos = ref.current.position
      // Y座標が-20以下、またはXZ座標が±5を超えた場合（グリッドの範囲内）
      if (pos.y < -20 || Math.abs(pos.x) > 5 || Math.abs(pos.z) > 5) {
        onPositionReset(api, originalPosition.current)
      }
    }
  })

  return (
    <mesh 
      ref={ref} 
      castShadow 
      onClick={isInteractive ? handleClick : undefined}
      style={{ cursor: isInteractive ? 'pointer' : 'default' }}
    >
      <sphereGeometry args={isInteractive ? [0.6] : [0.5]} />
      <meshStandardMaterial color={isInteractive ? "#e74c3c" : "#4ecdc4"} />
    </mesh>
  )
}

// 落下するボックス（位置リセット機能付き、クリック可能）
function FallingBox({ 
  position, 
  onPositionReset 
}: { 
  position: [number, number, number]
  onPositionReset: (api: any, originalPosition: [number, number, number]) => void
}) {
  const [ref, api] = useBox<Mesh>(() => ({
    mass: 2,
    position,
    material: {
      friction: 0.6,
      restitution: 0.3,
    },
  }))

  const originalPosition = useRef(position)

  const handleClick = () => {
    const force = new Vector3(
      (Math.random() - 0.5) * 8,
      Math.random() * 4 + 3,
      (Math.random() - 0.5) * 8
    )
    api.applyImpulse([force.x, force.y, force.z], [0, 0, 0])
  }

  // 位置を監視して範囲外に出たら通知
  useFrame(() => {
    if (ref.current) {
      const pos = ref.current.position
      if (pos.y < -20 || Math.abs(pos.x) > 5 || Math.abs(pos.z) > 5) {
        onPositionReset(api, originalPosition.current)
      }
    }
  })

  return (
    <mesh 
      ref={ref} 
      castShadow 
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  )
}

// 地面
function Ground() {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -5, 0],
    material: {
      friction: 0.8,
      restitution: 0.2,
    },
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#95a5a6" />
    </mesh>
  )
}

// 壁（グリッドの境界に配置）
function Wall({ position, rotation }: { 
  position: [number, number, number]
  rotation?: [number, number, number] 
}) {
  const [ref] = useBox<Mesh>(() => ({
    position,
    rotation,
    type: 'Static',
    args: [0.2, 8, 10], // 薄い壁
  }))

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.2, 8, 10]} />
      <meshStandardMaterial color="#34495e" transparent opacity={0.3} />
    </mesh>
  )
}

export function CannonPhysics() {
  const [ballCount, setBallCount] = useState(0)
  const [boxCount, setBoxCount] = useState(0)
  const [resetTrigger, setResetTrigger] = useState(0)
  const keys = useKeyboard()

  // キーボード入力の処理（デバウンス付き）
  const [lastKeyPress, setLastKeyPress] = useState<Record<string, number>>({})

  useEffect(() => {
    const now = Date.now()
    const debounceTime = 200

    if (keys['b'] && (!lastKeyPress['b'] || now - lastKeyPress['b'] > debounceTime)) {
      setBallCount(prev => prev + 1)
      setLastKeyPress(prev => ({ ...prev, b: now }))
    }
    
    if (keys['x'] && (!lastKeyPress['x'] || now - lastKeyPress['x'] > debounceTime)) {
      setBoxCount(prev => prev + 1)
      setLastKeyPress(prev => ({ ...prev, x: now }))
    }
    
    if (keys['r'] && (!lastKeyPress['r'] || now - lastKeyPress['r'] > debounceTime)) {
      setBallCount(0)
      setBoxCount(0)
      setResetTrigger(prev => prev + 1)
      setLastKeyPress(prev => ({ ...prev, r: now }))
    }

    // 新しく追加：すべてのオブジェクトを元の位置に戻す
    if (keys['h'] && (!lastKeyPress['h'] || now - lastKeyPress['h'] > debounceTime)) {
      setResetTrigger(prev => prev + 1)
      setLastKeyPress(prev => ({ ...prev, h: now }))
    }
  }, [keys, lastKeyPress])

  // オブジェクトの位置をリセットする関数
  const handlePositionReset = (api: any, originalPosition: [number, number, number]) => {
    // 位置をリセット
    api.position.set(...originalPosition)
    // 速度をリセット
    api.velocity.set(0, 0, 0)
    // 角速度をリセット
    api.angularVelocity.set(0, 0, 0)
  }

  return (
    <group>
      <Physics
        gravity={[0, -9.81, 0]}
        defaultContactMaterial={{
          friction: 0.4,
          restitution: 0.3,
        }}
      >
        <Ground />
        
        {/* グリッドの境界に沿った壁（10x10グリッドの境界） */}
        {/* 左の壁 (x = -5) */}
        <Wall position={[-5, -1, 0]} />
        
        {/* 右の壁 (x = 5) */}
        <Wall position={[5, -1, 0]} />
        
        {/* 奥の壁 (z = -5) */}
        <Wall position={[0, -1, -5]} rotation={[0, Math.PI / 2, 0]} />
        
        {/* 手前の壁 (z = 5) */}
        <Wall position={[0, -1, 5]} rotation={[0, Math.PI / 2, 0]} />
        
        {/* メインのインタラクティブボール（球体） */}
        <FallingBall 
          key={`main-ball-${resetTrigger}`}
          position={[0, 2, 0]}
          onPositionReset={handlePositionReset}
          isInteractive={true}
        />
        
        {/* 追加されたボール（すべて球体） */}
        {Array.from({ length: ballCount }, (_, i) => (
          <FallingBall 
            key={`ball-${i}-${resetTrigger}`}
            position={[
              (Math.random() - 0.5) * 4, // グリッド内に収まるように調整
              5 + i * 0.5,
              (Math.random() - 0.5) * 4
            ]} 
            onPositionReset={handlePositionReset}
            isInteractive={true}
          />
        ))}
        
        {/* 追加されたボックス */}
        {Array.from({ length: boxCount }, (_, i) => (
          <FallingBox 
            key={`box-${i}-${resetTrigger}`}
            position={[
              (Math.random() - 0.5) * 4, // グリッド内に収まるように調整
              6 + i * 0.5,
              (Math.random() - 0.5) * 4
            ]} 
            onPositionReset={handlePositionReset}
          />
        ))}
      </Physics>
      
      {/* UI テキスト */}
      <Text position={[0, 8, 0]} fontSize={0.8} color="white" anchorX="center">
        Cannon.js Physics Demo
      </Text>
      <Text position={[0, 7, 0]} fontSize={0.4} color="#bdc3c7" anchorX="center">
        赤いボールやボックスをクリックして力を加えてみてください
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
          Y &lt; -20 or |X|,|Z| &gt; 5
        </Text>
      </group>

      {/* インタラクション説明 */}
      <group position={[0, 5.5, 0]}>
        <Text position={[0, 0, 0]} fontSize={0.25} color="#f1c40f" anchorX="center">
          💡 すべてのオブジェクトがクリック可能です
        </Text>
      </group>
    </group>
  )
}
