'use client'

import { Text, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function PostprocessingDemo() {
  return (
    <>
      {/* 3Dオブジェクト */}
      <group>
        {/* 発光する球体 - 静止 */}
        <Sphere args={[1.0]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000" 
            emissiveIntensity={2.0}  // より強い発光
          />
        </Sphere>

        {/* ラベルテキスト */}
        <Text 
          position={[0, -2.5, 0]} 
          fontSize={0.4} 
          color="white" 
          anchorX="center"
        >
          Postprocessing Effects Demo
        </Text>
      </group>

      {/* ポストプロセッシングエフェクト - 全て強力な設定 */}
      <EffectComposer>
        {/* ブルーム効果 - 非常に強力 */}
        <Bloom
          intensity={5.0}              // 強度を大幅アップ
          luminanceThreshold={0.0}     // 閾値を0にして全てが光る
          luminanceSmoothing={0.1}     // 滑らかさを下げてより強烈に
          height={300}
          blendFunction={BlendFunction.ADD}
        />
        
        {/* 色収差効果 - 非常に強力 */}
        <ChromaticAberration
          offset={[0.02, 0.02]}        // 歪みを4倍に増加
          blendFunction={BlendFunction.NORMAL}
        />
        
        {/* ビネット効果 - 非常に強力 */}
        <Vignette
          eskil={false}
          offset={0.3}                 // 中央まで暗くなる
          darkness={1.0}               // 最大の暗さ
          blendFunction={BlendFunction.MULTIPLY}
        />
      </EffectComposer>
    </>
  )
}
