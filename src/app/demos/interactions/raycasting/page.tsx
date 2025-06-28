'use client'

import { DemoLayout } from '../../components/common'
import { RaycastingDemo } from './components/RaycastingDemo'
import { raycastingFiles, raycastingFeatures, raycastingFileContents } from '../../config/interactions/raycasting'

export default function RaycastingDemoPage() {
  return (
    <DemoLayout 
      title="Raycasting Demo" 
      description="マウス位置からのレイキャストによる詳細な当たり判定のデモ"
      files={raycastingFiles}
      features={raycastingFeatures}
      fileContents={raycastingFileContents}
    >
      <RaycastingDemo />
    </DemoLayout>
  )
}