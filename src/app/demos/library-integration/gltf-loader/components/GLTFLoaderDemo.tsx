'use client'

import { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { Text } from '@react-three/drei'

// GLTFモデルコンポーネント
function GLTFModel() {
  // デフォルトのGLTFファイルを読み込み
  // ダウンロード元: https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Duck/glTF-Binary
  const { scene } = useGLTF('/models/duck.glb')
  
  return (
    <group>
      <primitive 
        object={scene} 
        scale={[2, 2, 2]} 
        position={[0, -1, 0]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

// ローディングコンポーネント
function LoadingFallback() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#666666" wireframe />
      </mesh>
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Loading GLTF Model...
      </Text>
    </group>
  )
}

export function GLTFLoaderDemo() {
  return (
    <group>
      <Suspense fallback={<LoadingFallback />}>
        <GLTFModel />
      </Suspense>
      
      {/* 情報テキスト */}
      <Text position={[0, -3, 0]} fontSize={0.3} color="white" anchorX="center">
        GLTF Model: Duck
      </Text>
      <Text position={[0, -3.5, 0]} fontSize={0.2} color="gray" anchorX="center">
        Source: Khronos glTF Sample Models
      </Text>
    </group>
  )
}

// GLTFファイルをプリロード（パフォーマンス向上）
useGLTF.preload('/models/duck.glb')