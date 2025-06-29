'use client'

import { DemoLayout } from '../../components/common'
import { CannonPhysics } from './components/CannonPhysics'
import { cannonFiles, cannonFeatures, cannonFileContents } from '../../config/library-integration/cannon'

export default function CannonDemo() {
  return (
    <DemoLayout 
      title="Cannon.js Physics Demo" 
      description="Cannon.jsを使用した物理エンジンによる重力・摩擦シミュレーション"
      files={cannonFiles}
      features={cannonFeatures}
      fileContents={cannonFileContents}
    >
      <CannonPhysics />
    </DemoLayout>
  )
}