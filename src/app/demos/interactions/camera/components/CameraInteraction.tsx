'use client'

import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Cone } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'
import * as THREE from 'three'

export function CameraInteraction() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const [cameraInfo, setCameraInfo] = useState({
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

  // カメラを特定の位置に移動
  const moveCameraTo = (position: [number, number, number], target: [number, number, number] = [0, 0, 0]) => {
    if (controlsRef.current) {
      // カメラ位置をアニメーション付きで移動
      camera.position.set(...position)
      controlsRef.current.target.set(...target)
      controlsRef.current.update()
    }
  }

  return (
    <group>
      {/* OrbitControls */}
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />

      {/* 中央のメインオブジェクト */}
      <Box position={[0, 0, 0]} args={[1, 1, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#4f46e5" />
      </Box>

      {/* 周囲のオブジェクト群 */}
      <Sphere position={[3, 0, 0]} args={[0.5]} castShadow receiveShadow>
        <meshStandardMaterial color="#ef4444" />
      </Sphere>

      <Cone position={[-3, 0, 0]} args={[0.5, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#10b981" />
      </Cone>

      <Box position={[0, 0, 3]} args={[0.8, 0.8, 0.8]} castShadow receiveShadow>
        <meshStandardMaterial color="#f59e0b" />
      </Box>

      <Sphere position={[0, 0, -3]} args={[0.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#8b5cf6" />
      </Sphere>

      <Box position={[0, 2, 0]} args={[0.6, 0.6, 0.6]} castShadow receiveShadow>
        <meshStandardMaterial color="#ec4899" />
      </Box>

      {/* カメラ情報表示 */}
      <Text 
        position={[0, -3, 0]} 
        fontSize={0.3} 
        color="white" 
        anchorX="center"
        anchorY="middle"
      >
        {`Camera: (${cameraInfo.position.x.toFixed(1)}, ${cameraInfo.position.y.toFixed(1)}, ${cameraInfo.position.z.toFixed(1)})`}
      </Text>

      <Text 
        position={[0, -3.5, 0]} 
        fontSize={0.3} 
        color="white" 
        anchorX="center"
        anchorY="middle"
      >
        {`Target: (${cameraInfo.target.x.toFixed(1)}, ${cameraInfo.target.y.toFixed(1)}, ${cameraInfo.target.z.toFixed(1)})`}
      </Text>

      {/* プリセットビューボタン（3D空間内） */}
      <group position={[0, -4.5, 0]}>
        <mesh 
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
        </Text>

        <mesh 
          position={[0, 0, 0]} 
          onClick={() => moveCameraTo([0, 8, 0], [0, 0, 0])}
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
          onPointerOut={(e) => (document.body.style.cursor = 'default')}
        >
          <boxGeometry args={[1, 0.3, 0.1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.15} color="white" anchorX="center">
          Top View
        </Text>

        <mesh 
          position={[2, 0, 0]} 
          onClick={() => moveCameraTo([8, 0, 0], [0, 0, 0])}
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
          onPointerOut={(e) => (document.body.style.cursor = 'default')}
        >
          <boxGeometry args={[1, 0.3, 0.1]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <Text position={[2, 0, 0.1]} fontSize={0.15} color="white" anchorX="center">
          Side View
        </Text>
      </group>
    </group>
  )
}