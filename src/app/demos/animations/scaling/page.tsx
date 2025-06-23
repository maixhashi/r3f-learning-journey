'use client'

import { DemoLayout } from '../../components/common'
import { ScalingAnimation } from './components/ScalingAnimation'
import { scalingFiles, scalingFeatures, scalingFileContents } from '../../config/animations/scaling'

export default function ScalingDemo() {
  return (
    <DemoLayout 
      title="Scaling Animation Demo" 
      description="useFrameを使ったスケーリングアニメーションのデモ"
      files={scalingFiles}
      features={scalingFeatures}
      fileContents={scalingFileContents}
    >
      <ScalingAnimation />
    </DemoLayout>
  )
}