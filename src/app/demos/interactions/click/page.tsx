'use client'

import { DemoLayout } from '../../components/common'
import { ClickInteraction } from './components/ClickInteraction'
import { clickFiles, clickFeatures, clickFileContents } from '../../config/interactions/click'

export default function ClickDemo() {
  return (
    <DemoLayout 
      title="Click Interaction Demo" 
      description="3Dオブジェクトのクリックイベントを使ったインタラクションのデモ"
      files={clickFiles}
      features={clickFeatures}
      fileContents={clickFileContents}
    >
      <ClickInteraction />
    </DemoLayout>
  )
}