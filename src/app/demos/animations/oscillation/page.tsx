'use client'

import { DemoLayout } from '../../components/common'
import { OscillationAnimation } from './components/OscillationAnimation'
import { oscillationFiles, oscillationFeatures, oscillationFileContents } from '../../config/animations/oscillation'

export default function OscillationDemo() {
  return (
    <DemoLayout 
      title="Oscillation Animation Demo" 
      description="sin/cos関数を使った振動アニメーションのデモ"
      files={oscillationFiles}
      features={oscillationFeatures}
      fileContents={oscillationFileContents}
    >
      <OscillationAnimation />
    </DemoLayout>
  )
}