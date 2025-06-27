'use client'

import { DemoLayout } from '../../components/common'
import { HoverInteraction } from './components/HoverInteraction'
import { hoverFiles, hoverFeatures, hoverFileContents } from '../../config/interactions/hover'

export default function HoverDemo() {
  return (
    <DemoLayout 
      title="Hover Interaction Demo" 
      description="マウスホバーイベントを使ったインタラクティブな3Dオブジェクト"
      files={hoverFiles}
      features={hoverFeatures}
      fileContents={hoverFileContents}
    >
      <HoverInteraction />
    </DemoLayout>
  )
}