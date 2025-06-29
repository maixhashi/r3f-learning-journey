import { FeatureFile } from '../../types'

export const postprocessingFeatures: FeatureFile[] = [
  {
    id: 'bloom-effect',
    name: "ブルーム効果",
    description: "発光オブジェクトに美しいグロー効果を追加",
    files: ["src/app/demos/library-integration/postprocessing/components/PostprocessingDemo.tsx"],
    codeSections: [
      {
        title: "ブルーム効果の実装",
        description: "EffectComposerとBloomエフェクトを使用した発光表現",
        fileName: "PostprocessingDemo.tsx",
        code: `import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

// ポストプロセッシングエフェクト
<EffectComposer>
  {/* ブルーム効果 - 発光オブジェクトを光らせる */}
  <Bloom
    intensity={bloomIntensity}           // エフェクトの強度
    luminanceThreshold={0.2}            // 発光の閾値
    luminanceSmoothing={0.9}            // 発光の滑らかさ
    height={300}                        // エフェクトの解像度
    blendFunction={BlendFunction.ADD}   // ブレンドモード
  />
</EffectComposer>

// 発光するマテリアル
<meshStandardMaterial 
  color="#ff6b6b" 
  emissive="#ff6b6b"        // 自己発光色
  emissiveIntensity={0.5}   // 発光強度
/>`,
        highlights: [
          {
            id: "effect-composer",
            startLine: 5,
            endLine: 5,
            startColumn: 0,
            endColumn: 17,
            tooltip: {
              title: "EffectComposer",
              description: "ポストプロセッシングエフェクトを管理するコンポーネント。複数のエフェクトを組み合わせて適用できます。",
              documentationUrl: "https://docs.pmnd.rs/react-three-fiber/getting-started/examples#postprocessing",
              r3fDocumentationUrl: "https://github.com/pmndrs/react-postprocessing"
            }
          },
          {
            id: "bloom-effect",
            startLine: 7,
            endLine: 13,
            startColumn: 2,
            endColumn: 4,
            tooltip: {
              title: "Bloom Effect",
              description: "明るい部分を光らせるエフェクト。luminanceThresholdで発光の閾値を、intensityで強度を制御します。",
              documentationUrl: "https://vanruesc.github.io/postprocessing/public/docs/class/src/effects/BloomEffect.js~BloomEffect.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/react-postprocessing#bloom"
            }
          },
          {
            id: "emissive-material",
            startLine: 16,
            endLine: 20,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "Emissive Material",
              description: "emissiveプロパティで自己発光を設定。ブルーム効果と組み合わせることで美しいグロー効果を実現できます。",
              documentationUrl: "https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.emissive",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/api/objects#materials"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'chromatic-aberration',
    name: "色収差効果",
    description: "レンズの歪みを模擬した色収差エフェクト",
    files: ["src/app/demos/library-integration/postprocessing/components/PostprocessingDemo.tsx"],
    codeSections: [
      {
        title: "色収差エフェクト",
        description: "ChromaticAberrationを使用したレンズ歪み効果",
        fileName: "PostprocessingDemo.tsx",
        code: `import { ChromaticAberration } from '@react-three/postprocessing'

{/* 色収差効果 - レンズの歪みを模擬 */}
<ChromaticAberration
  offset={[chromaticAberrationOffset, chromaticAberrationOffset]}
  blendFunction={BlendFunction.NORMAL}
/>

// 動的制御
const [chromaticAberrationOffset, setChromaticAberrationOffset] = useState(0.002)

<input
  type="range"
  min="0"
  max="0.01"
  step="0.0001"
  value={chromaticAberrationOffset}
  onChange={(e) => setChromaticAberrationOffset(parseFloat(e.target.value))}
/>`,
        highlights: [
          {
            id: "chromatic-aberration",
            startLine: 3,
            endLine: 7,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "ChromaticAberration",
              description: "色収差効果を追加するエフェクト。offsetで歪みの強度を、blendFunctionでブレンドモードを制御します。",
              documentationUrl: "https://vanruesc.github.io/postprocessing/public/docs/class/src/effects/ChromaticAberrationEffect.js~ChromaticAberrationEffect.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/react-postprocessing#chromaticaberration"
            }
          },
          {
            id: "offset-control",
            startLine: 5,
            endLine:5,
            startColumn: 2,
            endColumn: 65,
            tooltip: {
              title: "Offset Control",
              description: "色収差の強度を制御するパラメータ。[x, y]の配列で水平・垂直方向の歪みを個別に設定できます。",
              documentationUrl: "https://vanruesc.github.io/postprocessing/public/docs/class/src/effects/ChromaticAberrationEffect.js~ChromaticAberrationEffect.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/react-postprocessing#chromaticaberration"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'vignette-effect',
    name: "ビネット効果",
    description: "画面端を暗くする映画的な効果",
    files: ["src/app/demos/library-integration/postprocessing/components/PostprocessingDemo.tsx"],
    codeSections: [
      {
        title: "ビネット効果の実装",
        description: "Vignetteエフェクトで画面端を暗くする映画的表現",
        fileName: "PostprocessingDemo.tsx",
        code: `import { Vignette } from '@react-three/postprocessing'

{/* ビネット効果 - 画面端を暗くする */}
<Vignette
  eskil={false}                           // Eskil Steenbergアルゴリズムの使用
  offset={0.1}                           // ビネットの開始位置
  darkness={0.5}                         // 暗さの強度
  blendFunction={BlendFunction.MULTIPLY} // ブレンドモード
/>

// 複数エフェクトの組み合わせ
<EffectComposer>
  <Bloom intensity={1.5} luminanceThreshold={0.2} />
  <ChromaticAberration offset={[0.002, 0.002]} />
  <Vignette offset={0.1} darkness={0.5} />
</EffectComposer>`,
        highlights: [
          {
            id: "vignette-effect",
            startLine: 3,
            endLine: 8,
            startColumn: 0,
            endColumn: 2,
            tooltip: {
              title: "Vignette Effect",
              description: "画面の端を暗くするエフェクト。映画的な雰囲気を演出し、中央に視線を集中させる効果があります。",
              documentationUrl: "https://vanruesc.github.io/postprocessing/public/docs/class/src/effects/VignetteEffect.js~VignetteEffect.html",
              r3fDocumentationUrl: "https://github.com/pmndrs/react-postprocessing#vignette"
            }
          },
          {
            id: "effect-combination",
            startLine: 11,
            endLine: 15,
            startColumn: 0,
            endColumn: 17,
            tooltip: {
              title: "Effect Combination",
              description: "複数のポストプロセッシングエフェクトを組み合わせることで、より豊かな視覚表現を実現できます。",
              documentationUrl: "https://docs.pmnd.rs/react-three-fiber/getting-started/examples#postprocessing",
              r3fDocumentationUrl: "https://github.com/pmndrs/react-postprocessing"
            }
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-postprocessing',
    name: "高度なポストプロセッシング",
    description: "複数エフェクトの組み合わせとパフォーマンス最適化",
    files: ["src/app/demos/library-integration/postprocessing/components/PostprocessingDemo.tsx"],
    codeSections: [
      {
        title: "パフォーマンス最適化",
        description: "エフェクトの最適化とリアルタイム制御のベストプラクティス",
        fileName: "AdvancedPostprocessing.tsx",
        code: `// パフォーマンス最適化のテクニック
import { useMemo } from 'react'
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing'

function OptimizedPostprocessing() {
  // エフェクトパラメータをメモ化
  const bloomParams = useMemo(() => ({
    intensity: 1.5,
    luminanceThreshold: 0.2,
    luminanceSmoothing: 0.9,
    height: 300
  }), [])

  // 条件付きエフェクト適用
  const [enableSSAO, setEnableSSAO] = useState(false)
  const [enableDOF, setEnableDOF] = useState(false)

  return (
    <EffectComposer multisampling={8}>
      <Bloom {...bloomParams} />
      
      {/* 重いエフェクトは条件付きで適用 */}
      {enableSSAO && (
        <SSAO
          samples={30}
          radius={20}
          intensity={0.1}
          bias={0.5}
          distanceThreshold={1.0}
          rangeThreshold={0.5}
        />
      )}
      
      {enableDOF && (
        <DepthOfField
          focusDistance={0.0}
          focalLength={0.02}
          bokehScale={2.0}
          height={480}
        />
      )}
    </EffectComposer>
  )
}`,
        highlights: [
          {
            id: "memoization",
            startLine: 6,
            endLine: 11,
            startColumn: 2,
            endColumn: 6,
            tooltip: {
              title: "Parameter Memoization",
              description: "useMemoを使用してエフェクトパラメータをメモ化し、不要な再レンダリングを防ぎます。",
              documentationUrl: "https://react.dev/reference/react/useMemo",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance"
            }
          },
          {
            id: "conditional-effects",
            startLine: 19,
            endLine: 35,
            startColumn: 6,
            endColumn: 8,
            tooltip: {
              title: "Conditional Effects",
              description: "重いエフェクトは条件付きで適用することで、パフォーマンスを制御できます。",
              documentationUrl: "https://github.com/pmndrs/react-postprocessing",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance"
            }
          },
          {
            id: "multisampling",
            startLine: 18,
            endLine: 18,
            startColumn: 4,
            endColumn: 35,
            tooltip: {
              title: "Multisampling",
              description: "アンチエイリアシングを有効にして、エッジの滑らかさを向上させます。",
              documentationUrl: "https://github.com/pmndrs/react-postprocessing#effectcomposer",
              r3fDocumentationUrl: "https://docs.pmnd.rs/react-three-fiber/getting-started/examples#postprocessing"
            }
          }
        ]
      }
    ]
  }
]
