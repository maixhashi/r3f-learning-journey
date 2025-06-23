'use client'

import { DemoLayout } from '../components/common'
import { BoxShape } from './components/BoxShape'
import { boxFiles, boxFeatures, boxFileContents } from '../config/box'

export default function BoxDemo() {
  return (
    <DemoLayout 
      title="Box Demo" 
      description="立方体の3D表示デモ"
      files={boxFiles}
      features={boxFeatures}
      fileContents={boxFileContents}
    >
      <BoxShape />
    </DemoLayout>
  )
}
