'use client'

import { DemoLayout } from '../../components/common'
import { RotationAnimation } from './components/RotationAnimation'
import { rotationFiles, rotationFeatures, rotationFileContents } from '../../config/animations/rotation'

export default function RotationDemo() {
  return (
    <DemoLayout 
      title="Rotation Animation Demo" 
      description="useFrameを使った回転アニメーションのデモ"
      files={rotationFiles}
      features={rotationFeatures}
      fileContents={rotationFileContents}
    >
      <RotationAnimation />
    </DemoLayout>
  )
}