'use client'

import { DemoLayout } from '../../components/common'
import { CameraInteraction } from './components/CameraInteraction'
import { cameraFiles, cameraFeatures, cameraFileContents } from '../../config/interactions/camera'

export default function CameraDemo() {
  return (
    <DemoLayout 
      title="Camera Interaction Demo" 
      description="OrbitControlsとカメラ操作のインタラクションデモ"
      files={cameraFiles}
      features={cameraFeatures}
      fileContents={cameraFileContents}
    >
      <CameraInteraction />
    </DemoLayout>
  )
}