'use client'

import { DemoLayout } from '../../components/common'
import { FramerMotion3DDemo } from './components/FramerMotion3DDemo'
import { framerMotion3DFiles, framerMotion3DFeatures, framerMotion3DFileContents } from '../../config/library-integration/framer-motion-3d'

export default function FramerMotion3DPage() {
  return (
    <DemoLayout 
      title="Framer Motion 3D Demo" 
      description="Framer Motion 3Dを使用したジェスチャー連動3Dアニメーション"
      files={framerMotion3DFiles}
      features={framerMotion3DFeatures}
      fileContents={framerMotion3DFileContents}
    >
      <FramerMotion3DDemo />
    </DemoLayout>
  )
}