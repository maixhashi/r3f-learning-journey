export const levaFileContents: Record<string, string> = {
  'src/app/demos/library-integration/leva/realtime-params-control/page.tsx': `'use client'

import { DemoLayout } from '../../../components/common'
import { LevaControlDemo } from './components/LevaControlDemo'
import { levaFiles, levaFeatures, levaFileContents } from '../../../config/library-integration/leva/realtime-params-control'

export default function RealtimeParamsControlDemo() {
  return (
    <DemoLayout 
      title="リアルタイムパラメータ制御デモ" 
      description="Levaライブラリを使用したリアルタイムGUIコントロールのデモ"
      files={levaFiles}
      features={levaFeatures}
      fileContents={levaFileContents}
    >
      <LevaControlDemo />
    </DemoLayout>
  )
}`,

'src/app/demos/library-integration/leva/realtime-params-control/components/LevaControlDemo.tsx': `'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls, folder } from 'leva'
import { Mesh } from 'three'

export function LevaControlDemo() {
  const meshRef = useRef<Mesh>(null)
  
  // Levaコントロールの設定
  const {
    // 基本プロパティ
    color,
    scale,
    wireframe,
    
    // 位置制御
    positionX,
    positionY,
    positionZ,
    
    // 回転制御
    rotationX,
    rotationY,
    rotationZ,
    
    // アニメーション
    autoRotate,
    rotationSpeed,
    
    // マテリアル
    metalness,
    roughness,
    emissive,
    emissiveIntensity
  } = useControls({
    // 基本設定フォルダ
    ...folder('基本設定', {
      color: '#ff6b6b',
      scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
      wireframe: false
    }),
    
    // 位置制御フォルダ
    ...folder('位置制御', {
      positionX: { value: 0, min: -5, max: 5, step: 0.1 },
      positionY: { value: 0, min: -5, max: 5, step: 0.1 },
      positionZ: { value: 0, min: -5, max: 5, step: 0.1 }
    }),
    
    // 回転制御フォルダ
    ...folder('回転制御', {
      rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 }
    }),
    
    // アニメーション設定フォルダ
    ...folder('アニメーション', {
      autoRotate: true,
      rotationSpeed: { value: 1, min: 0, max: 5, step: 0.1 }
    }),
    
    // マテリアル設定フォルダ
    ...folder('マテリアル', {
      metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
      roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
      emissive: '#000000',
      emissiveIntensity: { value: 0, min: 0, max: 2, step: 0.01 }
    })
  })

  // アニメーションループ
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[positionX, positionY, positionZ]}
        rotation={[rotationX, rotationY, rotationZ]}
        scale={[scale, scale, scale]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          metalness={metalness}
          roughness={roughness}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      
      {/* 追加のオブジェクト */}
      <mesh position={[3, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>
      
      <mesh position={[-3, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshStandardMaterial color="#45b7d1" />
      </mesh>
    </group>
  )
}`,

  'src/app/demos/components/common/DemoLayout.tsx': `// DemoLayoutコンポーネントの内容は既存のものと同じ`,
  
  'src/app/demos/components/common/Lighting.tsx': `// Lightingコンポーネントの内容は既存のものと同じ`
}
