'use client'

import { DemoLayout } from '../../components/common'
import { MorphingAnimation } from './components/MorphingAnimation'
import { morphingFiles, morphingFeatures, morphingFileContents } from '../../config/animations/morphing'

export default function MorphingDemo() {
  return (
    <DemoLayout 
      title="Morphing Animation Demo" 
      description="ジオメトリ形状変化アニメーションのデモ"
      files={morphingFiles}
      features={morphingFeatures}
      fileContents={morphingFileContents}
    >
      <MorphingAnimation />
    </DemoLayout>
  )
}