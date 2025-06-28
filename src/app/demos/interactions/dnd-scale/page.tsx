'use client'

import { DemoLayoutWithControls } from '../../components/common/DemoLayoutWithControls'
import { DndScaleInteractionWithControls } from './components/DndScaleInteractionWithControls'
import { dndScaleFiles, dndScaleFeatures, dndScaleFileContents } from '../../config/interactions/dnd-scale'

export default function DndScaleDemo() {
  return (
    <DemoLayoutWithControls 
      title="Drag & Drop Scale Demo" 
      description="ドラッグアンドドロップによるオブジェクトの寸法変更デモ"
      files={dndScaleFiles}
      features={dndScaleFeatures}
      fileContents={dndScaleFileContents}
      backLink="/demos/interactions"
      backLinkText="インタラクション一覧に戻る"
    >
      <DndScaleInteractionWithControls />
    </DemoLayoutWithControls>
  )
}