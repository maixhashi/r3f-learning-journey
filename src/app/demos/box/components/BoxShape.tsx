'use client'

import { Text } from '@react-three/drei'

export function BoxShape() {
  return (
    <group>
      {/* 立方体メッシュ */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        {/* 
          boxGeometry: 立方体のジオメトリを作成
          args: [width, height, depth] - 幅、高さ、奥行き
        */}
        <boxGeometry args={[2, 2, 2]} />
        
        {/* 
          meshStandardMaterial: 物理ベースレンダリング対応マテリアル
          - ライティングに反応する
          - 影の描画をサポート
        */}
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      {/* ラベルテキスト */}
      <Text position={[0, -2, 0]} fontSize={0.5} color="white" anchorX="center">
        Box (立方体)
      </Text>
    </group>
  )
}