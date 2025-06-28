'use client'

import { DemoLayout } from '../../components/common'
import { DndPositionInteraction } from './components/DndPositionInteraction'
import { dndPositionFiles, dndPositionFeatures, dndPositionFileContents } from '../../config/interactions/dnd-position'

export default function DndPositionDemo() {
  return (
    <DemoLayout 
      title="Drag & Drop Position Demo" 
      description="クリック&ドラッグによるオブジェクトの位置変更デモ"
      files={dndPositionFiles}
      features={dndPositionFeatures}
      fileContents={dndPositionFileContents}
    >
      <DndPositionInteraction />
    </DemoLayout>
  )
}